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
      <div className="bg-[#016C24] text-white text-[11px] font-semibold tracking-widest py-2.5 select-none overflow-hidden relative w-full">
        <div className="animate-marquee whitespace-nowrap flex">
          <span className="pr-16">
            PREMIUM ORGANIC HERBAL CARE &nbsp;•&nbsp; ADULTS 21+ ONLY &nbsp;•&nbsp; LAB
            TESTED &nbsp;•&nbsp; 100% SECURE SHOPPING &nbsp;•&nbsp;
          </span>
          <span className="pr-16">
            PREMIUM ORGANIC HERBAL CARE &nbsp;•&nbsp; ADULTS 21+ ONLY &nbsp;•&nbsp; LAB
            TESTED &nbsp;•&nbsp; 100% SECURE SHOPPING &nbsp;•&nbsp;
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-white border-b border-[#EDE8DF]"
        )}
      >
        <div className="container-site flex items-center justify-between h-16 gap-4">
          {/* Mobile: Left Hamburger Toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 -ml-2 rounded-full hover:bg-[#F5F0E8] transition-colors"
          >
            <Menu className="w-5 h-5 text-[#1A1A1A]" />
          </button>

          {/* Desktop Left / Mobile Center: Logo */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <Link href="/" className="inline-flex items-center group">
              <span
                className="text-2xl sm:text-3xl font-bold leading-none text-[#1B3A2D] tracking-tight"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Total
              </span>
              <span
                className="text-2xl sm:text-3xl font-bold leading-none text-[#027F2C] tracking-tight"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Herbal
              </span>
              <span
                className="text-2xl sm:text-3xl font-bold leading-none text-[#1B3A2D] tracking-tight"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Care
              </span>
            </Link>
          </div>

          {/* Desktop Center: Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-[#1A1A1A] hover:text-[#2D6B4F] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#2D6B4F] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop Right / Mobile Right: Actions */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Search Input (Desktop only) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex items-center gap-2 bg-[#F5F0E8] rounded-full px-3 py-1.5 w-40 xl:w-52 border border-transparent focus-within:border-green-700 transition-all"
            >
              <Search className="w-3.5 h-3.5 text-[#767676] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search strains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-[#1A1A1A] placeholder-[#767676] outline-none w-full font-[Manrope]"
              />
            </form>

            {/* Wishlist */}
            <Link
              href={isAuthenticated ? "/account/wishlist" : "/sign-in"}
              aria-label="Wishlist"
              className="p-2 rounded-full hover:bg-[#F5F0E8] transition-colors relative"
            >
              <Heart className="w-4.5 h-4.5 text-[#1A1A1A]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href={isAuthenticated ? "/account" : "/sign-in"}
              aria-label="Account"
              className="p-2 rounded-full hover:bg-[#F5F0E8] transition-colors relative"
            >
              <User className="w-4.5 h-4.5 text-[#1A1A1A]" />
              {isAuthenticated && (
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-600 rounded-full ring-2 ring-white" />
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCartDrawer}
              aria-label="Shopping Cart"
              className="p-2 rounded-full hover:bg-[#F5F0E8] transition-colors relative"
            >
              <ShoppingCart className="w-4.5 h-4.5 text-[#1A1A1A]" />
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#2D6B4F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Shop Now Button */}
            <Link
              href="/shop"
              className="hidden sm:inline-flex btn-green text-xs px-4 py-2"
            >
              Shop Now
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
