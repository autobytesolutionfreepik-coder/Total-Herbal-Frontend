"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils/format";
import { useProductsQuery, useCategoriesQuery } from "@/features/catalog/queries";
import { ProductQueryParams, Category, Product } from "@/features/catalog/types";
import { StrainType } from "@/types/enums";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import { useAddToCartMutation } from "@/features/cart/api";

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQueryParams((prev) => ({ ...prev, q: searchTerm || undefined, page: 1 }));
  };

  const handleQuickAdd = async (e: React.MouseEvent, prod: Product) => {
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
    <div className="bg-[#F5F0E8] min-h-screen section-py">
      <div className="container-site">
        {/* Header Hero Banner - Matching Image 5 */}
        <div className="relative rounded-3xl overflow-hidden mb-10 min-h-[260px] sm:min-h-[300px] border border-[#EDE8DF] shadow-sm flex items-center bg-[#EDE6DB]">
          {/* Background Banner Image - shop-banner.png */}
          <Image
            src="/images/shop-banner.png"
            alt="Our Collection"
            fill
            className="object-cover object-right sm:object-center"
            sizes="100vw"
            priority
          />

          {/* Content Container */}
          <div className="relative z-10 p-8 sm:p-12 md:p-14 max-w-xl text-left">
            <nav className="flex items-center gap-1.5 text-xs text-[#666666] mb-2 font-sans font-normal">
              <Link href="/" className="hover:text-[#006828] transition-colors">Home</Link>
              <span>&rsaquo;</span>
              <span className="text-[#006828] font-semibold">Shop</span>
            </nav>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#006828] leading-tight mb-3 font-serif"
              style={{ fontFamily: "Times New Roman, serif", color: "#006828" }}
            >
              Our Collection
            </h1>
            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-normal max-w-md font-sans">
              Premium cannabis products crafted for purity, potency, and peace of mind. Explore our laboratory-tested selections designed for every lifestyle.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-[#EDE8DF] shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-7 sticky top-24">
            <div className="flex items-center justify-between border-b border-[#EDE8DF] pb-4">
              <h2 className="font-serif font-bold text-lg text-[#0D2318] flex items-center gap-2.5">
                <SlidersHorizontal className="w-4.5 h-4.5 text-[#016C24]" />
                Filter Products
              </h2>
            </div>

            {/* Search Box */}
            <form onSubmit={handleSearchSubmit}>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#4A4A4A] mb-2">
                Search Catalog
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Strain, category, brand..."
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F9F6F1] border border-[#EDE8DF] rounded-xl text-xs font-semibold focus:outline-none focus:border-[#016C24] focus:bg-white transition-all text-[#0D2318]"
                />
                <Search className="w-4 h-4 text-[#767676] absolute left-3 top-3" />
              </div>
            </form>

            {/* Categories */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#4A4A4A] mb-2.5">
                Categories
              </label>
              <div className="space-y-1 text-sm">
                <button
                  onClick={() =>
                    setQueryParams((p) => ({ ...p, category: undefined, page: 1 }))
                  }
                  className={`block w-full text-left px-3.5 py-2 rounded-xl transition-all text-xs font-bold ${
                    !queryParams.category
                      ? "bg-[#0D2318] text-[#E2C98A] shadow-sm"
                      : "text-[#4A4A4A] hover:bg-[#F9F6F1] hover:text-[#016C24]"
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
                    className={`block w-full text-left px-3.5 py-2 rounded-xl transition-all text-xs font-bold ${
                      queryParams.category === cat.slug
                        ? "bg-[#0D2318] text-[#E2C98A] shadow-sm"
                        : "text-[#4A4A4A] hover:bg-[#F9F6F1] hover:text-[#016C24]"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Strain Type Filter */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#4A4A4A] mb-2.5">
                Strain Type
              </label>
              <div className="flex flex-wrap gap-2">
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
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold uppercase tracking-wider transition-all border ${
                      queryParams.strainType === type
                        ? "bg-[#016C24] text-white border-[#016C24] shadow-md"
                        : "bg-[#F9F6F1] text-[#4A4A4A] border-[#EDE8DF] hover:border-[#016C24]/40"
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
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4.5 rounded-2xl border border-[#EDE8DF] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <span className="text-xs font-extrabold text-[#4A4A4A]">
                Showing <span className="text-[#0D2318] font-bold">{products.length}</span> of <span className="text-[#0D2318] font-bold">{meta?.total || products.length}</span> items
              </span>

              <div className="flex items-center gap-2.5">
                <span className="text-xs font-extrabold text-[#4A4A4A]">Sort By:</span>
                <select
                  value={queryParams.sort || "newest"}
                  onChange={(e) =>
                    setQueryParams((p) => ({
                      ...p,
                      sort: e.target.value as ProductQueryParams["sort"],
                    }))
                  }
                  className="bg-[#F9F6F1] border border-[#EDE8DF] rounded-xl px-3.5 py-1.5 text-xs font-bold text-[#0D2318] focus:outline-none focus:border-[#016C24]"
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
                  <div key={i} className="h-88 bg-white rounded-2xl animate-pulse border border-[#EDE8DF]" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-3xl p-14 text-center border border-[#EDE8DF] shadow-sm">
                <p className="text-xl font-serif font-bold text-[#0D2318]">
                  No products match your selected filters.
                </p>
                <button
                  onClick={() => setQueryParams({ page: 1, limit: 12 })}
                  className="btn-outline text-xs mt-5 px-6 py-2.5 text-[#0D2318] border-[#0D2318]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/products/${prod.slug}`}
                    className="group relative rounded-2xl overflow-hidden flex flex-col p-4 bg-white border border-[#EDE8DF] shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(13,35,24,0.12)] hover:border-[#016C24]/30 hover:-translate-y-1.5 transition-all duration-300 h-full"
                  >
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-[#F9F6F1]">
                      <Image
                        src={prod.images?.[0]?.url || "/images/Skywalker-OG.png"}
                        alt={prod.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      />
                      {prod.strainType && prod.strainType !== "NONE" && (
                        <span className="absolute top-3 left-3 text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-[#0D2318]/80 backdrop-blur-md border border-white/20 shadow-md">
                          {prod.strainType}
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#016C24] mb-1">
                      {prod.category?.name || "Herbal Care"}
                    </span>
                    <h3 className="font-bold text-lg text-[#0D2318] group-hover:text-[#016C24] transition-colors line-clamp-1 font-sans">
                      {prod.name}
                    </h3>

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#EDE8DF]/60">
                      <span className="text-xl font-extrabold text-[#0D2318] font-sans">
                        {formatCurrency(prod.price)}
                      </span>

                      <button
                        onClick={(e) => handleQuickAdd(e, prod)}
                        className="w-10 h-10 rounded-full bg-[#016C24] hover:bg-[#027F2C] text-white flex items-center justify-center transition-all shadow-[0_4px_16px_rgba(1,108,36,0.25)] hover:scale-105 active:scale-95"
                        title="Quick Add to Cart"
                      >
                        <ShoppingBag className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 pt-8">
                <button
                  disabled={!meta.hasPrevPage}
                  onClick={() => setQueryParams((p) => ({ ...p, page: (p.page || 1) - 1 }))}
                  className="btn-outline text-xs px-4 py-2 text-[#0D2318] border-[#0D2318] disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-xs font-bold text-[#4A4A4A]">
                  Page <span className="text-[#0D2318]">{meta.page}</span> of <span className="text-[#0D2318]">{meta.totalPages}</span>
                </span>
                <button
                  disabled={!meta.hasNextPage}
                  onClick={() => setQueryParams((p) => ({ ...p, page: (p.page || 1) + 1 }))}
                  className="btn-outline text-xs px-4 py-2 text-[#0D2318] border-[#0D2318] disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
