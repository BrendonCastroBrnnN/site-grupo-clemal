import { supabase } from "../lib/supabase";
import type { Category } from "../types/product";

function generateSlug(value: string): string {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

function mapCategoryFromDatabase(category: any): Category {
    return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        isActive: category.is_active,
        order: category.display_order,
        createdAt: category.created_at,
        updatedAt: category.updated_at,
    };
}

export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

    if (error) {
        console.error("Erro ao buscar categorias:", error);
        return [];
    }

    return (data || []).map(mapCategoryFromDatabase);
}

export async function getAllCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true });

    if (error) {
        console.error("Erro ao buscar todas as categorias:", error);
        return [];
    }

    return (data || []).map(mapCategoryFromDatabase);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

    if (error) {
        return undefined;
    }

    return mapCategoryFromDatabase(data);
}

export async function createCategory(name: string, description: string): Promise<Category | undefined> {
    const categories = await getAllCategories();

    const { data, error } = await supabase
        .from("categories")
        .insert({
            name,
            slug: generateSlug(name),
            description,
            is_active: true,
            display_order: categories.length + 1,
        })
        .select()
        .single();

    if (error) {
        console.error("Erro ao criar categoria:", error);
        return undefined;
    }

    return mapCategoryFromDatabase(data);
}

export async function deleteCategory(categoryId: string): Promise<void> {
    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", categoryId);

    if (error) {
        console.error("Erro ao excluir categoria:", error);
    }
}

export async function toggleCategoryStatus(categoryId: string): Promise<void> {
    const categories = await getAllCategories();
    const category = categories.find((item) => item.id === categoryId);

    if (!category) return;

    const { error } = await supabase
        .from("categories")
        .update({
            is_active: !category.isActive,
            updated_at: new Date().toISOString(),
        })
        .eq("id", categoryId);

    if (error) {
        console.error("Erro ao alterar status da categoria:", error);
    }
}

export async function updateCategory(
    categoryId: string,
    data: {
        name: string;
        description: string;
    }
): Promise<Category | undefined> {
    const { data: updatedCategory, error } = await supabase
        .from("categories")
        .update({
            name: data.name,
            slug: generateSlug(data.name),
            description: data.description,
            updated_at: new Date().toISOString(),
        })
        .eq("id", categoryId)
        .select()
        .single();

    if (error) {
        console.error("Erro ao atualizar categoria:", error);
        return undefined;
    }

    return mapCategoryFromDatabase(updatedCategory);
}

export async function moveCategory(categoryId: string, direction: "up" | "down"): Promise<void> {
    const categories = await getAllCategories();

    const currentIndex = categories.findIndex((category) => category.id === categoryId);

    if (currentIndex === -1) return;

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const updatedCategories = [...categories];

    const currentCategory = updatedCategories[currentIndex];
    const targetCategory = updatedCategories[targetIndex];

    updatedCategories[currentIndex] = targetCategory;
    updatedCategories[targetIndex] = currentCategory;

    const updates = updatedCategories.map((category, index) =>
        supabase
            .from("categories")
            .update({
                display_order: index + 1,
                updated_at: new Date().toISOString(),
            })
            .eq("id", category.id)
    );

    await Promise.all(updates);
}