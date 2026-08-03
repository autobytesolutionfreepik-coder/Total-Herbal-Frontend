export type Role = "CUSTOMER" | "ADMIN" | "SUPER_ADMIN";

export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type StrainType = "INDICA" | "SATIVA" | "HYBRID" | "CBD" | "NONE";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentMethod = "CARD" | "CASH_ON_DELIVERY";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type DiscountType = "PERCENTAGE" | "FIXED";

export type BannerPosition =
  | "HERO"
  | "PROMO_TOP"
  | "PROMO_BOTTOM"
  | "CATEGORY"
  | "POPUP";

export type ContactStatus = "NEW" | "READ" | "REPLIED";
