"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Star,
  ChevronDown,
  MapPin,
  Phone,
  Clock,
  ShoppingCart,
  Shield,
  FlaskConical,
  Award,
  Users,
  Package,
  Lock,
  CheckCircle2,
  Mail,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useProductsQuery, useCategoriesQuery } from "@/features/catalog/api";
import { useBlogPostsQuery } from "@/features/blog/api";
import { useSubscribeNewsletterMutation } from "@/features/marketing/api";
import { useAddToCartMutation } from "@/features/cart/api";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";

/* ─── Fallback Static Data ─────────────────────────────────────────────────────────── */

const trustItems = [
  { img: "/icons/Premium-Quality.png", label: "Premium", sub: "Quality" },
  { img: "/icons/Lab-Tested.png", label: "Lab", sub: "Tested" },
  {
    img: "/icons/Licensed-Dispensary.png",
    label: "Licensed",
    sub: "Dispensary",
  },
  { img: "/icons/Wide-Selection.png", label: "Wide", sub: "Selection" },
  { img: "/icons/Friendly-Experts.png", label: "Friendly", sub: "Experts" },
  { img: "/icons/Secure-Checkout.png", label: "Secure", sub: "Checkout" },
];

const defaultCategories = [
  { label: "Flower", slug: "flower", img: "/images/Flower.png" },
  { label: "Pre-Rolls", slug: "pre-rolls", img: "/images/Pre-Rolls.png" },
  { label: "Vapes", slug: "vapes", img: "/images/Vapes.png" },
  { label: "Edibles", slug: "edibles", img: "/images/Edibles.png" },
  {
    label: "Concentrates",
    slug: "concentrates",
    img: "/images/Concentrates.png",
  },
  {
    label: "Infused Drinks",
    slug: "infused-drinks",
    img: "/images/Infused-Drinks.png",
  },
  { label: "Oils", slug: "oils", img: "/images/Oils.png" },
  { label: "Tinctures", slug: "tinctures", img: "/images/Tinctures.png" },
  { label: "Herbal Teas", slug: "herbal-teas", img: "/images/Herbal-Teas.png" },
  { label: "Apothecary", slug: "apothecary", img: "/images/Apothecary.png" },
];

const defaultNewArrivals = [
  {
    id: "1",
    name: "Skywalker OG",
    type: "FLOWER",
    strain: "Indica",
    thc: "24% THC",
    price: "45.00",
    rating: 4.9,
    reviewsCount: 124,
    img: "/images/Skywalker-OG.png",
    slug: "skywalker-og",
  },
  {
    id: "2",
    name: "Nightfall Chocolate",
    type: "EDIBLE",
    strain: "CBD",
    thc: "Melatonin",
    price: "28.00",
    rating: 5.0,
    reviewsCount: 88,
    img: "/images/Nightfall-Chocolate.png",
    slug: "nightfall-chocolate",
  },
  {
    id: "3",
    name: "Golden Hour Cart",
    type: "VAPE",
    strain: "Sativa",
    thc: "Terpene Rich",
    price: "55.00",
    rating: 4.8,
    reviewsCount: 210,
    img: "/images/Golden-Hour-Cart.png",
    slug: "golden-hour-cart",
  },
  {
    id: "4",
    name: "Royal Diamond Roll",
    type: "PRE-ROLL",
    strain: "Kief Infused",
    thc: "High Potency",
    price: "32.00",
    rating: 4.7,
    reviewsCount: 56,
    img: "/images/Royal-Diamond-Roll.png",
    slug: "royal-diamond-roll",
  },
];

const differenceCards = [
  {
    icon: Award,
    title: "Premium Quality",
    desc: "Rigorous organic sourcing standards ensured for pure, potent, unadulterated herbal formulas.",
  },
  {
    icon: FlaskConical,
    title: "Lab Tested",
    desc: "Every strain batch undergoes third-party ISO lab testing for cannabinoids, terpenes, and purity.",
  },
  {
    icon: Shield,
    title: "Licensed Dispensary",
    desc: "Fully compliant legal state dispensary adhering to strict safety and age verification standards.",
  },
  {
    icon: Package,
    title: "Wide Selection",
    desc: "Curated flowers, full-spectrum vapes, precision-dosed edibles, tinctures, and apothecary line.",
  },
  {
    icon: Users,
    title: "Friendly Experts",
    desc: "Our knowledgeable herbal wellness consultants guide your personal strain selection.",
  },
  {
    icon: Lock,
    title: "Secure Checkout",
    desc: "End-to-end encrypted checkout supporting credit card intents and cash-on-delivery.",
  },
];

const testimonials = [
  {
    text: "Total Herbal Care transformed my evening sleep routine. The Skywalker OG strain is remarkably smooth and deeply relaxing.",
    author: "Sarah J.",
    role: "Verified Customer",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&q=80",
  },
  {
    text: "Top-notch lab-tested quality. The delivery was fast, discreet, and the Golden Hour vape cart has an incredible natural terpene flavor.",
    author: "Marcus W.",
    role: "Regular Member",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80",
  },
  {
    text: "Customer service and educational blog guides helped me choose the exact CBD chocolate for muscle recovery. Highly recommended!",
    author: "Diana R.",
    role: "Verified Customer",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80",
  },
];

const defaultBlogPosts = [
  {
    id: "1",
    category: "BEGINNER",
    title: "A Beginner's Guide to CBD & Wellness",
    excerpt: "Learn how full-spectrum cannabinoids interact with your endocannabinoid system to support daily balance.",
    img: "/images/Beginners.png",
    slug: "beginners-guide-to-cbd",
  },
  {
    id: "2",
    category: "SCIENCE",
    title: "Understanding Terpenes & Strain Entourage",
    excerpt: "Explore the aromatic compounds that define strain effects, flavor profiles, and therapeutic benefits.",
    img: "/images/science.png",
    slug: "understanding-terpenes",
  },
  {
    id: "3",
    category: "LIFESTYLE",
    title: "The Art of Organic Pre-Roll Craftsmanship",
    excerpt: "From unbleached hemp papers to kief infusion techniques, discover premium pre-roll standards.",
    img: "/images/LIFESTYLE.png",
    slug: "the-art-of-pre-rolls",
  },
];

const locations = [
  {
    name: "Total Herbal Care — Westside",
    address: "520 Overthrow Blvd, Los Angeles, CA 90011",
    hours: "Open · Closes 10:00 PM",
    phone: "(716) 556-0125",
    img: "/images/Apothecary.png",
  },
  {
    name: "Total Herbal Care — Downtown",
    address: "112 Ocean Road, Los Angeles, CA 90011",
    hours: "Open · Closes 10:00 PM",
    phone: "(716) 556-0125",
    img: "/images/Find-a-Location-Near-You.png",
  },
];

const faqs = [
  {
    q: "Are all products third-party lab tested?",
    a: "Yes! Every single product batch at Total Herbal Care undergoes comprehensive ISO-accredited lab testing for cannabinoid potency, terpene profiles, pesticides, heavy metals, and residual solvents.",
  },
  {
    q: "What is the legal purchase age limit?",
    a: "In compliance with state regulations, all customers must be 21 years of age or older with valid government-issued photo identification.",
  },
  {
    q: "How does same-day local dispensary delivery work?",
    a: "Orders submitted before 4:00 PM in qualifying local zip codes are delivered same-day in discreet, temperature-controlled packaging.",
  },
];

/* ─── Animation Variants ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const },
  },
};
const stagger = { show: { transition: { staggerChildren: 0.09 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const },
  },
};

/* ══════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");

  const { isAuthenticated } = useAuthStore();
  const addToCartMutation = useAddToCartMutation();
  const addItemToLocalCart = useCartStore((s) => s.addItem);
  const openCartDrawer = useCartStore((s) => s.openCart);

  // Dynamic API Queries
  const { data: serverProducts } = useProductsQuery({ limit: 4 });
  const { data: serverCategories } = useCategoriesQuery();
  const { data: serverBlogPosts } = useBlogPostsQuery({ limit: 3 });

  const newsletterMutation = useSubscribeNewsletterMutation();

  // Reconcile dynamic products or fallback to default
  const newArrivals = serverProducts?.data?.length
    ? serverProducts.data.map((p: any) => ({
      id: p.id,
      name: p.name,
      type: p.category?.name?.toUpperCase() || "HERBAL",
      strain: p.strainType || "Hybrid",
      thc: p.thcContent ? `${p.thcContent}% THC` : "Full Spectrum",
      price: p.price,
      rating: Number(p.ratingAvg || 4.9),
      reviewsCount: p.ratingCount || 12,
      img: p.images?.[0]?.url || "/images/Skywalker-OG.png",
      slug: p.slug,
      rawProduct: p,
    }))
    : defaultNewArrivals;

  const categoriesList = serverCategories?.length
    ? serverCategories.map((c: any) => ({
      label: c.name,
      slug: c.slug,
      img: c.image || "/images/Flower.png",
    }))
    : defaultCategories;

  const blogPostsList = serverBlogPosts?.data?.length
    ? serverBlogPosts.data.map((b: any) => ({
      id: b.id,
      category: b.category?.name?.toUpperCase() || "WELLNESS",
      title: b.title,
      excerpt: b.excerpt,
      img: b.coverImage || "/images/Beginners.png",
      slug: b.slug,
    }))
    : defaultBlogPosts;

  const handleAddToCart = async (productObj: (typeof newArrivals)[0]) => {
    try {
      if (isAuthenticated) {
        await addToCartMutation.mutateAsync({ productId: productObj.id, quantity: 1 });
      } else {
        addItemToLocalCart({
          productId: productObj.id,
          quantity: 1,
          product: {
            id: productObj.id,
            name: productObj.name,
            slug: productObj.slug,
            price: productObj.price,
            stock: 10,
            images: [{ url: productObj.img }],
          },
        });
      }
      toast.success(`Added ${productObj.name} to cart!`);
      openCartDrawer();
    } catch {
      toast.error("Failed to add product to cart.");
    }
  };

  const handleSubscribeNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await newsletterMutation.mutateAsync(email);
      toast.success("Thank you for subscribing to Total Herbal Care!");
      setEmail("");
    } catch {
      toast.error("Newsletter subscription failed.");
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[560px] lg:min-h-[620px] overflow-hidden flex items-center"
        style={{ backgroundColor: "#1A2E1A" }}
      >
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/images/Hero_banner.png"
            alt="Premium cannabis products"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        </motion.div>

        <div className="container-site relative z-10 py-20 lg:py-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-[520px]"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span
                className="inline-flex items-center px-5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{
                  background: "rgba(255, 255, 255, 0.10)",
                  color: "#C9A961",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                ESTABLISHED 2024
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-bold leading-[1.08] mb-5"
              style={{
                fontFamily: "Times New Roman, serif",
                fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                color: "#fff",
              }}
            >
              Organic Cannabis
              <br />
              Formulas for Every
              <br />
              <span style={{ color: "#C9A961" }}>Lifestyle</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed mb-8 max-w-[460px]"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              Discover lab-tested organic flowers, precision-dosed edibles, full-spectrum vapes, and apothecary wellness remedies delivered to your door.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Button href="/shop" variant="primary">
                Shop Catalog
              </Button>
              <Button href="/contact" variant="outline">
                Find a Dispensary
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. TRUST STRIP ═══════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-10 md:-mt-14 bg-transparent py-0 animate-none">
        <div className="container-site">
          <div className="rounded-2xl py-5 px-6 md:px-10 shadow-lg bg-gradient-to-r from-[#2E3518] to-[#026C24]">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {trustItems.map(({ img, label, sub }) => (
                <div key={label} className="flex items-center gap-3 justify-start">
                  <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center flex-shrink-0 bg-white/5">
                    <Image
                      src={img}
                      alt={`${label} ${sub}`}
                      width={34}
                      height={34}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div className="leading-tight">
                    <p className="text-white text-[11px] md:text-[13px] font-semibold">
                      {label}
                    </p>
                    <p
                      className="text-[10px] md:text-[12px] font-semibold"
                      style={{ color: "#C9A961" }}
                    >
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. EXPLORE COLLECTION ════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-[2.2rem] font-bold"
              style={{ fontFamily: "Times New Roman, serif", color: "#016C24" }}
            >
              Explore Our Collection
            </motion.h2>
            <motion.div variants={fadeUp} className="flex justify-center mt-3 mb-1">
              <div
                className="w-10 h-[3px] rounded-full"
                style={{ background: "#C9A961" }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          >
            {categoriesList.map((cat: { label: string; slug: string; img: string }) => (
              <motion.div key={cat.label} variants={scaleIn}>
                <Link
                  href={`/shop?category=${cat.slug}`}
                  className="group block text-center"
                >
                  <div className="relative overflow-hidden rounded-xl mb-2.5 aspect-[4/3]">
                    <Image
                      src={cat.img}
                      alt={cat.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                    />
                  </div>
                  <p
                    className="text-sm font-semibold transition-colors"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      color: "#2D6B4F",
                    }}
                  >
                    {cat.label}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 4. NEW ARRIVALS ══════════════════════════════════════════════════ */}
      <section className="py-4" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold"
                style={{
                  fontFamily: "Times New Roman, serif",
                  color: "#016C24",
                }}
              >
                New Arrivals
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-sm mt-1"
                style={{ color: "#767676" }}
              >
                Fresh organic harvests and laboratory-tested dispensary additions.
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <Link
                href="/shop"
                className="text-sm font-semibold flex items-center gap-1 transition-colors hover:opacity-75"
                style={{
                  color: "#016C24",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                View All Products
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {newArrivals.map((p: { id: string; name: string; type: string; strain: string; thc: string; price: string; rating: number; reviewsCount: number; img: string; slug: string }) => {
              let badgeColor = "#016C24";
              if (p.type === "VAPE") {
                badgeColor = "#55605A";
              }
              return (
                <motion.div key={p.id} variants={scaleIn}>
                  <div className="group relative rounded-[20px] overflow-hidden flex flex-col bg-white border border-neutral-100 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full">
                    <Link href={`/products/${p.slug}`} className="block relative w-full aspect-[4/5]">
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      />
                      <span
                        className="absolute top-4 left-4 text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{ background: badgeColor }}
                      >
                        {p.type}
                      </span>
                    </Link>

                    <div className="p-5 flex flex-col gap-1.5 flex-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#016C24] text-[#016C24]" />
                        <span className="text-xs font-bold text-[#016C24]">
                          {p.rating}
                        </span>
                        <span className="text-xs text-[#767676]">
                          ({p.reviewsCount} reviews)
                        </span>
                      </div>

                      <Link href={`/products/${p.slug}`}>
                        <h3
                          className="font-bold leading-snug text-[1.1rem] text-[#016C24] hover:opacity-80 transition-opacity"
                          style={{ fontFamily: "var(--font-sans), sans-serif" }}
                        >
                          {p.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-[#767676] font-medium">
                        {p.strain} • {p.thc}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-3">
                        <span
                          className="font-bold text-lg text-[#016C24]"
                          style={{ fontFamily: "var(--font-sans), sans-serif" }}
                        >
                          {formatCurrency(p.price)}
                        </span>

                        <Button
                          variant="primary"
                          size="icon"
                          onClick={() => handleAddToCart(p)}
                          className="w-9 h-9"
                          aria-label={`Add ${p.name} to cart`}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ 5. SEASONAL BANNER ═══════════════════════════════════════════════ */}
      <section className="py-12 bg-transparent animate-none">
        <div className="container-site">
          <div className="relative rounded-3xl overflow-hidden shadow-sm h-[380px]">
            <Image
              src="/images/Limited-time-offer.png"
              alt="Seasonal Collection"
              fill
              className="object-cover object-center animate-none"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={stagger}
                className="max-w-2xl"
              >
                <motion.p
                  variants={fadeUp}
                  className="text-xs font-bold tracking-[0.2em] uppercase mb-2 text-white/70"
                >
                  LIMITED TIME OFFER
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="text-2xl md:text-4xl font-bold mb-3 whitespace-pre-line text-white"
                  style={{ fontFamily: "Times New Roman, serif", color: "white" }}
                >
                  Seasonal Collection: Fresh Summer Blooms
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="text-xs md:text-sm max-w-lg mx-auto mb-6 leading-relaxed text-white/80"
                >
                  Experience limited release organic terpene blends and high-potency concentrates crafted for summer relaxation.
                </motion.p>
                <motion.div variants={fadeUp}>
                  <Button href="/shop" variant="white" className="px-8 py-2.5">
                    Explore the Sale
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. DIFFERENCE ════════════════════════════════════════════════════ */}
      <section className="py-6" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-[2.2rem] font-bold mb-2"
              style={{ fontFamily: "Times New Roman, serif", color: "#016C24" }}
            >
              The TotalHerbalCare Difference
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base max-w-xl mx-auto"
              style={{ color: "#767676" }}
            >
              Setting the standard for purity, safety, and customer guidance in organic herbal cannabis.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {differenceCards.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={scaleIn}
                className="bg-white rounded-xl p-6 transition-shadow duration-300 hover:shadow-lg"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "#F0F7F3" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#2D6B4F" }} />
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{
                    fontFamily: "Times New Roman, serif",
                    fontSize: "1rem",
                    color: "#1A1A1A",
                  }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#767676" }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 7. OUR COMMITMENT ════════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div
                className="relative rounded-[24px] overflow-hidden shadow-md"
                style={{ aspectRatio: "4/4" }}
              >
                <Image
                  src="/images/OUR-COMMITMENT.png"
                  alt="Cannabis cultivation"
                  fill
                  className="object-cover animate-none"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute bottom-6 right-6 bg-white/70 backdrop-blur-md rounded-2xl px-5 py-4 shadow-xl border border-white/20">
                <p
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "Times New Roman, serif",
                    color: "#016C24",
                  }}
                >
                  10+ Years
                </p>
                <p className="text-xs max-w-[160px] mt-0.5 text-neutral-600">
                  Of experience in organic cultivation and wellness innovation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold tracking-widest uppercase mb-3 text-[#016C24]">
                Our Commitment
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold leading-snug mb-4"
                style={{
                  fontFamily: "Times New Roman, serif",
                  color: "#016C24",
                }}
              >
                Elevating Standards
                <br />
                in Cannabis Wellness
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#4A4A4A" }}>
                Our master growers and formulation chemists utilize clean extraction techniques without harmful solvents, delivering uncompromised herbal purity.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Ethical Cultivation",
                    desc: "Sustainable organic farming methods preserving soil health and natural terpene complexity.",
                  },
                  {
                    title: "Community Education",
                    desc: "Empowering adults 21+ with transparent lab data, strain guides, and dosing advice.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#016C24]/10">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#016C24]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5 text-[#1A1A1A]">
                        {item.title}
                      </p>
                      <p className="text-xs leading-relaxed text-[#767676]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button href="/about" variant="primary">
                  Read Our Full Story
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 8. COMMUNITY REVIEWS ═════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#F0EBE1" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-[2.2rem] font-bold mb-3 text-[#1A1A1A]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              What Our Community Says
            </motion.h2>
            <motion.div variants={fadeUp} className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#C9A961] text-[#C9A961]" />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.author}
                variants={scaleIn}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A961] text-[#C9A961]" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic text-[#4A4A4A]">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={t.img}
                      alt={t.author}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#1A1A1A]">{t.author}</p>
                    <p className="text-[11px] text-[#767676]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 9. CANNABIS EDUCATION BLOG ═══════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold"
                style={{
                  fontFamily: "Times New Roman, serif",
                  color: "#016C24",
                }}
              >
                Cannabis Education
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm mt-1 text-[#767676]">
                Expand your knowledge with our latest research and lifestyle guides.
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <Button
                href="/blog"
                className="text-ink border-ink hover:bg-ink hover:text-white px-4 py-1.5 text-sm rounded-full bg-transparent border transition-all"
              >
                View All Articles
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {blogPostsList.map((post) => (
              <motion.div key={post.id} variants={scaleIn}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div
                    className="relative rounded-xl overflow-hidden mb-4"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase block mb-1.5"
                    style={{ color: "#2D6B4F" }}
                  >
                    {post.category}
                  </span>
                  <h3
                    className="font-bold mb-2 transition-colors group-hover:opacity-70 text-[#1A1A1A]"
                    style={{
                      fontFamily: "Times New Roman, serif",
                      fontSize: "1rem",
                    }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3 text-[#767676] line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span
                    className="flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2 text-[#2D6B4F]"
                  >
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 10. NEWSLETTER ═══════════════════════════════════════════════════ */}
      <section className="py-4" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <div className="relative rounded-3xl overflow-hidden py-12 px-8 md:px-28 bg-[#016C24] shadow-3xl">
            <div className="absolute left-0 bottom-0 top-0 w-[120px] md:w-[250px] pointer-events-none select-none">
              <Image
                src="/images/cta-left.png"
                alt="Cannabis Leaf Left"
                fill
                className="object-contain object-left-bottom"
                sizes="(max-width: 768px) 120px, 180px"
              />
            </div>

            <div className="absolute right-0 bottom-0 top-0 w-[120px] md:w-[280px] pointer-events-none select-none">
              <Image
                src="/images/Cta-right.png"
                alt="Cannabis Leaf Right"
                fill
                className="object-contain object-right-bottom"
                sizes="(max-width: 768px) 120px, 180px"
              />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-left text-white max-w-md">
                <h2
                  className="text-2xl md:text-4xl font-bold text-white mb-2"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Stay Elevated
                </h2>
                <p className="text-sm md:text-base text-white/85 leading-relaxed">
                  Subscribe to receive our latest organic drops, strain guides, discount coupons, and local dispensary delivery updates.
                </p>
              </div>

              <form
                onSubmit={handleSubscribeNewsletter}
                className="flex flex-col sm:flex-row w-full lg:w-auto items-stretch sm:items-center gap-3"
              >
                <div className="relative flex items-center bg-white rounded-full px-4 py-2.5 flex-1 sm:w-80 shadow-md">
                  <Mail className="w-4 h-4 text-gray-400 mr-2.5 flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400 w-full"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={newsletterMutation.isPending}
                  variant="primary"
                  className="rounded-full px-8 py-2.5 border border-white text-white bg-transparent hover:bg-white hover:text-[#016C24] transition-all font-semibold shadow-md shrink-0"
                >
                  {newsletterMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 11. FAQ ══════════════════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container-site" style={{ maxWidth: "720px" }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold text-[#1A1A1A]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-[15px] font-semibold text-left transition-colors hover:opacity-70 text-[#2D6B4F]"
                >
                  <span>{q.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="w-4 h-4 flex-shrink-0 text-[#2D6B4F]" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm md:text-base leading-relaxed text-[#767676]">
                        {q.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
