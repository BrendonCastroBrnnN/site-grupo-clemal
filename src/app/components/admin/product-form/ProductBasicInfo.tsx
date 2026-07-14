import { PackagePlus } from "lucide-react";
import type { Category, ProductFormData } from "../../../types/product";

interface ProductBasicInfoProps {
  formData: ProductFormData;
  categories: Category[];
  isLoadingCategories?: boolean;
  onChange: (
    field: keyof Omit<ProductFormData, "images" | "features">,
    value: string | boolean
  ) => void;
}

export function ProductBasicInfo({
  formData,
  categories,
  isLoadingCategories = false,
  onChange,
}: ProductBasicInfoProps) {
  return (
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
            onChange={(event) => onChange("name", event.target.value)}
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
            onChange={(event) => onChange("categorySlug", event.target.value)}
            disabled={isLoadingCategories}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#dc2626] bg-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <option value="">
              {isLoadingCategories
                ? "Carregando categorias..."
                : "Selecione uma categoria"}
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>

          <p className="text-xs text-gray-400 mt-2">
            As categorias são carregadas do banco de dados e gerenciadas pelo painel.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            value={formData.description}
            onChange={(event) => onChange("description", event.target.value)}
            placeholder="Descreva aplicação, material, resistência e uso profissional do produto."
            rows={6}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#dc2626] resize-none"
          />
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(event) => onChange("isActive", event.target.checked)}
            className="w-4 h-4 accent-[#dc2626]"
          />

          <span className="text-sm text-gray-700">Produto ativo no catálogo</span>
        </label>
      </div>
    </div>
  );
}
