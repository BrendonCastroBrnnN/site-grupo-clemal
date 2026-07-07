interface ProductFeaturesProps {
  features: string[];
  featureText: string;
  onFeatureTextChange: (value: string) => void;
  onAddFeature: () => void;
  onRemoveFeature: (index: number) => void;
}

export function ProductFeatures({
  features,
  featureText,
  onFeatureTextChange,
  onAddFeature,
  onRemoveFeature,
}: ProductFeaturesProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Especificações
      </label>

      <div className="flex gap-2">
        <input
          value={featureText}
          onChange={(event) => onFeatureTextChange(event.target.value)}
          placeholder="Ex.: Confeccionada em lona reforçada"
          className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#dc2626]"
        />

        <button
          type="button"
          onClick={onAddFeature}
          className="px-4 rounded-xl bg-[#111111] text-white text-sm font-semibold hover:bg-[#262626] transition-colors"
        >
          Adicionar
        </button>
      </div>

      {features.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {features.map((feature, index) => (
            <button
              key={`${feature}-${index}`}
              type="button"
              onClick={() => onRemoveFeature(index)}
              className="px-3 py-1.5 rounded-full bg-[#fafafa] border border-gray-100 text-xs text-gray-600 hover:border-[#dc2626] hover:text-[#dc2626] transition-colors"
            >
              {feature} ×
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
