import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().int().min(1, "Please select a rating.").max(5),
  title: z.string().min(2, "Review headline is required."),
  comment: z.string().min(10, "Review detail must be at least 10 characters."),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
