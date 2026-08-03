import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse } from "@/types/api";
import { Banner, CreateBannerPayload, UpdateBannerPayload } from "./types";
import { BannerPosition } from "@/types/enums";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";

export const bannersApi = {
  getBanners: async (position?: BannerPosition) => {
    return apiClient<ApiResponse<Banner[]>>(ENDPOINTS.BANNERS.BASE, {
      method: "GET",
      params: position ? { position } : undefined,
    });
  },

  getAdminBanners: async () => {
    return apiClient<ApiResponse<Banner[]>>(ENDPOINTS.BANNERS.ADMIN_ALL, {
      method: "GET",
    });
  },

  createBanner: async (payload: CreateBannerPayload) => {
    return apiClient<ApiResponse<Banner>>(ENDPOINTS.BANNERS.BASE, {
      method: "POST",
      body: payload,
    });
  },

  updateBanner: async (id: string, payload: UpdateBannerPayload) => {
    return apiClient<ApiResponse<Banner>>(ENDPOINTS.BANNERS.BY_ID(id), {
      method: "PATCH",
      body: payload,
    });
  },

  deleteBanner: async (id: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.BANNERS.BY_ID(id), {
      method: "DELETE",
    });
  },
};

export function useBannersQuery(position?: BannerPosition) {
  return useQuery({
    queryKey: queryKeys.banners.position(position),
    queryFn: async () => {
      const res = await bannersApi.getBanners(position);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useAdminBannersQuery() {
  return useQuery({
    queryKey: queryKeys.banners.adminAll(),
    queryFn: async () => {
      const res = await bannersApi.getAdminBanners();
      return res.data;
    },
  });
}
