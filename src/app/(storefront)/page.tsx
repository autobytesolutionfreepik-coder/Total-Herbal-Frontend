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
import { ReviewsCarousel } from "@/features/reviews/components/reviews-carousel";

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
  { label: "Topicals", slug: "topicals", img: "/images/Oils.png" },
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
    desc: "Hand-selected organic cannabis harvests curated for maximum aroma, rich flavor, and balanced cannabinoid profiles.",
  },
  {
    icon: FlaskConical,
    title: "Lab Tested",
    desc: "Every batch undergoes rigorous third-party lab testing for potency, terpene density, and 100% solvent-free purity.",
  },
  {
    icon: Shield,
    title: "Licensed Dispensary",
    desc: "Fully compliant California state-licensed facility providing safe, legal, and regulated access to top-tier cannabis.",
  },
  {
    icon: Package,
    title: "Wide Selection",
    desc: "Expansive catalog featuring craft flower strains, full-spectrum extracts, gourmet edibles, and wellness tinctures.",
  },
  {
    icon: Users,
    title: "Friendly Experts",
    desc: "Knowledgeable budtenders and herbal specialists ready to guide you to the perfect strain for your wellness goals.",
  },
  {
    icon: Lock,
    title: "Secure Checkout",
    desc: "Discreet, encrypted payment processing with rapid local delivery and real-time order tracking.",
  },
];

const testimonials = [
  {
    text: "The selection at TotalHerbalCare is unparalleled. Their edibles actually taste gourmet and the results are consistent every time. Best dispensary in the city.",
    author: "Sarah J.",
    role: "VERIFIED CUSTOMER",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&q=80",
  },
  {
    text: "Their staff really knows their stuff. I was looking for something to help with sleep and their recommendations were spot on. The store vibe is so high-end.",
    author: "Marcus W.",
    role: "VERIFIED CUSTOMER",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80",
  },
  {
    text: "Absolutely love the packaging and the focus on lab results. It gives me peace of mind knowing exactly what I'm putting into my body. Truly a premium experience.",
    author: "Elena R.",
    role: "VERIFIED CUSTOMER",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80",
  },
];

const defaultBlogPosts = [
  {
    id: "1",
    category: "BEGINNERS",
    title: "A Beginner's Guide to CBD",
    excerpt: "Discover how primary cannabinoids interact with your endocannabinoid system to enhance relaxation, relief, and overall vitality.",
    img: "/images/Beginners.png",
    slug: "beginners-guide-to-cbd",
  },
  {
    id: "2",
    category: "SCIENCE",
    title: "Understanding Terpenes",
    excerpt: "Explore how aromatic terpenes influence cannabis flavor profiles and synergize with cannabinoids to deliver tailored therapeutic effects.",
    img: "/images/science.png",
    slug: "understanding-terpenes",
  },
  {
    id: "3",
    category: "LIFESTYLE",
    title: "The Art of Pre-Rolls",
    excerpt: "Learn how craft rolling techniques and slow-burning organic hemp wraps elevate your daily botanical tasting experience.",
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
    q: "Do you offer same-day delivery?",
    a: "Yes! Orders submitted before 4:00 PM in qualifying local zip codes are delivered same-day in discreet, temperature-controlled packaging.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, debit cards, bank transfers, and cash-on-delivery for local orders.",
  },
  {
    q: "Are your products laboratory tested?",
    a: "Yes! Every single product batch at Total Herbal Care undergoes comprehensive ISO-accredited lab testing for cannabinoid potency, terpene profiles, pesticides, heavy metals, and residual solvents.",
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
      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[540px] sm:min-h-[620px] lg:min-h-[700px] overflow-hidden flex items-center"
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
            className="object-cover object-bottom"
            sizes="100vw"
          />
        </motion.div>

        <div className="container-site relative z-10 py-16 sm:py-20 md:py-24 lg:py-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-[620px]"
          >
            <motion.div variants={fadeUp} className="mb-4 sm:mb-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-widest uppercase bg-black/40 border border-white/15 text-[#C9A961] backdrop-blur-md">
                ESTABLISHED 2024 • ISO 17025 CERTIFIED
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-bold leading-[1.08] mb-5 tracking-tight drop-shadow-md"
              style={{
                fontFamily: "Times New Roman, serif",
                fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)",
                color: "#fff",
              }}
            >
              Organic Cannabis

              <br />
              Formulas for Every<br />
              <span className="text-[#C9A961]">Lifestyle</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base md:text-lg leading-relaxed mb-7 max-w-[540px] text-white/90 font-medium"
            >
              Discover lab-tested organic flower, precision-dosed edibles, full-spectrum vapes, and apothecary wellness remedies delivered directly to your door.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3.5">
              <Link
                href="/shop"
                className="bg-[#007A2B] hover:bg-[#00581F] text-white text-xs sm:text-sm font-bold tracking-wider uppercase px-7 py-3 rounded-full transition-all shadow-md inline-flex items-center justify-center"
              >
                Shop Now
              </Link>
              <Link
                href="/location"
                className="bg-[#E5EAE7] hover:bg-white text-[#006828] text-xs sm:text-sm font-bold tracking-wider uppercase px-7 py-3 rounded-full transition-all shadow-sm inline-flex items-center justify-center"
              >
                Find a Location
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. TRUST STRIP ═══════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-8 sm:-mt-10 md:-mt-12 bg-transparent py-0">
        <div className="container-site">
          <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl py-4 sm:py-5 md:py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#026C24] via-[#084824] to-[#071F14] border border-white/25 backdrop-blur-xl shadow-xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-center">
              {trustItems.map(({ img, label, sub }) => (
                <div key={label} className="flex items-center gap-2.5 sm:gap-3 group hover:translate-y-[-2px] transition-transform duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border border-white/80 flex items-center justify-center flex-shrink-0 bg-[#0D2318]/30 group-hover:bg-[#016C24] transition-all duration-300 shadow-sm">
                    <Image
                      src={img}
                      alt={`${label} ${sub}`}
                      width={36}
                      height={36}
                      className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain"
                    />
                  </div>
                  <div className="leading-tight font-sans">
                    <p className="text-white text-xs sm:text-sm lg:text-base font-bold tracking-tight">
                      {label}
                    </p>
                    <p className="text-[11px] sm:text-xs lg:text-sm font-bold text-[#E2C98A] tracking-tight">
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
      <section className="py-16 md:py-20 lg:py-24" style={{ background: "#EDE6DB" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center mb-10 md:mb-14 lg:mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] font-bold tracking-tight text-[#006828]"
              style={{ fontFamily: "Times New Roman, serif", color: "#006828" }}
            >
              Explore Our Collection
            </motion.h2>
            <motion.div variants={fadeUp} className="flex justify-center mt-3.5">
              <div className="w-12 h-1 rounded-full bg-[#006828]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-7 sm:gap-x-6 sm:gap-y-8 lg:gap-x-7 lg:gap-y-9"
          >
            {defaultCategories.map((cat: { label: string; slug: string; img: string }) => (
              <motion.div key={cat.label} variants={scaleIn}>
                <Link
                  href={`/shop?category=${cat.slug}`}
                  className="group block text-center"
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={cat.img}
                      alt={cat.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                    />
                  </div>
                  <h3
                    className="mt-3.5 sm:mt-4 text-base sm:text-lg lg:text-[1.15rem] font-bold text-[#006828] group-hover:text-[#005220] transition-colors font-sans"
                    style={{ color: "#006828" }}
                  >
                    {cat.label}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 4. NEW ARRIVALS ══════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16" style={{ background: "#EDE2D7" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4"
          >
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-[#006828]"
                style={{ fontFamily: "Times New Roman, serif", color: "#006828" }}
              >
                New Arrivals
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-base mt-1 text-[#666666] font-medium"
              >
                Our latest premium drops, laboratory-certified.
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <Link
                href="/shop"
                className="text-sm font-bold text-[#006828] hover:text-[#005220] underline underline-offset-4 transition-colors"
                style={{ color: "#006828" }}
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {newArrivals.map((p: { id: string; name: string; type: string; strain: string; thc: string; price: string; rating: number; reviewsCount: number; img: string; slug: string }) => {
              return (
                <motion.div key={p.id} variants={scaleIn}>
                  <div className="group relative rounded-2xl overflow-hidden flex flex-col bg-white border border-[#EDE8DF] hover:border-[#006828]/30 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(13,35,24,0.12)] hover:-translate-y-1.5 transition-all duration-300 h-full">
                    <Link href={`/products/${p.slug}`} className="block relative w-full aspect-[4/5] bg-[#F9F6F1] overflow-hidden">
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      />
                      <span
                        className="absolute top-3.5 left-3.5 text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-[#006828] shadow-sm"
                      >
                        {p.type}
                      </span>
                    </Link>

                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-[#C9A961]">
                          <Star className="w-3.5 h-3.5 fill-[#C9A961] text-[#C9A961]" />
                        </div>
                        <span className="text-xs font-extrabold text-[#0D2318]">
                          {p.rating}
                        </span>
                        <span className="text-xs text-[#767676] font-medium">
                          ({p.reviewsCount} reviews)
                        </span>
                      </div>

                      <Link href={`/products/${p.slug}`}>
                        <h3
                          className="font-bold leading-snug text-lg text-[#006828] group-hover:text-[#005220] transition-colors font-sans"
                          style={{ color: "#006828" }}
                        >
                          {p.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-[#666666] font-medium">
                        {p.strain} • {p.thc}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#EDE8DF]/60">
                        <span
                          className="font-extrabold text-xl text-[#006828] font-sans"
                          style={{ color: "#006828" }}
                        >
                          {formatCurrency(p.price)}
                        </span>

                        <button
                          onClick={() => handleAddToCart(p)}
                          className="w-9 h-9 rounded-full bg-[#006828] hover:bg-[#005220] text-white flex items-center justify-center shadow-md transition-all"
                          aria-label={`Add ${p.name} to cart`}
                        >
                          <ShoppingCart className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ BANNER 1: LIMITED TIME OFFER ═════════════════════════════════════ */}
      <section className="py-10 sm:py-14 md:py-16" style={{ background: "#EDE6DB" }}>
        <div className="container-site">
          <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-lg bg-[#07130C] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center justify-center text-center">
            {/* Background Image - Limited-time-offer.png */}
            <Image
              src="/images/Limited-time-offer.png"
              alt="Seasonal Collection Field"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />

            {/* Dark semi-transparent overlay for visual clarity */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content Container - Centered layout matching reference image */}
            <div className="relative z-10 py-12 sm:py-16 md:py-20 px-6 sm:px-10 max-w-[660px] mx-auto flex flex-col items-center justify-center text-center">
              <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.25em] text-white/90 mb-3 sm:mb-4 font-sans">
                LIMITED TIME OFFER
              </p>

              <h2
                className="text-3xl sm:text-4xl md:text-[46px] lg:text-[50px] font-bold text-white leading-[1.14] mb-4 sm:mb-5 font-serif"
                style={{ fontFamily: "Times New Roman, serif", color: "#ffffff" }}
              >
                Seasonal Collection:<br />Fresh Summer Blooms
              </h2>

              <p className="text-sm sm:text-base md:text-[16px] text-white/90 leading-[1.6] max-w-[580px] mx-auto mb-7 sm:mb-8 font-normal font-sans">
                Experience the essence of the season with our exclusive sun-grown flower collection. 20% off all flower products this week.
              </p>

              <Link
                href="/shop"
                className="bg-white hover:bg-white/95 text-[#006828] text-sm sm:text-base font-semibold px-7 sm:px-8 py-3 sm:py-3.5 rounded-[14px] transition-all shadow-md inline-flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] font-sans"
                style={{ color: "#006828" }}
              >
                Explore the Sale
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. THE TOTALHERBALCARE DIFFERENCE ════════════════════════════════ */}
      <section className="py-16 md:py-24" style={{ background: "#EDE6DB" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#006828] leading-tight font-serif"
              style={{ fontFamily: "Times New Roman, serif", color: "#006828" }}
            >
              The TotalHerbalCare Difference
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base text-[#666666] font-normal leading-relaxed font-sans"
            >
              Setting the benchmark for quality, safety, and luxury in the cannabis wellness industry.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {differenceCards.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={scaleIn}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-white/60 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <Icon className="w-7 h-7 text-[#006828] mb-4" style={{ color: "#006828" }} />
                <h3
                  className="font-bold text-xl mb-2 text-[#006828] font-sans"
                  style={{ color: "#006828" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#666666] font-normal">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 6. OUR COMMITMENT ════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20" style={{ background: "#EDE6DB" }}>
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Image & Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-sm border border-black/5 aspect-square sm:aspect-auto sm:min-h-[460px]">
                <Image
                  src="/images/OUR-COMMITMENT.png"
                  alt="Cannabis cultivation lab"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                  priority
                />
                {/* Floating 10+ Years Badge */}
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-[280px] bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/60">
                  <p className="text-2xl font-bold text-[#006828] font-sans mb-0.5" style={{ color: "#006828" }}>
                    10+ Years
                  </p>
                  <p className="text-xs text-[#666666] font-normal leading-snug">
                    Of experience in organic cultivation and wellness innovation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Text Content - Matching Image 1 with real domain text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#006828] mb-2 font-sans" style={{ color: "#006828" }}>
                OUR COMMITMENT
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-tight mb-4 text-[#006828] font-serif"
                style={{ fontFamily: "Times New Roman, serif", color: "#006828" }}
              >
                Elevating Standards in Cannabis Wellness
              </h2>
              <p className="text-sm text-[#666666] leading-relaxed mb-6 font-normal">
                Our master growers and formulation chemists utilize clean extraction techniques without harmful solvents, delivering uncompromised herbal purity across every strain.
              </p>

              {/* Bullet Points */}
              <div className="space-y-4 mb-6">
                {[
                  {
                    title: "Ethical Cultivation",
                    desc: "Sustainable farming practices focused on soil health, zero synthetic pesticides, and energy-efficient solar greenhouse cultivation.",
                  },
                  {
                    title: "Community Education",
                    desc: "Empowering customers with clear lab reports, accurate dosing guides, and transparent cannabinoid profiling.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#006828] flex-shrink-0 mt-0.5" style={{ color: "#006828" }} />
                    <div>
                      <h3 className="font-bold text-base text-[#006828] mb-0.5 font-sans" style={{ color: "#006828" }}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#666666] font-normal leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Link
                  href="/about"
                  className="bg-[#006828] hover:bg-[#005220] text-white text-sm font-semibold px-7 py-3 rounded-full transition-all shadow-md inline-flex items-center justify-center font-sans"
                >
                  Read Our Full Story
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 7. COMMUNITY REVIEWS ═════════════════════════════════════════════ */}
      <section className="py-16 md:py-20" style={{ background: "#EDE6DB" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-10 md:mb-12"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#006828]"
              style={{ fontFamily: "Times New Roman, serif", color: "#006828" }}
            >
              What Our Community Says
            </motion.h2>
            <motion.div variants={fadeUp} className="flex justify-center items-center gap-1 mt-2.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#006828] text-[#006828]" style={{ color: "#006828" }} />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div key={t.author} variants={scaleIn}>
                <div className="bg-white rounded-3xl p-7 sm:p-8 border border-white/60 shadow-sm flex flex-col justify-between h-full">
                  <p className="text-sm sm:text-base text-[#555555] font-normal leading-relaxed mb-6 font-sans">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3.5 pt-4 border-t border-[#EDE8DF]">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-[#E6F4EA] border border-[#006828]/20">
                      <Image
                        src={t.img}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#006828] font-sans" style={{ color: "#006828" }}>
                        {t.author}
                      </h3>
                      <p className="text-[10px] text-[#888888] font-semibold tracking-wider uppercase">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 8. CANNABIS EDUCATION BLOG ═══════════════════════════════════════ */}
      <section className="py-16 md:py-24" style={{ background: "#EDE6DB" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 md:mb-14 gap-4"
          >
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#006828] leading-tight font-serif"
                style={{ fontFamily: "Times New Roman, serif", color: "#006828" }}
              >
                Cannabis Education &amp; Insights
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#006828] hover:gap-2.5 transition-all font-sans"
                style={{ color: "#006828" }}
              >
                <span>Read All Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {blogPostsList.map((post: any) => (
              <motion.div key={post.id} variants={scaleIn}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-3xl p-6 border border-white/60 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col h-full"
                >
                  <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[16/10]">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>

                  <span className="text-[10px] font-bold tracking-widest text-[#006828] uppercase mb-2 block font-sans" style={{ color: "#006828" }}>
                    {post.date}
                  </span>

                  <h3
                    className="font-bold text-lg sm:text-xl text-[#006828] group-hover:text-[#005220] transition-colors mb-2 font-serif leading-snug"
                    style={{ fontFamily: "Times New Roman, serif", color: "#006828" }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed mb-4 text-[#666666] font-normal">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#006828] group-hover:gap-2 transition-all font-sans mt-auto" style={{ color: "#006828" }}>
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ BANNER 2: FRESH SUMMER BLOOMS ═══════════════════════════════════ */}
      <section className="py-12 md:py-16" style={{ background: "#EDE6DB" }}>
        <div className="container-site">
          <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-lg bg-[#050D08] border border-white/10 min-h-[360px] sm:min-h-[400px] md:min-h-[440px] flex items-center">
            {/* Background Image - Fresh-Summer-Blooms.png */}
            <Image
              src="/images/Fresh-Summer-Blooms.png"
              alt="Fresh Summer Blooms Tincture"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />

            {/* Dark gradient overlay on left for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-transparent w-full md:w-[70%]" />

            {/* Left Content Container - 100% Image Match */}
            <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20 max-w-lg lg:max-w-xl flex flex-col items-start justify-center text-left">
              <p className="text-sm sm:text-base font-normal text-white/90 mb-2 font-sans">
                Seasonal Collection:
              </p>
              <h2
                className="text-3xl sm:text-4xl md:text-4xl lg:text-[40px] font-bold mb-3.5 leading-[1.1] font-serif text-white tracking-tight"
                style={{ fontFamily: "Times New Roman, serif", color: "#ffffff" }}
              >
                Fresh Summer Blooms
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-white/85 leading-relaxed font-normal mb-7 max-w-md font-sans">
                Experience our hand-crafted organic formulas and seasonal herbal remedies tailored for your supreme wellness.
              </p>
              <Link
                href="/shop"
                className="bg-[#006828] hover:bg-[#005220] text-white text-xs sm:text-sm font-semibold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all shadow-md inline-flex items-center justify-center font-sans hover:scale-[1.02]"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10. FIND NEAR YOU - LOCATIONS SECTION ════════════════════════════ */}
      <section className="py-16 md:py-24" style={{ background: "#EDE6DB" }}>
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left Column: Heading & CTA */}
            <div className="lg:col-span-4 flex flex-col justify-center items-start">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#016C24] mb-3">
                FIND NEAR YOU
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold leading-[1.14] text-[#0D2318] mb-4 font-serif"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Find a Total Herbal Care and Wellnary <span className="text-[#016C24]">Near You</span>
              </h2>
              <p className="text-sm sm:text-base text-[#4A4A4A] font-medium leading-relaxed mb-8 max-w-sm">
                Visit one of our convenient locations for expert service and premium products.
              </p>
              <Link
                href="/location"
                className="bg-[#0B2014] hover:bg-[#016C24] text-white text-xs font-bold tracking-widest uppercase px-7 py-4 rounded-full transition-all shadow-lg inline-flex items-center gap-2.5 font-sans group"
              >
                <MapPin className="w-4 h-4 text-[#E2C98A] group-hover:text-white transition-colors" />
                <span>VIEW ALL LOCATIONS</span>
              </Link>
            </div>

            {/* Middle Column: Map Graphic */}
            <div className="lg:col-span-4 relative rounded-3xl overflow-hidden shadow-md border border-[#EDE8DF] bg-[#FAF8F5] min-h-[340px] lg:min-h-[420px] flex items-center justify-center">
              <Image
                src="/images/Find-a-Location-Near-You.png"
                alt="Total Herbal Care Store Locations Map"
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />

              {/* Pin 1: Top Center */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#016C24] text-white flex items-center justify-center shadow-xl border-2 border-white transform group-hover:scale-125 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Pin 2: Left Side */}
              <div className="absolute top-1/3 left-12 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#016C24] text-white flex items-center justify-center shadow-xl border-2 border-white transform group-hover:scale-125 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Pin 3: Right Side */}
              <div className="absolute top-1/2 right-16 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#016C24] text-white flex items-center justify-center shadow-xl border-2 border-white transform group-hover:scale-125 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Pin 4: Bottom Center */}
              <div className="absolute bottom-16 left-1/3 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-[#016C24] text-white flex items-center justify-center shadow-xl border-2 border-white transform group-hover:scale-125 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Right Column: Featured Locations Card */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-xl border border-[#EDE8DF] flex flex-col justify-between h-full">
              <div className="space-y-4">
                {[
                  {
                    num: "1",
                    name: "Downtown LA",
                    address: "123 Herbal Way",
                    cityStateZip: "Los Angeles, CA 90012",
                    hours: "Mon – Sun: 9AM – 9PM",
                    distance: "2.3 miles",
                    img: "/images/Apothecary.png",
                  },
                  {
                    num: "2",
                    name: "West Hollywood",
                    address: "789 Green Leaf Blvd.",
                    cityStateZip: "West Hollywood, CA 90069",
                    hours: "Mon – Sun: 9AM – 10PM",
                    distance: "4.7 miles",
                    img: "/images/Find-a-Location-Near-You.png",
                  },
                  {
                    num: "3",
                    name: "Culver City",
                    address: "456 Herbal Ave",
                    cityStateZip: "Culver City, CA 90232",
                    hours: "Mon – Sun: 9AM – 9PM",
                    distance: "6.1 miles",
                    img: "/images/Apothecary.png",
                  },
                ].map((loc, idx) => (
                  <div
                    key={loc.name}
                    className={cn(
                      "flex items-center justify-between gap-3 pb-3.5",
                      idx !== 2 && "border-b border-[#EDE8DF]/70"
                    )}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Image Thumbnail */}
                      <div className="w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden relative border border-[#EDE8DF] flex-shrink-0">
                        <Image
                          src={loc.img}
                          alt={loc.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Location Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="w-4 h-4 rounded-full bg-[#016C24] text-white font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 font-sans">
                            {loc.num}
                          </span>
                          <h3
                            className="font-bold text-sm sm:text-base text-[#0D2318] truncate"
                            style={{ fontFamily: "Times New Roman, serif" }}
                          >
                            {loc.name}
                          </h3>
                        </div>
                        <p className="text-xs text-[#555555] font-medium leading-tight truncate">
                          {loc.address}
                        </p>
                        <p className="text-xs text-[#555555] font-medium leading-tight truncate">
                          {loc.cityStateZip}
                        </p>
                        <p className="text-[11px] text-[#767676] font-semibold mt-1">
                          {loc.hours}
                        </p>
                      </div>
                    </div>

                    {/* Distance */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-extrabold text-sm sm:text-base text-[#0D2318]">
                        {loc.distance.split(" ")[0]}
                      </p>
                      <p className="text-[11px] text-[#767676] font-semibold uppercase">
                        {loc.distance.split(" ")[1]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Card Link */}
              <div className="pt-4 border-t border-[#EDE8DF] text-right">
                <Link
                  href="/location"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#016C24] hover:text-[#0D2318] transition-colors uppercase tracking-wider group font-sans"
                >
                  <span>VIEW ALL LOCATIONS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ 11. NEWSLETTER ═══════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16" style={{ background: "#EDE6DB" }}>
        <div className="container-site">
          <div className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden py-7 sm:py-8 md:py-9 px-6 sm:px-10 lg:px-14 bg-[#006428] shadow-md border border-white/10">
            {/* Background Cannabis Leaf Graphics */}
            <Image
              src="/images/cta-left.png"
              alt=""
              width={320}
              height={320}
              className="absolute left-0 top-0 bottom-0 h-full w-auto object-cover opacity-80 pointer-events-none select-none"
            />
            <Image
              src="/images/Cta-right.png"
              alt=""
              width={320}
              height={320}
              className="absolute right-0 top-0 bottom-0 h-full w-auto object-cover opacity-80 pointer-events-none select-none"
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
              {/* Left Content */}
              <div className="text-left text-white max-w-md lg:max-w-lg">
                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white mb-2 leading-tight font-sans tracking-tight">
                  Stay Elevated
                </h2>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal font-sans max-w-sm lg:max-w-md">
                  Subscribe to receive our latest organic drops, strain guides, discount coupons, and local dispensary delivery updates.
                </p>
              </div>

              {/* Right Form */}
              <form
                onSubmit={handleSubscribeNewsletter}
                className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full lg:w-auto"
              >
                <div className="relative flex items-center bg-white rounded-full px-5 py-3.5 w-full sm:w-[360px] lg:w-[460px] shadow-sm">
                  <Mail className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-transparent border-none outline-none text-xs sm:text-sm text-gray-800 placeholder-gray-400 w-full font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={newsletterMutation.isPending}
                  className="bg-[#005220] hover:bg-white/15 text-white text-xs sm:text-sm font-semibold tracking-wide px-7 sm:px-9 py-3.5 rounded-[14px] sm:rounded-[16px] border border-white/50 transition-all shadow-sm shrink-0 w-full sm:w-auto inline-flex items-center justify-center font-sans"
                >
                  {newsletterMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 12. FAQ ══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20" style={{ background: "#EDE2D7" }}>
        <div className="container-site" style={{ maxWidth: "820px" }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-10 md:mb-12"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-4xl font-bold text-[#006828]"
              style={{ fontFamily: "Times New Roman, serif", color: "#006828" }}
            >
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <div className="space-y-3.5">
            {faqs.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-[#EBE4DA] rounded-2xl overflow-hidden border border-[#DDD4C7]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-base sm:text-lg font-semibold text-left text-[#006828] hover:text-[#005220] transition-colors font-sans"
                  style={{ color: "#006828" }}
                >
                  <span>{q.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-[#006828]" style={{ color: "#006828" }} />
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
                      <p className="px-6 pb-5 pt-2 text-sm sm:text-base leading-relaxed text-[#666666] font-normal border-t border-[#DDD4C7]/60">
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
