import {
  Building2,
  CalendarDays,
  Mail,
  MessageSquareText,
  Package,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  deleteInquiry,
  getAllInquiries,
  updateInquiryStatus,
  type Inquiry,
  type InquiryStatus,
} from "../../services/inquiriesService";

const statusOptions: {
  value: InquiryStatus;
  label: string;
}[] = [
  { value: "new", label: "Nova" },
  { value: "in_progress", label: "Em atendimento" },
  { value: "completed", label: "Concluída" },
  { value: "archived", label: "Arquivada" },
];

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
}

function getStatusClasses(status: InquiryStatus): string {
  switch (status) {
    case "new":
      return "bg-red-50 text-red-600 border-red-100";

    case "in_progress":
      return "bg-amber-50 text-amber-700 border-amber-100";

    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";

    case "archived":
      return "bg-gray-100 text-gray-600 border-gray-200";

    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
}

export function AdminInquiriesSection() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionInquiryId, setActionInquiryId] = useState<string | null>(null);
  const [loadError, setLoadError] = useState("");

  async function loadInquiries() {
    setIsLoading(true);
    setLoadError("");

    try {
      const loadedInquiries = await getAllInquiries();
      setInquiries(loadedInquiries);
    } catch (error) {
      console.error("Erro ao carregar solicitações:", error);

      setInquiries([]);
      setLoadError(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as solicitações."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  async function handleStatusChange(
    inquiryId: string,
    status: InquiryStatus
  ) {
    setActionInquiryId(inquiryId);

    try {
      const updatedInquiry = await updateInquiryStatus(
        inquiryId,
        status
      );

      setInquiries((current) =>
        current.map((inquiry) =>
          inquiry.id === inquiryId
            ? updatedInquiry
            : inquiry
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar solicitação:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar a solicitação."
      );
    } finally {
      setActionInquiryId(null);
    }
  }

  async function handleDeleteInquiry(inquiryId: string) {
    const confirmed = window.confirm(
      "Deseja realmente excluir esta solicitação?"
    );

    if (!confirmed) return;

    setActionInquiryId(inquiryId);

    try {
      await deleteInquiry(inquiryId);

      setInquiries((current) =>
        current.filter((inquiry) => inquiry.id !== inquiryId)
      );
    } catch (error) {
      console.error("Erro ao excluir solicitação:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Não foi possível excluir a solicitação."
      );
    } finally {
      setActionInquiryId(null);
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-8">
        <p className="text-sm text-gray-500">
          Carregando solicitações...
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="bg-red-50 rounded-3xl border border-red-100 p-8">
        <p className="text-sm text-red-600">
          {loadError}
        </p>

        <button
          type="button"
          onClick={() => void loadInquiries()}
          className="mt-4 rounded-xl bg-[#111111] px-4 py-2 text-sm font-semibold text-white"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-gray-100 p-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center justify-center">
            <MessageSquareText className="w-5 h-5 text-[#dc2626]" />
          </div>

          <div>
            <h2 className="font-bold text-gray-900">
              Solicitações recebidas
            </h2>

            <p className="text-sm text-gray-500">
              Contatos e pedidos de projetos enviados pelo site.
            </p>
          </div>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center">
          <MessageSquareText className="w-10 h-10 text-gray-300 mx-auto mb-4" />

          <h3 className="font-bold text-gray-900 mb-2">
            Nenhuma solicitação recebida
          </h3>

          <p className="text-sm text-gray-500">
            As mensagens enviadas pelos formulários aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => {
            const isActionLoading =
              actionInquiryId === inquiry.id;

            return (
              <article
                key={inquiry.id}
                className="bg-white rounded-3xl border border-gray-100 p-6"
              >
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#dc2626]">
                        {inquiry.type === "contact"
                          ? "Contato"
                          : "Projeto personalizado"}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          inquiry.status
                        )}`}
                      >
                        {
                          statusOptions.find(
                            (status) =>
                              status.value === inquiry.status
                          )?.label
                        }
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900">
                      {inquiry.subject ||
                        inquiry.product ||
                        "Solicitação sem título"}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      Recebida em {formatDate(inquiry.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={inquiry.status}
                      disabled={isActionLoading}
                      onChange={(event) =>
                        void handleStatusChange(
                          inquiry.id,
                          event.target.value as InquiryStatus
                        )
                      }
                      className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#dc2626] disabled:opacity-60"
                    >
                      {statusOptions.map((status) => (
                        <option
                          key={status.value}
                          value={status.value}
                        >
                          {status.label}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      disabled={isActionLoading}
                      onClick={() =>
                        void handleDeleteInquiry(inquiry.id)
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 hover:border-red-200 hover:text-red-600 transition-colors disabled:opacity-60"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-gray-400 mt-0.5" />

                    <div>
                      <p className="text-xs text-gray-400">
                        Nome
                      </p>

                      <p className="text-sm font-semibold text-gray-800">
                        {inquiry.name}
                      </p>
                    </div>
                  </div>

                  {inquiry.company && (
                    <div className="flex items-start gap-3">
                      <Building2 className="w-4 h-4 text-gray-400 mt-0.5" />

                      <div>
                        <p className="text-xs text-gray-400">
                          Empresa
                        </p>

                        <p className="text-sm font-semibold text-gray-800">
                          {inquiry.company}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gray-400 mt-0.5" />

                    <div>
                      <p className="text-xs text-gray-400">
                        E-mail
                      </p>

                      <a
                        href={`mailto:${inquiry.email}`}
                        className="text-sm font-semibold text-gray-800 hover:text-[#dc2626]"
                      >
                        {inquiry.email}
                      </a>
                    </div>
                  </div>

                  {inquiry.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-gray-400 mt-0.5" />

                      <div>
                        <p className="text-xs text-gray-400">
                          Telefone / WhatsApp
                        </p>

                        <p className="text-sm font-semibold text-gray-800">
                          {inquiry.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  {inquiry.product && (
                    <div className="flex items-start gap-3">
                      <Package className="w-4 h-4 text-gray-400 mt-0.5" />

                      <div>
                        <p className="text-xs text-gray-400">
                          Produto
                        </p>

                        <p className="text-sm font-semibold text-gray-800">
                          {inquiry.product}
                        </p>
                      </div>
                    </div>
                  )}

                  {inquiry.quantity && (
                    <div className="flex items-start gap-3">
                      <Package className="w-4 h-4 text-gray-400 mt-0.5" />

                      <div>
                        <p className="text-xs text-gray-400">
                          Quantidade
                        </p>

                        <p className="text-sm font-semibold text-gray-800">
                          {inquiry.quantity}
                        </p>
                      </div>
                    </div>
                  )}

                  {inquiry.deadline && (
                    <div className="flex items-start gap-3">
                      <CalendarDays className="w-4 h-4 text-gray-400 mt-0.5" />

                      <div>
                        <p className="text-xs text-gray-400">
                          Prazo
                        </p>

                        <p className="text-sm font-semibold text-gray-800">
                          {inquiry.deadline}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 rounded-2xl border border-gray-100 bg-[#fafafa] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Mensagem
                  </p>

                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {inquiry.message}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}