import { Tags } from "lucide-react";
import { getCategories } from "../../services/categoriesService";

export function AdminCategoriesSection() {
  const categories = getCategories();

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center justify-center">
          <Tags className="w-5 h-5 text-[#dc2626]" />
        </div>

        <div>
          <h2 className="font-bold text-gray-900">Categorias</h2>
          <p className="text-sm text-gray-500">
            Categorias atualmente disponíveis no catálogo.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between gap-4 border border-gray-100 rounded-2xl p-4"
          >
            <div>
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.description}</p>
            </div>

            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Ativa
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}