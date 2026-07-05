import type { Category } from "../types/product";

const categories: Category[] = [
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

export function getCategories(): Category[] {
  return categories
    .filter((category) => category.isActive)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find((category) => category.slug === slug);
}