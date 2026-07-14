import { ImagePlus, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { uploadProductImage } from "../../../services/productImagesService";

interface ProductImagesProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  onImagesUploaded?: (imageUrls: string[]) => void;
  onImageRemoved?: (imageUrl: string) => void;
  onUploadStateChange?: (isUploading: boolean) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export function ProductImages({
  images,
  onImagesChange,
  onImagesUploaded,
  onImageRemoved,
  onUploadStateChange,
}: ProductImagesProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleImagesChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files || []);

    event.target.value = "";

    if (files.length === 0) return;

    const invalidTypeFile = files.find(
      (file) => !ALLOWED_IMAGE_TYPES.includes(file.type)
    );

    if (invalidTypeFile) {
      setUploadError(
        `O arquivo "${invalidTypeFile.name}" não possui um formato permitido.`
      );
      return;
    }

    const oversizedFile = files.find(
      (file) => file.size > MAX_FILE_SIZE
    );

    if (oversizedFile) {
      setUploadError(
        `O arquivo "${oversizedFile.name}" ultrapassa o limite de 10 MB.`
      );
      return;
    }

    setIsUploading(true);
    onUploadStateChange?.(true);
    setUploadError("");

    try {
      const uploadedImages = await Promise.all(
        files.map((file) => uploadProductImage(file))
      );

      onImagesUploaded?.(uploadedImages);
      onImagesChange([...images, ...uploadedImages]);
    } catch (error) {
      console.error("Erro ao enviar imagens:", error);

      setUploadError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar as imagens."
      );
    } finally {
      setIsUploading(false);
      onUploadStateChange?.(false);
    }
  }

  function handleRemoveImage(index: number) {
    const removedImage = images[index];

    if (!removedImage) return;

    onImageRemoved?.(removedImage);

    onImagesChange(
      images.filter((_, imageIndex) => imageIndex !== index)
    );
  }

  function handleSetCoverImage(index: number) {
    const selectedImage = images[index];

    if (!selectedImage) return;

    const remainingImages = images.filter(
      (_, imageIndex) => imageIndex !== index
    );

    onImagesChange([selectedImage, ...remainingImages]);
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-2xl bg-[#fafafa] border border-gray-100 flex items-center justify-center">
          <ImagePlus className="w-5 h-5 text-[#dc2626]" />
        </div>

        <div>
          <h2 className="font-bold text-gray-900">
            Imagens
          </h2>

          <p className="text-sm text-gray-500">
            Fotos do produto.
          </p>
        </div>
      </div>

      <label
        className={`block rounded-2xl border border-dashed bg-[#fafafa] p-6 text-center transition-colors ${isUploading
          ? "cursor-not-allowed border-gray-200 opacity-70"
          : "cursor-pointer border-gray-200 hover:border-[#dc2626]"
          }`}
      >
        {isUploading ? (
          <LoaderCircle className="w-8 h-8 text-[#dc2626] mx-auto mb-3 animate-spin" />
        ) : (
          <ImagePlus className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        )}

        <span className="block text-sm font-semibold text-gray-700">
          {isUploading
            ? "Enviando imagens..."
            : "Selecionar imagens"}
        </span>

        <span className="block text-xs text-gray-400 mt-1">
          JPG, PNG ou WebP — máximo de 10 MB por arquivo
        </span>

        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          onChange={handleImagesChange}
          disabled={isUploading}
          className="hidden"
        />
      </label>

      {uploadError && (
        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            {uploadError}
          </p>
        </div>
      )}

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
                className="w-full h-full object-contain bg-white"
              />

              {index === 0 && (
                <span className="absolute top-2 left-2 bg-[#dc2626] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  CAPA
                </span>
              )}

              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                disabled={isUploading}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white text-xs flex items-center justify-center hover:bg-black transition-colors disabled:opacity-50"
                title="Remover imagem"
              >
                ×
              </button>

              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleSetCoverImage(index)}
                  disabled={isUploading}
                  className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/90 text-gray-800 text-[10px] font-bold px-2 py-1 hover:bg-white transition-colors disabled:opacity-50"
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