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
    return loadProducts()
        .filter((product) => product.isActive)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getAllProducts(): Product[] {
    return loadProducts().sort(
        (a, b) => (a.order || 0) - (b.order || 0)
    );
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

        order: products.length + 1,

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

export function updateProduct(productId: string, data: ProductFormData): Product | undefined {
    const products = loadProducts();
    const existingProduct = products.find((product) => product.id === productId);

    if (!existingProduct) return undefined;

    const category = getCategoryBySlug(data.categorySlug);

    const updatedProduct: Product = {
        ...existingProduct,
        name: data.name,
        slug: generateSlug(data.name),
        category: category?.name || data.categorySlug,
        categorySlug: data.categorySlug,
        description: data.description,
        images: data.images,
        features: data.features,
        isActive: data.isActive,
        updatedAt: new Date().toISOString(),
    };

    const updatedProducts = products.map((product) =>
        product.id === productId ? updatedProduct : product
    );

    saveProducts(updatedProducts);

    return updatedProduct;
}

export function moveProduct(productId: string, direction: "up" | "down"): void {
    const products = loadProducts().sort((a, b) => (a.order || 0) - (b.order || 0));

    const currentIndex = products.findIndex((product) => product.id === productId);

    if (currentIndex === -1) return;

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= products.length) return;

    const updatedProducts = [...products];

    const currentProduct = updatedProducts[currentIndex];
    const targetProduct = updatedProducts[targetIndex];

    updatedProducts[currentIndex] = targetProduct;
    updatedProducts[targetIndex] = currentProduct;

    const reorderedProducts = updatedProducts.map((product, index) => ({
        ...product,
        order: index + 1,
        updatedAt: new Date().toISOString(),
    }));

    saveProducts(reorderedProducts);
}