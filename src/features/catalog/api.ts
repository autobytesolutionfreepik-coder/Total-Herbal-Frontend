import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import {
  Category,
  Product,
  ProductQueryParams,
  CreateProductPayload,
  UpdateProductPayload,
  StockAdjustPayload,
} from "./types";

export const catalogApi = {
  // Categories
  getCategories: async (all?: boolean) => {
    return apiClient<ApiResponse<Category[]>>(ENDPOINTS.CATEGORIES.BASE, {
      method: "GET",
      params: all ? { all: "true" } : undefined,
    });
  },

  getCategoryBySlug: async (slug: string) => {
    return apiClient<ApiResponse<Category>>(ENDPOINTS.CATEGORIES.BY_SLUG(slug), {
      method: "GET",
    });
  },

  createCategory: async (payload: Partial<Category>) => {
    return apiClient<ApiResponse<Category>>(ENDPOINTS.CATEGORIES.BASE, {
      method: "POST",
      body: payload,
    });
  },

  updateCategory: async (id: string, payload: Partial<Category>) => {
    return apiClient<ApiResponse<Category>>(ENDPOINTS.CATEGORIES.BY_ID(id), {
      method: "PATCH",
      body: payload,
    });
  },

  deleteCategory: async (id: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.CATEGORIES.BY_ID(id), {
      method: "DELETE",
    });
  },

  // Products
  getProducts: async (params?: ProductQueryParams) => {
    return apiClient<PaginatedResponse<Product>>(ENDPOINTS.PRODUCTS.BASE, {
      method: "GET",
      params: params as Record<string, string | number | boolean>,
    });
  },

  getFeaturedProducts: async (limit = 8) => {
    return apiClient<ApiResponse<Product[]>>(ENDPOINTS.PRODUCTS.FEATURED, {
      method: "GET",
      params: { limit },
    });
  },

  getProductBySlug: async (slug: string) => {
    return apiClient<ApiResponse<Product>>(ENDPOINTS.PRODUCTS.BY_SLUG(slug), {
      method: "GET",
    });
  },

  getRelatedProducts: async (id: string) => {
    return apiClient<ApiResponse<Product[]>>(ENDPOINTS.PRODUCTS.RELATED(id), {
      method: "GET",
    });
  },

  createProduct: async (payload: CreateProductPayload) => {
    return apiClient<ApiResponse<Product>>(ENDPOINTS.PRODUCTS.BASE, {
      method: "POST",
      body: payload,
    });
  },

  updateProduct: async (id: string, payload: UpdateProductPayload) => {
    return apiClient<ApiResponse<Product>>(ENDPOINTS.PRODUCTS.BY_ID(id), {
      method: "PATCH",
      body: payload,
    });
  },

  deleteProduct: async (id: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.PRODUCTS.BY_ID(id), {
      method: "DELETE",
    });
  },

  adjustStock: async (id: string, payload: StockAdjustPayload) => {
    return apiClient<ApiResponse<Product>>(ENDPOINTS.PRODUCTS.STOCK(id), {
      method: "PATCH",
      body: payload,
    });
  },
};

export * from "./queries";

