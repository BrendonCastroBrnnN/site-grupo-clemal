import { useState } from "react";
import { CheckCircle, MessageCircle, Send, Ruler, Palette, Package, Award } from "lucide-react";

export function CustomPage() {
  const [form, setForm] = useState({
    company: "", name: "", email: "", phone: "",
    product: "", quantity: "", deadline: "", description: ""
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const steps = [
    { icon: MessageCircle, title: "1. Briefing", desc: "Você nos conta sua necessidade, produto, quantidade e prazo." },
    { icon: Ruler, title: "2. Desenvolvimento", desc: "Nossa equipe cria o projeto técnico e um protótipo para aprovação." },
    { icon: Palette, title: "3. Aprovação", desc: "Você aprova o protótipo com cores, logos e especificações." },
    { icon: Package, title: "4. Produção e Entrega", desc: "Fabricamos com qualidade e entregamos no prazo acordado." },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#081848] to-[#0d2461] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-2">Serviço Exclusivo</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
            Projetos Personalizados
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Desenvolvemos produtos sob medida para sua empresa. Do briefing à entrega, com qualidade e pontualidade garantidas.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {steps.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#0d2461]" />
              <div className="w-12 h-12 bg-[#e8edf7] rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-[#0d2461]" />
              </div>
              <h3 className="font-bold text-[#0d2461] mb-1 text-sm">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* What we do */}
          <div>
            <h2 className="text-2xl font-black text-[#0d2461] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
              O Que Desenvolvemos
            </h2>
            <div className="space-y-3 mb-6">
              {[
                "Bolsas e mochilas corporativas com logo da empresa",
                "Malotes personalizados para bancos e transportadoras",
                "Capas protetoras para equipamentos específicos",
                "Bainhas e porta-ferramentas sob medida",
                "Uniformes e acessórios para equipes de campo",
                "Bonés e chapéus corporativos bordados",
                "Embalagens e cases para produtos especiais",
                "Qualquer produto em couro, nylon, lona ou similar",
              ].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#e8edf7] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-[#0d2461]" />
                <p className="font-bold text-[#0d2461]">Por que nos escolher?</p>
              </div>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li>✓ Pedido mínimo a partir de 50 unidades</li>
                <li>✓ Prazo de entrega a combinar</li>
                <li>✓ Amostras disponíveis para aprovação</li>
                <li>✓ Preço especial para grandes volumes</li>
                <li>✓ NF-e inclusa para pessoa jurídica</li>
              </ul>
            </div>

            <div className="mt-4 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop&auto=format"
                alt="Produção Personalizada"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="bg-white rounded-xl border border-gray-100 p-10 text-center flex flex-col items-center justify-center h-full">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-black text-[#0d2461] mb-2">Solicitação Enviada!</h3>
                <p className="text-gray-500 mb-6">Nossa equipe entrará em contato em até 24 horas com uma proposta personalizada.</p>
                <button onClick={() => setSent(false)} className="text-[#d91f2a] font-medium hover:underline">
                  Enviar nova solicitação
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-black text-[#0d2461] text-xl mb-5">Solicitar Orçamento</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "company", label: "Empresa", type: "text" },
                      { name: "name", label: "Seu Nome", type: "text" },
                      { name: "email", label: "E-mail", type: "email" },
                      { name: "phone", label: "WhatsApp", type: "tel" },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                        <input type={f.type} required value={form[f.name as keyof typeof form]}
                          onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#0d2461]" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Produto desejado</label>
                      <input type="text" value={form.product}
                        onChange={e => setForm(p => ({ ...p, product: e.target.value }))}
                        placeholder="Ex: Bolsa para técnico"
                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#0d2461]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Quantidade</label>
                      <input type="number" min="1" value={form.quantity}
                        onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))}
                        placeholder="Ex: 100 unidades"
                        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#0d2461]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição do Projeto</label>
                    <textarea rows={4} value={form.description}
                      onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                      placeholder="Descreva as especificações, materiais desejados, cores, logo, dimensões..."
                      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-[#0d2461] resize-none" />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit"
                      className="flex-1 bg-[#0d2461] hover:bg-[#081848] text-white font-black py-3 rounded-md transition-colors flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Enviar Solicitação
                    </button>
                    <a href="https://wa.me/5531975458090?text=Olá! Gostaria de solicitar um projeto personalizado."
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-3 rounded-md transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
