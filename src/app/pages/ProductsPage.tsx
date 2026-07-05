import { Search, PackageOpen } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { getCategories } from "../services/categoriesService";
import { getProducts } from "../services/productsService";

interface ProductsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  initialCategory?: string;
}

export function ProductsPage({ onNavigate, initialCategory }: ProductsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = getCategories();
  const products = getProducts();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.categorySlug === selectedCategory;

      const term = searchTerm.trim().toLowerCase();

      const matchesSearch =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      return matchesCategory && matchesSearch && product.isActive;
    });
  }, [selectedCategory, searchTerm]);

  const selectedCategoryName =
    selectedCategory === "all"
      ? "Todos os produtos"
      : categories.find((category) => category.slug === selectedCategory)?.name || "Categoria";

  return (
    <main className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
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
            Consulte bainhas, bolsas técnicas, capas de proteção e soluções sob medida fabricadas
            para uso profissional, com foco em resistência, acabamento e durabilidade.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="border border-gray-100 rounded-2xl p-5 bg-[#fafafa]">
              <h2 className="font-bold text-gray-900 mb-4">Categorias</h2>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${selectedCategory === "all"
                      ? "bg-[#111111] text-white"
                      : "bg-white text-gray-600 hover:text-gray-900 border border-gray-100"
                    }`}
                >
                  Todos os produtos
                </button>

                {categories.length > 0 ? (
                  categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${selectedCategory === category.slug
                          ? "bg-[#111111] text-white"
                          : "bg-white text-gray-600 hover:text-gray-900 border border-gray-100"
                        }`}
                    >
                      {category.name}
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 leading-relaxed px-1 pt-2">
                    As categorias serão exibidas aqui conforme forem cadastradas no painel
                    administrativo.
                  </p>
                )}
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
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar produto..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#dc2626]"
                />
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
                ))}
              </div>
            ) : (
              <div className="min-h-[360px] border border-dashed border-gray-200 rounded-3xl bg-[#fafafa] flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-5">
                  <PackageOpen className="w-7 h-7 text-gray-400" />
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Nenhum produto cadastrado ainda
                </h3>

                <p className="max-w-md text-sm text-gray-500 leading-relaxed">
                  Esta área será preenchida automaticamente quando os produtos forem cadastrados
                  no painel administrativo.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}