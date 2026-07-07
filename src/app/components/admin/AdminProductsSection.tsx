import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { AdminProductsList } from "./AdminProductsList";
import {
    deleteProduct,
    getAllProducts,
    toggleProductStatus,
} from "../../services/productsService";
import type { Product } from "../../types/product";

interface AdminProductsSectionProps {
    onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function AdminProductsSection({ onNavigate }: AdminProductsSectionProps) {
    const [refreshKey, setRefreshKey] = useState(0);
    const products = getAllProducts();
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    function handleOpenProduct(product: Product) {
        onNavigate("product", { slug: product.slug });
    }

    function refreshProducts() {
        setRefreshKey((current) => current + 1);
    }

    function handleDeleteProduct(productId: string) {
        deleteProduct(productId);
        refreshProducts();
    }

    function handleToggleProductStatus(productId: string) {
        toggleProductStatus(productId);
        refreshProducts();
    }

    return (
        <div className="space-y-8" key={refreshKey}>
            <ProductForm
                productToEdit={productToEdit}
                onProductSaved={() => {
                    setProductToEdit(null);
                    refreshProducts();
                }}
                onCancelEdit={() => setProductToEdit(null)}
            />

            <AdminProductsList
                products={products}
                onDeleteProduct={handleDeleteProduct}
                onToggleProductStatus={handleToggleProductStatus}
                onEditProduct={setProductToEdit}
                onOpenProduct={handleOpenProduct}
            />
        </div>
    );
}
