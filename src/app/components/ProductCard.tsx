import { ArrowRight } from "lucide-react";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function ProductCard({ product, onNavigate }: ProductCardProps) {
  const image = product.images?.[0];

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <button
        onClick={() => onNavigate("product-detail", { slug: product.slug })}
        className="block w-full aspect-[4/3] bg-gray-100 overflow-hidden"
      >
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
            Sem imagem
          </div>
        )}
      </button>

      <div className="p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          {product.category}
        </p>

        <h3 className="font-bold text-gray-900 leading-tight mb-3 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {product.description}
        </p>

        <button
          onClick={() => onNavigate("product-detail", { slug: product.slug })}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#dc2626] hover:text-[#b91c1c] transition-colors"
        >
          Ver produto
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}