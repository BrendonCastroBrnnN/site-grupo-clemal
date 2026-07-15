import { Phone, Mail, MessageCircle, MapPin, Instagram, Youtube } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand — spans 2 */}
          <div className="lg:col-span-2">
            <div className="flex flex-col leading-[1] gap-[2px] mb-5">
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: "#ffffff", letterSpacing: "-0.2px" }}>
                GRUPO
              </span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: "#dc2626", letterSpacing: "-0.2px" }}>
                CLEMAL
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              Há mais de 26 anos fabricando bolsas, malotes, capas protetoras e EPIs com qualidade industrial para empresas e órgãos públicos em todo o Brasil.
            </p>

            {/* Social — only Instagram, YouTube, WhatsApp */}
            <div className="flex gap-2.5 mb-7">
              {[
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/grupo_clemal/",
                  label: "Instagram",
                },
                {
                  icon: MessageCircle,
                  href: "https://wa.me/5531993270281",
                  label: "WhatsApp",
                  green: true,
                },
              ].map(({ icon: Icon, href, label, green }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
                  style={{
                    background: green ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)",
                    border: green ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = green ? "rgb(16,185,129)" : "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = green ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)";
                  }}
                >
                  <Icon className={`w-4 h-4 ${green ? "text-emerald-400" : "text-white/50"}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Institucional */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Institucional
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Sobre Nós", page: "about" },
                { label: "Projetos Personalizados", page: "custom" },
                { label: "Licitações", page: "licitacoes" },
                { label: "Contato", page: "contact" },
              ].map(item => (
                <li key={item.page}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-150"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Produtos */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Produtos
            </h4>
            <ul className="space-y-3">
              {[
                "EPIs",
                "Bolsas e Mochilas",
                "Malotes",
                "Capas para Coletores",
                "Bainhas para Ferramentas",
                "Projetos Personalizados",
              ].map(item => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate("products")}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-150 text-left"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Contato
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-400 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Rua Acácias, 2338<br />
                  Eldorado – Contagem/MG<br />
                  CEP 32310-370
                </div>
              </div>
              <a
                href="tel:3133955190"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-150"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Phone className="w-4 h-4 text-gray-600 flex-shrink-0" />
                (31) 3395-5190
              </a>
              <a
                href="https://wa.me/5531993270281"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-150"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                (31) 99327-0281
              </a>
              <a
                href="mailto:contato@grupoclemal.com.br"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-150"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Mail className="w-4 h-4 text-gray-600 flex-shrink-0" />
                contato@grupoclemal.com.br
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} Grupo Clemal Ind. e Com. Ltda. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-700" style={{ fontFamily: "'Inter', sans-serif" }}>
            Contagem · Minas Gerais · Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
