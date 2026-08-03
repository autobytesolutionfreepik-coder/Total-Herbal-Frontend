import { OrderStatus, PaymentMethod, PaymentStatus } from "@/types/enums";
import { Address } from "@/features/addresses/types";
import { Product } from "@/features/catalog/types";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string | null;
  productName: string;
  variantName?: string | null;
  unitPrice: string; // Decimal string
  quantity: number;
  totalPrice: string; // Decimal string
  product?: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: string; // Decimal string
  discountAmount: string; // Decimal string
  shippingFee: string; // Decimal string
  taxAmount: string; // Decimal string
  totalAmount: string; // Decimal string
  addressId: string;
  address?: Address;
  couponCode?: string | null;
  notes?: string | null;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutPayload {
  addressId: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  notes?: string;
}

export interface CheckoutResponseData {
  order: Order;
  clientSecret?: string;
}

export interface PaymentConfig {
  cardPaymentsEnabled: boolean;
  cashOnDeliveryEnabled: boolean;
  currency: string;
}

export interface AdminOrderQueryParams {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  q?: string;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
  note?: string;
}
