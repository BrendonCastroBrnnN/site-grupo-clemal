import { supabase } from "../lib/supabase";

const BUCKET_NAME = "product-images";

function sanitizeFileName(fileName: string): string {
    const extension = fileName.split(".").pop()?.toLowerCase() || "jpg";

    const baseName = fileName
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    return `${baseName || "imagem"}.${extension}`;
}

export async function uploadProductImage(file: File): Promise<string> {
    const safeFileName = sanitizeFileName(file.name);
    const filePath = `products/${crypto.randomUUID()}-${safeFileName}`;

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
        });

    if (error) {
        throw new Error(`Erro ao enviar imagem: ${error.message}`);
    }

    const { data } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

    return data.publicUrl;
}

export async function deleteProductImage(imageUrl: string): Promise<void> {
    const marker = `/storage/v1/object/public/${BUCKET_NAME}/`;
    const markerIndex = imageUrl.indexOf(marker);

    if (markerIndex === -1) return;

    const filePath = decodeURIComponent(
        imageUrl.substring(markerIndex + marker.length)
    );

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

    if (error) {
        throw new Error(`Erro ao remover imagem: ${error.message}`);
    }
}

export async function deleteProductImages(
    imageUrls: string[]
): Promise<void> {
    const supabaseImages = imageUrls.filter(isSupabaseProductImage);

    if (supabaseImages.length === 0) return;

    const results = await Promise.allSettled(
        supabaseImages.map((imageUrl) =>
            deleteProductImage(imageUrl)
        )
    );

    const failedResults = results.filter(
        (result) => result.status === "rejected"
    );

    if (failedResults.length > 0) {
        throw new Error(
            `Não foi possível remover ${failedResults.length} imagem(ns) do Storage.`
        );
    }
}

export function isSupabaseProductImage(imageUrl: string): boolean {
    return imageUrl.includes(
        `/storage/v1/object/public/${BUCKET_NAME}/`
    );
}