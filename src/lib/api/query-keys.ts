export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    me: () => ["auth", "me"] as const,
  },
  users: {
    all: ["users"] as const,
    list: (params?: Record<string, unknown>) => ["users", "list", params] as const,
    detail: (id: string) => ["users", "detail", id] as const,
  },
  addresses: {
    all: ["addresses"] as const,
    list: () => ["addresses", "list"] as const,
  },
  categories: {
    all: ["categories"] as const,
    tree: (all?: boolean) => ["categories", "tree", { all }] as const,
    detail: (slug: string) => ["categories", "detail", slug] as const,
  },
  products: {
    all: ["products"] as const,
    list: (params?: Record<string, unknown>) => ["products", "list", params] as const,
    featured: (limit?: number) => ["products", "featured", { limit }] as const,
    detail: (slug: string) => ["products", "detail", slug] as const,
    related: (id: string) => ["products", "related", id] as const,
    reviews: (id: string, params?: Record<string, unknown>) => ["products", id, "reviews", params] as const,
  },
  reviews: {
    all: ["reviews"] as const,
    adminList: (params?: Record<string, unknown>) => ["reviews", "adminList", params] as const,
  },
  cart: {
    all: ["cart"] as const,
    get: () => ["cart", "get"] as const,
  },
  wishlist: {
    all: ["wishlist"] as const,
    get: () => ["wishlist", "get"] as const,
  },
  coupons: {
    all: ["coupons"] as const,
    adminList: () => ["coupons", "adminList"] as const,
  },
  orders: {
    all: ["orders"] as const,
    myOrders: () => ["orders", "myOrders"] as const,
    detail: (id: string) => ["orders", "detail", id] as const,
    adminList: (params?: Record<string, unknown>) => ["orders", "adminList", params] as const,
    adminDetail: (id: string) => ["orders", "adminDetail", id] as const,
  },
  payments: {
    config: () => ["payments", "config"] as const,
    intent: (orderId: string) => ["payments", "intent", orderId] as const,
  },
  blog: {
    posts: (params?: Record<string, unknown>) => ["blog", "posts", params] as const,
    postDetail: (slug: string) => ["blog", "postDetail", slug] as const,
    categories: () => ["blog", "categories"] as const,
  },
  banners: {
    all: ["banners"] as const,
    position: (pos?: string) => ["banners", "position", pos] as const,
    adminAll: () => ["banners", "adminAll"] as const,
  },
  marketing: {
    subscribers: () => ["newsletter", "subscribers"] as const,
    contactSubmissions: () => ["contact", "submissions"] as const,
  },
  admin: {
    stats: () => ["admin", "stats"] as const,
    settings: () => ["admin", "settings"] as const,
    publicSettings: () => ["settings", "public"] as const,
  },
};
