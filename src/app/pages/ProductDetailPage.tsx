import { useState } from "react";
import {
  MessageCircle, Star, ChevronRight, CheckCircle,
  Share2, ZoomIn, Package, ArrowLeft, Award, Truck, Shield
} from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

interface ProductDetailProps {
  slug: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function ProductDetailPage({ slug, onNavigate }: ProductDetailProps) {
  const product = products.find(p => p.slug === slug) || products[0];
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("desc");
  const related = products
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Breadcrumb */}
      <div className="bg-[#fafafa]" style={{ borderBottom: "1px solid #ececec" }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <button onClick={() => onNavigate("home")} className="hover:text-gray-700 transition-colors">
            Início
          </button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => onNavigate("products", { category: product.categorySlug })} className="hover:text-gray-700 transition-colors">
            {product.category}
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600 line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Back link */}
        <button
          onClick={() => onNavigate("products", { category: product.categorySlug })}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao catálogo
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mb-14">

          {/* Images */}
          <div>
            <div
              className="rounded-2xl overflow-hidden bg-gray-50 mb-3 aspect-square relative group cursor-zoom-in"
              style={{ border: "1px solid #f0f0f0" }}
            >
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-xl p-2">
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </div>
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-[#111111] text-white font-bold text-xs px-3 py-1 rounded-full">
                  NOVO
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all"
                    style={{
                      borderColor: i === activeImg ? "#111111" : "transparent",
                      background: "#f5f5f5",
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              {product.category}
            </p>
            <div className="flex items-start justify-between gap-3 mb-4">
              <h1 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(24px,2.8vw,36px)",
                fontWeight: 900,
                lineHeight: 1.05,
                color: "#111111",
                letterSpacing: "-0.3px",
              }}>
                {product.name}
              </h1>
              <button className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:border-gray-400 transition-colors flex-shrink-0">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviewCount} avaliações)</span>
              </div>
              <span className="h-3.5 w-px bg-gray-200" />
              <span className="text-xs text-gray-500">Ref.: {product.sku}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">{product.description}</p>

            {/* Features */}
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 text-sm mb-3">Especificações principais</h4>
              <div className="space-y-2">
                {product.features.map(f => (
                  <div key={f} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#dc2626] flex-shrink-0" />
                    <span className="text-sm text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust mini-badges */}
            <div className="grid grid-cols-3 gap-2 mb-8">
              {[
                { icon: Award, label: "26 anos de mercado" },
                { icon: Shield, label: "Qualidade garantida" },
                { icon: Truck, label: "Entrega nacional" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 bg-[#fafafa] rounded-xl border border-gray-100 text-center">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span className="text-[11px] text-gray-500 leading-tight">{label}</span>
                </div>
              ))}
            </div>

            {/* Main CTAs */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/5531975458090?text=Olá! Tenho interesse no produto: ${product.name} (Ref.: ${product.sku}). Gostaria de solicitar um orçamento.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-4 rounded-xl transition-colors duration-200"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, letterSpacing: "0.04em" }}
              >
                <MessageCircle className="w-5 h-5" />
                SOLICITAR ORÇAMENTO
              </a>
              <a
                href={`https://wa.me/5531975458090?text=Olá! Gostaria de falar com um especialista sobre: ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-700 font-semibold py-3.5 rounded-xl transition-all duration-200"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 14 }}
              >
                FALAR COM UM ESPECIALISTA
              </a>
              <button
                onClick={() => onNavigate("custom")}
                className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 py-2.5 text-sm transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Package className="w-4 h-4" />
                Preciso de um produto personalizado
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="bg-white rounded-2xl border border-gray-100 mb-14"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
        >
          <div className="flex border-b border-gray-100 px-2">
            {[
              { id: "desc", label: "Descrição" },
              { id: "specs", label: "Especificações Técnicas" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-6 py-4 text-sm font-semibold transition-colors border-b-2 -mb-px"
                style={{
                  borderBottomColor: activeTab === tab.id ? "#dc2626" : "transparent",
                  color: activeTab === tab.id ? "#dc2626" : "#6b7280",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-7">
            {activeTab === "desc" && (
              <div>
                <p className="text-gray-600 leading-relaxed mb-5">{product.description}</p>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Características e benefícios</h4>
                <ul className="space-y-2">
                  {product.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-gray-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === "specs" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <tbody>
                    {[
                      ["Referência", product.sku],
                      ["Categoria", product.category],
                      ["Disponibilidade", "Consultar disponibilidade"],
                      ["Garantia", "12 meses"],
                      ["Fabricante", "Grupo Clemal Ind. e Com. Ltda."],
                      ["Origem", "Nacional — Contagem, Minas Gerais"],
                      ["Atende Licitações", "Sim — documentação disponível"],
                      ["Personalização", "Disponível sob consulta"],
                    ].map(([label, value]) => (
                      <tr key={label} className="border-b border-gray-50 last:border-0">
                        <td className="py-3 pr-6 font-medium text-gray-500 w-1/3 whitespace-nowrap">{label}</td>
                        <td className="py-3 text-gray-800">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 28,
              fontWeight: 900,
              color: "#111111",
              letterSpacing: "-0.3px",
              marginBottom: 20,
            }}>
              Produtos Relacionados
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map(p => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
