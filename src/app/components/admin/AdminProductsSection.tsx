import { useEffect, useState } from "react";
import { ProductForm } from "./ProductForm";
import { AdminProductsList } from "./AdminProductsList";
import {
    deleteProduct,
    getAllProducts,
    moveProduct,
    toggleProductStatus,
} from "../../services/productsService";
import type { Product } from "../../types/product";

interface AdminProductsSectionProps {
    onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function AdminProductsSection({
    onNavigate,
}: AdminProductsSectionProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    async function loadProducts() {
        setIsLoading(true);

        try {
            const loadedProducts = await getAllProducts();
            setProducts(loadedProducts);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadProducts();
    }, []);

    async function handleDeleteProduct(productId: string) {
        await deleteProduct(productId);

        if (productToEdit?.id === productId) {
            setProductToEdit(null);
        }

        await loadProducts();
    }

    async function handleToggleProductStatus(productId: string) {
        await toggleProductStatus(productId);
        await loadProducts();
    }

    async function handleMoveProduct(
        productId: string,
        direction: "up" | "down"
    ) {
        await moveProduct(productId, direction);
        await loadProducts();
    }

    function handleOpenProduct(product: Product) {
        onNavigate("product-detail", {
            slug: product.slug,
        });
    }

    if (isLoading) {
        return (
            <div className="bg-white rounded-3xl border border-gray-100 p-8">
                <p className="text-sm text-gray-500">
                    Carregando produtos...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <ProductForm
                productToEdit={productToEdit}
                onProductSaved={() => {
                    setProductToEdit(null);
                    loadProducts();
                }}
                onCancelEdit={() => setProductToEdit(null)}
            />

            <AdminProductsList
                products={products}
                onDeleteProduct={handleDeleteProduct}
                onToggleProductStatus={handleToggleProductStatus}
                onEditProduct={setProductToEdit}
                onOpenProduct={handleOpenProduct}
                onMoveProduct={handleMoveProduct}
            />
        </div>
    );
}