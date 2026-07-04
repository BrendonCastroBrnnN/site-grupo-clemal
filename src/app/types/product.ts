export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug?: string;
  description: string;
  images: string[];
  features?: string[];
  sku?: string;
  isActive: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}