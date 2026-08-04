import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse } from "@/types/api";
import { Cart, AddToCartPayload, UpdateCartQuantityPayload, MergeCartPayload } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { useAuthStore } from "@/stores/auth-store";

export const cartApi = {
  getCart: async () => {
    return apiClient<ApiResponse<Cart>>(ENDPOINTS.CART.BASE, {
      method: "GET",
    });
  },

  addItem: async (payload: AddToCartPayload) => {
    return apiClient<ApiResponse<Cart>>(ENDPOINTS.CART.ITEMS, {
      method: "POST",
      body: payload,
    });
  },

  updateQuantity: async (itemId: string, payload: UpdateCartQuantityPayload) => {
    return apiClient<ApiResponse<Cart>>(ENDPOINTS.CART.ITEM_BY_ID(itemId), {
      method: "PATCH",
      body: payload,
    });
  },

  removeItem: async (itemId: string) => {
    return apiClient<ApiResponse<Cart>>(ENDPOINTS.CART.ITEM_BY_ID(itemId), {
      method: "DELETE",
    });
  },

  clearCart: async () => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.CART.BASE, {
      method: "DELETE",
    });
  },

  mergeCart: async (payload: MergeCartPayload) => {
    return apiClient<ApiResponse<Cart>>(ENDPOINTS.CART.MERGE, {
      method: "POST",
      body: payload,
    });
  },
};

export function useCartQuery() {
  const { isAuthenticated } = useAuthStore();

  return useQuery<Cart>({
    queryKey: queryKeys.cart.get(),
    queryFn: async () => {
      const res = await cartApi.getCart();
      return res.data;
    },
    enabled: isAuthenticated,
  });
}

export function useAddToCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddToCartPayload) => cartApi.addItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}

export function useUpdateCartQuantityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartApi.updateQuantity(itemId, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}

export function useRemoveCartItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}

export function useClearCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => cartApi.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}

export function useMergeCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: MergeCartPayload) => cartApi.mergeCart(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}
