import { ImagePlus, PackagePlus, Settings } from "lucide-react";

interface AdminPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
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
            Área reservada para cadastrar categorias, produtos, imagens e informações que serão
            exibidas automaticamente no site.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: PackagePlus,
              title: "Produtos",
              description: "Cadastrar, editar, ativar ou remover produtos do catálogo.",
            },
            {
              icon: Settings,
              title: "Categorias",
              description: "Organizar os produtos por linhas, aplicações ou famílias.",
            },
            {
              icon: ImagePlus,
              title: "Imagens",
              description: "Gerenciar fotos principais e imagens complementares dos produtos.",
            },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white rounded-3xl border border-gray-100 p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-[#dc2626]" />
              </div>

              <h2 className="font-bold text-gray-900 text-lg mb-2">{title}</h2>

              <p className="text-sm text-gray-500 leading-relaxed mb-5">{description}</p>

              <button
                type="button"
                disabled
                className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 text-sm font-semibold cursor-not-allowed"
              >
                Em desenvolvimento
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-2">Próxima etapa</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            O painel será conectado ao banco de dados para permitir o cadastro real dos produtos,
            incluindo upload de imagens, categoria, descrição e status de publicação.
          </p>
        </div>
      </section>
    </main>
  );
}