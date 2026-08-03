import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { NewsletterSubscriber, ContactSubmission, CreateContactPayload } from "./types";
import { ContactStatus } from "@/types/enums";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";

export const marketingApi = {
  subscribeNewsletter: async (email: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.NEWSLETTER.SUBSCRIBE, {
      method: "POST",
      body: { email },
    });
  },

  unsubscribeNewsletter: async (email: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.NEWSLETTER.UNSUBSCRIBE, {
      method: "POST",
      body: { email },
    });
  },

  getAdminSubscribers: async () => {
    return apiClient<ApiResponse<NewsletterSubscriber[]>>(ENDPOINTS.NEWSLETTER.SUBSCRIBERS, {
      method: "GET",
    });
  },

  submitContact: async (payload: CreateContactPayload) => {
    return apiClient<ApiResponse<ContactSubmission>>(ENDPOINTS.CONTACT.BASE, {
      method: "POST",
      body: payload,
    });
  },

  getAdminContacts: async () => {
    return apiClient<PaginatedResponse<ContactSubmission>>(ENDPOINTS.CONTACT.BASE, {
      method: "GET",
    });
  },

  updateContactStatus: async (id: string, status: ContactStatus) => {
    return apiClient<ApiResponse<ContactSubmission>>(ENDPOINTS.CONTACT.BY_ID(id), {
      method: "PATCH",
      body: { status },
    });
  },

  deleteContact: async (id: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.CONTACT.BY_ID(id), {
      method: "DELETE",
    });
  },
};

export function useSubscribeNewsletterMutation() {
  return useMutation({
    mutationFn: (email: string) => marketingApi.subscribeNewsletter(email),
  });
}

export function useSubmitContactMutation() {
  return useMutation({
    mutationFn: (payload: CreateContactPayload) => marketingApi.submitContact(payload),
  });
}

export function useAdminContactsQuery() {
  return useQuery({
    queryKey: queryKeys.marketing.contactSubmissions(),
    queryFn: () => marketingApi.getAdminContacts(),
  });
}
