import { ImagePlus, PackagePlus, Save } from "lucide-react";
import { useState } from "react";
import type { Product, ProductFormData } from "../../types/product";
import { getCategories } from "../../services/categoriesService";
import { createProduct, updateProduct } from "../../services/productsService";


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

    function handleChange(
        field: keyof Omit<ProductFormData, "images" | "features">,
        value: string | boolean
    ) {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    }

    async function handleImagesChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.target.files || []);

        if (files.length === 0) return;

        const images = await Promise.all(
            files.map((file) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;

                    reader.readAsDataURL(file);
                });
            })
        );

        setFormData((current) => ({
            ...current,
            images: [...current.images, ...images],
        }));

        event.target.value = "";
    }

    function handleRemoveImage(index: number) {
        setFormData((current) => ({
            ...current,
            images: current.images.filter((_, imageIndex) => imageIndex !== index),
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
            <div className="bg-white rounded-3xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center justify-center">
                        <PackagePlus className="w-5 h-5 text-[#dc2626]" />
                    </div>

                    <div>
                        <h2 className="font-bold text-gray-900">Informações principais</h2>
                        <p className="text-sm text-gray-500">Nome, categoria e descrição do produto.</p>
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nome do produto
                        </label>
                        <input
                            value={formData.name}
                            onChange={(event) => handleChange("name", event.target.value)}
                            placeholder="Ex.: Bainha em lona para alicate"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#dc2626]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Categoria
                        </label>
                        <select
                            value={formData.categorySlug}
                            onChange={(event) => handleChange("categorySlug", event.target.value)}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#dc2626] bg-white"
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.slug}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <p className="text-xs text-gray-400 mt-2">
                            Depois, essas categorias virão do banco de dados e poderão ser gerenciadas no
                            próprio painel.
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Descrição
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(event) => handleChange("description", event.target.value)}
                            placeholder="Descreva aplicação, material, resistência e uso profissional do produto."
                            rows={6}
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#dc2626] resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Especificações
                        </label>

                        <div className="flex gap-2">
                            <input
                                value={featureText}
                                onChange={(event) => setFeatureText(event.target.value)}
                                placeholder="Ex.: Confeccionada em lona reforçada"
                                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#dc2626]"
                            />

                            <button
                                type="button"
                                onClick={handleAddFeature}
                                className="px-4 rounded-xl bg-[#111111] text-white text-sm font-semibold hover:bg-[#262626] transition-colors"
                            >
                                Adicionar
                            </button>
                        </div>

                        {formData.features.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {formData.features.map((feature, index) => (
                                    <button
                                        key={`${feature}-${index}`}
                                        type="button"
                                        onClick={() => handleRemoveFeature(index)}
                                        className="px-3 py-1.5 rounded-full bg-[#fafafa] border border-gray-100 text-xs text-gray-600 hover:border-[#dc2626] hover:text-[#dc2626] transition-colors"
                                    >
                                        {feature} ×
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(event) => handleChange("isActive", event.target.checked)}
                            className="w-4 h-4 accent-[#dc2626]"
                        />

                        <span className="text-sm text-gray-700">Produto ativo no catálogo</span>
                    </label>
                </div>
            </div>

            <aside className="space-y-6">
                <div className="bg-white rounded-3xl border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center justify-center">
                            <ImagePlus className="w-5 h-5 text-[#dc2626]" />
                        </div>

                        <div>
                            <h2 className="font-bold text-gray-900">Imagens</h2>
                            <p className="text-sm text-gray-500">Fotos do produto.</p>
                        </div>
                    </div>

                    <label className="block cursor-pointer rounded-2xl border border-dashed border-gray-200 bg-[#fafafa] p-6 text-center hover:border-[#dc2626] transition-colors">
                        <ImagePlus className="w-8 h-8 text-gray-400 mx-auto mb-3" />

                        <span className="block text-sm font-semibold text-gray-700">
                            Selecionar imagens
                        </span>

                        <span className="block text-xs text-gray-400 mt-1">JPG, PNG ou WebP</span>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImagesChange}
                            className="hidden"
                        />
                    </label>

                    {formData.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {formData.images.map((image, index) => (
                                <div
                                    key={`${image}-${index}`}
                                    className="relative aspect-square rounded-xl overflow-hidden bg-[#fafafa] border border-gray-100"
                                >
                                    <img
                                        src={image}
                                        alt={`Imagem selecionada ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />

                                    {index === 0 && (
                                        <span className="absolute top-2 left-2 bg-[#dc2626] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                            CAPA
                                        </span>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white text-xs flex items-center justify-center hover:bg-black transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-6">
                    <h2 className="font-bold text-gray-900 mb-2">Publicação</h2>

                    <p className="text-sm text-gray-500 leading-relaxed mb-5">
                        Ao salvar, o produto ficará disponível para aparecer no catálogo conforme a categoria
                        selecionada.
                    </p>

                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-4 rounded-xl transition-colors"
                    >
                        <Save className="w-5 h-5" />
                        {productToEdit ? "Atualizar produto" : "Salvar produto"}
                    </button>
                    {productToEdit && (
    <button
        type="button"
        onClick={onCancelEdit}
        className="w-full mb-3 inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:border-gray-400 transition-colors"
    >
        Cancelar edição
    </button>
)}
                </div>
            </aside>
        </form>
    );
}