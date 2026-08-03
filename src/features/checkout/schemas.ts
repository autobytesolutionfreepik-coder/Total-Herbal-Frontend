import { z } from "zod";

export const checkoutSchema = z.object({
  addressId: z.string().min(1, "Please select or add a delivery address."),
  paymentMethod: z.enum(["CARD", "CASH_ON_DELIVERY"]),
  couponCode: z.string().optional(),
  notes: z.string().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
