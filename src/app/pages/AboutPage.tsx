import { Award, Users, Wrench, Truck, CheckCircle} from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#11111]">
      {/* Hero */}
      <div className="bg-[#111111] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-2">Nossa História</p>
            <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
              MAIS DE 26 ANOS FABRICANDO QUALIDADE
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Fundado em 1998, o Grupo Clemal se consolidou como referência nacional na fabricação de bolsas, malotes, capas protetoras e EPIs para empresas de todos os segmentos.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&auto=format"
              alt="Fábrica Grupo Clemal"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#d91f2a] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "26+", label: "Anos de Mercado" },
            { value: "5.000+", label: "Clientes Atendidos" },
            { value: "200+", label: "Produtos no Catálogo" },
            { value: "100%", label: "Fabricação Nacional" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-black" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{value}</p>
              <p className="text-red-100 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-12">
          <div>
            <h2 className="text-2xl font-black text-[#111111] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
              Quem Somos
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                O <strong className="text-[#111111]">Grupo Clemal</strong> é uma empresa mineira com sede em Contagem/MG, especializada na fabricação de artigos em couro, nylon, lona e outros materiais técnicos para o mercado corporativo.
              </p>
              <p>
                Com mais de 26 anos de experiência, atendemos empresas dos mais diversos setores: telecomunicações, energia elétrica, logística, serviços de campo, mineração e muito mais.
              </p>
              <p>
                Nossa missão é desenvolver soluções personalizadas que protejam os equipamentos e facilitem o trabalho das equipes de campo, sempre com materiais de alta qualidade e durabilidade comprovada.
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&auto=format"
              alt="Produtos Grupo Clemal"
              className="rounded-xl shadow-md"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-[#111111] mb-6 text-center" style={{ fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
            Nossos Valores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Award, title: "Qualidade", desc: "Matéria-prima selecionada e processos controlados em todas as etapas" },
              { icon: Users, title: "Compromisso", desc: "Parceria de longo prazo com nossos clientes e fornecedores" },
              { icon: Wrench, title: "Inovação", desc: "Desenvolvimento contínuo de novos produtos e soluções" },
              { icon: Truck, title: "Pontualidade", desc: "Cumprimento de prazos e excelência na entrega" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#e8edf7] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-[#111111]" />
                </div>
                <h3 className="font-bold text-[#111111] mb-1">{title}</h3>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications / Differentials */}
        <div className="bg-white rounded-xl border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-black text-[#111111] mb-6 text-center" style={{ fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
            Por Que Somos a Melhor Escolha
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Fábrica própria em Contagem/MG — produção 100% nacional",
              "Controle total de qualidade em todas as etapas",
              "Capacidade para projetos corporativos de grande escala",
              "Equipe técnica especializada em desenvolvimento de produtos",
              "Entrega para todo o território nacional",
              "Atendimento personalizado e suporte pós-venda",
              "Matéria-prima de fornecedores certificados",
              "Mais de 5.000 empresas atendidas em 26 anos",
            ].map(item => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#111111] rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            VAMOS TRABALHAR JUNTOS?
          </h2>
          <p className="text-gray-300 mb-6">Entre em contato com nossa equipe e descubra como podemos ajudar sua empresa.</p>
          <a
            href="https://wa.me/5531993270281?text=Olá! Gostaria de conhecer melhor o Grupo Clemal."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black px-8 py-3.5 rounded-lg transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Falar com Nossa Equipe
          </a>
        </div>
      </div>
    </div>
  );
}
