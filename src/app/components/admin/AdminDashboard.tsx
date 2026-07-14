import { FolderTree, Package, PackageCheck, PackageX } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/categoriesService";
import { getAllProducts } from "../../services/productsService";
import type { Category, Product } from "../../types/product";

export function AdminDashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true);

      try {
        const [loadedProducts, loadedCategories] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);

        setProducts(loadedProducts);
        setCategories(loadedCategories);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
        setProducts([]);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const activeProducts = products.filter((product) => product.isActive);
  const inactiveProducts = products.filter((product) => !product.isActive);

  const cards = [
    {
      title: "Produtos cadastrados",
      value: isLoading ? "..." : products.length,
      description: "Total de produtos no catálogo",
      icon: Package,
    },
    {
      title: "Categorias",
      value: isLoading ? "..." : categories.length,
      description: isLoading
        ? "Carregando categorias"
        : "Categorias disponíveis no painel",
      icon: FolderTree,
    },
    {
      title: "Produtos ativos",
      value: isLoading ? "..." : activeProducts.length,
      description: "Visíveis no site público",
      icon: PackageCheck,
    },
    {
      title: "Produtos inativos",
      value: isLoading ? "..." : inactiveProducts.length,
      description: "Ocultos do site público",
      icon: PackageX,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map(({ title, value, description, icon: Icon }) => (
          <div key={title} className="bg-white rounded-3xl border border-gray-100 p-6">
            <div className="w-11 h-11 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center justify-center mb-5">
              <Icon className="w-5 h-5 text-[#dc2626]" />
            </div>

            <p className="text-sm text-gray-500 mb-1">{title}</p>

            <p
              className="text-4xl font-black text-[#111111] mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {value}
            </p>

            <p className="text-xs text-gray-400">{description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Últimos produtos</h2>

          {isLoading ? (
            <p className="text-sm text-gray-500">Carregando produtos...</p>
          ) : products.length > 0 ? (
            <div className="space-y-3">
              {products.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 border border-gray-100 rounded-2xl p-3"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${product.isActive
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-gray-500 bg-gray-100"
                      }`}
                  >
                    {product.isActive ? "Ativo" : "Inativo"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Nenhum produto cadastrado ainda.</p>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Categorias</h2>

          {isLoading ? (
            <p className="text-sm text-gray-500">Carregando categorias...</p>
          ) : categories.length > 0 ? (
            <div className="space-y-3">
              {categories.slice(0, 5).map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between gap-4 border border-gray-100 rounded-2xl p-3"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.description}</p>
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${category.isActive
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-gray-500 bg-gray-100"
                      }`}
                  >
                    {category.isActive ? "Ativa" : "Inativa"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Nenhuma categoria cadastrada ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}