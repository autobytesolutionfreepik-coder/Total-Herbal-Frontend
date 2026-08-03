import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { catalogApi } from "./api";
import {
  ProductQueryParams,
  CreateProductPayload,
  UpdateProductPayload,
  StockAdjustPayload,
  Category,
} from "./types";

export function useCategoriesQuery(all?: boolean) {
  return useQuery({
    queryKey: queryKeys.categories.tree(all),
    queryFn: async () => {
      const res = await catalogApi.getCategories(all);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategoryBySlugQuery(slug: string) {
  return useQuery({
    queryKey: queryKeys.categories.detail(slug),
    queryFn: async () => {
      const res = await catalogApi.getCategoryBySlug(slug);
      return res.data;
    },
    enabled: !!slug,
  });
}

export function useProductsQuery(params?: ProductQueryParams) {
  return useQuery({
    queryKey: queryKeys.products.list(params as Record<string, unknown>),
    queryFn: () => catalogApi.getProducts(params),
  });
}

export function useFeaturedProductsQuery(limit = 8) {
  return useQuery({
    queryKey: queryKeys.products.featured(limit),
    queryFn: async () => {
      const res = await catalogApi.getFeaturedProducts(limit);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductBySlugQuery(slug: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: async () => {
      const res = await catalogApi.getProductBySlug(slug);
      return res.data;
    },
    enabled: !!slug,
  });
}

export function useRelatedProductsQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.products.related(id),
    queryFn: async () => {
      const res = await catalogApi.getRelatedProducts(id);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProductPayload) => catalogApi.createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProductPayload }) =>
      catalogApi.updateProduct(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => catalogApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

export function useStockAdjustmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: StockAdjustPayload }) =>
      catalogApi.adjustStock(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Category>) => catalogApi.createCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Category> }) =>
      catalogApi.updateCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => catalogApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
}
