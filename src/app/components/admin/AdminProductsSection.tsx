import { useState } from "react";
import { ProductForm } from "./ProductForm";
import { AdminProductsList } from "./AdminProductsList";
import {
  deleteProduct,
  getAllProducts,
  toggleProductStatus,
} from "../../services/productsService";

export function AdminProductsSection() {
  const [refreshKey, setRefreshKey] = useState(0);
  const products = getAllProducts();

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
      <ProductForm onProductCreated={refreshProducts} />

      <AdminProductsList
        products={products}
        onDeleteProduct={handleDeleteProduct}
        onToggleProductStatus={handleToggleProductStatus}
      />
    </div>
  );
}