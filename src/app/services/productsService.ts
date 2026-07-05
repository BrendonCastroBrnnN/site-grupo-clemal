import type { Product, ProductFormData } from "../types/product";

const STORAGE_KEY = "grupo-clemal-products";

function generateSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function loadProducts(): Product[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) return [];

  try {
    return JSON.parse(stored) as Product[];
  } catch {
    return [];
  }
}

function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getProducts(): Product[] {
  return loadProducts().filter((product) => product.isActive);
}

export function getAllProducts(): Product[] {
  return loadProducts();
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getProducts().filter((product) => product.categorySlug === categorySlug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return getProducts()
    .filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id)
    .slice(0, limit);
}

export function createProduct(data: ProductFormData): Product {
  const products = loadProducts();

  const product: Product = {
    id: crypto.randomUUID(),
    name: data.name,
    slug: generateSlug(data.name),
    category: data.categorySlug,
    categorySlug: data.categorySlug,
    description: data.description,
    images: [],
    features: data.features,
    isActive: data.isActive,
    createdAt: new Date().toISOString(),
  };

  saveProducts([product, ...products]);

  return product;
}