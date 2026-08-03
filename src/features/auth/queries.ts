import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/query-keys";
import { authApi } from "./api";
import { useAuthStore } from "@/stores/auth-store";
import {
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  ChangePasswordPayload,
} from "./types";
import { useEffect } from "react";

export function useMeQuery() {
  const { setUser, clearUser } = useAuthStore();

  const query = useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => {
      try {
        const res = await authApi.getMe();
        return res.data.user;
      } catch (err) {
        throw err;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    } else if (query.isError) {
      clearUser();
    }
  }, [query.data, query.isError, setUser, clearUser]);

  return query;
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (res) => {
      setUser(res.data.user);
      queryClient.setQueryData(queryKeys.auth.me(), res.data.user);
      queryClient.invalidateQueries();
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (res) => {
      setUser(res.data.user);
      queryClient.setQueryData(queryKeys.auth.me(), res.data.user);
      queryClient.invalidateQueries();
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const { clearUser } = useAuthStore();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearUser();
      queryClient.clear();
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (payload: { token: string; password: string }) =>
      authApi.resetPassword(payload),
  });
}

export function useVerifyEmailMutation() {
  return useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
  });
}

export function useResendVerificationMutation() {
  return useMutation({
    mutationFn: () => authApi.resendVerification(),
  });
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => authApi.updateProfile(payload),
    onSuccess: (res) => {
      setUser(res.data.user);
      queryClient.setQueryData(queryKeys.auth.me(), res.data.user);
    },
  });
}

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => authApi.changePassword(payload),
  });
}
