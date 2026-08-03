import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponse } from "@/types/api";
import {
  AuthResponseData,
  LoginPayload,
  RegisterPayload,
  User,
  UpdateProfilePayload,
  ChangePasswordPayload,
} from "./types";

export const authApi = {
  register: async (payload: RegisterPayload) => {
    return apiClient<ApiResponse<AuthResponseData>>(ENDPOINTS.AUTH.REGISTER, {
      method: "POST",
      body: payload,
    });
  },

  login: async (payload: LoginPayload) => {
    return apiClient<ApiResponse<AuthResponseData>>(ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: payload,
    });
  },

  logout: async () => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.AUTH.LOGOUT, {
      method: "POST",
    });
  },

  verifyEmail: async (token: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.AUTH.VERIFY_EMAIL, {
      method: "POST",
      body: { token },
    });
  },

  resendVerification: async () => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.AUTH.RESEND_VERIFICATION, {
      method: "POST",
    });
  },

  forgotPassword: async (email: string) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: "POST",
      body: { email },
    });
  },

  resetPassword: async (payload: { token: string; password: string }) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.AUTH.RESET_PASSWORD, {
      method: "POST",
      body: payload,
    });
  },

  getMe: async () => {
    return apiClient<ApiResponse<{ user: User }>>(ENDPOINTS.AUTH.ME, {
      method: "GET",
    });
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    return apiClient<ApiResponse<{ user: User }>>(ENDPOINTS.AUTH.ME, {
      method: "PATCH",
      body: payload,
    });
  },

  changePassword: async (payload: ChangePasswordPayload) => {
    return apiClient<ApiResponse<{ message: string }>>(ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      method: "PATCH",
      body: payload,
    });
  },
};
