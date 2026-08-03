import { BannerPosition } from "@/types/enums";

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  linkUrl?: string;
  buttonText?: string;
  position: BannerPosition;
  sortOrder: number;
  isActive: boolean;
  startsAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export type CreateBannerPayload = Omit<Banner, "id" | "createdAt">;
export type UpdateBannerPayload = Partial<CreateBannerPayload>;
