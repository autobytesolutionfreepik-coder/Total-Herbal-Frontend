import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { User } from "@/features/auth/types";
import { UserQueryParams, UpdateUserRoleStatusPayload, UserDetailResponse } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";

export const usersApi = {
  getUsers: async (params?: UserQueryParams) => {
    return apiClient<PaginatedResponse<User>>(ENDPOINTS.USERS.BASE, {
      method: "GET",
      params: params as Record<string, string | number | boolean>,
    });
  },

  getUserById: async (id: string) => {
    return apiClient<ApiResponse<UserDetailResponse>>(ENDPOINTS.USERS.BY_ID(id), {
      method: "GET",
    });
  },

  updateUser: async (id: string, payload: UpdateUserRoleStatusPayload) => {
    return apiClient<ApiResponse<User>>(ENDPOINTS.USERS.BY_ID(id), {
      method: "PATCH",
      body: payload,
    });
  },

  deleteUser: async (id: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.USERS.BY_ID(id), {
      method: "DELETE",
    });
  },
};

export function useUsersQuery(params?: UserQueryParams) {
  return useQuery({
    queryKey: queryKeys.users.list(params as Record<string, unknown>),
    queryFn: () => usersApi.getUsers(params),
  });
}

export function useUserDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserRoleStatusPayload }) =>
      usersApi.updateUser(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(variables.id) });
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}
