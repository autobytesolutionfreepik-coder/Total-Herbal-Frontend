import { ProductStatus, StrainType } from "@/types/enums";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  sortOrder: number;
  metaTitle?: string;
  metaDescription?: string;
  children?: Category[];
  _count?: {
    products: number;
  };
}

export interface ProductImage {
  id?: string;
  url: string;
  alt?: string;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: string;
  compareAtPrice?: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: string; // Decimal string from backend
  compareAtPrice?: string; // Decimal string from backend
  stock: number;
  categoryId: string;
  category?: Category;
  brand?: string;
  strainType: StrainType;
  thcContent?: number;
  cbdContent?: number;
  tags: string[];
  isFeatured: boolean;
  status: ProductStatus;
  images: ProductImage[];
  variants: ProductVariant[];
  avgRating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductQueryParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  strainType?: StrainType;
  featured?: boolean;
  inStock?: boolean;
  sort?: "newest" | "price_asc" | "price_desc" | "rating" | "popular" | "name";
  brand?: string;
  minThc?: number;
  maxThc?: number;
  page?: number;
  limit?: number;
}

export interface CreateProductPayload {
  name: string;
  sku: string;
  description: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  categoryId: string;
  brand?: string;
  strainType?: StrainType;
  thcContent?: number;
  cbdContent?: number;
  tags?: string[];
  isFeatured?: boolean;
  status?: ProductStatus;
  images?: { url: string; alt?: string; sortOrder?: number }[];
  variants?: { name: string; sku: string; price: number; stock: number }[];
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

export interface StockAdjustPayload {
  action: "set" | "add" | "subtract";
  quantity: number;
  variantId?: string;
}
