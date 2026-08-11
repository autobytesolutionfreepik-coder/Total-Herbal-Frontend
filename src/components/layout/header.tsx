"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
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

function SafeNavLinks({ navLinks }: { navLinks: { label: string; href: string }[] }) {
  let pathname = "/";
  try {
    pathname = usePathname() || "/";
  } catch {
    pathname = "/";
  }

  return (
    <nav className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8">
      {navLinks.map((link) => {
        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
        return (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "text-[14px] xl:text-[15px] font-semibold transition-colors duration-200 relative py-2.5 whitespace-nowrap",
              isActive
                ? "text-[#006828] border-b-2 border-[#006828]"
                : "text-[#6E6E73] hover:text-[#006828]"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { isAuthenticated } = useAuthStore();

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
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 bg-white border-b border-[#E5E5E5] w-full",
        scrolled ? "shadow-md" : ""
      )}
    >
      {/* Top Green Announcement Bar matching Screenshot 2 */}
      <div className="bg-[#006828] text-white text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase py-2 text-center select-none font-sans px-4">
        PREMIUM CANNABIS PRODUCTS &bull; ADULTS 21+ ONLY &bull; LAB TESTED &bull; SECURE SHOPPING
      </div>

      {/* Main Header Container */}
      <div className="container-site flex items-center justify-between h-20 gap-3 sm:gap-4">
        {/* Mobile/Tablet: Left Hamburger Toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 -ml-1 sm:-ml-2 rounded-full hover:bg-neutral-100 transition-colors text-[#1A1A1A] flex-shrink-0"
        >
          <Menu className="w-6 h-6 text-[#1A1A1A]" />
        </button>

        {/* Desktop/Mobile Left: Logo matching Figma */}
        <div className="flex-1 lg:flex-initial flex justify-center lg:justify-start min-w-0">
          <Link href="/" className="inline-flex items-center group whitespace-nowrap">
            <span
              className="text-2xl sm:text-3xl lg:text-[2.2rem] font-medium leading-none text-black tracking-tight"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Total
            </span>
            <span
              className="text-2xl sm:text-3xl lg:text-[2.2rem] font-medium leading-none text-[#006828] tracking-tight"
              style={{ fontFamily: "Times New Roman, serif", color: "#006828" }}
            >
              Herbal
            </span>
            <span
              className="text-2xl sm:text-3xl lg:text-[2.2rem] font-medium leading-none text-black tracking-tight"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Care
            </span>
          </Link>
        </div>

        {/* Desktop Center: Nav Links */}
        <SafeNavLinks navLinks={navLinks} />

        {/* Desktop Right / Mobile Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Search Input Pill */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden xl:flex items-center gap-2 bg-[#F0F0F0] rounded-full px-4 py-2 w-40 xl:w-52 focus-within:bg-white focus-within:ring-1 focus-within:ring-[#006828] transition-all duration-300 border border-transparent focus-within:border-[#006828]"
          >
            <Search className="w-4 h-4 text-[#8E8E93] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-[#1A1A1A] placeholder-[#8E8E93] outline-none w-full font-medium"
            />
          </form>

          {/* Account */}
          <Link
            href={isAuthenticated ? "/account" : "/sign-in"}
            aria-label="Account"
            className="p-1.5 sm:p-2 rounded-full hover:bg-neutral-100 transition-all text-[#006828]"
          >
            <User className="w-5 h-5 text-[#006828]" style={{ color: "#006828" }} />
          </Link>

          {/* Wishlist */}
          <Link
            href={isAuthenticated ? "/account/wishlist" : "/sign-in"}
            aria-label="Wishlist"
            className="p-1.5 sm:p-2 rounded-full hover:bg-neutral-100 transition-all text-[#006828] relative"
          >
            <Heart className="w-5 h-5 text-[#006828]" style={{ color: "#006828" }} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger */}
          <button
            onClick={openCartDrawer}
            aria-label="Shopping Cart"
            className="p-1.5 sm:p-2 rounded-full hover:bg-neutral-100 transition-all text-[#006828] relative"
          >
            <ShoppingCart className="w-5 h-5 text-[#006828]" style={{ color: "#006828" }} />
            <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#006828] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Shop Now Button matching Figma */}
          <Link
            href="/shop"
            className="hidden sm:inline-flex bg-[#006828] hover:bg-[#005220] text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-200 shadow-sm whitespace-nowrap"
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
                className="fixed inset-0 z-50 bg-black xl:hidden"
              />

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-white shadow-2xl p-6 flex flex-col gap-6 xl:hidden overflow-y-auto"
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
  );
}
