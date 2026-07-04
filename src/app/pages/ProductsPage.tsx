import { useState, useMemo } from "react";
import { MessageCircle, Search, ChevronRight } from "lucide-react";
import type { Product } from "../types/product";

const products: Product[] = [];
const categories: any[] = [];
import { ProductCard } from "../components/ProductCard";

interface ProductsPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  initialCategory?: string;
  initialSearch?: string;
}

export function ProductsPage({ onNavigate, initialCategory, initialSearch }: ProductsPageProps) {
  // Default to first real category if none specified
  const defaultCat = initialCategory || categories[0].slug;
  const [selectedCategory, setSelectedCategory] = useState(defaultCat);
  const [search, setSearch] = useState(initialSearch || "");
  const [sortBy, setSortBy] = useState("featured");

  const activeCat = categories.find(c => c.slug === selectedCategory);

  const filtered = useMemo(() => {
    let r = [...products];
    if (selectedCategory) r = r.filter(p => p.categorySlug === selectedCategory);
    if (search) r = r.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
    switch (sortBy) {
      case "az": return r.sort((a, b) => a.name.localeCompare(b.name));
      case "rating": return r.sort((a, b) => b.rating - a.rating);
      default: return r.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [selectedCategory, search, sortBy]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Page header */}
      <div className="bg-[#fafafa]" style={{ borderBottom: "1px solid #ececec" }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <button onClick={() => onNavigate("home")} className="hover:text-gray-700 transition-colors">Início</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700">Produtos</span>
            {activeCat && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-gray-700">{activeCat.name}</span>
              </>
            )}
          </div>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 38,
            fontWeight: 900,
            color: "#111111",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}>
            {activeCat?.name || "Catálogo de Produtos"}
          </h1>
          {activeCat?.description && (
            <p className="text-gray-500 text-sm mt-2 max-w-xl">{activeCat.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">

        {/* ── Left sidebar — fixed category list ── */}
        <aside className="w-60 flex-shrink-0 hidden md:block">
          <div
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div className="px-4 py-4 border-b border-gray-50">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Categorias</p>
            </div>
            <nav className="py-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-150 text-left group"
                  style={{
                    background: selectedCategory === cat.slug ? "#fef2f2" : "transparent",
                    color: selectedCategory === cat.slug ? "#dc2626" : "#374151",
                    fontWeight: selectedCategory === cat.slug ? 600 : 400,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors"
                      style={{ background: selectedCategory === cat.slug ? "#dc2626" : "#d1d5db" }}
                    />
                    <span className="line-clamp-2 leading-snug text-[13px]">{cat.name}</span>
                  </div>
                  {cat.productCount > 0 && (
                    <span
                      className="text-[11px] flex-shrink-0 ml-2 font-medium"
                      style={{ color: selectedCategory === cat.slug ? "#fca5a5" : "#d1d5db" }}
                    >
                      {cat.productCount}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* WhatsApp CTA in sidebar */}
            <div className="p-4 border-t border-gray-50">
              <a
                href="https://wa.me/5531975458090?text=Olá! Gostaria de solicitar um orçamento."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors duration-200"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Solicitar Orçamento
              </a>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Mobile category selector */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="md:hidden border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none bg-white text-gray-700 flex-1"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>

            <div className="flex gap-2 flex-1 md:flex-none">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar nesta categoria..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-gray-400 bg-white"
                />
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none bg-white text-gray-700 cursor-pointer"
              >
                <option value="featured">Em destaque</option>
                <option value="az">A–Z</option>
                <option value="rating">Melhor avaliação</option>
              </select>
            </div>

            <p className="text-sm text-gray-400 ml-auto">
              {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24 bg-[#fafafa] rounded-2xl border border-gray-100">
              <p className="text-gray-400 text-lg font-semibold mb-1">Nenhum produto encontrado</p>
              <p className="text-gray-400 text-sm">Tente outra categoria ou entre em contato para projetos personalizados.</p>
              <a
                href="https://wa.me/5531975458090?text=Olá! Não encontrei o produto que precisava."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 bg-[#111111] rounded-2xl p-8 text-center">
            <p className="text-white font-bold text-lg mb-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, letterSpacing: "-0.3px" }}>
              Não encontrou o que procura?
            </p>
            <p className="text-gray-400 text-sm mb-5">
              Desenvolvemos produtos personalizados para qualquer segmento. Fale com nossa equipe.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://wa.me/5531975458090?text=Olá! Preciso de um produto personalizado."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Solicitar Produto Personalizado
              </a>
              <button
                onClick={() => onNavigate("custom")}
                className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Ver Projetos Personalizados
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
