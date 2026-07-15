import { MessageCircle, CheckCircle, Award, FileText, Package, Users, Factory, Truck, Shield, Building2, ArrowRight } from "lucide-react";

interface LicitacoesPageProps {
  onNavigate: (page: string) => void;
}

export function LicitacoesPage({ onNavigate }: LicitacoesPageProps) {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border text-white/60 text-xs font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-7"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              <Building2 className="w-3.5 h-3.5" />
              Setor Público · Órgãos e Autarquias
            </div>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(36px,4.5vw,60px)",
              fontWeight: 900,
              lineHeight: 1.03,
              letterSpacing: "-1px",
              color: "#ffffff",
            }}>
              Fornecemos para órgãos públicos e participamos de licitações em todo o Brasil
            </h1>
            <p className="mt-5 text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              Estrutura industrial própria, capacidade produtiva comprovada, emissão de NF-e e histórico de fornecimento para prefeituras, autarquias, empresas estatais e órgãos federais.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/5531993270281?text=Olá! Gostaria de informações sobre fornecimento para licitação."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-7 py-3.5 rounded-xl transition-colors duration-200"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, letterSpacing: "0.05em" }}
              >
                PARTICIPAR DE UMA COTAÇÃO
              </a>
              <a
                href="mailto:contato@grupoclemal.com.br"
                className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 14 }}
              >
                <FileText className="w-4 h-4" />
                Enviar Edital por E-mail
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "+1.200", label: "Licitações atendidas", icon: Award },
              { value: "27", label: "Estados cobertos", icon: Truck },
              { value: "+26", label: "Anos de mercado", icon: Factory },
              { value: "100%", label: "NF-e emitida", icon: FileText },
            ].map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl p-6 flex flex-col gap-3"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(220,38,38,0.15)" }}>
                  <Icon className="w-5 h-5 text-[#dc2626]" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 38, fontWeight: 900, color: "#ffffff", letterSpacing: "-1px", lineHeight: 1 }}>
                    {value}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Por que o Grupo Clemal ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#dc2626] mb-3">
              Credenciais e diferenciais
            </p>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(28px,3.5vw,42px)",
              fontWeight: 900,
              lineHeight: 1.05,
              color: "#111111",
              letterSpacing: "-0.5px",
            }}>
              Por que órgãos públicos escolhem o Grupo Clemal
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Factory,
                title: "Fabricante Direto",
                desc: "Produção 100% própria em Contagem/MG. Sem intermediários. Capacidade para grandes volumes com garantia de entrega dentro do prazo licitatório.",
              },
              {
                icon: FileText,
                title: "Documentação Completa",
                desc: "CNPJ ativo, certidões negativas, CNAE compatível, NF-e e NFS-e para pessoa jurídica. Atendemos todas as exigências editalícias.",
              },
              {
                icon: Award,
                title: "26 Anos de Tradição",
                desc: "Empresa consolidada no mercado nacional, com histórico comprovado de fornecimento para prefeituras, autarquias, concessionárias e órgãos federais.",
              },
              {
                icon: Shield,
                title: "Qualidade Garantida",
                desc: "Produtos com especificações técnicas detalhadas, amostras disponíveis para homologação prévia e controle de qualidade em cada lote produzido.",
              },
              {
                icon: Truck,
                title: "Entrega Nacional",
                desc: "Atendimento aos 27 estados brasileiros. Logística própria e parceiros homologados para cumprimento de cronogramas de entrega em contratos públicos.",
              },
              {
                icon: Users,
                title: "Atendimento Dedicado",
                desc: "Equipe especializada para orientação sobre especificações técnicas, adequação ao edital e suporte durante todo o processo licitatório.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-100 group-hover:bg-red-50 flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-6 h-6 text-gray-600 group-hover:text-[#dc2626] transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Produtos para licitação ── */}
      <section className="py-20 bg-[#fafafa]" style={{ borderTop: "1px solid #ececec", borderBottom: "1px solid #ececec" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#dc2626] mb-3">
                Catálogo para licitação
              </p>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(28px,3vw,40px)",
                fontWeight: 900,
                lineHeight: 1.05,
                color: "#111111",
                letterSpacing: "-0.5px",
                marginBottom: 16,
              }}>
                Produtos mais solicitados em processos licitatórios
              </h2>
              <p className="text-gray-500 leading-relaxed mb-7">
                Todos os nossos produtos podem ser fornecidos com especificações técnicas detalhadas, laudos de qualidade e amostras para homologação.
              </p>
              <div className="space-y-3">
                {[
                  "EPIs e acessórios de proteção",
                  "Bolsas e mochilas para equipes de campo",
                  "Malotes e portavalores com lacre",
                  "Capa para coletor de dados e impressoras de todas as marcas",
                  "Bainhas e porta-ferramentas",
                  "Bonés e chapéus corporativos",
                  "Projetos personalizados sob edital",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
                    <CheckCircle className="w-4 h-4 text-[#dc2626] flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7">
                <button
                  onClick={() => onNavigate("products")}
                  className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  Ver catálogo completo <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Process steps */}
            <div>
              <h3 className="font-bold text-gray-900 text-xl mb-6"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, letterSpacing: "-0.3px" }}>
                Como funciona o fornecimento
              </h3>
              <div className="space-y-0">
                {[
                  {
                    num: "01",
                    title: "Recebimento do Edital",
                    desc: "Envie o edital ou termo de referência. Nossa equipe analisa as especificações e verifica a compatibilidade com nossa linha de produção.",
                  },
                  {
                    num: "02",
                    title: "Proposta Técnica e Comercial",
                    desc: "Elaboramos proposta com especificações detalhadas, preços unitários e prazo de entrega, adequados às exigências do processo.",
                  },
                  {
                    num: "03",
                    title: "Amostras para Homologação",
                    desc: "Disponibilizamos amostras físicas para avaliação técnica prévia, garantindo conformidade antes da produção em escala.",
                  },
                  {
                    num: "04",
                    title: "Produção e Entrega",
                    desc: "Produção realizada na nossa fábrica em Contagem/MG com controle de qualidade e entrega dentro do prazo contratual.",
                  },
                ].map(({ num, title, desc }, i, arr) => (
                  <div key={num} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center flex-shrink-0 font-bold text-sm"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {num}
                      </div>
                      {i < arr.length - 1 && <div className="w-px flex-1 bg-gray-100 my-2" />}
                    </div>
                    <div className="pb-7">
                      <h4 className="font-bold text-gray-900 mb-1.5">{title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Grandes clientes ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#dc2626] mb-3">
              Histórico comprovado
            </p>
            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(28px,3.5vw,42px)",
              fontWeight: 900,
              color: "#111111",
              letterSpacing: "-0.5px",
            }}>
              Empresas e órgãos atendidos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              {
                org: "Correios",
                type: "Empresa Pública Federal",
                project: "Malotes de segurança e portavalores para agências em Minas Gerais",
                volume: "12.000 unidades/ano",
              },
              {
                org: "Cemig",
                type: "Companhia Estadual de Energia",
                project: "Capas protetoras para coletores de dados das equipes de campo",
                volume: "3.500 unidades/ano",
              },
              {
                org: "Copasa",
                type: "Companhia de Saneamento",
                project: "Bolsas e mochilas técnicas para operadores de campo",
                volume: "2.200 unidades/ano",
              },
            ].map(({ org, type, project, volume }) => (
              <div
                key={org}
                className="bg-[#fafafa] rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-[#111111] rounded-lg flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{org}</p>
                    <p className="text-xs text-gray-400">{type}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-snug mb-3">{project}</p>
                <div className="flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-[#dc2626]" />
                  <span className="text-xs font-semibold text-gray-500">{volume}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#dc2626] mb-4">
            Pronto para participar?
          </p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(32px,4vw,52px)",
            fontWeight: 900,
            lineHeight: 1.05,
            color: "#ffffff",
            letterSpacing: "-0.5px",
            marginBottom: 16,
          }}>
            Entre em contato com nossa equipe comercial
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10 max-w-xl mx-auto">
            Envie o edital, termo de referência ou entre em contato diretamente. Nossa equipe responde em até 24 horas com proposta técnica e comercial completa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/5531993270281?text=Olá! Gostaria de participar de uma cotação ou licitação."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, letterSpacing: "0.05em" }}
            >
              <MessageCircle className="w-5 h-5" />
              FALAR NO WHATSAPP
            </a>
            <a
              href="mailto:contato@grupoclemal.com.br?subject=Licitação — Solicitação de Proposta"
              className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 14 }}
            >
              <FileText className="w-5 h-5" />
              Enviar Edital por E-mail
            </a>
          </div>
          <p className="text-gray-600 text-xs mt-6">
            contato@grupoclemal.com.br · (31) 3395-5190 · (31) 99327-0281
          </p>
        </div>
      </section>
    </div>
  );
}
