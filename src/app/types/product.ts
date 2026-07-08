export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  description: string;
  images: string[];
  features: string[];
  isActive: boolean;

  order?: number;

  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormData {
  name: string;
  categorySlug: string;
  description: string;
  images: string[];
  features: string[];
  isActive: boolean;
}
