"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, Filter, Star, ShoppingBag, Heart, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils/format";
import { useProductsQuery, useCategoriesQuery } from "@/features/catalog/queries";
import { ProductQueryParams, Category, Product } from "@/features/catalog/types";
import { StrainType } from "@/types/enums";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { useAddToCartMutation } from "@/features/cart/api";
import { useWishlistQuery, useAddToWishlistMutation } from "@/features/wishlist/api";

export default function ShopPage() {
  const { isAuthenticated } = useAuthStore();

  const [queryParams, setQueryParams] = useState<ProductQueryParams>({
    page: 1,
    limit: 12,
    sort: "newest",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const { data: rawCategories } = useCategoriesQuery();
  const categories: Category[] = Array.isArray(rawCategories)
    ? rawCategories
    : Array.isArray((rawCategories as any)?.data)
    ? (rawCategories as any).data
    : [];

  const { data: productsResponse, isLoading } = useProductsQuery(queryParams);

  const products: Product[] = Array.isArray(productsResponse?.data)
    ? productsResponse.data
    : Array.isArray(productsResponse)
    ? (productsResponse as any)
    : [];
  const meta = productsResponse?.meta;

  const addItemToLocalCart = useCartStore((s) => s.addItem);
  const openCartDrawer = useCartStore((s) => s.openCart);
  const addToCartMutation = useAddToCartMutation();

  const { data: wishlistData } = useWishlistQuery();
  const addToWishlistMutation = useAddToWishlistMutation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQueryParams((prev) => ({ ...prev, q: searchTerm || undefined, page: 1 }));
  };

  const handleQuickAdd = async (e: React.MouseEvent, prod: (typeof products)[0]) => {
    e.preventDefault();
    if (isAuthenticated) {
      try {
        await addToCartMutation.mutateAsync({ productId: prod.id, quantity: 1 });
        toast.success(`Added ${prod.name} to cart`);
        openCartDrawer();
      } catch {
        toast.error("Failed to add to cart.");
      }
    } else {
      addItemToLocalCart({
        productId: prod.id,
        quantity: 1,
        product: {
          id: prod.id,
          name: prod.name,
          slug: prod.slug,
          price: prod.price,
          compareAtPrice: prod.compareAtPrice,
          images: prod.images,
          stock: prod.stock,
        },
      });
      toast.success(`Added ${prod.name} to cart`);
      openCartDrawer();
    }
  };

  return (
    <div className="container-site section-py">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-green-950">
          Our Organic Dispensary Catalog
        </h1>
        <p className="text-sm sm:text-base text-ink-muted mt-2">
          Discover craft organic flowers, full-spectrum extracts, artisan edibles, and lab-tested tinctures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters */}
        <div className="lg:col-span-3 bg-surface p-6 rounded-2xl border border-cream-dark/60 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-cream-dark/60 pb-3">
            <h2 className="font-serif font-bold text-lg text-green-950 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-green-700" />
              Filter Products
            </h2>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
              Search Catalog
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Strain, strain type, brand..."
                className="w-full pl-9 pr-3 py-2 bg-cream/40 border border-cream-dark rounded-xl text-xs focus:outline-none focus:border-green-600"
              />
              <Search className="w-4 h-4 text-ink-subtle absolute left-3 top-2.5" />
            </div>
          </form>

          {/* Categories */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
              Categories
            </label>
            <div className="space-y-1 text-sm">
              <button
                onClick={() =>
                  setQueryParams((p) => ({ ...p, category: undefined, page: 1 }))
                }
                className={`block w-full text-left px-3 py-1.5 rounded-lg transition-colors text-xs font-semibold ${
                  !queryParams.category
                    ? "bg-green-100 text-green-800"
                    : "text-ink-muted hover:bg-cream/60"
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setQueryParams((p) => ({ ...p, category: cat.slug, page: 1 }))
                  }
                  className={`block w-full text-left px-3 py-1.5 rounded-lg transition-colors text-xs font-semibold ${
                    queryParams.category === cat.slug
                      ? "bg-green-100 text-green-800"
                      : "text-ink-muted hover:bg-cream/60"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Strain Type Filter */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
              Strain Type
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(["INDICA", "SATIVA", "HYBRID", "CBD"] as StrainType[]).map((type) => (
                <button
                  key={type}
                  onClick={() =>
                    setQueryParams((p) => ({
                      ...p,
                      strainType: p.strainType === type ? undefined : type,
                      page: 1,
                    }))
                  }
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all ${
                    queryParams.strainType === type
                      ? "bg-green-950 text-white"
                      : "bg-cream/60 text-ink-muted hover:bg-cream"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Product Grid */}
        <div className="lg:col-span-9 space-y-6">
          {/* Top Sort & Result Count Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-surface p-4 rounded-xl border border-cream-dark/60">
            <span className="text-xs font-semibold text-ink-muted">
              Showing {products.length} of {meta?.total || products.length} items
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-ink-muted">Sort By:</span>
              <select
                value={queryParams.sort || "newest"}
                onChange={(e) =>
                  setQueryParams((p) => ({
                    ...p,
                    sort: e.target.value as ProductQueryParams["sort"],
                  }))
                }
                className="bg-cream/40 border border-cream-dark rounded-lg px-3 py-1 text-xs font-semibold text-ink focus:outline-none"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-surface rounded-2xl animate-pulse border border-cream-dark" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-surface rounded-2xl p-12 text-center border border-cream-dark">
              <p className="text-lg font-serif font-bold text-green-950">
                No products match your selected filters.
              </p>
              <button
                onClick={() => setQueryParams({ page: 1, limit: 12 })}
                className="btn-outline text-xs mt-4"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <Link
                  key={prod.id}
                  href={`/products/${prod.slug}`}
                  className="group card-base overflow-hidden flex flex-col p-4 bg-surface rounded-2xl border border-cream-dark/60 shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-cream/40">
                    <Image
                      src={prod.images?.[0]?.url || "/placeholder-product.jpg"}
                      alt={prod.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {prod.strainType !== "NONE" && (
                      <span className="absolute top-2.5 left-2.5 strain-badge badge-hybrid text-[10px]">
                        {prod.strainType}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-green-700">
                    {prod.category?.name || "Herbal Care"}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-green-950 group-hover:text-green-700 transition-colors line-clamp-1">
                    {prod.name}
                  </h3>

                  <div className="mt-auto pt-3 flex items-center justify-between border-t border-cream-dark/40">
                    <span className="text-lg font-serif font-bold text-green-950">
                      {formatCurrency(prod.price)}
                    </span>

                    <button
                      onClick={(e) => handleQuickAdd(e, prod)}
                      className="btn-green p-2.5 rounded-full text-xs"
                      title="Quick Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-6">
              <button
                disabled={!meta.hasPrevPage}
                onClick={() => setQueryParams((p) => ({ ...p, page: (p.page || 1) - 1 }))}
                className="btn-outline text-xs px-3 py-1.5 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-xs font-semibold text-ink-muted">
                Page {meta.page} of {meta.totalPages}
              </span>
              <button
                disabled={!meta.hasNextPage}
                onClick={() => setQueryParams((p) => ({ ...p, page: (p.page || 1) + 1 }))}
                className="btn-outline text-xs px-3 py-1.5 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
