import { z } from "zod";

export const addressSchema = z.object({
  label: z.string().min(1, "Label is required (e.g. Home, Work)."),
  fullName: z.string().min(2, "Full name is required."),
  phone: z.string().min(7, "Valid phone number is required."),
  line1: z.string().min(3, "Street address is required."),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
  postalCode: z.string().min(3, "Postal code is required."),
  country: z.string().min(2, "Country is required."),
  isDefault: z.boolean().optional(),
});

export type AddressInput = z.infer<typeof addressSchema>;
