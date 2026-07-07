import { Plus, Tags } from "lucide-react";
import { useState } from "react";
import { createCategory, getAllCategories } from "../../services/categoriesService";

export function AdminCategoriesSection() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const categories = getAllCategories();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      alert("Informe o nome da categoria.");
      return;
    }

    createCategory(name.trim(), description.trim());

    setName("");
    setDescription("");
    setRefreshKey((current) => current + 1);
  }

  return (
    <div className="space-y-8" key={refreshKey}>
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center justify-center">
            <Plus className="w-5 h-5 text-[#dc2626]" />
          </div>

          <div>
            <h2 className="font-bold text-gray-900">Nova categoria</h2>
            <p className="text-sm text-gray-500">
              Crie categorias que serão usadas no cadastro e na página pública de produtos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_auto] gap-4">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Nome da categoria"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#dc2626]"
          />

          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descrição da categoria"
            className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#dc2626]"
          />

          <button
            type="submit"
            className="rounded-xl bg-[#111111] text-white font-semibold px-5 py-3 text-sm hover:bg-[#262626] transition-colors"
          >
            Adicionar
          </button>
        </div>
      </form>

      <div className="bg-white rounded-3xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center justify-center">
            <Tags className="w-5 h-5 text-[#dc2626]" />
          </div>

          <div>
            <h2 className="font-bold text-gray-900">Categorias cadastradas</h2>
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

              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  category.isActive
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-500 bg-gray-100"
                }`}
              >
                {category.isActive ? "Ativa" : "Inativa"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}