import { useState } from "react";
import {
  MessageCircle, ArrowRight, Award, CheckCircle,
  Package, Users, Factory, Layers, Wrench, Zap,
  Shield, Truck, Plus, Minus, Star
} from "lucide-react";
const categories: any[] = [];
const testimonials: any[] = [];
const clientLogos: any[] = [];

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

/* ── Reusable section heading ── */
function SectionHeading({
  eyebrow, title, subtitle, center = false,
}: {
  eyebrow?: string; title: string; subtitle?: string; center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <p
          className="text-xs font-semibold tracking-[0.18em] uppercase text-[#dc2626] mb-3"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {eyebrow}
        </p>
      )}
      <h2 style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "clamp(28px,3.5vw,42px)",
        fontWeight: 900,
        lineHeight: 1.05,
        letterSpacing: "-0.5px",
        color: "#111111",
      }}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-gray-500 text-base leading-relaxed max-w-xl"
          style={{ fontFamily: "'Inter', sans-serif", marginTop: center ? "12px" : undefined }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ── Stat card ── */
function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-8 px-4">
      <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
      <div>
        <p style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 40,
          fontWeight: 900,
          lineHeight: 1,
          color: "#111111",
          letterSpacing: "-1px",
        }}>
          {value}
        </p>
        <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</p>
      </div>
    </div>
  );
}

/* ── FAQ item ── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className="text-base font-semibold text-gray-900 group-hover:text-[#dc2626] transition-colors"
          style={{ fontFamily: "'Inter', sans-serif" }}>
          {q}
        </span>
        <span className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${open ? "bg-[#dc2626] border-[#dc2626]" : "border-gray-200 group-hover:border-[#dc2626]"}`}>
          {open ? <Minus className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-gray-500 group-hover:text-[#dc2626]" />}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          {a}
        </p>
      )}
    </div>
  );
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── 1. HERO ── */}
      <section className="bg-[#fafafa]" style={{ borderBottom: "1px solid #ececec" }}>
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(36px,4.5vw,62px)",
              fontWeight: 900,
              lineHeight: 1.03,
              letterSpacing: "-1px",
              color: "#111111",
            }}>
              Há mais de 26 anos fabricando soluções profissionais para empresas de todo o Brasil.
            </h1>

            <p className="mt-5 text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              EPIs, bolsas, malotes, capas e produtos personalizados com qualidade industrial e durabilidade comprovada para empresas privadas e órgãos públicos.
            </p>

            {/* Bullets */}
            <div className="grid grid-cols-2 gap-2.5 mb-9">
              {[
                "Produção própria", "Projetos personalizados",
                "Alta durabilidade", "Qualidade industrial",
                "Atendimento especializado", "Entrega nacional",
              ].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#dc2626] flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate("products")}
                className="flex items-center gap-2 bg-[#111111] hover:bg-[#dc2626] text-white font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-md"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, letterSpacing: "0.05em" }}
              >
                <Package className="w-5 h-5" />
                PRODUTOS
              </button>
              <a
                href="https://wa.me/5531975458090?text=Olá! Gostaria de solicitar um orçamento."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-md"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, letterSpacing: "0.05em" }}
              >
                <MessageCircle className="w-5 h-5" />
                SOLICITAR ORÇAMENTO
              </a>
            </div>
          </div>

          {/* Right — image mosaic */}
          <div className="relative hidden md:block">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden" style={{ height: 290 }}>
                <img
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=580&fit=crop&auto=format"
                  alt="Bolsas profissionais Grupo Clemal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 mt-8">
                <div className="rounded-2xl overflow-hidden flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=220&fit=crop&auto=format"
                    alt="EPIs Grupo Clemal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1590664216379-9af6f139e66e?w=500&h=220&fit=crop&auto=format"
                    alt="Malotes Grupo Clemal"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Badge */}
            <div
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-4 border border-gray-100"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
            >
              <p className="text-xs text-gray-400 mb-1">Confiança dos nossos clientes</p>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <span className="font-black text-gray-900"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20 }}>4.9</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">+5.000 projetos entregues</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CLIENT LOGOS ── */}
      <section className="py-10" style={{ borderBottom: "1px solid #ececec" }}>
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-semibold tracking-[0.18em] uppercase text-gray-400 mb-7">
            Empresas e órgãos que confiam no Grupo Clemal
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {clientLogos.map(c => (
              <div key={c.id} className="text-gray-300 hover:text-gray-500 transition-colors duration-200">
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "0.05em" }}>
                  {c.logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. STATS ── */}
      <section className="bg-[#fafafa]" style={{ borderBottom: "1px solid #ececec" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-gray-100">
            <StatCard value="+26" label="Anos de mercado" icon={Award} />
            <StatCard value="+5k" label="Empresas atendidas" icon={Users} />
            <StatCard value="+200" label="Produtos fabricados" icon={Package} />
            <StatCard value="100%" label="Produção própria" icon={Factory} />
            <StatCard value="27" label="Estados atendidos" icon={Truck} />
          </div>
        </div>
      </section>

      {/* ── 4. CATEGORIES ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading
              eyebrow="Explore o catálogo"
              title="Linhas de Produtos"
              subtitle="Soluções industriais para cada segmento de mercado, com desenvolvimento personalizado sob demanda."
            />
            <button
              onClick={() => onNavigate("products")}
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#dc2626] transition-colors mb-12"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Ver catálogo completo <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.slice(0, 6).map(cat => (
              <button
                key={cat.id}
                onClick={() => onNavigate("products", { category: cat.slug })}
                className="group relative rounded-2xl overflow-hidden text-left"
                style={{ height: 220 }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-bold leading-snug"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800 }}>
                    {cat.name}
                  </p>
                  {cat.productCount > 0 && (
                    <p className="text-white/50 text-xs mt-0.5">{cat.productCount} produtos</p>
                  )}
                  <div className="flex items-center gap-1 mt-3 text-white/70 text-xs font-medium group-hover:text-white transition-colors">
                    Ver linha <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-7">
            <button
              onClick={() => onNavigate("products")}
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-700 font-semibold px-7 py-3 rounded-xl transition-colors duration-200 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Ver catálogo completo <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 5. MANUFACTURING ── */}
      <section className="py-20 bg-[#fafafa]" style={{ borderTop: "1px solid #ececec", borderBottom: "1px solid #ececec" }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow="Nossa estrutura"
              title="Fabricação própria com controle total de qualidade"
              subtitle="Toda a produção acontece na nossa unidade em Contagem/MG, com equipe especializada, maquinário moderno e rigoroso controle em cada etapa."
            />
            <div className="space-y-5">
              {[
                { icon: Factory, title: "Fábrica Própria", desc: "12.000 m² de área produtiva em Contagem, Minas Gerais" },
                { icon: Wrench, title: "Equipe Especializada", desc: "Mais de 80 profissionais treinados com anos de experiência" },
                { icon: Shield, title: "Controle de Qualidade", desc: "Inspeção em todas as etapas, do corte ao acabamento final" },
                { icon: Layers, title: "Matéria-Prima Certificada", desc: "Nylon 1000D, couro legítimo, lona reforçada e materiais premium" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-0.5">{title}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button
                onClick={() => onNavigate("about")}
                className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Conheça a empresa <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&auto=format",
              "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&auto=format",
              "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop&auto=format",
              "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&auto=format",
            ].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-video bg-gray-100">
                <img src={src} alt="Fábrica Grupo Clemal" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CUSTOM PROJECTS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#111111] rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#dc2626] mb-4">
                  Serviço exclusivo
                </p>
                <h2 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(30px,3.5vw,50px)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: "#ffffff",
                  letterSpacing: "-0.5px",
                }}>
                  Fabricamos produtos sob medida para a sua empresa
                </h2>
                <p className="mt-4 text-gray-400 leading-relaxed mb-8">
                  Do briefing à entrega. Desenvolvemos soluções com a identidade visual da sua marca, nas especificações que seu segmento exige. Empresas privadas e órgãos públicos.
                </p>
                <div className="flex flex-col gap-2 mb-8">
                  {[
                    "Logotipo bordado ou serigrafado",
                    "Tecidos e cores personalizados",
                    "Protótipo para aprovação",
                    "Atende licitações públicas",
                    "NF-e para pessoa jurídica",
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#dc2626] flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => onNavigate("custom")}
                    className="flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-7 py-3.5 rounded-xl transition-colors duration-200"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, letterSpacing: "0.05em" }}
                  >
                    PROJETOS PERSONALIZADOS
                  </button>
                  <a
                    href="https://wa.me/5531975458090?text=Olá! Quero um projeto personalizado."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: 14 }}
                  >
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
              <div className="hidden md:block relative">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format"
                  alt="Projetos Personalizados"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#111111] to-transparent" style={{ width: "40%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. DIFERENCIAIS ── */}
      <section className="py-20 bg-[#fafafa]" style={{ borderTop: "1px solid #ececec", borderBottom: "1px solid #ececec" }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Por que escolher o Grupo Clemal"
            title="Nossos Diferenciais"
            center
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { icon: Factory, title: "Produção Própria", desc: "Fabricamos tudo internamente — controle total de qualidade e prazo." },
              { icon: Award, title: "26 Anos de Experiência", desc: "Tradição e confiança construídas ao longo de mais de duas décadas." },
              { icon: Shield, title: "Qualidade Garantida", desc: "Matéria-prima premium e inspeção rigorosa em cada peça." },
              { icon: Truck, title: "Entrega Nacional", desc: "Atendimento a todos os estados com pontualidade comprovada." },
              { icon: Users, title: "Atendimento Especializado", desc: "Consultores dedicados para entender cada necessidade." },
              { icon: Zap, title: "Soluções Personalizadas", desc: "Desenvolvemos produtos exclusivos para sua empresa ou órgão." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-2xl bg-gray-100 group-hover:bg-red-50 flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-5 h-5 text-gray-600 group-hover:text-[#dc2626] transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CASES ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Projetos realizados"
            title="Cases de Sucesso"
            subtitle="Projetos desenvolvidos para grandes empresas e órgãos públicos em todo o Brasil."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                company: "Vivo Telecom",
                project: "5.000 bolsas técnicas personalizadas para equipe de campo",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&auto=format",
                tag: "Bolsas Corporativas",
              },
              {
                company: "Correios — MG",
                project: "Malotes de segurança com lacre numerado para 180 agências",
                image: "https://images.unsplash.com/photo-1590664216379-9af6f139e66e?w=600&h=400&fit=crop&auto=format",
                tag: "Malotes",
              },
              {
                company: "Cemig Distribuição",
                project: "Capas protetoras para coletores de dados das equipes de campo",
                image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&h=400&fit=crop&auto=format",
                tag: "Capas para Coletores",
              },
            ].map(({ company, project, image, tag }) => (
              <div key={company} className="group relative rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt={company}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                    {tag}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">{company}</p>
                  <p className="text-white text-sm font-medium leading-snug">{project}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate("custom")}
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-700 font-semibold px-7 py-3 rounded-xl transition-colors duration-200 text-sm"
            >
              Ver todos os projetos <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── 9. DEPOIMENTOS ── */}
      <section className="py-20 bg-[#fafafa]" style={{ borderTop: "1px solid #ececec", borderBottom: "1px solid #ececec" }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="O que dizem nossos clientes" title="Depoimentos" center />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map(t => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover bg-gray-100" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-[#dc2626]">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. LICITAÇÕES TEASER ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#fafafa] rounded-3xl border border-gray-100 p-10 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#dc2626] mb-4">
                Setor público
              </p>
              <h2 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(28px,3vw,44px)",
                fontWeight: 900,
                lineHeight: 1.05,
                color: "#111111",
                letterSpacing: "-0.5px",
              }}>
                Fornecemos para órgãos públicos e participamos de licitações em todo o Brasil
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed mb-7">
                Estrutura homologada, nota fiscal eletrônica, capacidade produtiva comprovada e histórico de fornecimento para prefeituras, autarquias e empresas estatais.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate("licitacoes")}
                  className="flex items-center gap-2 bg-[#111111] hover:bg-[#dc2626] text-white font-bold px-7 py-3.5 rounded-xl transition-colors duration-200"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, letterSpacing: "0.05em" }}
                >
                  PARTICIPAR DE UMA COTAÇÃO
                </button>
                <a
                  href="https://wa.me/5531975458090?text=Olá! Gostaria de informações sobre fornecimento para licitação."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-700 font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 14 }}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  Falar com especialista
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "+1.200", label: "Licitações atendidas" },
                { value: "27", label: "Estados cobertos" },
                { value: "100%", label: "NF-e emitida" },
                { value: "+26", label: "Anos de mercado" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 text-center">
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 34, fontWeight: 900, color: "#111111", letterSpacing: "-0.5px", lineHeight: 1 }}>
                    {value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. CTA DUPLO ── */}
      <section className="py-20 bg-[#fafafa]" style={{ borderTop: "1px solid #ececec" }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* WhatsApp */}
          <div className="bg-[#111111] rounded-3xl p-10 flex flex-col justify-between" style={{ minHeight: 220 }}>
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-emerald-400 mb-3">Atendimento direto</p>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 900, color: "#ffffff", lineHeight: 1.1 }}>
                Fale com um especialista agora mesmo
              </h3>
              <p className="text-gray-400 text-sm mt-2">Orçamentos, projetos e dúvidas técnicas em minutos.</p>
            </div>
            <a
              href="https://wa.me/5531975458090?text=Olá! Gostaria de falar com um especialista do Grupo Clemal."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 mt-7 self-start"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, letterSpacing: "0.04em" }}
            >
              <MessageCircle className="w-5 h-5" />
              FALE COM UM ESPECIALISTA
            </a>
          </div>

          {/* Map */}
          <div className="rounded-3xl overflow-hidden border border-gray-100" style={{ minHeight: 220 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.2!2d-44.05!3d-19.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU1JzQ4LjAiUyA0NMKwMDMnMDAuMCJX!5e0!3m2!1spt!2sbr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 220 }}
              allowFullScreen
              loading="lazy"
              title="Localização Grupo Clemal — Contagem/MG"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
