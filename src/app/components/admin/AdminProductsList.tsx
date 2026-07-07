import { Eye, EyeOff, ExternalLink, PackageOpen, Pencil, Trash2 } from "lucide-react";
import type { Product } from "../../types/product";

interface AdminProductsListProps {
    products: Product[];
    onDeleteProduct: (productId: string) => void;
    onToggleProductStatus: (productId: string) => void;
    onEditProduct: (product: Product) => void;
    onOpenProduct: (product: Product) => void;
}

export function AdminProductsList({
    products,
    onDeleteProduct,
    onToggleProductStatus,
    onEditProduct,
    onOpenProduct,
}: AdminProductsListProps) {
    if (products.length === 0) {
        return (
            <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center">
                <PackageOpen className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <h2 className="font-bold text-gray-900 mb-2">Nenhum produto cadastrado</h2>
                <p className="text-sm text-gray-500">Os produtos cadastrados aparecerão aqui.</p>
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
                        className="flex flex-col md:flex-row md:items-center gap-4 border border-gray-100 rounded-2xl p-3"
                    >
                        <div className="flex items-center gap-4 min-w-0 flex-1">
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
                        </div>

                        <div className="flex items-center gap-2 md:justify-end">
                            <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full ${product.isActive
                                    ? "text-emerald-600 bg-emerald-50"
                                    : "text-gray-500 bg-gray-100"
                                    }`}
                            >
                                {product.isActive ? "Ativo" : "Inativo"}
                            </span>

                            <button
                                type="button"
                                onClick={() => onOpenProduct(product)}
                                className="w-9 h-9 rounded-xl border border-gray-100 text-gray-500 hover:text-[#dc2626] hover:border-[#dc2626] transition-colors flex items-center justify-center"
                                title="Abrir produto"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </button>

                            <button
                                type="button"
                                onClick={() => onEditProduct(product)}
                                className="w-9 h-9 rounded-xl border border-gray-100 text-gray-500 hover:text-[#dc2626] hover:border-[#dc2626] transition-colors flex items-center justify-center"
                                title="Editar produto"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>

                            <button
                                type="button"
                                onClick={() => onToggleProductStatus(product.id)}
                                className="w-9 h-9 rounded-xl border border-gray-100 text-gray-500 hover:text-[#dc2626] hover:border-[#dc2626] transition-colors flex items-center justify-center"
                                title={product.isActive ? "Inativar produto" : "Ativar produto"}
                            >
                                {product.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    const confirmed = window.confirm(
                                        `Deseja excluir o produto "${product.name}"?`
                                    );

                                    if (confirmed) {
                                        onDeleteProduct(product.id);
                                    }
                                }}
                                className="w-9 h-9 rounded-xl border border-gray-100 text-gray-500 hover:text-[#dc2626] hover:border-[#dc2626] transition-colors flex items-center justify-center"
                                title="Excluir produto"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
