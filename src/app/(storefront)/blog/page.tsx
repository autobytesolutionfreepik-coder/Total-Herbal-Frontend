"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Mail, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useBlogPostsQuery, useBlogCategoriesQuery } from "@/features/blog/api";
import { useSubscribeNewsletterMutation } from "@/features/marketing/api";

const defaultCategories = ["All Posts", "Wellness", "Science", "Lifestyle", "Recipes"];

const defaultPosts = [
  {
    id: "1",
    category: "RECIPES",
    date: "April 14, 2024",
    readTime: "6 min read",
    title: "A Beginner's Guide to CBD",
    desc: "Learn how full-spectrum cannabinoids interact with your endocannabinoid system to support balance.",
    img: "/images/Beginners.png",
    slug: "beginners-guide-to-cbd",
  },
  {
    id: "2",
    category: "WELLNESS",
    date: "April 11, 2024",
    readTime: "8 min read",
    title: "Understanding Terpenes",
    desc: "Explore aromatic compounds that define strain effects, natural flavor profiles, and wellness benefits.",
    img: "/images/science.png",
    slug: "understanding-terpenes",
  },
  {
    id: "3",
    category: "SCIENCE",
    date: "April 08, 2024",
    readTime: "15 min read",
    title: "The Art of Pre-Rolls",
    desc: "From unbleached hemp papers to kief infusion techniques, discover premium pre-roll craftsmanship.",
    img: "/images/LIFESTYLE.png",
    slug: "the-art-of-pre-rolls",
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

  const { data: serverBlogPosts, isLoading } = useBlogPostsQuery();
  const { data: serverCategories } = useBlogCategoriesQuery();
  const newsletterMutation = useSubscribeNewsletterMutation();

  const categories = serverCategories?.length
    ? ["All Posts", ...serverCategories.map((c) => c.name)]
    : defaultCategories;

  const postsList = serverBlogPosts?.data?.length
    ? serverBlogPosts.data.map((b) => ({
        id: b.id,
        category: b.category?.name?.toUpperCase() || "WELLNESS",
        date: new Date(b.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        readTime: `${(b as unknown as { readTime?: number }).readTime || 5} min read`,
        title: b.title,
        desc: b.excerpt,
        img: b.coverImage || "/images/Beginners.png",
        slug: b.slug,
      }))
    : defaultPosts;

  const filteredPosts =
    selectedCategory === "All Posts"
      ? postsList
      : postsList.filter(
          (post) =>
            post.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleSubscribe = async (e: React.FormEvent) => {
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
    <div className="bg-[#EFEBE2] min-h-screen font-[Manrope] pb-12">
      {/* ══ 1. HERO BANNER ════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#EFEBE2] border-b border-[#E2DAD0] overflow-hidden min-h-[300px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[460px] 2xl:min-h-[500px] flex items-center">
        <Image
          src="/images/blog-banner.png"
          alt="The Molecular Symphony Hero Banner Graphic"
          fill
          priority
          quality={100}
          className="object-cover object-center"
          sizes="100vw"
        />

        <div className="container-site relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="py-10 md:py-14 max-w-xl lg:max-w-2xl text-left"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-1.5 text-[11px] text-[#666666] mb-3 font-medium">
              <Link href="/" className="hover:text-[#016C24] transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="font-semibold text-[#1A1A1A]">Blog</span>
            </motion.div>

            <motion.div variants={fadeIn} className="mb-4">
              <span
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-[#1A1A1A] block mb-1 leading-tight"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                The Molecular Symphony:
              </span>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-bold leading-[1.06] text-[#016C24]"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Understanding Terpenes <br className="hidden sm:inline" />
                and Their Healing Potential
              </h1>
            </motion.div>

            <motion.p
              variants={fadeIn}
              className="text-xs md:text-sm 2xl:text-base text-[#4A4A4A] leading-relaxed max-w-md font-medium"
            >
              Explore the science behind the aromatic compounds that define the cannabis experience and how they interact with your body&apos;s endocannabinoid system.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. CATEGORY FILTERS ═════════════════════════════════════════════ */}
      <section className="py-10 bg-[#EFEBE2]">
        <div className="container-site">
          <div className="bg-[#E5DCD0] p-3 rounded-full max-w-4xl mx-auto flex items-center justify-center gap-4 sm:gap-8 flex-wrap border border-[#DDD3C5]">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-7 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    isSelected
                      ? "bg-[#016C24] text-white shadow-sm font-bold"
                      : "text-[#3D433E] hover:text-[#016C24]"
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
      <section className="py-8 md:py-12 bg-[#EFEBE2]">
        <div className="container-site">
          <div className="mb-10 text-left">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#016C24] mb-2"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Recent Insights
            </h2>
            <p className="text-xs md:text-sm text-[#4A4A4A] font-medium">
              Exploring the frontier of botanical wellness.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-[#E5DCD0] rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : (
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
                    className="group flex flex-col h-full bg-white/50 hover:bg-white rounded-3xl p-4 transition-all duration-300 border border-transparent hover:border-[#E2DAD0] hover:shadow-md"
                  >
                    <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[16/10] w-full bg-[#FAF8F5]">
                      <Image
                        src={post.img}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                      />

                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#1A1A1A] text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-xs">
                        {post.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-[#767676] mb-2 font-medium">
                      <span>{post.date}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#016C24]" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3
                      className="font-bold text-lg md:text-xl text-[#016C24] group-hover:text-[#027F2C] transition-colors mb-2 leading-snug"
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {post.title}
                    </h3>

                    <p className="text-xs md:text-sm text-[#767676] leading-relaxed mt-auto font-medium line-clamp-2">
                      {post.desc}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ══ 4. NEWSLETTER BANNER ═════════════════════════════════════════════ */}
      <section className="py-8 bg-[#EFEBE2]">
        <div className="container-site">
          <div className="relative rounded-3xl overflow-hidden py-12 px-8 md:px-28 bg-[#016C24] shadow-xl">
            <div className="absolute left-0 bottom-0 top-0 w-[120px] md:w-[250px] pointer-events-none select-none">
              <Image
                src="/images/cta-left.png"
                alt="Cannabis Leaf Left"
                fill
                className="object-contain object-left-bottom"
                sizes="(max-width: 768px) 120px, 250px"
              />
            </div>

            <div className="absolute right-0 bottom-0 top-0 w-[120px] md:w-[280px] pointer-events-none select-none">
              <Image
                src="/images/Cta-right.png"
                alt="Cannabis Leaf Right"
                fill
                className="object-contain object-right-bottom"
                sizes="(max-width: 768px) 120px, 280px"
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
                  Subscribe to receive dispensary product drops, wellness insights, and special coupon codes.
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row w-full lg:w-auto items-stretch sm:items-center gap-3"
              >
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
    </div>
  );
}
