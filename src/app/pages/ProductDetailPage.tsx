import {
  ArrowLeft,
  CheckCircle,
  PackageOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import {
  getProductBySlug,
  getRelatedProducts,
} from "../services/productsService";
import type { Product } from "../types/product";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

interface ProductDetailProps {
  slug: string;
  onNavigate: (
    page: string,
    params?: Record<string, string>
  ) => void;
}

export function ProductDetailPage({
  slug,
  onNavigate,
}: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      setIsLoading(true);
      setLoadError("");
      setProduct(null);
      setRelatedProducts([]);
      setActiveImageIndex(0);

      try {
        const loadedProduct = await getProductBySlug(slug);

        if (!isMounted) return;

        if (!loadedProduct) {
          setProduct(null);
          return;
        }

        setProduct(loadedProduct);

        const loadedRelatedProducts =
          await getRelatedProducts(loadedProduct);

        if (!isMounted) return;

        setRelatedProducts(loadedRelatedProducts);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);

        if (!isMounted) return;

        setProduct(null);
        setRelatedProducts([]);
        setLoadError("Não foi possível carregar o produto.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <p className="text-sm text-gray-500">
          Carregando produto...
        </p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center justify-center mb-5">
            <PackageOpen className="w-7 h-7 text-gray-400" />
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {loadError
              ? "Erro ao carregar produto"
              : "Produto não encontrado"}
          </h1>

          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            {loadError ||
              "O produto solicitado não está cadastrado, foi removido ou não está ativo no catálogo."}
          </p>

          <button
            type="button"
            onClick={() => onNavigate("products")}
            className="inline-flex items-center justify-center gap-2 bg-[#111111] text-white font-semibold px-5 py-3 rounded-xl hover:bg-[#262626] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao catálogo
          </button>
        </div>
      </main>
    );
  }

  const activeImage = product.images[activeImageIndex];

  const whatsappText = encodeURIComponent(
    `Olá! Tenho interesse no produto ${product.name}. Gostaria de solicitar mais informações.`
  );

  return (
    <main
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <section className="bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <button
            type="button"
            onClick={() =>
              onNavigate("products", {
                category: product.categorySlug || "all",
              })
            }
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao catálogo
          </button>

          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#dc2626] mb-3">
              {product.category}
            </p>

            <h1
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(34px,5vw,64px)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              {product.name}
            </h1>

            <p className="text-gray-300 mt-5 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10">
          <div>
            <div className="relative rounded-3xl overflow-hidden bg-[#fafafa] border border-gray-100 aspect-[4/3]">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-contain bg-white"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                  Produto sem imagem cadastrada
                </div>
              )}

              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((current) =>
                        current === 0
                          ? product.images.length - 1
                          : current - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-800 shadow flex items-center justify-center hover:bg-white transition-colors text-2xl"
                    aria-label="Imagem anterior"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((current) =>
                        current === product.images.length - 1
                          ? 0
                          : current + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-gray-800 shadow flex items-center justify-center hover:bg-white transition-colors text-2xl"
                    aria-label="Próxima imagem"
                  >
                    ›
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                    {activeImageIndex + 1} / {product.images.length}
                  </div>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImageIndex === index
                        ? "border-[#dc2626]"
                        : "border-gray-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - miniatura ${index + 1}`}
                      className="w-full h-full object-contain bg-white"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-3xl border border-gray-100 bg-[#fafafa] p-7">
              <h2
                className="mb-5"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 32,
                  fontWeight: 900,
                  color: "#111111",
                  letterSpacing: "-0.03em",
                }}
              >
                Informações do produto
              </h2>

              <div className="space-y-4 mb-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Categoria
                  </p>

                  <p className="text-sm font-semibold text-gray-800">
                    {product.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Descrição
                  </p>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {product.features.length > 0 && (
                <div className="mb-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                    Especificações
                  </p>

                  <ul className="space-y-2.5">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-gray-700"
                      >
                        <CheckCircle className="w-4 h-4 text-[#dc2626] flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <a
                href={`https://wa.me/5531993270281?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-4 rounded-xl transition-colors"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 16,
                  letterSpacing: "0.04em",
                }}
              >
                <WhatsAppIcon className="w-5 h-5" />
                SOLICITAR ORÇAMENTO
              </a>
            </div>
          </aside>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 34,
                fontWeight: 900,
                color: "#111111",
                letterSpacing: "-0.03em",
              }}
            >
              Produtos relacionados
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}