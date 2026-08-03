import { Role } from "@/types/enums";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
  isEmailVerified: boolean;
  createdAt: string;
  _count?: {
    orders: number;
    wishlist: number;
    reviews: number;
  };
}

export interface AuthResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
  dateOfBirth: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}
