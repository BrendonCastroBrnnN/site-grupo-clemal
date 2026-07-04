import { useState } from "react";
import { TopBar } from "./components/TopBar";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { AboutPage } from "./pages/AboutPage";
import { CustomPage } from "./pages/CustomPage";
import { LicitacoesPage } from "./pages/LicitacoesPage";
import { MessageCircle } from "lucide-react";
import { AdminPage } from "./pages/AdminPage";

interface NavState {
  page: string;
  params?: Record<string, string>;
}

export default function App() {
  const [nav, setNav] = useState<NavState>({ page: "home" });

  const navigate = (page: string, params?: Record<string, string>) => {
    setNav({ page, params });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (nav.page) {
      case "home":
        return <HomePage onNavigate={navigate} />;

      case "products":
        return (
          <ProductsPage
            onNavigate={navigate}
            initialCategory={nav.params?.category}
          />
        );

      case "product":
        return <ProductDetailPage slug={nav.params?.slug || ""} onNavigate={navigate} />;

      case "licitacoes":
        return <LicitacoesPage onNavigate={navigate} />;

      case "custom":
        return <CustomPage />;

      case "about":
        return <AboutPage />;

      case "contact":
        return <ContactPage />;
      case "admin":
        return <AdminPage onNavigate={navigate} />;

      default:
        return (
          <div
            className="min-h-screen bg-white flex items-center justify-center"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm mb-5">Página em construção</p>
              <button
                onClick={() => navigate("home")}
                className="bg-[#111111] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#dc2626] transition-colors"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <TopBar />
      <Header onNavigate={navigate} currentPage={nav.page} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={navigate} />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/5531975458090?text=Olá! Gostaria de informações sobre os produtos do Grupo Clemal."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl px-5 py-3.5 flex items-center gap-2.5 transition-all duration-200 hover:scale-105 group"
        style={{ boxShadow: "0 8px 32px rgba(16,185,129,0.30)", fontFamily: "'Inter', sans-serif" }}
      >
        <MessageCircle className="w-5 h-5 flex-shrink-0" />
        <span
          className="text-sm font-semibold overflow-hidden whitespace-nowrap transition-all duration-300"
          style={{ maxWidth: 0 }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.maxWidth = "160px")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.maxWidth = "0px")}
        >
          Fale Conosco
        </span>
      </a>
    </div>
  );
}
