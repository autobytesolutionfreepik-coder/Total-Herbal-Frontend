import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse } from "@/types/api";
import { WishlistItem } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { useAuthStore } from "@/stores/auth-store";

export const wishlistApi = {
  getWishlist: async () => {
    return apiClient<ApiResponse<WishlistItem[]>>(ENDPOINTS.WISHLIST.BASE, {
      method: "GET",
    });
  },

  addToWishlist: async (productId: string) => {
    return apiClient<ApiResponse<WishlistItem>>(ENDPOINTS.WISHLIST.BY_PRODUCT_ID(productId), {
      method: "POST",
    });
  },

  removeFromWishlist: async (productId: string) => {
    return apiClient<ApiResponse<{ message: string }>>(
      ENDPOINTS.WISHLIST.BY_PRODUCT_ID(productId),
      {
        method: "DELETE",
      }
    );
  },

  clearWishlist: async () => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.WISHLIST.BASE, {
      method: "DELETE",
    });
  },
};

export function useWishlistQuery() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: queryKeys.wishlist.get(),
    queryFn: async () => {
      const res = await wishlistApi.getWishlist();
      return res.data;
    },
    enabled: isAuthenticated,
  });
}

export function useAddToWishlistMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.addToWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist.all });
    },
  });
}

export function useRemoveFromWishlistMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => wishlistApi.removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist.all });
    },
  });
}

export function useClearWishlistMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => wishlistApi.clearWishlist(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist.all });
    },
  });
}
