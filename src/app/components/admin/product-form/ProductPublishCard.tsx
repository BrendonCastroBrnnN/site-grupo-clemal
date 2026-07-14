import { Save } from "lucide-react";

interface ProductPublishCardProps {
  isEditing: boolean;
  isBusy?: boolean;
  onCancelEdit?: () => void;
}

export function ProductPublishCard({
  isEditing,
  isBusy = false,
  onCancelEdit,
}: ProductPublishCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6">
      <h2 className="font-bold text-gray-900 mb-2">Publicação</h2>

      <p className="text-sm text-gray-500 leading-relaxed mb-5">
        Ao salvar, o produto ficará disponível para aparecer no catálogo conforme a categoria
        selecionada.
      </p>

      {isEditing && (
        <button
          type="button"
          onClick={onCancelEdit}
          disabled={isBusy}
          className="w-full mb-3 inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:border-gray-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Cancelar edição
        </button>
      )}

      <button
        type="submit"
        disabled={isBusy}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Save className="w-5 h-5" />

        {isBusy
          ? "Aguarde..."
          : isEditing
            ? "Atualizar produto"
            : "Salvar produto"}
      </button>
    </div>
  );
}
