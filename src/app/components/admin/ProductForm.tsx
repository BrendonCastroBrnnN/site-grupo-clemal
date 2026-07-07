import { useEffect, useState } from "react";
import type { Product, ProductFormData } from "../../types/product";
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
    const categories = getCategories();

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

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

        if (productToEdit) {
            const product = updateProduct(productToEdit.id, formData);

            console.log("Produto atualizado em memória:", product);
            alert("Produto atualizado temporariamente. Depois será salvo no banco de dados.");
        } else {
            const product = createProduct(formData);

            console.log("Produto cadastrado em memória:", product);
            alert("Produto cadastrado temporariamente. Depois será salvo no banco de dados.");
        }

        setFormData(initialFormData);
        setFeatureText("");
        onProductSaved?.();
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
            <div className="space-y-6">
                <ProductBasicInfo
                    formData={formData}
                    categories={categories}
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
