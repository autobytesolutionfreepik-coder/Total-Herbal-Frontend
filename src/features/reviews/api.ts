import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { Review, CreateReviewPayload, UpdateReviewPayload, ReviewQueryParams } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";

export const reviewsApi = {
  getProductReviews: async (productId: string, params?: { page?: number; limit?: number }) => {
    return apiClient<PaginatedResponse<Review>>(ENDPOINTS.PRODUCTS.REVIEWS(productId), {
      method: "GET",
      params: params as Record<string, number>,
    });
  },

  createProductReview: async (productId: string, payload: CreateReviewPayload) => {
    return apiClient<ApiResponse<Review>>(ENDPOINTS.PRODUCTS.REVIEWS(productId), {
      method: "POST",
      body: payload,
    });
  },

  updateReview: async (id: string, payload: UpdateReviewPayload) => {
    return apiClient<ApiResponse<Review>>(ENDPOINTS.REVIEWS.BY_ID(id), {
      method: "PATCH",
      body: payload,
    });
  },

  deleteReview: async (id: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.REVIEWS.BY_ID(id), {
      method: "DELETE",
    });
  },

  getAdminReviews: async (params?: ReviewQueryParams) => {
    return apiClient<PaginatedResponse<Review>>(ENDPOINTS.REVIEWS.BASE, {
      method: "GET",
      params: params as Record<string, string | number | boolean>,
    });
  },

  approveReview: async (id: string, approve: boolean) => {
    return apiClient<ApiResponse<Review>>(ENDPOINTS.REVIEWS.APPROVE(id), {
      method: "PATCH",
      body: { approve },
    });
  },
};

export function useProductReviewsQuery(productId: string, params?: { page?: number; limit?: number }) {
  return useQuery<PaginatedResponse<Review>>({
    queryKey: queryKeys.products.reviews(productId, params),
    queryFn: () => reviewsApi.getProductReviews(productId, params),
    enabled: !!productId,
  });
}

export function useCreateReviewMutation(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) =>
      reviewsApi.createProductReview(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.reviews(productId) });
    },
  });
}

export function useUpdateReviewMutation(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateReviewPayload }) =>
      reviewsApi.updateReview(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.reviews(productId) });
    },
  });
}

export function useDeleteReviewMutation(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reviewsApi.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.reviews(productId) });
    },
  });
}

export function useAdminReviewsQuery(params?: ReviewQueryParams) {
  return useQuery({
    queryKey: queryKeys.reviews.adminList(params as Record<string, unknown>),
    queryFn: () => reviewsApi.getAdminReviews(params),
  });
}

export function useApproveReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, approve }: { id: string; approve: boolean }) =>
      reviewsApi.approveReview(id, approve),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all });
    },
  });
}
