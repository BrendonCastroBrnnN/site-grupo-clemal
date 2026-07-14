import {
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { createInquiry } from "../services/inquiriesService";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !phone || !subject || !message) {
      setSubmitError("Preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await createInquiry({
        type: "contact",
        name,
        email,
        phone,
        subject,
        message,
      });

      setForm(initialForm);
      setSent(true);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a mensagem. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleNewMessage() {
    setSent(false);
    setSubmitError("");
    setForm(initialForm);
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <div className="bg-[#111111] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1
            className="text-4xl font-black mb-2"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              textTransform: "uppercase",
            }}
          >
            Entre em Contato
          </h1>

          <p className="text-gray-300">
            Estamos prontos para atender você!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                lines: [
                  "Rua Acácias, 2338",
                  "Eldorado – Contagem/MG",
                  "CEP 32310-370",
                ],
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
              <a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-white rounded-md border border-gray-100 p-4 flex items-start gap-3 hover:shadow-md hover:border-[#111111] transition-all"
              >
                <div className="w-10 h-10 bg-[#f3f3f3] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>

                <div>
                  <p className="font-bold text-gray-800 text-sm">
                    {title}
                  </p>

                  {lines.map((line) => (
                    <p
                      key={line}
                      className="text-sm text-gray-500"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className="lg:col-span-2">
            {sent ? (
              <div className="bg-white rounded-xl border border-gray-100 p-10 text-center min-h-[430px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>

                <h3 className="text-xl font-black text-[#111111] mb-2">
                  Mensagem enviada!
                </h3>

                <p className="text-gray-500 mb-6">
                  Sua mensagem foi registrada. Nossa equipe entrará em contato.
                </p>

                <button
                  type="button"
                  onClick={handleNewMessage}
                  className="text-[#d91f2a] font-medium hover:underline"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-xl border border-gray-100 p-6"
              >
                <h2 className="font-black text-[#111111] text-xl mb-5">
                  Envie uma Mensagem
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    {
                      name: "name",
                      label: "Nome Completo",
                      type: "text",
                    },
                    {
                      name: "email",
                      label: "E-mail",
                      type: "email",
                    },
                    {
                      name: "phone",
                      label: "Telefone / WhatsApp",
                      type: "tel",
                    },
                    {
                      name: "subject",
                      label: "Assunto",
                      type: "text",
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        {field.label}
                      </label>

                      <input
                        type={field.type}
                        required={
                          field.name === "name" ||
                          field.name === "email" ||
                          field.name === "phone" ||
                          field.name === "subject"
                        }
                        value={form[field.name as keyof typeof form]}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            [field.name]: event.target.value,
                          }))
                        }
                        disabled={isSubmitting}
                        className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] disabled:opacity-60"
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Mensagem
                  </label>

                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    disabled={isSubmitting}
                    placeholder="Descreva seu projeto, dúvida ou pedido de orçamento..."
                    className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] resize-none disabled:opacity-60"
                  />
                </div>

                {submitError && (
                  <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
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
                      : "Enviar Mensagem"}
                  </button>

                  <a
                    href="https://wa.me/5531993270281?text=Olá! Gostaria de entrar em contato com o Grupo Clemal."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-md transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </form>
            )}

            <div
              id="map"
              className="mt-4 bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.2!2d-44.05!3d-19.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDU1JzQ4LjAiUyA0NMKwMDMnMDAuMCJX!5e0!3m2!1spt!2sbr!4v1"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Mapa Grupo Clemal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}