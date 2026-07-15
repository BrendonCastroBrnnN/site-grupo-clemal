import {
  Award,
  CheckCircle,
  MessageCircle,
  Package,
  Palette,
  Ruler,
  Send,
} from "lucide-react";
import { useState } from "react";
import { createInquiry } from "../services/inquiriesService";

const initialForm = {
  company: "",
  name: "",
  email: "",
  phone: "",
  product: "",
  quantity: "",
  description: "",
};

export function CustomPage() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const company = form.company.trim();
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const product = form.product.trim();
    const quantity = form.quantity.trim();
    const description = form.description.trim();

    if (
      !company ||
      !name ||
      !email ||
      !phone ||
      !product ||
      !description
    ) {
      setSubmitError(
        "Preencha todos os campos obrigatórios."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await createInquiry({
        type: "custom_project",
        company,
        name,
        email,
        phone,
        product,
        quantity,
        message: description,
      });

      setForm(initialForm);
      setSent(true);
    } catch (error) {
      console.error(
        "Erro ao enviar solicitação de projeto:",
        error
      );

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a solicitação. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleNewRequest() {
    setForm(initialForm);
    setSent(false);
    setSubmitError("");
  }

  const steps = [
    {
      icon: MessageCircle,
      title: "1. Briefing",
      desc: "Você nos conta sua necessidade, produto, quantidade e especificações.",
    },
    {
      icon: Ruler,
      title: "2. Desenvolvimento",
      desc: "Nossa equipe cria o projeto técnico e um protótipo para aprovação.",
    },
    {
      icon: Palette,
      title: "3. Aprovação",
      desc: "Você aprova o protótipo com cores, logos e especificações.",
    },
    {
      icon: Package,
      title: "4. Produção e entrega",
      desc: "Fabricamos com qualidade e entregamos no prazo acordado.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <div className="bg-[#111111] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#dc2626] font-bold uppercase tracking-widest text-sm mb-2">
            Serviço exclusivo
          </p>

          <h1
            className="text-4xl md:text-5xl font-black mb-4"
            style={{
              fontFamily:
                "'Barlow Condensed', sans-serif",
              textTransform: "uppercase",
            }}
          >
            Projetos Personalizados
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Desenvolvemos produtos sob medida para sua
            empresa. Do briefing à entrega, com qualidade e
            pontualidade.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {steps.map(
            ({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#111111]" />

                <div className="w-12 h-12 bg-[#f3f3f3] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-[#111111]" />
                </div>

                <h3 className="font-bold text-[#111111] mb-1 text-sm">
                  {title}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed">
                  {desc}
                </p>
              </div>
            )
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2
              className="text-2xl font-black text-[#111111] mb-4"
              style={{
                fontFamily:
                  "'Barlow Condensed', sans-serif",
                textTransform: "uppercase",
              }}
            >
              O que desenvolvemos
            </h2>

            <div className="space-y-3 mb-6">
              {[
                "Bolsas e mochilas corporativas com logo da empresa",
                "Malotes personalizados para instituições que buscam eficiência e segurança",
                "Capas protetoras para equipamentos específicos",
                "Bainhas e porta-ferramentas sob medida",
                "Bonés e chapéus corporativos bordados",
                "Embalagens e cases para produtos especiais",
                "Produtos em couro, nylon, lona ou materiais similares",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />

                  <span className="text-sm text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-[#111111]" />

                <p className="font-bold text-[#111111]">
                  Por que nos escolher?
                </p>
              </div>

              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Prazo de entrega definido conforme o projeto
                </li>

                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Amostras disponíveis para aprovação
                </li>

                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Condições especiais para grandes volumes
                </li>

                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  Emissão de nota fiscal para pessoa jurídica
                </li>
              </ul>
            </div>

            <div className="mt-4 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop&auto=format"
                alt="Produção personalizada"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>

          <div>
            {sent ? (
              <div className="bg-white rounded-xl border border-gray-100 p-10 text-center flex flex-col items-center justify-center min-h-[540px]">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>

                <h3 className="text-xl font-black text-[#111111] mb-2">
                  Solicitação enviada!
                </h3>

                <p className="text-gray-500 mb-6">
                  Sua solicitação foi registrada. Nossa equipe
                  entrará em contato para analisar o projeto.
                </p>

                <button
                  type="button"
                  onClick={handleNewRequest}
                  className="text-[#d91f2a] font-medium hover:underline"
                >
                  Enviar nova solicitação
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl border border-gray-100 p-6"
              >
                <h2 className="font-black text-[#111111] text-xl mb-5">
                  Solicitar orçamento
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        name: "company",
                        label: "Empresa",
                        type: "text",
                      },
                      {
                        name: "name",
                        label: "Seu nome",
                        type: "text",
                      },
                      {
                        name: "email",
                        label: "E-mail",
                        type: "email",
                      },
                      {
                        name: "phone",
                        label: "WhatsApp",
                        type: "tel",
                      },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          {field.label}
                        </label>

                        <input
                          type={field.type}
                          required
                          value={
                            form[
                              field.name as keyof typeof form
                            ]
                          }
                          onChange={(event) =>
                            setForm((current) => ({
                              ...current,
                              [field.name]:
                                event.target.value,
                            }))
                          }
                          disabled={isSubmitting}
                          className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#111111] disabled:opacity-60"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Produto desejado
                      </label>

                      <input
                        type="text"
                        required
                        value={form.product}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            product: event.target.value,
                          }))
                        }
                        disabled={isSubmitting}
                        placeholder="Ex.: Bolsa para técnico"
                        className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#111111] disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Quantidade
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={form.quantity}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            quantity: event.target.value,
                          }))
                        }
                        disabled={isSubmitting}
                        placeholder="Ex.: 100"
                        className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#111111] disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Descrição do projeto
                    </label>

                    <textarea
                      required
                      rows={5}
                      value={form.description}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          description: event.target.value,
                        }))
                      }
                      disabled={isSubmitting}
                      placeholder="Descreva as especificações, materiais desejados, cores, logo, dimensões e aplicação."
                      className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#111111] resize-none disabled:opacity-60"
                    />
                  </div>

                  {submitError && (
                    <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                      <p className="text-sm text-red-600">
                        {submitError}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-[#111111] hover:bg-[#262626] text-white font-black py-3 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />

                      {isSubmitting
                        ? "Enviando..."
                        : "Enviar solicitação"}
                    </button>

                    <a
                      href="https://wa.me/5531993270281?text=Olá! Gostaria de solicitar um projeto personalizado."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-3 rounded-md transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
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