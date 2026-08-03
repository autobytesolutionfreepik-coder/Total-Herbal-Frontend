import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Category name is required."),
  slug: z.string().min(2, "Slug is required."),
  description: z.string().optional(),
  image: z.string().url("Valid image URL required.").optional().or(z.literal("")),
  parentId: z.string().optional().or(z.null()),
  sortOrder: z.number().default(0),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required."),
  sku: z.string().min(2, "SKU is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  shortDescription: z.string().optional(),
  price: z.number().positive("Price must be greater than 0."),
  compareAtPrice: z.number().optional(),
  stock: z.number().int().min(0, "Stock cannot be negative."),
  categoryId: z.string().min(1, "Category is required."),
  brand: z.string().optional(),
  strainType: z.enum(["INDICA", "SATIVA", "HYBRID", "CBD", "NONE"]).default("NONE"),
  thcContent: z.number().min(0).max(100).optional(),
  cbdContent: z.number().min(0).max(100).optional(),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("ACTIVE"),
});

export type CategoryInput = z.infer<typeof categorySchema>;
export type ProductInput = z.infer<typeof productSchema>;
