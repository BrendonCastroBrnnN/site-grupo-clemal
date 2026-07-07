import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#11111]">
      <div className="bg-[#111111] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}>
            Entre em Contato
          </h1>
          <p className="text-gray-300">Estamos prontos para atender você!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            {[
              {
                icon: Phone,
                title: "Telefone",
                lines: ["(31) 3395-5190"],
                href: "tel:3133955190",
                color: "text-[#111111]",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp",
                lines: ["(31) 99327-0281", "Atendimento rápido!"],
                href: "https://wa.me/5531993270281",
                color: "text-green-600",
              },
              {
                icon: Mail,
                title: "E-mail",
                lines: ["contato@grupoclemal.com.br"],
                href: "mailto:contato@grupoclemal.com.br",
                color: "text-[#d91f2a]",
              },
              {
                icon: MapPin,
                title: "Endereço",
                lines: ["Rua Acácias, 2338", "Eldorado – Contagem/MG", "CEP 32310-370"],
                href: "#map",
                color: "text-[#111111]",
              },
              {
                icon: Clock,
                title: "Horário de Atendimento",
                lines: ["Seg–Sex: 08h às 18h", "Sáb: 08h às 12h"],
                href: "#",
                color: "text-[#f59e0b]",
              },
            ].map(({ icon: Icon, title, lines, href, color }) => (
              <a key={title} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                className="bg-white rounded-md border border-gray-100 p-4 flex items-start gap-3 hover:shadow-md hover:border-[#111111] transition-all">
                <div className="w-10 h-10 bg-[#e8edf7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{title}</p>
                  {lines.map((l, i) => (
                    <p key={i} className="text-sm text-gray-500">{l}</p>
                  ))}
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="bg-white rounded-xl border border-gray-100 p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-black text-[#111111] mb-2">Mensagem Enviada!</h3>
                <p className="text-gray-500 mb-6">Obrigado pelo contato. Retornaremos em até 24 horas.</p>
                <button onClick={() => setSent(false)} className="text-[#d91f2a] font-medium hover:underline">
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-black text-[#111111] text-xl mb-5">Envie uma Mensagem</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { name: "name", label: "Nome Completo", type: "text" },
                    { name: "email", label: "E-mail", type: "email" },
                    { name: "phone", label: "Telefone / WhatsApp", type: "tel" },
                    { name: "subject", label: "Assunto", type: "text" },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                      <input type={f.type} required value={form[f.name as keyof typeof form]}
                        onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                        className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]" />
                    </div>
                  ))}
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mensagem</label>
                  <textarea required rows={5} value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Descreva seu projeto, dúvida ou pedido de orçamento..."
                    className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] resize-none" />
                </div>
                <div className="flex gap-3">
                  <button type="submit"
                    className="flex-1 bg-[#111111] hover:bg-[#262626] text-white font-black py-3 rounded-md transition-colors flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Enviar Mensagem
                  </button>
                  <a href="https://wa.me/5531993270281?text=Olá! Gostaria de entrar em contato com o Grupo Clemal."
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-md transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </form>
            )}

            {/* Map */}
            <div className="mt-4 bg-white rounded-xl border border-gray-100 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.2!2d-44.05!3d-19.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU1JzQ4LjAiUyA0NMKwMDMnMDAuMCJX!5e0!3m2!1spt!2sbr!4v1"
                width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" title="Mapa Grupo Clemal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
