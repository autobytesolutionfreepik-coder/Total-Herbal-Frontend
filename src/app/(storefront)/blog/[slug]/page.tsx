"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Clock, Calendar, Share2, ArrowLeft, Mail, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useBlogPostBySlugQuery, useBlogPostsQuery } from "@/features/blog/api";
import { BlogPost } from "@/features/blog/types";
import { useSubscribeNewsletterMutation } from "@/features/marketing/api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function SingleBlogPostPage({ params }: PageProps) {
  const { slug } = use(params);
  const [email, setEmail] = useState("");

  const { data: post, isLoading } = useBlogPostBySlugQuery(slug);
  const { data: recentPostsData } = useBlogPostsQuery({ limit: 3 });
  const newsletterMutation = useSubscribeNewsletterMutation();

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      await newsletterMutation.mutateAsync(email);
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch {
      toast.error("Newsletter subscription failed.");
    }
  };

  const formattedDate = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "April 14, 2024";

  return (
    <div className="bg-[#EFEBE2] min-h-screen font-[Manrope] pb-16">
      {/* Top Navigation */}
      <div className="bg-white/60 border-b border-[#E2DAD0] py-3">
        <div className="container-site flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#016C24] hover:text-[#027F2C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A4A4A] hover:text-[#016C24] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" /> Share Article
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="container-site py-16 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#016C24]" />
          <p className="text-xs text-[#767676] mt-2">Loading article...</p>
        </div>
      ) : !post ? (
        <div className="container-site py-16 text-center">
          <h1 className="text-3xl font-serif text-[#016C24] font-bold mb-3">
            Article Not Found
          </h1>
          <p className="text-sm text-[#767676] mb-6">
            The requested education guide could not be located.
          </p>
          <Button href="/blog" variant="primary">
            Explore All Blog Posts
          </Button>
        </div>
      ) : (
        <>
          {/* Article Header */}
          <article className="container-site max-w-4xl pt-10 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category Pill */}
              <span className="inline-block bg-[#016C24] text-white text-[10px] font-extrabold tracking-widest uppercase px-3.5 py-1 rounded-full mb-4">
                {post.category?.name || "EDUCATION"}
              </span>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-[1.12] mb-4"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-base sm:text-lg text-[#4A4A4A] leading-relaxed mb-6 font-medium">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Meta Row */}
              <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-[#E2DAD0] text-xs text-[#767676] font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#016C24]/10 text-[#016C24] flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[#1A1A1A] font-semibold">
                      {post.authorName || "Total Herbal Care Advisor"}
                    </span>
                    <span className="text-[10px] text-[#767676]">Botanical Specialist</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#016C24]" />
                  <span>{formattedDate}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#016C24]" />
                  <span>5 min read</span>
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            {post.coverImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden my-8 aspect-[16/9] shadow-md border border-[#E2DAD0]"
              >
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 900px"
                />
              </motion.div>
            )}

            {/* Rich Content Body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose prose-lg max-w-none text-[#333333] leading-relaxed font-[Manrope] py-4 space-y-6"
            >
              {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <>
                  <p>
                    Cannabinoids and terpenes represent the primary active compounds in organic herbal cannabis. When consumed together, they produce what scientists call the <strong>entourage effect</strong>—a synergistic relationship where individual botanical elements enhance each other&apos;s therapeutic properties.
                  </p>
                  <h2
                    className="text-2xl font-bold text-[#016C24] mt-8 mb-3"
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    The Role of Major Terpenes
                  </h2>
                  <p>
                    From <em>Myrcene</em> (promotes deep muscle relaxation) to <em>Limonene</em> (delivers uplifting mood support), terpenes define the distinct aroma profiles of indica, sativa, and hybrid cultivars. Third-party laboratory testing allows patients and recreational adult consumers to select products with specific chemical compositions tailored to their wellness goals.
                  </p>
                  <blockquote className="border-l-4 border-[#016C24] pl-6 italic text-[#016C24] font-serif text-lg bg-white/60 py-4 rounded-r-2xl my-6">
                    &ldquo;Understanding terpene profiles transforms personal strain selection from guesswork into a precise science of botanical wellness.&rdquo;
                  </blockquote>
                  <h2
                    className="text-2xl font-bold text-[#016C24] mt-8 mb-3"
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    Best Practices for Organic Consumption
                  </h2>
                  <p>
                    To optimize absorption and longevity of effects, store flowers and tinctures in cool, UV-protected containers. Always start with low doses when exploring new high-potency concentrates or full-spectrum edibles.
                  </p>
                </>
              )}
            </motion.div>
          </article>

          {/* Related Articles Grid */}
          <section className="container-site max-w-4xl pt-10 border-t border-[#E2DAD0]">
            <h3
              className="text-2xl font-bold text-[#016C24] mb-6"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Related Education Guides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPostsData?.data
                ?.filter((p: BlogPost) => p.slug !== slug)
                .slice(0, 3)
                .map((rel: BlogPost) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="group bg-white/60 hover:bg-white p-4 rounded-2xl border border-transparent hover:border-[#E2DAD0] transition-all shadow-xs"
                  >
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-3 bg-[#FAF8F5]">
                      <Image
                        src={rel.coverImage || "/images/Beginners.png"}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#016C24] tracking-widest uppercase block mb-1">
                      {rel.category?.name || "WELLNESS"}
                    </span>
                    <h4
                      className="font-bold text-sm text-[#1A1A1A] group-hover:text-[#016C24] transition-colors leading-snug line-clamp-2"
                      style={{ fontFamily: "Times New Roman, serif" }}
                    >
                      {rel.title}
                    </h4>
                  </Link>
                ))}
            </div>
          </section>

          {/* Newsletter Callout */}
          <section className="container-site max-w-4xl pt-12">
            <div className="relative rounded-3xl overflow-hidden py-10 px-6 md:px-12 bg-[#016C24] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Enjoying Our Research?
                </h3>
                <p className="text-xs md:text-sm text-white/85">
                  Get monthly cannabis science whitepapers and exclusive store coupon drops.
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex items-center bg-white rounded-full px-4 py-2 w-full md:w-auto shadow-md"
              >
                <Mail className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-400 w-full md:w-48"
                />
                <Button
                  type="submit"
                  disabled={newsletterMutation.isPending}
                  variant="primary"
                  className="rounded-full px-5 py-2 text-xs bg-[#016C24] hover:bg-[#027F2C] text-white font-semibold shadow-xs shrink-0 ml-2"
                >
                  {newsletterMutation.isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </form>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
