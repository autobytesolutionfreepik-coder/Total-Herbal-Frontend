import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse } from "@/types/api";
import { Address, CreateAddressPayload, UpdateAddressPayload } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";

export const addressesApi = {
  getAddresses: async () => {
    return apiClient<ApiResponse<Address[]>>(ENDPOINTS.ADDRESSES.BASE, {
      method: "GET",
    });
  },

  createAddress: async (payload: CreateAddressPayload) => {
    return apiClient<ApiResponse<Address>>(ENDPOINTS.ADDRESSES.BASE, {
      method: "POST",
      body: payload,
    });
  },

  updateAddress: async (id: string, payload: UpdateAddressPayload) => {
    return apiClient<ApiResponse<Address>>(ENDPOINTS.ADDRESSES.BY_ID(id), {
      method: "PATCH",
      body: payload,
    });
  },

  deleteAddress: async (id: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.ADDRESSES.BY_ID(id), {
      method: "DELETE",
    });
  },
};

export function useAddressesQuery() {
  return useQuery<Address[]>({
    queryKey: queryKeys.addresses.list(),
    queryFn: async () => {
      const res = await addressesApi.getAddresses();
      return res.data || [];
    },
  });
}

export function useCreateAddressMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateAddressPayload) => addressesApi.createAddress(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all });
    },
  });
}

export function useUpdateAddressMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAddressPayload }) =>
      addressesApi.updateAddress(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all });
    },
  });
}

export function useDeleteAddressMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => addressesApi.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all });
    },
  });
}

export function useSetDefaultAddressMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => addressesApi.updateAddress(id, { isDefault: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.addresses.all });
    },
  });
}

