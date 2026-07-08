import { ArrowDown, ArrowUp, Pencil, Plus, Tags, Eye, EyeOff, Trash2 } from "lucide-react";
import { useState } from "react";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    moveCategory,
    toggleCategoryStatus,
    updateCategory,
} from "../../services/categoriesService";
import { getAllProducts } from "../../services/productsService";

export function AdminCategoriesSection() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categoryToEditId, setCategoryToEditId] = useState<string | null>(null);

    const categories = getAllCategories();

    const products = getAllProducts();

    function refreshCategories() {
        setRefreshKey((current) => current + 1);
    }

    function handleToggleCategoryStatus(categoryId: string) {
        toggleCategoryStatus(categoryId);
        refreshCategories();
    }

    function handleMoveCategory(categoryId: string, direction: "up" | "down") {
        moveCategory(categoryId, direction);
        refreshCategories();
    }

    function handleDeleteCategory(categoryId: string, categorySlug: string) {
        const hasProducts = products.some((product) => product.categorySlug === categorySlug);

        if (hasProducts) {
            alert("Não é possível excluir uma categoria que possui produtos cadastrados.");
            return;
        }

        const confirmed = window.confirm("Deseja excluir esta categoria?");

        if (!confirmed) return;

        deleteCategory(categoryId);
        refreshCategories();
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name.trim()) {
            alert("Informe o nome da categoria.");
            return;
        }

        if (categoryToEditId) {
            updateCategory(categoryToEditId, {
                name: name.trim(),
                description: description.trim(),
            });
        } else {
            createCategory(name.trim(), description.trim());
        }

        setName("");
        setDescription("");
        setCategoryToEditId(null);
        refreshCategories();
    }

    function handleEditCategory(categoryId: string, categoryName: string, categoryDescription = "") {
        setCategoryToEditId(categoryId);
        setName(categoryName);
        setDescription(categoryDescription);
    }

    function handleCancelEdit() {
        setCategoryToEditId(null);
        setName("");
        setDescription("");
    }

    return (
        <div className="space-y-8" key={refreshKey}>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center justify-center">
                        <Plus className="w-5 h-5 text-[#dc2626]" />
                    </div>

                    <div>
                        <h2 className="font-bold text-gray-900">
                            {categoryToEditId ? "Editar categoria" : "Nova categoria"}
                        </h2>
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
                        {categoryToEditId ? "Atualizar" : "Adicionar"}
                    </button>

                    {categoryToEditId && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="rounded-xl border border-gray-200 text-gray-700 font-semibold px-5 py-3 text-sm hover:border-gray-400 transition-colors"
                        >
                            Cancelar
                        </button>
                    )}
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

                            <div className="flex items-center gap-2">
                                <span
                                    className={`text-xs font-semibold px-3 py-1 rounded-full ${category.isActive
                                        ? "text-emerald-600 bg-emerald-50"
                                        : "text-gray-500 bg-gray-100"
                                        }`}
                                >
                                    {category.isActive ? "Ativa" : "Inativa"}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => handleMoveCategory(category.id, "up")}
                                    className="w-9 h-9 rounded-xl border border-gray-100 text-gray-500 hover:text-[#dc2626] hover:border-[#dc2626] transition-colors flex items-center justify-center"
                                    title="Mover para cima"
                                >
                                    <ArrowUp className="w-4 h-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleMoveCategory(category.id, "down")}
                                    className="w-9 h-9 rounded-xl border border-gray-100 text-gray-500 hover:text-[#dc2626] hover:border-[#dc2626] transition-colors flex items-center justify-center"
                                    title="Mover para baixo"
                                >
                                    <ArrowDown className="w-4 h-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleEditCategory(
                                            category.id,
                                            category.name,
                                            category.description
                                        )
                                    }
                                    className="w-9 h-9 rounded-xl border border-gray-100 text-gray-500 hover:text-[#dc2626] hover:border-[#dc2626] transition-colors flex items-center justify-center"
                                    title="Editar categoria"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleToggleCategoryStatus(category.id)}
                                    className="w-9 h-9 rounded-xl border border-gray-100 text-gray-500 hover:text-[#dc2626] hover:border-[#dc2626] transition-colors flex items-center justify-center"
                                    title={category.isActive ? "Inativar categoria" : "Ativar categoria"}
                                >
                                    {category.isActive ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDeleteCategory(category.id, category.slug)}
                                    className="w-9 h-9 rounded-xl border border-gray-100 text-gray-500 hover:text-[#dc2626] hover:border-[#dc2626] transition-colors flex items-center justify-center"
                                    title="Excluir categoria"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
