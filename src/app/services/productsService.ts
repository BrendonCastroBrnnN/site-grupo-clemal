import type { Product, ProductFormData } from "../types/product";

let products: Product[] = [];

function generateSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getProducts(): Product[] {
  return products.filter((product) => product.isActive);
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

  products = [product, ...products];

  return product;
}