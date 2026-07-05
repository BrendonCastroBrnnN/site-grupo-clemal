import { ImagePlus, PackagePlus, Save } from "lucide-react";
import { useState } from "react";
import type { ProductFormData } from "../../types/product";
import { getCategories } from "../../services/categoriesService";

const initialFormData: ProductFormData = {
    name: "",
    categorySlug: "",
    description: "",
    images: [],
    features: [],
    isActive: true,
};

export function ProductForm() {
    const [formData, setFormData] = useState<ProductFormData>(initialFormData);
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

    function handleImagesChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(event.target.files || []);

        setFormData((current) => ({
            ...current,
            images: files,
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

        console.log("Produto pronto para cadastro:", formData);
        alert("Estrutura do formulário pronta. A integração com banco será feita depois.");
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
                        <div className="mt-4 space-y-2">
                            {formData.images.map((file) => (
                                <div
                                    key={file.name}
                                    className="text-xs text-gray-500 bg-[#fafafa] border border-gray-100 rounded-xl px-3 py-2"
                                >
                                    {file.name}
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
                        Salvar produto
                    </button>
                </div>
            </aside>
        </form>
    );
}