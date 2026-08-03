import { DiscountType } from "@/types/enums";

export interface Coupon {
  id: string;
  code: string;
  description?: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount?: string;
  maxDiscountAmount?: string;
  usageLimit?: number;
  perUserLimit?: number;
  startsAt?: string;
  expiresAt?: string;
  isActive: boolean;
  usedCount: number;
  createdAt: string;
}

export interface ValidateCouponPayload {
  code: string;
  subtotal: number;
}

export interface ValidateCouponResponse {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  discount: number;
  newTotal: number;
}

export interface CreateCouponPayload {
  code: string;
  description?: string;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  perUserLimit?: number;
  startsAt?: string;
  expiresAt?: string;
  isActive?: boolean;
}

export type UpdateCouponPayload = Partial<CreateCouponPayload>;
