"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Location", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#016C24] text-white text-[11px] font-semibold tracking-widest py-2.5 select-none overflow-hidden relative w-full">
        <div className="animate-marquee whitespace-nowrap flex">
          <span className="pr-16">PREMIUM CANNABIS PRODUCTS&nbsp;&nbsp;•&nbsp;&nbsp;ADULTS 21+ ONLY&nbsp;&nbsp;•&nbsp;&nbsp;LAB TESTED&nbsp;&nbsp;•&nbsp;&nbsp;SECURE SHOPPING&nbsp;&nbsp;•&nbsp;&nbsp;</span>
          <span className="pr-16">PREMIUM CANNABIS PRODUCTS&nbsp;&nbsp;•&nbsp;&nbsp;ADULTS 21+ ONLY&nbsp;&nbsp;•&nbsp;&nbsp;LAB TESTED&nbsp;&nbsp;•&nbsp;&nbsp;SECURE SHOPPING&nbsp;&nbsp;•&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-white"
        )}
      >
        <div className="container-site flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-1 group">
            <span
              className="text-xl font-bold leading-none"
              style={{ fontFamily: "Times New Roman, serif", color: "#1B3A2D" }}
            >
              Total
            </span>
            <span
              className="text-xl font-bold leading-none"
              style={{ fontFamily: "Times New Roman, serif", color: "#027F2C" }}
            >
              Herbal
            </span>
            <span
              className="text-xl font-bold leading-none"
              style={{ fontFamily: "Times New Roman, serif", color: "#1B3A2D" }}
            >
              Care
            </span>
          </Link>

          {/* Desktop Nav */}
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

          {/* Search + Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar (desktop) */}
            <div className="hidden lg:flex items-center gap-2 bg-[#F5F0E8] rounded-full px-3 py-1.5 w-40 xl:w-52">
              <Search className="w-3.5 h-3.5 text-[#767676] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-[#1A1A1A] placeholder-[#767676] outline-none w-full font-[Manrope]"
              />
            </div>

            {/* Icon Buttons */}
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-[#F5F0E8] transition-colors"
            >
              <Search className="w-4.5 h-4.5 text-[#1A1A1A]" />
            </button>

            <Link
              href="/account/wishlist"
              aria-label="Wishlist"
              className="p-2 rounded-full hover:bg-[#F5F0E8] transition-colors relative"
            >
              <Heart className="w-4.5 h-4.5 text-[#1A1A1A]" />
            </Link>

            <Link
              href="/account"
              aria-label="Account"
              className="p-2 rounded-full hover:bg-[#F5F0E8] transition-colors"
            >
              <User className="w-4.5 h-4.5 text-[#1A1A1A]" />
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className="p-2 rounded-full hover:bg-[#F5F0E8] transition-colors relative"
            >
              <ShoppingCart className="w-4.5 h-4.5 text-[#1A1A1A]" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#2D6B4F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            <Link
              href="/shop"
              className="hidden sm:inline-flex btn-green text-sm ml-1"
            >
              Shop Now
            </Link>

            {/* Mobile menu toggle */}
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-full hover:bg-[#F5F0E8] transition-colors"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden border-t border-[#EDE8DF]"
            >
              <div className="container-site py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2.5 px-3 rounded-lg text-sm font-medium text-[#1A1A1A] hover:bg-[#F5F0E8] hover:text-[#2D6B4F] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3 border-t border-[#EDE8DF] mt-1">
                  <Link href="/shop" className="btn-green w-full justify-center">
                    Shop Now
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
