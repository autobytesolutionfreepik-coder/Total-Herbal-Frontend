"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingCart, Heart, User, Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import { useCartQuery } from "@/features/cart/api";
import { useWishlistQuery } from "@/features/wishlist/api";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Location", href: "/location" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { isAuthenticated, user } = useAuthStore();

  // Cart counts
  const localCartItems = useCartStore((s) => s.items);
  const openCartDrawer = useCartStore((s) => s.openCart);
  const { data: serverCart } = useCartQuery();

  const cartCount = isAuthenticated
    ? serverCart?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0
    : localCartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);

  // Wishlist count
  const { data: wishlistData } = useWishlistQuery();
  const wishlistCount = wishlistData?.length || 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#0D2318] via-[#016C24] to-[#0D2318] text-white text-[11px] font-semibold tracking-widest py-2.5 select-none overflow-hidden relative w-full border-b border-white/10 shadow-sm">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="pr-16 flex items-center gap-3">
            <span>PREMIUM ORGANIC HERBAL CARE</span>
            <span className="text-[#C9A961]">✦</span>
            <span>ADULTS 21+ ONLY</span>
            <span className="text-[#C9A961]">✦</span>
            <span>ISO LAB TESTED</span>
            <span className="text-[#C9A961]">✦</span>
            <span>SAME-DAY DISPENSARY DELIVERY</span>
            <span className="text-[#C9A961]">✦</span>
          </span>
          <span className="pr-16 flex items-center gap-3">
            <span>PREMIUM ORGANIC HERBAL CARE</span>
            <span className="text-[#C9A961]">✦</span>
            <span>ADULTS 21+ ONLY</span>
            <span className="text-[#C9A961]">✦</span>
            <span>ISO LAB TESTED</span>
            <span className="text-[#C9A961]">✦</span>
            <span>SAME-DAY DISPENSARY DELIVERY</span>
            <span className="text-[#C9A961]">✦</span>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(13,35,24,0.08)] border-b border-[#EDE8DF]/60"
            : "bg-white/95 backdrop-blur-md border-b border-[#EDE8DF]"
        )}
      >
        <div className="container-site flex items-center justify-between h-20 gap-4">
          {/* Mobile: Left Hamburger Toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2.5 -ml-2 rounded-full hover:bg-[#F5F0E8] transition-colors text-[#0D2318]"
          >
            <Menu className="w-5 h-5 text-[#1A1A1A]" />
          </button>

          {/* Desktop Left / Mobile Center: Logo */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <Link href="/" className="inline-flex items-center group gap-0.5">
              <span
                className="text-2xl sm:text-3xl font-bold leading-none text-[#1B3A2D] tracking-tight group-hover:text-[#0D2318] transition-colors"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Total
              </span>
              <span
                className="text-2xl sm:text-3xl font-bold leading-none text-[#027F2C] tracking-tight group-hover:text-[#016C24] transition-colors"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Herbal
              </span>
              <span
                className="text-2xl sm:text-3xl font-bold leading-none text-[#1B3A2D] tracking-tight group-hover:text-[#0D2318] transition-colors"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Care
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A961] ml-0.5 animate-pulse" />
            </Link>
          </div>

          {/* Desktop Center: Nav Links */}
          <nav className="hidden md:flex items-center gap-9 lg:gap-11 xl:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] lg:text-base font-extrabold text-[#0D2318] hover:text-[#016C24] uppercase tracking-wider transition-colors duration-200 relative group py-1.5"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#016C24] to-[#C9A961] group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop Right / Mobile Right: Actions */}
          <div className="flex items-center gap-3.5 flex-shrink-0">
            {/* Search Input (Desktop only) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex items-center gap-2.5 bg-[#F9F6F1] rounded-full px-4 py-2.5 w-44 xl:w-56 border border-[#EDE8DF] focus-within:border-[#016C24] focus-within:bg-white focus-within:shadow-[0_4px_16px_rgba(1,108,36,0.1)] transition-all duration-300"
            >
              <Search className="w-4 h-4 text-[#767676] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search strains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-[#1A1A1A] placeholder-[#767676] outline-none w-full font-[Manrope] font-semibold"
              />
            </form>

            {/* Wishlist */}
            <Link
              href={isAuthenticated ? "/account/wishlist" : "/sign-in"}
              aria-label="Wishlist"
              className="p-2.5 rounded-full hover:bg-[#F5F0E8] transition-all hover:scale-105 active:scale-95 relative"
            >
              <Heart className="w-5 h-5 text-[#1A1A1A] hover:text-[#016C24] transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-red-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href={isAuthenticated ? "/account" : "/sign-in"}
              aria-label="Account"
              className="p-2.5 rounded-full hover:bg-[#F5F0E8] transition-all hover:scale-105 active:scale-95 relative"
            >
              <User className="w-5 h-5 text-[#1A1A1A] hover:text-[#016C24] transition-colors" />
              {isAuthenticated && (
                <span className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 bg-[#016C24] rounded-full ring-2 ring-white" />
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCartDrawer}
              aria-label="Shopping Cart"
              className="p-2.5 rounded-full hover:bg-[#F5F0E8] transition-all hover:scale-105 active:scale-95 relative"
            >
              <ShoppingCart className="w-5 h-5 text-[#1A1A1A] hover:text-[#016C24] transition-colors" />
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-gradient-to-r from-[#016C24] to-[#1E4D35] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(1,108,36,0.35)]">
                {cartCount}
              </span>
            </button>

            {/* Shop Now Button */}
            <Link
              href="/shop"
              className="hidden sm:inline-flex btn-green text-xs px-6 py-3 shadow-md hover:shadow-lg font-extrabold tracking-widest uppercase rounded-full"
            >
              Shop Catalog
            </Link>
          </div>
        </div>

        {/* Mobile Left Drawer Navigation */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-50 bg-black md:hidden"
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-white shadow-2xl p-6 flex flex-col gap-6 md:hidden overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#EDE8DF]">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center"
                  >
                    <span
                      className="text-xl font-bold leading-none text-[#1B3A2D] tracking-tight"
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      Total
                    </span>
                    <span
                      className="text-xl font-bold leading-none text-[#027F2C] tracking-tight"
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      Herbal
                    </span>
                    <span
                      className="text-xl font-bold leading-none text-[#1B3A2D] tracking-tight"
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      Care
                    </span>
                  </Link>
                  <button
                    aria-label="Close menu"
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 rounded-full hover:bg-[#F5F0E8] transition-colors"
                  >
                    <X className="w-5 h-5 text-[#1A1A1A]" />
                  </button>
                </div>

                {/* Mobile Search Form */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-2 bg-[#F5F0E8] rounded-full px-4 py-2.5 w-full"
                >
                  <Search className="w-4 h-4 text-[#767676] flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm text-[#1A1A1A] placeholder-[#767676] outline-none w-full font-[Manrope]"
                  />
                </form>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2.5 px-3 rounded-lg text-[15px] font-semibold text-[#1A1A1A] hover:bg-[#F5F0E8] hover:text-[#2D6B4F] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto pt-4 border-t border-[#EDE8DF]">
                  <Link
                    href="/shop"
                    onClick={() => setMobileOpen(false)}
                    className="btn-green w-full justify-center text-center py-3 text-sm font-semibold rounded-full"
                  >
                    Shop Catalog
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
