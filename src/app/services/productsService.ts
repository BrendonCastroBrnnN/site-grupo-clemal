import type { Product } from "../types/product";

const products: Product[] = [];

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
    .filter(
      (item) =>
        item.categorySlug === product.categorySlug &&
        item.id !== product.id
    )
    .slice(0, limit);
}