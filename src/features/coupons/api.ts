import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse } from "@/types/api";
import {
  Coupon,
  ValidateCouponPayload,
  ValidateCouponResponse,
  CreateCouponPayload,
  UpdateCouponPayload,
} from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";

export const couponsApi = {
  validateCoupon: async (payload: ValidateCouponPayload) => {
    return apiClient<ApiResponse<ValidateCouponResponse>>(ENDPOINTS.COUPONS.VALIDATE, {
      method: "POST",
      body: payload,
    });
  },

  getAdminCoupons: async () => {
    return apiClient<ApiResponse<Coupon[]>>(ENDPOINTS.COUPONS.BASE, {
      method: "GET",
    });
  },

  createCoupon: async (payload: CreateCouponPayload) => {
    return apiClient<ApiResponse<Coupon>>(ENDPOINTS.COUPONS.BASE, {
      method: "POST",
      body: payload,
    });
  },

  updateCoupon: async (id: string, payload: UpdateCouponPayload) => {
    return apiClient<ApiResponse<Coupon>>(ENDPOINTS.COUPONS.BY_ID(id), {
      method: "PATCH",
      body: payload,
    });
  },

  deleteCoupon: async (id: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.COUPONS.BY_ID(id), {
      method: "DELETE",
    });
  },
};

export function useValidateCouponMutation() {
  return useMutation({
    mutationFn: (payload: ValidateCouponPayload) => couponsApi.validateCoupon(payload),
  });
}

export function useAdminCouponsQuery() {
  return useQuery({
    queryKey: queryKeys.coupons.adminList(),
    queryFn: async () => {
      const res = await couponsApi.getAdminCoupons();
      return res.data;
    },
  });
}

export function useCreateCouponMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateCouponPayload) => couponsApi.createCoupon(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.coupons.all });
    },
  });
}

export function useUpdateCouponMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCouponPayload }) =>
      couponsApi.updateCoupon(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.coupons.all });
    },
  });
}

export function useDeleteCouponMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => couponsApi.deleteCoupon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.coupons.all });
    },
  });
}
