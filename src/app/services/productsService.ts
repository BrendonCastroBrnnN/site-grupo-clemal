import type { Product, ProductFormData } from "../types/product";
import { getCategoryBySlug } from "./categoriesService";

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

    const category = getCategoryBySlug(data.categorySlug);

    const product: Product = {
        id: crypto.randomUUID(),
        name: data.name,
        slug: generateSlug(data.name),
        category: category?.name || data.categorySlug,
        categorySlug: data.categorySlug,
        description: data.description,
        images: data.images,
        features: data.features,
        isActive: data.isActive,
        createdAt: new Date().toISOString(),
    };

    saveProducts([product, ...products]);

    return product;
}

export function deleteProduct(productId: string): void {
    const products = loadProducts();

    const updatedProducts = products.filter((product) => product.id !== productId);

    saveProducts(updatedProducts);
}

export function toggleProductStatus(productId: string): void {
    const products = loadProducts();

    const updatedProducts = products.map((product) =>
        product.id === productId
            ? {
                ...product,
                isActive: !product.isActive,
                updatedAt: new Date().toISOString(),
            }
            : product
    );

    saveProducts(updatedProducts);
}