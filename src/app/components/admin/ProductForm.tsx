import { useEffect, useState } from "react";
import type { Category, Product, ProductFormData } from "../../types/product";
import { getCategories } from "../../services/categoriesService";
import { createProduct, updateProduct } from "../../services/productsService";
import { ProductPublishCard } from "./product-form/ProductPublishCard";
import { ProductImages } from "./product-form/ProductImages";
import { ProductFeatures } from "./product-form/ProductFeatures";
import { ProductBasicInfo } from "./product-form/ProductBasicInfo";

interface ProductFormProps {
    productToEdit?: Product | null;
    onProductSaved?: () => void;
    onCancelEdit?: () => void;
}

const initialFormData: ProductFormData = {
    name: "",
    categorySlug: "",
    description: "",
    images: [],
    features: [],
    isActive: true,
};

export function ProductForm({
    productToEdit,
    onProductSaved,
    onCancelEdit,
}: ProductFormProps) {
    const [formData, setFormData] = useState<ProductFormData>(
        productToEdit
            ? {
                name: productToEdit.name,
                categorySlug: productToEdit.categorySlug,
                description: productToEdit.description,
                images: productToEdit.images,
                features: productToEdit.features,
                isActive: productToEdit.isActive,
            }
            : initialFormData
    );
    const [featureText, setFeatureText] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    useEffect(() => {
        async function loadCategories() {
            setIsLoadingCategories(true);

            try {
                const loadedCategories = await getCategories();
                setCategories(loadedCategories);
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
                setCategories([]);
            } finally {
                setIsLoadingCategories(false);
            }
        }

        loadCategories();
    }, []);

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                name: productToEdit.name,
                categorySlug: productToEdit.categorySlug,
                description: productToEdit.description,
                images: productToEdit.images,
                features: productToEdit.features,
                isActive: productToEdit.isActive,
            });
        } else {
            setFormData(initialFormData);
        }

        setFeatureText("");
    }, [productToEdit]);

    function handleChange(
        field: keyof Omit<ProductFormData, "images" | "features">,
        value: string | boolean
    ) {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function handleAddFeature() {
        const value = featureText.trim();

        if (!value) return;

        setFormData((current) => ({
            ...current,
            features: [...current.features, value],
        }));

        setFeatureText("");
    }

    function handleRemoveFeature(index: number) {
        setFormData((current) => ({
            ...current,
            features: current.features.filter((_, itemIndex) => itemIndex !== index),
        }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!formData.name.trim()) {
            alert("Informe o nome do produto.");
            return;
        }

        if (!formData.categorySlug) {
            alert("Selecione uma categoria.");
            return;
        }

        if (!formData.description.trim()) {
            alert("Informe a descrição do produto.");
            return;
        }

        if (formData.images.length === 0) {
            alert("Adicione pelo menos uma imagem do produto.");
            return;
        }

        try {
            if (productToEdit) {
                const product = await updateProduct(productToEdit.id, formData);

                if (!product) {
                    alert("Não foi possível atualizar o produto.");
                    return;
                }

                console.log("Produto atualizado no Supabase:", product);
                alert("Produto atualizado com sucesso.");
            } else {
                const product = await createProduct(formData);

                if (!product) {
                    alert("Não foi possível cadastrar o produto.");
                    return;
                }

                console.log("Produto cadastrado no Supabase:", product);
                alert("Produto cadastrado com sucesso.");
            }

            setFormData(initialFormData);
            setFeatureText("");
            onProductSaved?.();
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            alert("Ocorreu um erro ao salvar o produto.");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
            <div className="space-y-6">
                <ProductBasicInfo
                    formData={formData}
                    categories={categories}
                    isLoadingCategories={isLoadingCategories}
                    onChange={handleChange}
                />

                <div className="bg-white rounded-3xl border border-gray-100 p-6">
                    <ProductFeatures
                        features={formData.features}
                        featureText={featureText}
                        onFeatureTextChange={setFeatureText}
                        onAddFeature={handleAddFeature}
                        onRemoveFeature={handleRemoveFeature}
                    />
                </div>
            </div>

            <aside className="space-y-6">
                <ProductImages
                    images={formData.images}
                    onImagesChange={(images) =>
                        setFormData((current) => ({
                            ...current,
                            images,
                        }))
                    }
                />

                <ProductPublishCard
                    isEditing={Boolean(productToEdit)}
                    onCancelEdit={onCancelEdit}
                />
            </aside>
        </form>
    );
}
