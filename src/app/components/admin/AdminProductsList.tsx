import { PackageOpen } from "lucide-react";
import type { Product } from "../../types/product";

interface AdminProductsListProps {
  products: Product[];
}

export function AdminProductsList({ products }: AdminProductsListProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center">
        <PackageOpen className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <h2 className="font-bold text-gray-900 mb-2">Nenhum produto cadastrado</h2>
        <p className="text-sm text-gray-500">
          Os produtos cadastrados aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6">
      <h2 className="font-bold text-gray-900 mb-5">Produtos cadastrados</h2>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 border border-gray-100 rounded-2xl p-3"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#fafafa] border border-gray-100 flex-shrink-0">
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
              <p className="text-xs text-gray-500">{product.categorySlug}</p>
            </div>

            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Ativo
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}