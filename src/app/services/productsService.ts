import { supabase } from "../lib/supabase";
import type { Product, ProductFormData } from "../types/product";
import { getCategoryBySlug } from "./categoriesService";
import { deleteProductImages } from "./productImagesService";

function generateSlug(value: string): string {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

function mapProductFromDatabase(product: any): Product {
    return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category,
        categorySlug: product.category_slug,
        description: product.description,
        images: product.images || [],
        features: product.features || [],
        isActive: product.is_active,
        order: product.display_order,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
    };
}

async function getProductById(
    productId: string
): Promise<Product | undefined> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

    if (error) {
        console.error("Erro ao buscar produto pelo ID:", error);
        return undefined;
    }

    return mapProductFromDatabase(data);
}

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

    if (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
    }

    return (data || []).map(mapProductFromDatabase);
}

export async function getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("display_order", { ascending: true });

    if (error) {
        console.error("Erro ao buscar todos os produtos:", error);
        return [];
    }

    return (data || []).map(mapProductFromDatabase);
}

export async function getProductBySlug(
    slug: string
): Promise<Product | undefined> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

    if (error) {
        return undefined;
    }

    return mapProductFromDatabase(data);
}

export async function getProductsByCategory(
    categorySlug: string
): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_slug", categorySlug)
        .eq("is_active", true)
        .order("display_order", { ascending: true });

    if (error) {
        console.error("Erro ao buscar produtos da categoria:", error);
        return [];
    }

    return (data || []).map(mapProductFromDatabase);
}

export async function getRelatedProducts(
    product: Product,
    limit = 4
): Promise<Product[]> {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_slug", product.categorySlug)
        .eq("is_active", true)
        .neq("id", product.id)
        .order("display_order", { ascending: true })
        .limit(limit);

    if (error) {
        console.error("Erro ao buscar produtos relacionados:", error);
        return [];
    }

    return (data || []).map(mapProductFromDatabase);
}

export async function createProduct(
    data: ProductFormData
): Promise<Product | undefined> {
    const products = await getAllProducts();
    const category = await getCategoryBySlug(data.categorySlug);

    const { data: createdProduct, error } = await supabase
        .from("products")
        .insert({
            name: data.name.trim(),
            slug: generateSlug(data.name),
            category: category?.name || data.categorySlug,
            category_slug: data.categorySlug,
            description: data.description.trim(),
            images: data.images,
            features: data.features,
            is_active: data.isActive,
            display_order: products.length + 1,
        })
        .select()
        .single();

    if (error) {
        console.error("Erro ao criar produto:", error);
        return undefined;
    }

    return mapProductFromDatabase(createdProduct);
}

export async function deleteProduct(
    productId: string
): Promise<void> {
    const existingProduct = await getProductById(productId);

    if (!existingProduct) {
        throw new Error("Produto não encontrado.");
    }

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

    if (error) {
        console.error("Erro ao excluir produto:", error);
        throw new Error(`Erro ao excluir produto: ${error.message}`);
    }

    try {
        await deleteProductImages(existingProduct.images);
    } catch (cleanupError) {
        console.warn(
            "Produto excluído, mas algumas imagens não foram removidas do Storage:",
            cleanupError
        );
    }
}

export async function toggleProductStatus(
    productId: string
): Promise<void> {
    const products = await getAllProducts();
    const product = products.find((item) => item.id === productId);

    if (!product) return;

    const { error } = await supabase
        .from("products")
        .update({
            is_active: !product.isActive,
            updated_at: new Date().toISOString(),
        })
        .eq("id", productId);

    if (error) {
        console.error("Erro ao alterar status do produto:", error);
    }
}

export async function updateProduct(
    productId: string,
    data: ProductFormData
): Promise<Product | undefined> {
    const existingProduct = await getProductById(productId);

    if (!existingProduct) {
        console.error("Produto não encontrado para atualização.");
        return undefined;
    }

    const category = await getCategoryBySlug(
        data.categorySlug
    );

    const { data: updatedProduct, error } = await supabase
        .from("products")
        .update({
            name: data.name.trim(),
            slug: generateSlug(data.name),
            category:
                category?.name || data.categorySlug,
            category_slug: data.categorySlug,
            description: data.description.trim(),
            images: data.images,
            features: data.features,
            is_active: data.isActive,
            updated_at: new Date().toISOString(),
        })
        .eq("id", productId)
        .select()
        .single();

    if (error) {
        console.error("Erro ao atualizar produto:", error);
        return undefined;
    }

    const removedImages = existingProduct.images.filter(
        (oldImage) => !data.images.includes(oldImage)
    );

    if (removedImages.length > 0) {
        try {
            await deleteProductImages(removedImages);
        } catch (cleanupError) {
            console.warn(
                "Produto atualizado, mas algumas imagens antigas não foram removidas:",
                cleanupError
            );
        }
    }

    return mapProductFromDatabase(updatedProduct);
}

export async function moveProduct(
    productId: string,
    direction: "up" | "down"
): Promise<void> {
    const products = await getAllProducts();

    const currentIndex = products.findIndex(
        (product) => product.id === productId
    );

    if (currentIndex === -1) return;

    const targetIndex =
        direction === "up"
            ? currentIndex - 1
            : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= products.length) return;

    const updatedProducts = [...products];

    const currentProduct = updatedProducts[currentIndex];
    const targetProduct = updatedProducts[targetIndex];

    updatedProducts[currentIndex] = targetProduct;
    updatedProducts[targetIndex] = currentProduct;

    const updates = updatedProducts.map((product, index) =>
        supabase
            .from("products")
            .update({
                display_order: index + 1,
                updated_at: new Date().toISOString(),
            })
            .eq("id", product.id)
    );

    const results = await Promise.all(updates);

    const failedUpdate = results.find((result) => result.error);

    if (failedUpdate?.error) {
        console.error(
            "Erro ao reordenar produtos:",
            failedUpdate.error
        );
    }
}