import type { Category } from "../types/product";

const STORAGE_KEY = "grupo-clemal-categories";

const defaultCategories: Category[] = [
    {
        id: "1",
        name: "Bainhas",
        slug: "bainhas",
        description: "Bainhas para ferramentas técnicas e operacionais.",
        isActive: true,
        order: 1,
    },
    {
        id: "2",
        name: "Bolsas técnicas",
        slug: "bolsas-tecnicas",
        description: "Bolsas para equipes de campo, manutenção e operação.",
        isActive: true,
        order: 2,
    },
    {
        id: "3",
        name: "Capas de proteção",
        slug: "capas-protecao",
        description: "Capas para coletores, celulares, tablets e impressoras portáteis.",
        isActive: true,
        order: 3,
    },
    {
        id: "4",
        name: "Bonés",
        slug: "bones",
        description: "Bonés profissionais e personalizados.",
        isActive: true,
        order: 4,
    },
    {
        id: "5",
        name: "Projetos personalizados",
        slug: "personalizados",
        description: "Produtos desenvolvidos sob demanda.",
        isActive: true,
        order: 5,
    },
];

function generateSlug(value: string): string {
    return value
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

function loadCategories(): Category[] {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCategories));
        return defaultCategories;
    }

    try {
        return JSON.parse(stored) as Category[];
    } catch {
        return defaultCategories;
    }
}

function saveCategories(categories: Category[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

export function getCategories(): Category[] {
    return loadCategories()
        .filter((category) => category.isActive)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getAllCategories(): Category[] {
    return loadCategories().sort(
        (a, b) => (a.order || 0) - (b.order || 0)
    );
}

export function getCategoryBySlug(slug: string): Category | undefined {
    return getCategories().find((category) => category.slug === slug);
}

export function createCategory(name: string, description: string): Category {
    const categories = loadCategories();

    const category: Category = {
        id: crypto.randomUUID(),
        name,
        slug: generateSlug(name),
        description,
        isActive: true,
        order: categories.length + 1,
        createdAt: new Date().toISOString(),
    };

    saveCategories([...categories, category]);

    return category;
}

export function deleteCategory(categoryId: string): void {
    const categories = loadCategories();

    const updatedCategories = categories.filter((category) => category.id !== categoryId);

    saveCategories(updatedCategories);
}

export function toggleCategoryStatus(categoryId: string): void {
    const categories = loadCategories();

    const updatedCategories = categories.map((category) =>
        category.id === categoryId
            ? {
                ...category,
                isActive: !category.isActive,
                updatedAt: new Date().toISOString(),
            }
            : category
    );

    saveCategories(updatedCategories);
}

export function updateCategory(
    categoryId: string,
    data: {
        name: string;
        description: string;
    }
): Category | undefined {
    const categories = loadCategories();
    const existingCategory = categories.find((category) => category.id === categoryId);

    if (!existingCategory) return undefined;

    const updatedCategory: Category = {
        ...existingCategory,
        name: data.name,
        slug: generateSlug(data.name),
        description: data.description,
        updatedAt: new Date().toISOString(),
    };

    const updatedCategories = categories.map((category) =>
        category.id === categoryId ? updatedCategory : category
    );

    saveCategories(updatedCategories);

    return updatedCategory;
}

export function moveCategory(categoryId: string, direction: "up" | "down"): void {
    const categories = loadCategories().sort((a, b) => (a.order || 0) - (b.order || 0));

    const currentIndex = categories.findIndex((category) => category.id === categoryId);

    if (currentIndex === -1) return;

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const updatedCategories = [...categories];

    const currentCategory = updatedCategories[currentIndex];
    const targetCategory = updatedCategories[targetIndex];

    updatedCategories[currentIndex] = targetCategory;
    updatedCategories[targetIndex] = currentCategory;

    const reorderedCategories = updatedCategories.map((category, index) => ({
        ...category,
        order: index + 1,
        updatedAt: new Date().toISOString(),
    }));

    saveCategories(reorderedCategories);
}