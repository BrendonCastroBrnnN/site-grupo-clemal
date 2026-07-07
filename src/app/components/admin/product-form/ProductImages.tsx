import { ImagePlus } from "lucide-react";

interface ProductImagesProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export function ProductImages({ images, onImagesChange }: ProductImagesProps) {
  async function handleImagesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    const newImages = await Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;

          reader.readAsDataURL(file);
        });
      })
    );

    onImagesChange([...images, ...newImages]);
    event.target.value = "";
  }

  function handleRemoveImage(index: number) {
    onImagesChange(images.filter((_, imageIndex) => imageIndex !== index));
  }

  function handleSetCoverImage(index: number) {
    const selectedImage = images[index];

    if (!selectedImage) return;

    const remainingImages = images.filter((_, imageIndex) => imageIndex !== index);

    onImagesChange([selectedImage, ...remainingImages]);
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center justify-center">
          <ImagePlus className="w-5 h-5 text-[#dc2626]" />
        </div>

        <div>
          <h2 className="font-bold text-gray-900">Imagens</h2>
          <p className="text-sm text-gray-500">Fotos do produto.</p>
        </div>
      </div>

      <label className="block cursor-pointer rounded-2xl border border-dashed border-gray-200 bg-[#fafafa] p-6 text-center hover:border-[#dc2626] transition-colors">
        <ImagePlus className="w-8 h-8 text-gray-400 mx-auto mb-3" />

        <span className="block text-sm font-semibold text-gray-700">
          Selecionar imagens
        </span>

        <span className="block text-xs text-gray-400 mt-1">JPG, PNG ou WebP</span>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImagesChange}
          className="hidden"
        />
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative aspect-square rounded-xl overflow-hidden bg-[#fafafa] border border-gray-100"
            >
              <img
                src={image}
                alt={`Imagem selecionada ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {index === 0 && (
                <span className="absolute top-2 left-2 bg-[#dc2626] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  CAPA
                </span>
              )}

              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white text-xs flex items-center justify-center hover:bg-black transition-colors"
              >
                ×
              </button>

              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleSetCoverImage(index)}
                  className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/90 text-gray-800 text-[10px] font-bold px-2 py-1 hover:bg-white transition-colors"
                >
                  Usar como capa
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
