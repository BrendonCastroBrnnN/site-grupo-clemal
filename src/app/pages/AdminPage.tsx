import {
    LayoutDashboard,
    LogOut,
    MessageSquareText,
    Package,
    Tags,
} from "lucide-react";
import { useState } from "react";
import { AdminProductsSection } from "../components/admin/AdminProductsSection";
import { AdminCategoriesSection } from "../components/admin/AdminCategoriesSection";
import { AdminDashboard } from "../components/admin/AdminDashboard";
import { AdminLogin } from "../components/admin/AdminLogin";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { AdminInquiriesSection } from "../components/admin/AdminInquiriesSection";

type AdminSection =
    | "dashboard"
    | "products"
    | "categories"
    | "inquiries";

interface AdminPageProps {
    onNavigate: (page: string, params?: Record<string, string>) => void;
}

const menuItems: {
    id: AdminSection;
    label: string;
    icon: typeof LayoutDashboard;
}[] = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "products", label: "Produtos", icon: Package },
        { id: "categories", label: "Categorias", icon: Tags },
        { id: "inquiries", label: "Solicitações", icon: MessageSquareText }
    ];

export function AdminPage({ onNavigate }: AdminPageProps) {
    const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");

    const { isAuthenticated, isLoadingAuth, login, logout } = useAdminAuth();

    if (isLoadingAuth) {
        return (
            <main className="min-h-screen bg-[#f6f6f6] flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    Verificando acesso...
                </p>
            </main>
        );
    }

    if (!isAuthenticated) {
        return <AdminLogin onLogin={login} />;
    }

    function renderSection() {
        switch (activeSection) {
            case "products":
                return <AdminProductsSection onNavigate={onNavigate} />;

            case "categories":
                return <AdminCategoriesSection />;

            case "inquiries":
                return <AdminInquiriesSection />;

            case "dashboard":
            default:
                return <AdminDashboard />;
        }
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
                        Gestão do catálogo
                    </h1>

                    <p className="max-w-2xl text-gray-300 mt-4 leading-relaxed">
                        Gerencie produtos, categorias, imagens e informações exibidas no site institucional do
                        Grupo Clemal.
                    </p>
                    <button
                        type="button"
                        onClick={() => void logout()}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair do painel
                    </button>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
                    <aside className="bg-white rounded-3xl border border-gray-100 p-4 h-fit">
                        <nav className="space-y-2">
                            {menuItems.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setActiveSection(id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${activeSection === id
                                        ? "bg-[#111111] text-white"
                                        : "text-gray-600 hover:bg-[#fafafa] hover:text-gray-900"
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <div key={activeSection}>{renderSection()}</div>
                </div>
            </section>
        </main>
    );
}
