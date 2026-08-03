import { Order } from "@/features/orders/types";
import { Product } from "@/features/catalog/types";

export interface SalesByDayItem {
  date: string;
  totalSales: number;
  orderCount: number;
}

export interface TopSellingProductItem {
  productId: string;
  name: string;
  sku: string;
  unitsSold: number;
  totalRevenue: string;
  image?: string;
}

export interface AdminDashboardStats {
  totalCustomers: number;
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: string; // Decimal string
  thirtyDayRevenue: string; // Decimal string
  pendingReviewCount: number;
  newContactCount: number;
  subscriberCount: number;
  salesByDay: SalesByDayItem[];
  lowStockProducts: Product[];
  topSellingProducts: TopSellingProductItem[];
  recentOrders: Order[];
}

export interface PublicSettings {
  tax_rate?: string;
  shipping_fee?: string;
  free_shipping_threshold?: string;
  store_name?: string;
  support_email?: string;
  support_phone?: string;
}

export interface SystemSettingItem {
  key: string;
  value: string;
  description?: string;
}

export interface ImageUploadResponse {
  url: string;
  publicId: string;
}
