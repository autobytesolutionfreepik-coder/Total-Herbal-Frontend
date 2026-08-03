import { z } from "zod";

export const validateCouponSchema = z.object({
  code: z.string().min(1, "Coupon code is required."),
  subtotal: z.number().positive(),
});

export const couponSchema = z.object({
  code: z.string().min(2, "Code is required.").toUpperCase(),
  description: z.string().optional(),
  discountType: z.enum(["PERCENTAGE", "FIXED"]),
  discountValue: z.number().positive("Discount value must be greater than 0."),
  minOrderAmount: z.number().optional(),
  maxDiscountAmount: z.number().optional(),
  usageLimit: z.number().int().optional(),
  perUserLimit: z.number().int().default(1),
  startsAt: z.string().optional(),
  expiresAt: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type ValidateCouponInput = z.infer<typeof validateCouponSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
