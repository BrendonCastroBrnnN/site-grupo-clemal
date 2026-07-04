import { MessageCircle, ArrowRight, Star } from "lucide-react";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function ProductCard({ product, onNavigate }: ProductCardProps) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden group flex flex-col transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      style={{ border: "1px solid #f0f0f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.11)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)")}
      onClick={() => onNavigate("product", { slug: product.slug })}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50" style={{ paddingBottom: "80%" }}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        <div className="absolute top-3 left-3 pointer-events-none">
          {product.isNew && (
            <span className="bg-[#111111] text-white text-[11px] font-bold px-2.5 py-1 rounded-full leading-none">
              NOVO
            </span>
          )}
        </div>

        {/* View overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <div className="bg-white text-gray-900 text-sm font-semibold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 shadow-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            Ver detalhes <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p
          className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 line-clamp-1"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {product.category}
        </p>

        <h3
          className="text-[15px] font-semibold text-gray-900 group-hover:text-[#dc2626] line-clamp-2 mb-3 leading-snug flex-1 transition-colors duration-150"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className={`w-3 h-3 ${s <= Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} />
            ))}
          </div>
          <span className="text-xs text-gray-400" style={{ fontFamily: "'Inter', sans-serif" }}>
            ({product.reviewCount} avaliações)
          </span>
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/5531975458090?text=Olá! Tenho interesse no produto: ${product.name}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-[#dc2626] hover:bg-[#dc2626] hover:text-white text-gray-700 text-sm font-semibold py-2.5 rounded-xl transition-all duration-200"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <MessageCircle className="w-4 h-4" />
          Solicitar Orçamento
        </a>
      </div>
    </div>
  );
}
