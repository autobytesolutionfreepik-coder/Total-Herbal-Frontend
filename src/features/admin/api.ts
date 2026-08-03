import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse } from "@/types/api";
import {
  AdminDashboardStats,
  PublicSettings,
  SystemSettingItem,
  ImageUploadResponse,
} from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";

export const adminApi = {
  getDashboardStats: async () => {
    return apiClient<ApiResponse<AdminDashboardStats>>(ENDPOINTS.ADMIN.DASHBOARD_STATS, {
      method: "GET",
    });
  },

  getPublicSettings: async () => {
    return apiClient<ApiResponse<PublicSettings>>(ENDPOINTS.SETTINGS.PUBLIC, {
      method: "GET",
    });
  },

  getAdminSettings: async () => {
    return apiClient<ApiResponse<SystemSettingItem[]>>(ENDPOINTS.ADMIN.SETTINGS, {
      method: "GET",
    });
  },

  updateAdminSettings: async (settings: SystemSettingItem[]) => {
    return apiClient<ApiResponse<SystemSettingItem[]>>(ENDPOINTS.ADMIN.SETTINGS, {
      method: "PUT",
      body: settings,
    });
  },

  uploadImage: async (file: File, folder = "products") => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", folder);

    return apiClient<ApiResponse<ImageUploadResponse>>(ENDPOINTS.UPLOAD.IMAGE, {
      method: "POST",
      body: formData,
    });
  },

  uploadImages: async (files: File[], folder = "products") => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    formData.append("folder", folder);

    return apiClient<ApiResponse<ImageUploadResponse[]>>(ENDPOINTS.UPLOAD.IMAGES, {
      method: "POST",
      body: formData,
    });
  },

  deleteImage: async (publicId: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.UPLOAD.DELETE, {
      method: "DELETE",
      body: { publicId },
    });
  },
};

export function useAdminStatsQuery() {
  return useQuery({
    queryKey: queryKeys.admin.stats(),
    queryFn: async () => {
      const res = await adminApi.getDashboardStats();
      return res.data;
    },
    refetchInterval: 30 * 1000,
  });
}

export function usePublicSettingsQuery() {
  return useQuery({
    queryKey: queryKeys.admin.publicSettings(),
    queryFn: async () => {
      const res = await adminApi.getPublicSettings();
      return res.data;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useAdminSettingsQuery() {
  return useQuery({
    queryKey: queryKeys.admin.settings(),
    queryFn: async () => {
      const res = await adminApi.getAdminSettings();
      return res.data;
    },
  });
}

export function useUpdateSettingsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (settings: SystemSettingItem[]) => adminApi.updateAdminSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.settings() });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.publicSettings() });
    },
  });
}

export function useUploadImageMutation() {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder?: string }) =>
      adminApi.uploadImage(file, folder),
  });
}
