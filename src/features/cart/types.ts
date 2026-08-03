export interface CartItemProduct {
  id: string;
  name: string;
  slug: string;
  price: string;
  compareAtPrice?: string;
  images: { url: string; alt?: string }[];
  stock: number;
}

export interface CartItemVariant {
  id: string;
  name: string;
  price: string;
  stock: number;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string | null;
  quantity: number;
  product: CartItemProduct;
  variant?: CartItemVariant | null;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: string;
}

export interface AddToCartPayload {
  productId: string;
  variantId?: string;
  quantity: number;
}

export interface UpdateCartQuantityPayload {
  quantity: number;
}

export interface LocalCartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  // Local presentation cache
  product?: CartItemProduct;
  variant?: CartItemVariant;
}

export interface MergeCartPayload {
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
  }[];
}
