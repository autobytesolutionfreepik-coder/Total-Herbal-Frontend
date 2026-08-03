import { User } from "@/features/auth/types";

export interface Review {
  id: string;
  productId: string;
  userId: string;
  user?: Pick<User, "id" | "name" | "avatar">;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewPayload {
  rating: number;
  title: string;
  comment: string;
}

export type UpdateReviewPayload = Partial<CreateReviewPayload>;

export interface ReviewQueryParams {
  approved?: boolean;
  page?: number;
  limit?: number;
}
