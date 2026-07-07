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
  return loadCategories().sort((a, b) => (a.order || 0) - (b.order || 0));
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