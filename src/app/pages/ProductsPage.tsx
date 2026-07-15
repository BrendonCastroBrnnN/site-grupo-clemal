import { PackageOpen, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { getCategories } from "../services/categoriesService";
import { getProducts } from "../services/productsService";
import type { Category, Product } from "../types/product";

interface ProductsPageProps {
  onNavigate: (
    page: string,
    params?: Record<string, string>
  ) => void;
  initialCategory?: string;
}

export function ProductsPage({
  onNavigate,
  initialCategory,
}: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || "all"
  );

  const [searchTerm, setSearchTerm] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    setSelectedCategory(initialCategory || "all");
  }, [initialCategory]);

  useEffect(() => {
    async function loadCatalog() {
      setIsLoading(true);
      setLoadError("");

      try {
        const [loadedCategories, loadedProducts] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);

        setCategories(loadedCategories);
        setProducts(loadedProducts);
      } catch (error) {
        console.error("Erro ao carregar catálogo:", error);

        setCategories([]);
        setProducts([]);
        setLoadError("Não foi possível carregar o catálogo.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCatalog();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" ||
        product.categorySlug === selectedCategory;

      const matchesSearch =
        normalizedTerm.length === 0 ||
        product.name.toLowerCase().includes(normalizedTerm) ||
        product.description.toLowerCase().includes(normalizedTerm) ||
        product.category.toLowerCase().includes(normalizedTerm);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const selectedCategoryName =
    selectedCategory === "all"
      ? "Todos os produtos"
      : categories.find(
          (category) => category.slug === selectedCategory
        )?.name || "Categoria";

  return (
    <main
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <section className="bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#dc2626] mb-3">
            Catálogo Grupo Clemal
          </p>

          <h1
            className="max-w-3xl"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(34px,5vw,64px)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            Produtos técnicos para equipes operacionais, campo e licitações
          </h1>

          <p className="max-w-2xl text-gray-300 mt-5 leading-relaxed">
            Consulte bainhas, bolsas técnicas, capas de proteção e soluções
            sob medida fabricadas para uso profissional, com foco em
            resistência, acabamento e durabilidade.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="border border-gray-100 rounded-2xl p-5 bg-[#fafafa]">
              <h2 className="font-bold text-gray-900 mb-4">
                Categorias
              </h2>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  disabled={isLoading}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 ${
                    selectedCategory === "all"
                      ? "bg-[#111111] text-white"
                      : "bg-white text-gray-600 hover:text-gray-900 border border-gray-100"
                  }`}
                >
                  Todos os produtos
                </button>

                {isLoading ? (
                  <p className="text-sm text-gray-400 leading-relaxed px-1 pt-2">
                    Carregando categorias...
                  </p>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(category.slug)
                      }
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        selectedCategory === category.slug
                          ? "bg-[#111111] text-white"
                          : "bg-white text-gray-600 hover:text-gray-900 border border-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))
                                ) : (
                  <p className="text-sm text-gray-400 leading-relaxed px-1 pt-2">
                    Nenhuma categoria disponível no momento.
                  </p>
                )}
              </div>

              <div className="mt-5 pt-5 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => onNavigate("custom")}
                  className="w-full rounded-xl bg-[#dc2626] px-4 py-3 text-sm font-bold text-white hover:bg-[#b91c1c] transition-colors"
                >
                  Projetos personalizados
                </button>

                <p className="mt-2 px-1 text-xs leading-relaxed text-gray-400">
                  Desenvolvemos produtos sob medida para sua empresa.
                </p>
              </div>
            </div>
          </aside>          

          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
              <div>
                <p className="text-xs font-semibold text-[#dc2626] uppercase tracking-wider mb-2">
                  Produtos
                </p>

                <h2
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(28px,3vw,42px)",
                    fontWeight: 900,
                    color: "#111111",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {selectedCategoryName}
                </h2>
              </div>

              <div className="relative w-full md:w-[320px]">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

                <input
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  disabled={isLoading}
                  placeholder="Buscar produto..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#dc2626] disabled:opacity-60"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="min-h-[360px] border border-dashed border-gray-200 rounded-3xl bg-[#fafafa] flex items-center justify-center px-6">
                <p className="text-sm text-gray-500">
                  Carregando produtos...
                </p>
              </div>
            ) : loadError ? (
              <div className="min-h-[360px] border border-red-100 rounded-3xl bg-red-50 flex flex-col items-center justify-center text-center px-6">
                <PackageOpen className="w-7 h-7 text-red-400 mb-4" />

                <h3 className="font-bold text-red-700 text-lg mb-2">
                  Erro ao carregar o catálogo
                </h3>

                <p className="max-w-md text-sm text-red-600">
                  {loadError}
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            ) : (
              <div className="min-h-[360px] border border-dashed border-gray-200 rounded-3xl bg-[#fafafa] flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-5">
                  <PackageOpen className="w-7 h-7 text-gray-400" />
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Nenhum produto encontrado
                </h3>

                <p className="max-w-md text-sm text-gray-500 leading-relaxed">
                  Não há produtos ativos correspondentes à categoria ou à
                  pesquisa selecionada.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}