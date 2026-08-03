import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import {
  Order,
  CheckoutPayload,
  CheckoutResponseData,
  PaymentConfig,
  AdminOrderQueryParams,
  UpdateOrderStatusPayload,
} from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";

export const ordersApi = {
  checkout: async (payload: CheckoutPayload) => {
    return apiClient<ApiResponse<CheckoutResponseData>>(ENDPOINTS.ORDERS.CHECKOUT, {
      method: "POST",
      body: payload,
    });
  },

  getMyOrders: async () => {
    return apiClient<ApiResponse<Order[]>>(ENDPOINTS.ORDERS.MY_ORDERS, {
      method: "GET",
    });
  },

  getOrderById: async (id: string) => {
    return apiClient<ApiResponse<Order>>(ENDPOINTS.ORDERS.BY_ID(id), {
      method: "GET",
    });
  },

  cancelOrder: async (id: string) => {
    return apiClient<ApiResponse<Order>>(ENDPOINTS.ORDERS.CANCEL(id), {
      method: "POST",
    });
  },

  // Admin
  getAdminOrders: async (params?: AdminOrderQueryParams) => {
    return apiClient<PaginatedResponse<Order>>(ENDPOINTS.ORDERS.ADMIN_ALL, {
      method: "GET",
      params: params as Record<string, string | number | boolean>,
    });
  },

  getAdminOrderById: async (id: string) => {
    return apiClient<ApiResponse<Order>>(ENDPOINTS.ORDERS.ADMIN_BY_ID(id), {
      method: "GET",
    });
  },

  updateOrderStatus: async (id: string, payload: UpdateOrderStatusPayload) => {
    return apiClient<ApiResponse<Order>>(ENDPOINTS.ORDERS.ADMIN_STATUS(id), {
      method: "PATCH",
      body: payload,
    });
  },

  // Payments
  getPaymentConfig: async () => {
    return apiClient<ApiResponse<PaymentConfig>>(ENDPOINTS.PAYMENTS.CONFIG, {
      method: "GET",
    });
  },

  getPaymentIntent: async (orderId: string) => {
    return apiClient<ApiResponse<{ clientSecret: string }>>(
      ENDPOINTS.PAYMENTS.INTENT(orderId),
      {
        method: "GET",
      }
    );
  },
};

export function useCheckoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CheckoutPayload) => ordersApi.checkout(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
}

export function useMyOrdersQuery() {
  return useQuery({
    queryKey: queryKeys.orders.myOrders(),
    queryFn: async () => {
      const res = await ordersApi.getMyOrders();
      return res.data;
    },
  });
}

export function useOrderDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: async () => {
      const res = await ordersApi.getOrderById(id);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCancelOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ordersApi.cancelOrder(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(id) });
    },
  });
}

export function usePaymentConfigQuery() {
  return useQuery({
    queryKey: queryKeys.payments.config(),
    queryFn: async () => {
      const res = await ordersApi.getPaymentConfig();
      return res.data;
    },
  });
}

export function usePaymentIntentQuery(orderId: string) {
  return useQuery({
    queryKey: queryKeys.payments.intent(orderId),
    queryFn: async () => {
      const res = await ordersApi.getPaymentIntent(orderId);
      return res.data;
    },
    enabled: !!orderId,
  });
}

export function useAdminOrdersQuery(params?: AdminOrderQueryParams) {
  return useQuery({
    queryKey: queryKeys.orders.adminList(params as Record<string, unknown>),
    queryFn: () => ordersApi.getAdminOrders(params),
  });
}

export function useUpdateOrderStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateOrderStatusPayload }) =>
      ordersApi.updateOrderStatus(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(variables.id) });
    },
  });
}
