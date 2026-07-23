"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["All Posts", "Wellness", "Science", "Lifestyle", "Recipes"];

const blogPostsList = [
  {
    id: "1",
    category: "RECIPES",
    date: "April 14, 2024",
    readTime: "6 min read",
    title: "A Beginner's Guide to CBD",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/Beginners.png",
    slug: "beginners-guide-to-cbd",
  },
  {
    id: "2",
    category: "WELLNESS",
    date: "April 11, 2024",
    readTime: "8 min read",
    title: "Understanding Terpenes",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/science.png",
    slug: "understanding-terpenes",
  },
  {
    id: "3",
    category: "SCIENCE",
    date: "April 08, 2024",
    readTime: "15 min read",
    title: "The Art of Pre-Rolls",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "/images/LIFESTYLE.png",
    slug: "the-art-of-pre-rolls",
  },
  {
    id: "4",
    category: "RECIPES",
    date: "April 14, 2024",
    readTime: "6 min read",
    title: "Infused Morning Rituals: 5 Antioxidant-Rich Recipes",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    slug: "infused-morning-rituals",
  },
  {
    id: "5",
    category: "WELLNESS",
    date: "April 11, 2024",
    readTime: "8 min read",
    title: "The Art of Mindful Dosing: A Patient's Guide",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",
    slug: "art-of-mindful-dosing",
  },
  {
    id: "6",
    category: "SCIENCE",
    date: "April 08, 2024",
    readTime: "15 min read",
    title: "Beyond THC: The Emerging Power of Minor Cannabinoids",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
    slug: "beyond-thc-minor-cannabinoids",
  },
  {
    id: "7",
    category: "LIFESTYLE",
    date: "April 05, 2024",
    readTime: "5 min read",
    title: "Sustainable Living: Why Regenerative Farming Matters",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    slug: "sustainable-living-regenerative-farming",
  },
  {
    id: "8",
    category: "SCIENCE",
    date: "April 02, 2024",
    readTime: "10 min read",
    title: "Anatomy of a Flower: Understanding Plant Trichomes",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&w=600&q=80",
    slug: "anatomy-of-a-flower-trichomes",
  },
  {
    id: "9",
    category: "LIFESTYLE",
    date: "March 29, 2024",
    readTime: "7 min read",
    title: "The Modern Dispensary: How Design Influences Wellness",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    slug: "the-modern-dispensary-design",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [email, setEmail] = useState("");

  const filteredPosts =
    selectedCategory === "All Posts"
      ? blogPostsList
      : blogPostsList.filter(
          (post) =>
            post.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="bg-[#F5F0E8] min-h-screen font-[Manrope] pb-12">
      {/* ══ 1. FULL BLEED EDGE-TO-EDGE HERO BANNER (FIGMA MATCH) ════════════ */}
      <section className="relative w-full bg-[#F3EFE6] border-b border-[#E5DFD3] overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[440px] 2xl:min-h-[480px] flex items-center">
        {/* Full Bleed Image */}
        <Image
          src="/images/Fresh-Summer-Blooms.png"
          alt="The Molecular Symphony Hero Banner"
          fill
          priority
          className="object-cover object-right"
          sizes="100vw"
        />

        {/* Left Fade Gradient for High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F3EFE6] via-[#F3EFE6]/90 via-40% md:via-48% to-transparent pointer-events-none" />

        {/* Content Container */}
        <div className="container-site relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="py-10 md:py-14 max-w-2xl text-left"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-1.5 text-xs text-[#767676] mb-3 font-medium">
              <Link href="/" className="hover:text-[#016C24] transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="font-semibold text-[#1A1A1A]">Blog</span>
            </motion.div>

            <motion.div variants={fadeIn} className="mb-4">
              <span
                className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1A1A1A] block mb-1"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                The Molecular Symphony:
              </span>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-[#016C24]"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Understanding Terpenes <br className="hidden sm:inline" />
                and Their Healing Potential
              </h1>
            </motion.div>

            <motion.p
              variants={fadeIn}
              className="text-xs md:text-sm 2xl:text-base text-[#4A4A4A] leading-relaxed max-w-xl font-medium"
            >
              Explore the intricate science behind the aromatic compounds that define the cannabis experience and how they interact with your body&apos;s endocannabinoid system.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. CATEGORY FILTER PILLS BAR ════════════════════════════════════ */}
      <section className="py-10 bg-[#F5F0E8]">
        <div className="container-site">
          <div className="bg-[#EFEBE2] p-2 rounded-full max-w-3xl mx-auto flex items-center justify-center gap-2 sm:gap-4 flex-wrap border border-[#E2DAD0] shadow-xs">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? "bg-[#016C24] text-white shadow-sm"
                      : "text-[#4A4A4A] hover:text-[#016C24] hover:bg-white/50"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ 3. RECENT INSIGHTS GRID ═════════════════════════════════════════ */}
      <section className="py-8 md:py-12 bg-[#F5F0E8]">
        <div className="container-site">
          <div className="mb-10 text-left">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#016C24] mb-2"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Recent Insights
            </h2>
            <p className="text-xs md:text-sm text-[#767676] font-medium">
              Exploring the frontier of botanical wellness.
            </p>
          </div>

          {/* 3 Column Blog Grid */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={fadeIn}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full bg-white/40 hover:bg-white rounded-3xl p-4 transition-all duration-300 border border-transparent hover:border-[#E8E0D2] hover:shadow-md"
                >
                  {/* Card Image */}
                  <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[16/10] w-full bg-[#FAF8F5]">
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />

                    {/* Category Badge Pill */}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-xs">
                      {post.category}
                    </span>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-3 text-[11px] text-[#767676] mb-2 font-medium">
                    <span>{post.date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#016C24]" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-lg md:text-xl text-[#016C24] group-hover:text-[#027F2C] transition-colors mb-2 leading-snug"
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-[#767676] leading-relaxed mt-auto font-medium">
                    {post.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
    </div>
  );
}
