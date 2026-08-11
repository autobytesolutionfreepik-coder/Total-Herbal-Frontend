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
        className="relative min-h-[700px] lg:min-h-[880px] overflow-hidden flex items-center"
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
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0D2318]/90 via-[#0D2318]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2318] via-transparent to-transparent opacity-80" /> */}
        </motion.div>

        <div className="container-site relative z-10 py-24 lg:py-32">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-[620px]"
          >
            <motion.div variants={fadeUp} className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-black/40 border border-white/15 text-[#C9A961] backdrop-blur-md">
                ESTABLISHED 2022 • ISO 17025 CERTIFIED
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-bold leading-[1.08] mb-6 tracking-tight drop-shadow-md"
              style={{
                fontFamily: "Times New Roman, serif",
                fontSize: "clamp(2.8rem, 6.8vw, 4.8rem)",
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
              className="text-base sm:text-xl leading-relaxed mb-8 max-w-[560px] text-white/90 font-medium"
            >
              Discover lab-tested organic flowers, precision-dosed edibles, full-spectrum vapes, and apothecary wellness remedies delivered directly to your door.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="bg-[#007A2B] hover:bg-[#00581F] text-white text-sm font-bold tracking-wider uppercase px-8 py-3.5 rounded-full transition-all shadow-md inline-flex items-center justify-center"
              >
                Shop Now
              </Link>
              <Link
                href="/location"
                className="bg-[#E5EAE7] hover:bg-white text-[#006828] text-sm font-bold tracking-wider uppercase px-8 py-3.5 rounded-full transition-all shadow-sm inline-flex items-center justify-center"
              >
                Find a Location
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. TRUST STRIP ═══════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-12 md:-mt-16 bg-transparent py-0">
        <div className="container-site">
          <div className="rounded-2xl sm:rounded-3xl py-7 md:py-9 px-6 md:px-10 bg-gradient-to-b from-[#026C24] via-[#084824] to-[#071F14] border border-white/25 backdrop-blur-xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-18 items-center">
              {trustItems.map(({ img, label, sub }) => (
                <div key={label} className="flex items-center gap-3.5 sm:gap-4 group hover:translate-y-[-2px] transition-transform duration-300">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 bg-[#0D2318]/30 group-hover:bg-[#016C24] transition-all duration-300 shadow-md">
                    <Image
                      src={img}
                      alt={`${label} ${sub}`}
                      width={48}
                      height={48}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                  <div className="leading-tight font-sans">
                    <p className="text-white text-base sm:text-lg font-bold tracking-tight">
                      {label}
                    </p>
                    <p className="text-sm sm:text-base font-bold text-[#E2C98A] tracking-tight">
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] font-bold tracking-tight text-[#054E26]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Explore Our Collection
            </motion.h2>
            <motion.div variants={fadeUp} className="flex justify-center mt-3.5">
              <div className="w-12 h-1 rounded-full bg-[#054E26]" />
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
                  <h3 className="mt-3.5 sm:mt-4 text-base sm:text-lg lg:text-[1.15rem] font-bold text-[#054E26] group-hover:text-[#03371a] transition-colors font-sans">
                    {cat.label}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 4. NEW ARRIVALS ══════════════════════════════════════════════════ */}
      <section className="py-12" style={{ background: "#ede2d7" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4"
          >
            <div>
              <motion.p variants={fadeUp} className="text-sm font-bold uppercase tracking-[0.2em] text-[#C9A961] mb-1">
                FRESHLY HARVESTED
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-5xl md:text-6xl font-bold tracking-tight text-[#0D2318]"
                style={{ fontFamily: "Times New Roman, serif", color: "#027F2C" }}
              >
                New Arrivals
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-md mt-1 text-[#4A4A4A] font-medium"
              >
                Fresh organic harvests and laboratory-tested dispensary additions.
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <Link
                href="/shop"
                className="text-sm font-bold flex items-center gap-1.5 text-[#016C24] hover:text-[#0D2318] transition-colors group"
              >
                <span>View All Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                  <div className="group relative rounded-2xl overflow-hidden flex flex-col bg-white border border-[#EDE8DF] hover:border-[#016C24]/30 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(13,35,24,0.12)] hover:-translate-y-1.5 transition-all duration-300 h-full">
                    <Link href={`/products/${p.slug}`} className="block relative w-full aspect-[4/5] bg-[#F9F6F1] overflow-hidden">
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      />
                      <span
                        className="absolute top-3.5 left-3.5 text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-[#0D2318]/80 backdrop-blur-md border border-white/20 shadow-md"
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
                        <h3 className="font-bold leading-snug text-lg text-[#0D2318] group-hover:text-[#016C24] transition-colors font-sans">
                          {p.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-[#4A4A4A] font-semibold">
                        {p.strain} • {p.thc}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#EDE8DF]/60">
                        <span className="font-extrabold text-xl text-[#0D2318] font-sans">
                          {formatCurrency(p.price)}
                        </span>

                        <Button
                          variant="primary"
                          size="icon"
                          onClick={() => handleAddToCart(p)}
                          className="w-10 h-10 shadow-[0_4px_16px_rgba(1,108,36,0.25)] hover:shadow-[0_6px_20px_rgba(1,108,36,0.4)]"
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

      {/* ══ 5. DIFFERENCE ════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#ede2d7" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A961] mb-2">
              WHY CHOOSE TOTAL HERBAL CARE
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-[#0D2318]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              The TotalHerbalCare Difference
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base max-w-xl mx-auto mt-2 text-[#4A4A4A] font-medium"
            >
              Setting the standard for purity, safety, and customer guidance in organic herbal cannabis.
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
                className="bg-white rounded-2xl p-7 border border-[#EDE8DF] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(13,35,24,0.1)] hover:border-[#016C24]/30 hover:-translate-y-1"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-[#0D2318] text-[#E2C98A] shadow-md"
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  className="font-bold text-xl mb-2 text-[#0D2318]"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4A4A4A] font-medium">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 6. OUR COMMITMENT ════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(13,35,24,0.15)] border border-[#EDE8DF] aspect-square">
                <Image
                  src="/images/OUR-COMMITMENT.png"
                  alt="Cannabis cultivation"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-5 shadow-2xl border border-white/40">
                <p
                  className="text-3xl font-extrabold text-[#0D2318] font-serif"
                >
                  10+ Years
                </p>
                <p className="text-xs font-semibold max-w-[170px] mt-1 text-[#4A4A4A]">
                  Of excellence in organic cultivation and botanical innovation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-md font-bold tracking-[0.2em] uppercase mb-2 text-[#C9A961]">
                OUR BOTANICAL COMMITMENT
              </p>
              <h2
                className="text-4xl md:text-6xl font-bold leading-tight mb-5 text-[#0D2318]"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Elevating Standards in Cannabis Wellness
              </h2>
              <p className="text-lg leading-relaxed mb-7 text-[#4A4A4A] font-medium">
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
                  <div key={item.title} className="flex gap-3.5 p-4 rounded-xl bg-white border border-[#EDE8DF]/80 shadow-sm">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#016C24]/10">
                      <CheckCircle2 className="w-4 h-4 text-[#016C24]" />
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-0.5 text-[#0D2318]">
                        {item.title}
                      </p>
                      <p className="text-xs leading-relaxed text-[#4A4A4A] font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button href="/about" variant="dark" size="lg">
                  Read Our Full Story <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 7. COMMUNITY REVIEWS CAROUSEL ═════════════════════════════════════ */}
      <section className="py-20 bg-[#EDE8DF]">
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A961] mb-2">
              REAL MEMBER EXPERIENCES
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold mb-3 text-[#0D2318]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              What Our Community Says
            </motion.h2>
            <motion.div variants={fadeUp} className="flex justify-center items-center gap-1.5 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#C9A961] text-[#C9A961]" />
              ))}
              <span className="ml-2 text-sm font-bold text-[#0D2318]">4.9 out of 5 stars based on 100+ reviews</span>
            </motion.div>
          </motion.div>

          <ReviewsCarousel />
        </div>
      </section>

      {/* ══ 8. CANNABIS EDUCATION BLOG ═══════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4"
          >
            <div>
              <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A961] mb-1">
                KNOWLEDGE & RESEARCH
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-[#0D2318]"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Cannabis Education & Guides
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm mt-1 text-[#4A4A4A] font-medium">
                Expand your knowledge with our latest research and lifestyle guides.
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <Button
                href="/blog"
                variant="outline"
                className="text-[#0D2318] border-[#0D2318] hover:bg-[#0D2318] hover:text-white px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-transparent border transition-all"
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
            {blogPostsList.map((post: any) => (
              <motion.div key={post.id} variants={scaleIn}>
                <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl p-4 border border-[#EDE8DF] hover:shadow-[0_16px_40px_rgba(13,35,24,0.1)] hover:border-[#016C24]/30 transition-all duration-300">
                  <div
                    className="relative rounded-xl overflow-hidden mb-4 bg-[#F9F6F1]"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <span className="text-[10px] font-extrabold tracking-widest uppercase block mb-2 text-[#016C24]">
                    {post.category}
                  </span>
                  <h3
                    className="font-bold mb-2 text-[#0D2318] group-hover:text-[#016C24] transition-colors text-lg"
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4 text-[#4A4A4A] font-medium line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#016C24] group-hover:gap-2.5 transition-all">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 9. SEASONAL BANNER ═══════════════════════════════════════════════ */}
      <section className="py-12 md:py-16" style={{ background: "#EDE6DB" }}>
        <div className="container-site">
          <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.18)] bg-[#07130C] border border-white/10 min-h-[380px] md:min-h-[460px] flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-12 w-full h-full items-center">
              {/* Left Content */}
              <div className="md:col-span-6 p-8 sm:p-12 md:p-16 z-10 flex flex-col items-start justify-center">
                <p className="text-sm md:text-base font-medium text-white/80 mb-2 font-sans">
                  Seasonal Collection:
                </p>
                <h2
                  className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight font-serif"
                  style={{ fontFamily: "Times New Roman, serif", color:"#ffffff" }}
                >
                  Fresh Summer Blooms
                </h2>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-medium mb-8 max-w-md">
                  Experience our hand-crafted organic formulas and seasonal herbal remedies tailored for your wellness.
                </p>
                <Link
                  href="/shop"
                  className="bg-[#007A2B] hover:bg-[#00581F] text-white text-xs sm:text-sm font-bold tracking-wider uppercase px-8 py-3.5 rounded-full transition-all shadow-md inline-flex items-center justify-center hover:scale-[1.02] font-sans"
                >
                  Shop Now
                </Link>
              </div>

              {/* Right Dropper Image */}
              <div className="md:col-span-6 relative w-full h-[280px] md:h-[460px] overflow-hidden">
                <Image
                  src="/images/Fresh-Summer-Blooms.png"
                  alt="Fresh Summer Blooms Collection"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width:768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#07130C] via-transparent to-transparent opacity-80 md:opacity-100" />
              </div>
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
      <section className="py-12" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <div className="relative rounded-3xl overflow-hidden py-14 px-8 md:px-20 bg-gradient-to-r from-[#0D2318] via-[#016C24] to-[#0D2318] shadow-[0_20px_50px_rgba(13,35,24,0.25)] border border-white/15">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-left text-white max-w-md">
                <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-[#E2C98A] block mb-2">
                  STAY CONNECTED & INFORMED
                </span>
                <h2
                  className="text-3xl md:text-4xl font-bold text-white mb-3"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Stay Elevated
                </h2>
                <p className="text-sm md:text-base text-white/85 leading-relaxed font-medium">
                  Subscribe to receive our latest organic drops, strain guides, discount coupons, and local dispensary delivery updates.
                </p>
              </div>

              <form
                onSubmit={handleSubscribeNewsletter}
                className="flex flex-col sm:flex-row w-full lg:w-auto items-stretch sm:items-center gap-3"
              >
                <div className="relative flex items-center bg-white/95 rounded-full px-5 py-3 flex-1 sm:w-80 shadow-md">
                  <Mail className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-500 w-full font-medium"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={newsletterMutation.isPending}
                  variant="gold"
                  size="lg"
                  className="shadow-lg shrink-0"
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

      {/* ══ 12. FAQ ══════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#F5F0E8" }}>
        <div className="container-site" style={{ maxWidth: "780px" }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A961] mb-2">
              HELP & TRANSPARENCY
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-bold text-[#0D2318]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden border border-[#EDE8DF] shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-base font-bold text-left transition-colors text-[#0D2318] hover:text-[#016C24]"
                >
                  <span>{q.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-1 rounded-full bg-[#F5F0E8] ml-4 flex-shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 text-[#016C24]" />
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
                      <p className="px-6 pb-6 text-sm md:text-base leading-relaxed text-[#4A4A4A] font-medium border-t border-[#EDE8DF]/60 pt-4">
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
