export const ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh-token",
    LOGOUT: "/auth/logout",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERIFICATION: "/auth/resend-verification",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    ME: "/auth/me",
    CHANGE_PASSWORD: "/auth/me/password",
  },
  // Users & Addresses
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
  },
  ADDRESSES: {
    BASE: "/addresses",
    BY_ID: (id: string) => `/addresses/${id}`,
  },
  // Catalog
  CATEGORIES: {
    BASE: "/categories",
    BY_SLUG: (slug: string) => `/categories/${slug}`,
    BY_ID: (id: string) => `/categories/${id}`,
  },
  PRODUCTS: {
    BASE: "/products",
    FEATURED: "/products/featured",
    BY_SLUG: (slug: string) => `/products/slug/${slug}`,
    RELATED: (id: string) => `/products/${id}/related`,
    BY_ID: (id: string) => `/products/${id}`,
    STOCK: (id: string) => `/products/${id}/stock`,
    REVIEWS: (id: string) => `/products/${id}/reviews`,
  },
  // Reviews
  REVIEWS: {
    BASE: "/reviews",
    BY_ID: (id: string) => `/reviews/${id}`,
    APPROVE: (id: string) => `/reviews/${id}/approve`,
  },
  // Shopping Cart
  CART: {
    BASE: "/cart",
    ITEMS: "/cart/items",
    ITEM_BY_ID: (itemId: string) => `/cart/items/${itemId}`,
    MERGE: "/cart/merge",
  },
  // Wishlist
  WISHLIST: {
    BASE: "/wishlist",
    BY_PRODUCT_ID: (productId: string) => `/wishlist/${productId}`,
  },
  // Coupons
  COUPONS: {
    BASE: "/coupons",
    VALIDATE: "/coupons/validate",
    BY_ID: (id: string) => `/coupons/${id}`,
  },
  // Orders & Payments
  ORDERS: {
    CHECKOUT: "/orders/checkout",
    MY_ORDERS: "/orders",
    BY_ID: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    ADMIN_ALL: "/orders/admin/all",
    ADMIN_BY_ID: (id: string) => `/orders/admin/${id}`,
    ADMIN_STATUS: (id: string) => `/orders/admin/${id}/status`,
  },
  PAYMENTS: {
    CONFIG: "/payments/config",
    INTENT: (orderId: string) => `/payments/orders/${orderId}/intent`,
  },
  // Blog & Banners
  BLOG: {
    POSTS: "/blog/posts",
    POST_BY_SLUG: (slug: string) => `/blog/posts/${slug}`,
    POST_BY_ID: (id: string) => `/blog/posts/${id}`,
    CATEGORIES: "/blog/categories",
    CATEGORY_BY_ID: (id: string) => `/blog/categories/${id}`,
  },
  BANNERS: {
    BASE: "/banners",
    ADMIN_ALL: "/banners/admin/all",
    BY_ID: (id: string) => `/banners/${id}`,
  },
  // Marketing
  NEWSLETTER: {
    SUBSCRIBE: "/newsletter/subscribe",
    UNSUBSCRIBE: "/newsletter/unsubscribe",
    SUBSCRIBERS: "/newsletter/subscribers",
  },
  CONTACT: {
    BASE: "/contact",
    BY_ID: (id: string) => `/contact/${id}`,
  },
  // Admin & Settings & Upload
  ADMIN: {
    DASHBOARD_STATS: "/admin/dashboard/stats",
    SETTINGS: "/admin/settings",
  },
  SETTINGS: {
    PUBLIC: "/settings/public",
  },
  UPLOAD: {
    IMAGE: "/upload/image",
    IMAGES: "/upload/images",
    DELETE: "/upload",
  },
} as const;
