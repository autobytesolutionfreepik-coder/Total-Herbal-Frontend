"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  ShoppingCart,
  ChevronDown,
  Filter,
  X,
  Mail,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/format";

/* ─── Static Mock Data ────────────────────────────────────────────────────── */

const categoriesList = [
  "Flower",
  "Pre-Rolls",
  "Vapes",
  "Edibles",
  "Concentrates",
  "Infused Drinks",
  "Oils",
  "Tinctures",
  "Herbal Teas",
  "Apothecary",
];

const desiredEffects = ["Calm", "Focus", "Sleep", "Energy", "Relief"];

const productsList = [
  {
    id: "1",
    name: "Skywalker OG",
    sub: "Indica • 24% THC",
    price: 45.0,
    rating: 4.9,
    reviews: 124,
    img: "/images/Skywalker-OG.png",
  },
  {
    id: "2",
    name: "Nightfall Chocolate",
    sub: "CBD • Melatonin",
    price: 28.0,
    rating: 5.0,
    reviews: 88,
    img: "/images/Nightfall-Chocolate.png",
  },
  {
    id: "3",
    name: "Golden Hour Cart",
    sub: "Sativa • Terpene Rich",
    price: 55.0,
    rating: 4.8,
    reviews: 210,
    img: "/images/Golden-Hour-Cart.png",
  },
  {
    id: "4",
    name: "Royal Diamond Roll",
    sub: "Kief Infused • High Potency",
    price: 32.0,
    rating: 4.7,
    reviews: 56,
    img: "/images/Royal-Diamond-Roll.png",
  },
  {
    id: "5",
    name: "Skywalker OG",
    sub: "Indica • 24% THC",
    price: 45.0,
    rating: 4.9,
    reviews: 124,
    img: "/images/Skywalker-OG.png",
  },
  {
    id: "6",
    name: "Nightfall Chocolate",
    sub: "CBD • Melatonin",
    price: 28.0,
    rating: 5.0,
    reviews: 88,
    img: "/images/Nightfall-Chocolate.png",
  },
  {
    id: "7",
    name: "Golden Hour Cart",
    sub: "Sativa • Terpene Rich",
    price: 55.0,
    rating: 4.8,
    reviews: 210,
    img: "/images/Golden-Hour-Cart.png",
  },
  {
    id: "8",
    name: "Royal Diamond Roll",
    sub: "Kief Infused • High Potency",
    price: 32.0,
    rating: 4.7,
    reviews: 56,
    img: "/images/Royal-Diamond-Roll.png",
  },
  {
    id: "9",
    name: "Skywalker OG",
    sub: "Indica • 24% THC",
    price: 45.0,
    rating: 4.9,
    reviews: 124,
    img: "/images/Skywalker-OG.png",
  },
  {
    id: "10",
    name: "Nightfall Chocolate",
    sub: "CBD • Melatonin",
    price: 28.0,
    rating: 5.0,
    reviews: 88,
    img: "/images/Nightfall-Chocolate.png",
  },
  {
    id: "11",
    name: "Golden Hour Cart",
    sub: "Sativa • Terpene Rich",
    price: 55.0,
    rating: 4.8,
    reviews: 210,
    img: "/images/Golden-Hour-Cart.png",
  },
  {
    id: "12",
    name: "Royal Diamond Roll",
    sub: "Kief Infused • High Potency",
    price: 32.0,
    rating: 4.7,
    reviews: 56,
    img: "/images/Royal-Diamond-Roll.png",
  },
  {
    id: "13",
    name: "Skywalker OG",
    sub: "Indica • 24% THC",
    price: 45.0,
    rating: 4.9,
    reviews: 124,
    img: "/images/Skywalker-OG.png",
  },
  {
    id: "14",
    name: "Nightfall Chocolate",
    sub: "CBD • Melatonin",
    price: 28.0,
    rating: 5.0,
    reviews: 88,
    img: "/images/Nightfall-Chocolate.png",
  },
  {
    id: "15",
    name: "Golden Hour Cart",
    sub: "Sativa • Terpene Rich",
    price: 55.0,
    rating: 4.8,
    reviews: 210,
    img: "/images/Golden-Hour-Cart.png",
  },
  {
    id: "16",
    name: "Royal Diamond Roll",
    sub: "Kief Infused • High Potency",
    price: 32.0,
    rating: 4.7,
    reviews: 56,
    img: "/images/Royal-Diamond-Roll.png",
  },
];

const testimonials = [
  {
    id: 1,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Sarah L.",
    role: "VERIFIED CUSTOMER",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 2,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Marcus R.",
    role: "VERIFIED CUSTOMER",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    id: 3,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Elena K.",
    role: "VERIFIED CUSTOMER",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
  },
];

/* ─── Motion Variants ─────────────────────────────────────────────────────── */

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Flower"]);
  const [selectedEffect, setSelectedEffect] = useState<string>("Focus");
  const [priceMax, setPriceMax] = useState<number>(200);
  const [sortBy, setSortBy] = useState<string>("Best Selling");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen pb-12 font-[Manrope]">
      {/* ══ 1. FULL BLEED EDGE-TO-EDGE HERO BANNER ════════════════════════════ */}
      <section className="relative w-full bg-[#F4F1EA] border-b border-[#E5DFD3] overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px] 2xl:min-h-[380px] flex items-center">
        {/* Full Bleed Image (shop-banner.png) */}
        <Image
          src="/images/shop-banner.png"
          alt="Our Collection Banner Graphic"
          fill
          className="object-cover object-right"
          priority
          sizes="100vw"
        />

        {/* Left Fade Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1EA] via-[#F4F1EA]/80 via-35% to-transparent pointer-events-none" />

        {/* Inner Content */}
        <div className="container-site relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="py-8 md:py-12 2xl:py-14 max-w-xl text-left"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-1.5 text-[11px] md:text-xs text-[#767676] mb-2 font-medium">
              <Link href="/" className="hover:text-[#016C24] transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="font-medium text-[#1A1A1A]">Shop</span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold leading-none mb-3 text-[#016C24]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Our Collection
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xs md:text-sm 2xl:text-base text-[#4A4A4A] leading-relaxed max-w-md font-medium"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. MAIN SHOP CONTENT (STICKY SIDEBAR + PRODUCT GRID) ═══════════════ */}
      <section className="py-8 md:py-12">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row gap-8 2xl:gap-12 items-start relative">
            {/* ── STICKY Desktop Sidebar Filter ── */}
            <aside className="hidden lg:block w-64 xl:w-72 2xl:w-80 flex-shrink-0 sticky top-24 self-start space-y-8 bg-transparent transition-all">
              {/* Category Accordion */}
              <div className="pb-6 border-b border-[#E2DAD0]">
                <button
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="w-full flex items-center justify-between text-left mb-4 group"
                >
                  <h3 className="text-xs font-extrabold tracking-widest uppercase text-[#016C24]">
                    CATEGORY
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-[#016C24] transition-transform duration-200 ${
                      categoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {categoryOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      {categoriesList.map((cat) => {
                        const isChecked = selectedCategories.includes(cat);
                        return (
                          <label
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className="flex items-center gap-3 text-sm text-[#4A4A4A] hover:text-[#016C24] cursor-pointer select-none group transition-colors"
                          >
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${
                                isChecked
                                  ? "bg-[#016C24] border-[#016C24] text-white"
                                  : "border border-[#A8A196] bg-white group-hover:border-[#016C24]"
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={isChecked ? "font-semibold text-[#1A1A1A]" : ""}>
                              {cat}
                            </span>
                          </label>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desired Effect Pill Filter */}
              <div className="pb-6 border-b border-[#E2DAD0]">
                <h3 className="text-xs font-extrabold tracking-widest uppercase text-[#016C24] mb-4">
                  DESIRED EFFECT
                </h3>
                <div className="flex flex-wrap gap-2">
                  {desiredEffects.map((eff) => {
                    const isSelected = selectedEffect === eff;
                    return (
                      <button
                        key={eff}
                        onClick={() => setSelectedEffect(eff)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-[#016C24] text-white shadow-sm"
                            : "bg-white/70 text-[#4A4A4A] border border-[#D5CECE] hover:border-[#016C24] hover:text-[#016C24]"
                        }`}
                      >
                        {eff}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <h3 className="text-xs font-extrabold tracking-widest uppercase text-[#016C24] mb-4">
                  PRICE RANGE
                </h3>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[#016C24] cursor-pointer"
                />
                <div className="flex justify-between items-center text-xs font-medium text-[#767676] mt-2">
                  <span>$0</span>
                  <span>${priceMax}+</span>
                </div>
              </div>
            </aside>

            {/* ── Main Product Area ── */}
            <div className="flex-1 w-full min-w-0">
              {/* Top Controls Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  {/* Mobile filter toggle */}
                  <button
                    onClick={() => setMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#D5CECE] text-xs font-semibold text-[#1A1A1A] shadow-sm"
                  >
                    <Filter className="w-3.5 h-3.5 text-[#016C24]" />
                    <span>Filters</span>
                  </button>
                  <p className="text-xs md:text-sm font-medium text-[#767676]">
                    Showing <span className="text-[#1A1A1A] font-semibold">16</span> products
                  </p>
                </div>

                {/* Sort By Selector */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs text-[#767676] font-medium">Sort by:</span>
                  <div className="relative inline-block">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-[#D5CECE] rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-[#1A1A1A] outline-none cursor-pointer hover:border-[#016C24] transition-colors shadow-sm"
                    >
                      <option value="Best Selling">Best Selling</option>
                      <option value="Price: Low to High">Price: Low to High</option>
                      <option value="Price: High to Low">Price: High to Low</option>
                      <option value="Newest">Newest</option>
                      <option value="Top Rated">Top Rated</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#016C24] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* ── Product Grid ── */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5 2xl:gap-6"
              >
                {productsList.map((p, idx) => (
                  <motion.div key={`${p.id}-${idx}`} variants={fadeIn}>
                    <div className="group relative rounded-[20px] overflow-hidden flex flex-col bg-white border border-[#E8E0D2] hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 h-full">
                      {/* Image container */}
                      <div className="relative overflow-hidden w-full aspect-[4/5] bg-[#FAF8F5]">
                        <Image
                          src={p.img}
                          alt={p.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, (max-width:1536px) 33vw, 25vw"
                        />
                      </div>

                      {/* Content Area */}
                      <div className="p-4 flex flex-col justify-between flex-1">
                        <div>
                          {/* Rating Row */}
                          <div className="flex items-center gap-1.5 mb-1.5 text-xs">
                            <div className="flex items-center text-[#016C24]">
                              <Star className="w-3.5 h-3.5 fill-[#016C24]" />
                            </div>
                            <span className="font-bold text-[#016C24] text-[11px]">
                              {p.rating}
                            </span>
                            <span className="text-[#767676] text-[11px]">
                              ({p.reviews} reviews)
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className="font-bold text-base text-[#1A1A1A] mb-1 group-hover:text-[#016C24] transition-colors"
                            style={{ fontFamily: "Times New Roman, serif" }}
                          >
                            {p.name}
                          </h3>

                          {/* Subtitle / Category spec */}
                          <p className="text-xs text-[#767676] font-medium mb-3">
                            {p.sub}
                          </p>
                        </div>

                        {/* Price & Cart button */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#F0EBE1]">
                          <span className="text-sm font-bold text-[#016C24]">
                            {formatCurrency(p.price)}
                          </span>

                          <Button
                            variant="primary"
                            size="icon"
                            className="w-8 h-8 rounded-full shadow-sm hover:scale-105 transition-transform"
                            aria-label={`Add ${p.name} to cart`}
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* ── Pagination ── */}
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-9 h-9 rounded-full border border-[#D5CECE] bg-white flex items-center justify-center text-xs font-semibold text-[#767676] hover:border-[#016C24] hover:text-[#016C24] transition-colors disabled:opacity-40"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-full text-xs font-semibold transition-all ${
                      currentPage === page
                        ? "bg-[#016C24] text-white shadow-md"
                        : "bg-white border border-[#D5CECE] text-[#4A4A4A] hover:border-[#016C24]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <span className="text-xs text-[#767676] px-1">...</span>

                <button
                  onClick={() => setCurrentPage(12)}
                  className={`w-9 h-9 rounded-full text-xs font-semibold transition-all ${
                    currentPage === 12
                      ? "bg-[#016C24] text-white shadow-md"
                      : "bg-white border border-[#D5CECE] text-[#4A4A4A] hover:border-[#016C24]"
                  }`}
                >
                  12
                </button>

                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="w-9 h-9 rounded-full border border-[#D5CECE] bg-white flex items-center justify-center text-xs font-semibold text-[#767676] hover:border-[#016C24] hover:text-[#016C24] transition-colors"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. WHAT OUR COMMUNITY SAYS (TESTIMONIALS) ═════════════════════════ */}
      <section className="py-16 bg-[#F5F0E8] border-t border-[#E8E0D2]">
        <div className="container-site">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2
              className="text-2xl md:text-4xl font-bold mb-3 text-[#016C24]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              What Our Community Says
            </h2>
            <div className="flex justify-center items-center gap-1 text-[#016C24]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#016C24]" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: t.id * 0.1 }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-[#E8E0D2] flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <p className="text-xs md:text-sm text-[#4A4A4A] leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#F0EBE1]">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#E8E0D2]">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">{t.name}</h4>
                    <p className="text-[10px] font-bold text-[#016C24] tracking-wider uppercase">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. STAY ELEVATED NEWSLETTER BANNER ════════════════════════════════ */}
      <section className="py-8 bg-[#F5F0E8]">
        <div className="container-site">
          <div className="relative rounded-3xl overflow-hidden py-12 px-8 md:px-28 bg-[#016C24] shadow-xl">
            {/* Left Leaf Graphic */}
            <div className="absolute left-0 bottom-0 top-0 w-[120px] md:w-[250px] pointer-events-none select-none">
              <Image
                src="/images/cta-left.png"
                alt="Cannabis Leaf Left"
                fill
                className="object-contain object-left-bottom"
                sizes="(max-width: 768px) 120px, 250px"
              />
            </div>

            {/* Right Leaf Graphic */}
            <div className="absolute right-0 bottom-0 top-0 w-[120px] md:w-[280px] pointer-events-none select-none">
              <Image
                src="/images/Cta-right.png"
                alt="Cannabis Leaf Right"
                fill
                className="object-contain object-right-bottom"
                sizes="(max-width: 768px) 120px, 280px"
              />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-left text-white max-w-md">
                <h2
                  className="text-2xl md:text-4xl font-bold text-white mb-2"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Stay Elevated
                </h2>
                <p className="text-sm md:text-base text-white/85 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row w-full lg:w-auto items-stretch sm:items-center gap-3">
                {/* Email input pill */}
                <div className="relative flex items-center bg-white rounded-full px-4 py-2.5 flex-1 sm:w-80 shadow-md">
                  <Mail className="w-4 h-4 text-gray-400 mr-2.5 flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400 w-full"
                  />
                </div>
                {/* Subscribe Button */}
                <Button
                  variant="primary"
                  className="rounded-full px-8 py-2.5 border border-white text-white bg-transparent hover:bg-white hover:text-[#016C24] transition-all font-semibold shadow-md shrink-0"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile Filter Drawer Modal ── */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 z-50 bg-black lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 z-50 w-[300px] bg-white p-6 flex flex-col gap-6 overflow-y-auto lg:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#EDE8DF]">
                <h2 className="text-base font-bold text-[#016C24]">Filter Products</h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full hover:bg-[#F5F0E8]"
                >
                  <X className="w-5 h-5 text-[#1A1A1A]" />
                </button>
              </div>

              {/* Mobile Filter Options */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-extrabold tracking-widest uppercase text-[#016C24] mb-3">
                    CATEGORY
                  </h3>
                  <div className="space-y-2.5">
                    {categoriesList.map((cat) => (
                      <label
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className="flex items-center gap-3 text-sm text-[#4A4A4A] cursor-pointer"
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center ${
                            selectedCategories.includes(cat)
                              ? "bg-[#016C24] text-white"
                              : "border border-[#A8A196]"
                          }`}
                        >
                          {selectedCategories.includes(cat) && (
                            <Check className="w-3 h-3 stroke-[3]" />
                          )}
                        </div>
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-extrabold tracking-widest uppercase text-[#016C24] mb-3">
                    DESIRED EFFECT
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {desiredEffects.map((eff) => (
                      <button
                        key={eff}
                        onClick={() => setSelectedEffect(eff)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedEffect === eff
                            ? "bg-[#016C24] text-white"
                            : "bg-[#F5F0E8] text-[#4A4A4A]"
                        }`}
                      >
                        {eff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-[#EDE8DF]">
                <Button
                  onClick={() => setMobileFilterOpen(false)}
                  variant="primary"
                  className="w-full justify-center"
                >
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
