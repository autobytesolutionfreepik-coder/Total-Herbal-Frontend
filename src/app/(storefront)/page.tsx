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
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatCurrency } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";

/* ─── Static Data ─────────────────────────────────────────────────────────── */

const trustItems = [
  { img: "/icons/Premium-Quality.png",   label: "Premium",   sub: "Quality" },
  { img: "/icons/Lab-Tested.png",        label: "Lab",        sub: "Tested" },
  { img: "/icons/Licensed-Dispensary.png", label: "Licensed",   sub: "Dispensary" },
  { img: "/icons/Wide-Selection.png",      label: "Wide",       sub: "Selection" },
  { img: "/icons/Friendly-Experts.png",   label: "Friendly",   sub: "Experts" },
  { img: "/icons/Secure-Checkout.png",     label: "Secure",     sub: "Checkout" },
];

const categories = [
  { label: "Flower",        slug: "flowers",       img: "/images/Flower.png" },
  { label: "Pre-Rolls",     slug: "pre-rolls",     img: "/images/Pre-Rolls.png" },
  { label: "Vapes",         slug: "vapes",         img: "/images/Vapes.png" },
  { label: "Edibles",       slug: "edibles",       img: "/images/Edibles.png" },
  { label: "Concentrates",  slug: "concentrates",  img: "/images/Concentrates.png" },
  { label: "Infused Drinks",slug: "infused-drinks",img: "/images/Infused-Drinks.png" },
  { label: "Oils",          slug: "oils",          img: "/images/Oils.png" },
  { label: "Tinctures",     slug: "tinctures",     img: "/images/Tinctures.png" },
  { label: "Herbal Teas",   slug: "herbal-teas",   img: "/images/Herbal-Teas.png" },
  { label: "Apothecary",    slug: "apothecary",    img: "/images/Apothecary.png" },
];

const newArrivals = [
  {
    id: "1",
    name: "Skywalker OG",
    type: "FLOWER",
    strain: "Indica",
    thc: "24% THC",
    price: "45.00",
    rating: 4.9,
    reviews: 124,
    img: "/images/Skywalker-OG.png",
  },
  {
    id: "2",
    name: "Nightfall Chocolate",
    type: "EDIBLE",
    strain: "CBD",
    thc: "Melatonin",
    price: "28.00",
    rating: 5.0,
    reviews: 88,
    img: "/images/Nightfall-Chocolate.png",
  },
  {
    id: "3",
    name: "Golden Hour Cart",
    type: "VAPE",
    strain: "Sativa",
    thc: "Terpene Rich",
    price: "55.00",
    rating: 4.8,
    reviews: 210,
    img: "/images/Golden-Hour-Cart.png",
  },
  {
    id: "4",
    name: "Royal Diamond Roll",
    type: "PRE-ROLL",
    strain: "Kief Infused",
    thc: "High Potency",
    price: "32.00",
    rating: 4.7,
    reviews: 56,
    img: "/images/Royal-Diamond-Roll.png",
  },
];

const differenceCards = [
  { icon: Award,        title: "Premium Quality",     desc: "We source only the finest cannabis products, ensuring superior quality in every item we offer." },
  { icon: FlaskConical, title: "Lab Tested",          desc: "All products undergo rigorous third-party laboratory testing for purity, potency, and safety." },
  { icon: Shield,       title: "Licensed Dispensary", desc: "Operating under full state compliance as a fully licensed and regulated cannabis dispensary." },
  { icon: Package,      title: "Wide Selection",      desc: "From flowers and concentrates to edibles and tinctures — we carry something for every preference." },
  { icon: Users,        title: "Friendly Experts",    desc: "Our knowledgeable staff is always ready to guide you to the perfect product for your needs." },
  { icon: Lock,         title: "Secure Checkout",     desc: "Shop with confidence through our encrypted, private, and fully secure checkout experience." },
];

const testimonials = [
  {
    text: "The selection at TotalHerbalCare is unparalleled. Their edibles actually taste gourmet and the results are consistent every time. Best dispensary in the city.",
    author: "Sarah J.", role: "Verified Customer",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=80&h=80&fit=crop&q=80",
  },
  {
    text: "Their staff really know their stuff. I was looking for something to help with sleep and their recommendations were spot on. The store vibe is so high-end.",
    author: "Marcus W.", role: "Regular Customer",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80",
  },
  {
    text: "Absolutely love the packaging and the focus on lab results. It gives me peace of mind knowing exactly what I'm putting into my body. Truly a premium experience.",
    author: "Diana R.", role: "Verified Customer",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&q=80",
  },
];

const blogPosts = [
  {
    id: "1", category: "BEGINNER", title: "A Beginner's Guide to CBD",
    excerpt: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum.",
    img: "/images/Beginners.png",
    slug: "beginners-guide-to-cbd",
  },
  {
    id: "2", category: "SCIENCE", title: "Understanding Terpenes",
    excerpt: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum.",
    img: "/images/science.png",
    slug: "understanding-terpenes",
  },
  {
    id: "3", category: "LIFESTYLE", title: "The Art of Pre-Rolls",
    excerpt: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum.",
    img: "/images/LIFESTYLE.png",
    slug: "the-art-of-pre-rolls",
  },
];

const locations = [
  { name: "Total Herbal Care — Westside",  address: "520 Overthrow Blvd, Los Angeles, CA 90011", hours: "Open · Closes 10:00 PM", phone: "(716) 556-0125" },
  { name: "Total Herbal Care — Downtown",  address: "112 Ocean Road, Los Angeles, CA 90011",     hours: "Open · Closes 10:00 PM", phone: "(716) 556-0125" },
];

const faqs = [
  "Do you offer same-day delivery?",
  "What payment methods do you accept?",
  "Are your products laboratory tested?",
];

/* ─── Animation Variants ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.09 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const } },
};

/* ══════════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");

  return (
    <div className="overflow-x-hidden">

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[560px] lg:min-h-[620px] overflow-hidden flex items-center"
        style={{ backgroundColor: "#1A2E1A" }}
      >
        {/* Background — Hero_banner.png */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 will-change-transform">
          <Image
            src="/images/Hero_banner.png"
            alt="Premium cannabis products"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Gradient overlay: strong on left for text, fade right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        </motion.div>

        {/* Hero content */}
        <div className="container-site relative z-10 py-20 lg:py-28">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-[520px]">

            {/* ── "ESTABLISHED 2024" pill ── */}
            <motion.div variants={fadeUp} className="mb-6">
              <span
                className="inline-flex items-center px-5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{
                  background: "rgba(20,20,20,0.72)",
                  border: "1px solid rgba(201,169,97,0.4)",
                  color: "#C9A961",
                  backdropFilter: "blur(8px)",
                }}
              >
                ESTABLISHED 2024
              </span>
            </motion.div>

            {/* Main headline — ALL WHITE */}
            <motion.h1
              variants={fadeUp}
              className="font-bold leading-[1.08] mb-5"
              style={{
                fontFamily: "Times New Roman, serif",
                fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                color: "#fff"
              }}
            >
              Premium Cannabis
              <br />Products for Every
              <br />
              <span style={{ color: "#C9A961" }}>Lifestyle</span>
            </motion.h1>

            {/* Sub copy */}
            <motion.p
              variants={fadeUp}
              className="text-sm leading-relaxed mb-8 max-w-[420px]"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry&apos;s standard dummy text ever since 1500s, when designers at Letterset and James Mosley, the librarian at St Bride Printing.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Button href="/shop" variant="primary">
                Shop Now
              </Button>
              <Button href="/contact" variant="outline">
                Find a Location
              </Button>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ══ 2. TRUST STRIP — Exact Figma match ═══════════════════════════════ */}
      <section className="bg-[#EDE8DF] py-5">
        <div className="container-site">
          {/* Green rounded container */}
          <div
            className="rounded-2xl py-5 px-6 md:px-10"
            style={{ background: "linear-gradient(to right, #2E3518 0%, #026C24 100%)" }}
          >
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {trustItems.map(({ img, label, sub }) => (
                <div key={label} className="flex items-center gap-2.5 justify-start">
                  {/* PNG Icon */}
                  <Image
                    src={img}
                    alt={`${label} ${sub}`}
                    width={44}
                    height={44}
                    className="w-11 h-11 flex-shrink-0 object-contain"
                  />
                  <div className="leading-tight">
                    <p className="text-white text-[11px] md:text-[13px] font-semibold">{label}</p>
                    <p className="text-[10px] md:text-[12px] font-semibold" style={{ color: "#C9A961" }}>{sub}</p>
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
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-[2.2rem] font-bold"
              style={{ fontFamily: "Times New Roman, serif", color: "#1B3A2D" }}
            >
              Explore Our Collection
            </motion.h2>
            {/* Gold underline accent */}
            <motion.div variants={fadeUp} className="flex justify-center mt-3 mb-1">
              <div className="w-10 h-[3px] rounded-full" style={{ background: "#C9A961" }} />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          >
            {categories.map((cat) => (
              <motion.div key={cat.label} variants={scaleIn}>
                <Link href={`/shop?category=${cat.slug}`} className="group block text-center">
                  <div className="relative overflow-hidden rounded-xl mb-2.5 aspect-[4/3]">
                    <Image
                      src={cat.img} alt={cat.label} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                    />
                  </div>
                  <p
                    className="text-sm font-semibold transition-colors"
                    style={{ fontFamily: "Manrope, sans-serif", color: "#2D6B4F" }}
                  >
                    {cat.label}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 4. NEW ARRIVALS — 100% Figma product cards ═══════════════════════ */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container-site">

          {/* Header row */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-bold"
                style={{ fontFamily: "Times New Roman, serif", color: "#1B3A2D" }}
              >
                New Arrivals
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm mt-1" style={{ color: "#767676" }}>
                Our latest premium drops, laboratory-certified.
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <Link
                href="/shop"
                className="text-sm font-semibold flex items-center gap-1 transition-colors hover:opacity-75"
                style={{ color: "#1B3A2D", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                View All Products
              </Link>
            </motion.div>
          </motion.div>

          {/* Product Cards — Exact Figma layout */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {newArrivals.map((p) => (
              <motion.div key={p.id} variants={scaleIn}>
                <div
                  className="group relative rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-shadow duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.14)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  style={{
                    background: "#FFFFFF",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                    transition: "box-shadow 0.3s ease, transform 0.3s ease",
                  }}
                >
                  {/* ── Image area — tall, takes most of the card ── */}
                  <div className="relative overflow-hidden" style={{ height: "280px" }}>
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    />

                    {/* Product type badge — green pill, top-left */}
                    <span
                      className="absolute top-3 left-3 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{ background: "#2D6B4F" }}
                    >
                      {p.type}
                    </span>
                  </div>

                  {/* ── Info area ── */}
                  <div className="p-4 flex flex-col gap-1 flex-1">

                    {/* Star rating */}
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-[#C9A961] text-[#C9A961]" />
                      <span className="text-xs font-semibold text-[#1A1A1A]">{p.rating}</span>
                      <span className="text-xs text-[#9E9E9E]">({p.reviews} reviews)</span>
                    </div>

                    {/* Product name — dark green like Figma */}
                    <h3
                      className="font-bold leading-snug"
                      style={{
                        fontFamily: "Times New Roman, serif",
                        fontSize: "1.05rem",
                        color: "#1B3A2D",
                      }}
                    >
                      {p.name}
                    </h3>

                    {/* Strain • THC info */}
                    <p className="text-xs" style={{ color: "#9E9E9E" }}>
                      {p.strain} • {p.thc}
                    </p>

                    {/* Price + Cart button row */}
                    <div className="flex items-center justify-between mt-3">
                      <span
                        className="font-bold text-lg"
                        style={{ fontFamily: "Manrope, sans-serif", color: "#2D6B4F" }}
                      >
                        {formatCurrency(p.price)}
                      </span>

                      {/* Green circle cart button */}
                      <Button
                        variant="dark"
                        size="icon"
                        className="w-9 h-9"
                        aria-label={`Add ${p.name} to cart`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ══ 5. SEASONAL BANNER (First) ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="relative" style={{ height: "300px" }}>
          <Image
            src="/images/Fresh-Summer-Blooms.png"
            alt="Seasonal Collection"
            fill className="object-cover object-center" sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                Limited Time Offer
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-white text-3xl md:text-4xl font-bold mb-3"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Seasonal Collection:<br />
                <span style={{ color: "#C9A961" }}>Fresh Summer Blooms</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm mb-6 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
                Experience the essence of the season with our exclusive sun-grown flower collection. 20% off all flower products this week.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Button href="/shop" variant="outline" className="px-7">
                  Explore the Sale
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 6. THE TOTALHERBALCARE DIFFERENCE ════════════════════════════════ */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger} className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-[2.2rem] font-bold mb-2"
              style={{ fontFamily: "Times New Roman, serif", color: "#1B3A2D" }}>
              The TotalHerbalCare Difference
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm max-w-xl mx-auto" style={{ color: "#767676" }}>
              Setting the benchmarks for quality, safety, and luxury in the cannabis wellness industry.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {differenceCards.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title} variants={scaleIn}
                className="bg-white rounded-xl p-6 transition-shadow duration-300 hover:shadow-lg"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "#F0F7F3" }}>
                  <Icon className="w-5 h-5" style={{ color: "#2D6B4F" }} />
                </div>
                <h3 className="font-semibold mb-2"
                  style={{ fontFamily: "Times New Roman, serif", fontSize: "1rem", color: "#1A1A1A" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#767676" }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 7. OUR COMMITMENT ════════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image
                  src="/images/OUR-COMMITMENT.png"
                  alt="Cannabis cultivation" fill className="object-cover"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
              {/* Floating badge */}
              <div
                className="absolute bottom-5 left-5 bg-white rounded-xl px-5 py-4 shadow-lg"
                style={{ transform: "none" }}
              >
                <p className="text-2xl font-bold" style={{ fontFamily: "Times New Roman, serif", color: "#2D6B4F" }}>
                  10+ Years
                </p>
                <p className="text-xs max-w-[160px] mt-0.5" style={{ color: "#767676" }}>
                  Of experience in organic cultivation and wellness innovation
                </p>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#2D6B4F" }}>
                Our Commitment
              </p>
              <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4"
                style={{ fontFamily: "Times New Roman, serif", color: "#1A1A1A" }}>
                Elevating Standards<br />in Cannabis Wellness
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#4A4A4A" }}>
                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry&apos;s standard dummy text ever since 1500s, when designers at Letterset and James Mosley. The librarian at St Bride Printing.
              </p>
              <div className="space-y-4">
                {["Ethical Cultivation", "Community Education"].map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "rgba(45,107,79,0.12)" }}>
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "#2D6B4F" }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5" style={{ color: "#1A1A1A" }}>{item}</p>
                      <p className="text-sm" style={{ color: "#767676" }}>
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum.
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

      {/* ══ 8. WHAT OUR COMMUNITY SAYS ═══════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#F0EBE1" }}>
        <div className="container-site">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger} className="text-center mb-10"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-[2.2rem] font-bold mb-3"
              style={{ fontFamily: "Times New Roman, serif", color: "#1A1A1A" }}>
              What Our Community Says
            </motion.h2>
            <motion.div variants={fadeUp} className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#C9A961] text-[#C9A961]" />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.author} variants={scaleIn}
                className="bg-white rounded-2xl p-6 transition-shadow duration-300 hover:shadow-lg"
                style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A961] text-[#C9A961]" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "#4A4A4A" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={t.img} alt={t.author} fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1A1A1A" }}>{t.author}</p>
                    <p className="text-[11px]" style={{ color: "#767676" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 9. CANNABIS EDUCATION ════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger} className="flex items-end justify-between mb-8"
          >
            <div>
              <motion.h2 variants={fadeUp} className="text-3xl font-bold"
                style={{ fontFamily: "Times New Roman, serif", color: "#1B3A2D" }}>
                Cannabis Education
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm mt-1" style={{ color: "#767676" }}>
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
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {blogPosts.map((post) => (
              <motion.div key={post.id} variants={scaleIn}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative rounded-xl overflow-hidden mb-4" style={{ aspectRatio: "16/10" }}>
                    <Image
                      src={post.img} alt={post.title} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase block mb-1.5"
                    style={{ color: "#2D6B4F" }}>
                    {post.category}
                  </span>
                  <h3 className="font-bold mb-2 transition-colors group-hover:opacity-70"
                    style={{ fontFamily: "Times New Roman, serif", fontSize: "1rem", color: "#1A1A1A" }}>
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#767676" }}>{post.excerpt}</p>
                  <span className="flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                    style={{ color: "#2D6B4F" }}>
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ 10. SEASONAL BANNER 2 ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="relative" style={{ height: "220px" }}>
          <Image
            src="/images/Limited-time-offer.png"
            alt="Fresh Summer Blooms" fill className="object-cover object-center" sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.52)" }} />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>
              Seasonal Collection
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "Times New Roman, serif" }}>
              Fresh Summer Blooms
            </h2>
            <p className="text-sm mb-4 max-w-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum.
            </p>
            <Button href="/shop" variant="primary" className="py-2 px-6 w-fit">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* ══ 11. FIND A LOCATION ══════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container-site">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger} className="flex items-end justify-between mb-8"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold"
              style={{ fontFamily: "Times New Roman, serif", color: "#1A1A1A" }}>
              Find a Location Near You
            </motion.h2>
            <motion.div variants={fadeUp}>
              <Link href="/contact" className="flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-70"
                style={{ color: "#2D6B4F" }}>
                View All Locations <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            {locations.map((loc) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-5 flex gap-4"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
              >
                <div className="w-28 h-24 rounded-lg flex-shrink-0 flex items-center justify-center"
                  style={{ background: "#1B3A2D" }}>
                  <span className="text-white font-bold text-xs text-center">CANNABIS</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-2"
                    style={{ fontFamily: "Times New Roman, serif", color: "#1A1A1A" }}>
                    {loc.name}
                  </h3>
                  <div className="space-y-1.5 text-[12px]" style={{ color: "#767676" }}>
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#2D6B4F" }} />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#2D6B4F" }} />
                      <span className="font-medium" style={{ color: "#2D6B4F" }}>{loc.hours}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#2D6B4F" }} />
                      <span>{loc.phone}</span>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" className="mt-3">
                    Get Directions
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <div className="w-full rounded-xl overflow-hidden relative" style={{ height: "220px" }}>
            <Image
              src="/images/Find-a-Location-Near-You.png"
              alt="Map of Los Angeles" fill className="object-cover" sizes="100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.15)" }}>
              <div className="bg-white rounded-full px-5 py-2 text-sm font-semibold shadow-lg"
                style={{ color: "#1A1A1A" }}>
                Los Angeles
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 12. STAY ELEVATED / NEWSLETTER ═══════════════════════════════════ */}
      <section className="py-14" style={{ background: "#1B3A2D" }}>
        <div className="container-site">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1"
                style={{ fontFamily: "Times New Roman, serif" }}>
                Stay Elevated
              </h2>
              <p className="text-sm max-w-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                Lorem ipsum dummy summary text about product printing and typesetting convenience.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 md:w-72 text-sm px-4 py-2.5 rounded-full outline-none transition-colors"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                }}
              />
              <Button variant="white" size="md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 13. FAQ ══════════════════════════════════════════════════════════ */}
      <section className="py-16" style={{ background: "#F5F0E8" }}>
        <div className="container-site" style={{ maxWidth: "720px" }}>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={stagger} className="text-center mb-10"
          >
            <motion.h2 variants={fadeUp} className="text-3xl font-bold"
              style={{ fontFamily: "Times New Roman, serif", color: "#1A1A1A" }}>
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((q, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white rounded-xl overflow-hidden"
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-left transition-colors hover:opacity-70"
                  style={{ color: "#2D6B4F" }}
                >
                  <span>{q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: "#2D6B4F" }} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#767676" }}>
                        Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
