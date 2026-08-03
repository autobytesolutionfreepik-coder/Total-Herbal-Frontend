import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse, PaginatedResponse } from "@/types/api";
import { BlogPost, BlogCategory, BlogQueryParams } from "./types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";

export const blogApi = {
  getPosts: async (params?: BlogQueryParams) => {
    return apiClient<PaginatedResponse<BlogPost>>(ENDPOINTS.BLOG.POSTS, {
      method: "GET",
      params: params as Record<string, string | number | boolean>,
    });
  },

  getPostBySlug: async (slug: string) => {
    return apiClient<ApiResponse<BlogPost>>(ENDPOINTS.BLOG.POST_BY_SLUG(slug), {
      method: "GET",
    });
  },

  getCategories: async () => {
    return apiClient<ApiResponse<BlogCategory[]>>(ENDPOINTS.BLOG.CATEGORIES, {
      method: "GET",
    });
  },

  createPost: async (payload: Partial<BlogPost>) => {
    return apiClient<ApiResponse<BlogPost>>(ENDPOINTS.BLOG.POSTS, {
      method: "POST",
      body: payload,
    });
  },

  updatePost: async (id: string, payload: Partial<BlogPost>) => {
    return apiClient<ApiResponse<BlogPost>>(ENDPOINTS.BLOG.POST_BY_ID(id), {
      method: "PATCH",
      body: payload,
    });
  },

  deletePost: async (id: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.BLOG.POST_BY_ID(id), {
      method: "DELETE",
    });
  },
};

export function useBlogPostsQuery(params?: BlogQueryParams) {
  return useQuery({
    queryKey: queryKeys.blog.posts(params as Record<string, unknown>),
    queryFn: () => blogApi.getPosts(params),
  });
}

export function useBlogPostBySlugQuery(slug: string) {
  return useQuery({
    queryKey: queryKeys.blog.postDetail(slug),
    queryFn: async () => {
      const res = await blogApi.getPostBySlug(slug);
      return res.data;
    },
    enabled: !!slug,
  });
}

export function useBlogCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.blog.categories(),
    queryFn: async () => {
      const res = await blogApi.getCategories();
      return res.data;
    },
  });
}
