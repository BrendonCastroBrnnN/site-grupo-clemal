import { useState } from "react";
import { ProductForm } from "../components/admin/ProductForm";
import { AdminProductsList } from "../components/admin/AdminProductsList";
import { getAllProducts } from "../services/productsService";

interface AdminPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const products = getAllProducts();

  function handleProductCreated() {
    setRefreshKey((current) => current + 1);
  }

  return (
    <main className="min-h-screen bg-[#f6f6f6]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <section className="bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#dc2626] mb-3">
            Painel administrativo
          </p>

          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(32px,4vw,56px)",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            Cadastro de produtos
          </h1>

          <p className="max-w-2xl text-gray-300 mt-4 leading-relaxed">
            Cadastre os produtos que serão exibidos automaticamente no catálogo institucional do
            Grupo Clemal.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="space-y-8" key={refreshKey}>
          <ProductForm onProductCreated={handleProductCreated} />
          <AdminProductsList products={products} />
        </div>
      </section>
    </main>
  );
}