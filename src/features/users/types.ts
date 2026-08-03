import { Role } from "@/types/enums";
import { User } from "@/features/auth/types";

export interface UserQueryParams {
  q?: string;
  role?: Role;
  page?: number;
  limit?: number;
}

export interface UpdateUserRoleStatusPayload {
  role?: Role;
  isActive?: boolean;
}

export interface UserDetailResponse extends User {
  isActive: boolean;
  orders?: unknown[];
}
