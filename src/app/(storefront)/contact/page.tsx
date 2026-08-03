"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap,
  Award,
  Lock,
  Sparkles,
  ChevronDown,
  Mail,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSubmitContactMutation, useSubscribeNewsletterMutation } from "@/features/marketing/api";

const features = [
  {
    icon: Zap,
    title: "Fast Support",
    desc: "Responsive herbal consultation team ready to assist with strain selection and order inquiries.",
  },
  {
    icon: Award,
    title: "Licensed Experts",
    desc: "Certified cannabis wellness advisors trained in cannabinoid science and organic extraction.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    desc: "Strict privacy safeguards and encrypted client communication for discreet herbal delivery.",
  },
  {
    icon: Sparkles,
    title: "Personalized Guidance",
    desc: "Tailored strain recommendations matched to your specific lifestyle and sleep goals.",
  },
];

const faqsList = [
  {
    q: "How fast do dispensary support representatives respond?",
    a: "Our customer guidance team typically responds within 1 to 2 business hours during dispensary operation times (9 AM - 9 PM PST).",
  },
  {
    q: "Can I request a personalized strain consultation before ordering?",
    a: "Absolutely! Submit your inquiry with details about your wellness goals, and our specialists will provide tailored product recommendations.",
  },
  {
    q: "What should I do if I need to update my shipping address?",
    a: "If your order has not been dispatched, contact support immediately with your order number or manage your addresses in your account dashboard.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("Product Inquiry");
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const submitContactMutation = useSubmitContactMutation();
  const submitNewsletterMutation = useSubscribeNewsletterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContactMutation.mutateAsync({
        name: fullName,
        email: emailAddress,
        phone: phoneNumber || undefined,
        subject,
        message,
      });
      toast.success("Thank you! Your inquiry has been submitted successfully.");
      setFullName("");
      setEmailAddress("");
      setPhoneNumber("");
      setMessage("");
    } catch {
      toast.error("Failed to submit contact message. Please try again.");
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      await submitNewsletterMutation.mutateAsync(newsletterEmail);
      toast.success("Thank you for subscribing to Total Herbal Care!");
      setNewsletterEmail("");
    } catch {
      toast.error("Newsletter subscription failed.");
    }
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen pb-12 font-[Manrope]">
      {/* ══ 1. HERO BANNER ════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#F3EFE6] border-b border-[#E5DFD3] overflow-hidden min-h-[300px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[460px] 2xl:min-h-[500px] flex items-center">
        <Image
          src="/images/contact-banner.png"
          alt="Let's Start The Conversation Full Width Banner"
          fill
          className="object-cover object-right-top"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#F3EFE6] via-[#F3EFE6]/90 via-35% md:via-42% to-transparent pointer-events-none" />

        <div className="container-site relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="py-8 md:py-12 2xl:py-14 max-w-xl text-left"
          >
            <motion.div variants={fadeIn} className="flex items-center gap-1.5 text-[11px] md:text-xs text-[#767676] mb-3 font-medium">
              <Link href="/" className="hover:text-[#016C24] transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="font-medium text-[#1A1A1A]">Contact</span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold leading-[1.06] mb-4 text-[#016C24]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Let&apos;s Start <br /> The Conversation
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xs md:text-sm 2xl:text-base text-[#4A4A4A] leading-relaxed mb-6 max-w-md font-medium"
            >
              Have questions about our lab-tested organic strains, store hours, or online order delivery? Our certified specialists are ready to help.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-3">
              <Button
                href="#inquiry"
                variant="primary"
                className="px-7 py-3 text-xs md:text-sm font-semibold rounded-full shadow-md hover:scale-102 transition-transform bg-[#016C24] text-white"
              >
                Contact Support
              </Button>
              <Button
                href="/location"
                variant="outline"
                className="px-7 py-3 text-xs md:text-sm font-semibold rounded-full border-none text-[#016C24] bg-white shadow-md hover:bg-[#F5F0E8] transition-all"
              >
                Find a Store
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. INQUIRY FORM ═══════════════════════════════════════════════════ */}
      <section id="inquiry" className="py-12 md:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 2xl:p-12 border border-[#E8E0D2] shadow-sm flex flex-col justify-between">
              <div>
                <h2
                  className="text-2xl md:text-4xl font-bold mb-2 text-[#016C24]"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Inquiry &amp; Guidance
                </h2>
                <p className="text-xs md:text-sm 2xl:text-base text-[#767676] leading-relaxed mb-6">
                  Fill out the form below and an herbal wellness advisor will respond promptly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full bg-[#FAF8F5] border border-[#E2DAD0] rounded-xl px-4 py-2.5 text-xs md:text-sm text-[#1A1A1A] outline-none focus:border-[#016C24] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full bg-[#FAF8F5] border border-[#E2DAD0] rounded-xl px-4 py-2.5 text-xs md:text-sm text-[#1A1A1A] outline-none focus:border-[#016C24] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[#FAF8F5] border border-[#E2DAD0] rounded-xl px-4 py-2.5 text-xs md:text-sm text-[#1A1A1A] outline-none focus:border-[#016C24] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Subject
                      </label>
                      <div className="relative">
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full appearance-none bg-[#FAF8F5] border border-[#E2DAD0] rounded-xl px-4 py-2.5 text-xs md:text-sm text-[#1A1A1A] outline-none focus:border-[#016C24] transition-colors cursor-pointer"
                        >
                          <option value="Product Inquiry">Product Inquiry</option>
                          <option value="Order Status">Order Status</option>
                          <option value="Dispensary Visit">Dispensary Visit</option>
                          <option value="General Feedback">General Feedback</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#016C24] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you today?"
                      className="w-full bg-[#FAF8F5] border border-[#E2DAD0] rounded-xl px-4 py-2.5 text-xs md:text-sm text-[#1A1A1A] outline-none focus:border-[#016C24] transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitContactMutation.isPending}
                    variant="primary"
                    className="w-full sm:w-auto px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:scale-102 transition-all bg-[#016C24] text-white"
                  >
                    {submitContactMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </Button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-[#E8E0D2] min-h-[380px] lg:h-full w-full bg-[#FAF8F5]">
                <Image
                  src="/images/OUR-COMMITMENT.png"
                  alt="Specialist Consultation"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#C9A961] mb-1">
                    EXPERT GUIDANCE
                  </p>
                  <h3
                    className="text-xl md:text-2xl font-bold mb-1"
                    style={{ fontFamily: "Times New Roman, serif" }}
                  >
                    Personalized Botanical Advice
                  </h3>
                  <p className="text-xs md:text-sm text-white/85 leading-relaxed">
                    Our certified strain specialists assist in selecting optimal cannabinoid and terpene profiles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. WHY CONSULT SPECIALISTS ════════════════════════════════════════ */}
      <section className="py-16 bg-[#F5F0E8] border-t border-[#E8E0D2]">
        <div className="container-site">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2
              className="text-2xl md:text-4xl font-bold text-[#016C24]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Why Consult Our Specialists?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[#E8E0D2] flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[#E6F4EA] flex items-center justify-center mb-4 text-[#016C24]">
                  <Icon className="w-5 h-5 text-[#016C24]" />
                </div>
                <h3
                  className="font-bold text-base text-[#1A1A1A] mb-1.5"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  {title}
                </h3>
                <p className="text-xs md:text-sm text-[#767676] leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. NEWSLETTER BANNER ═════════════════════════════════════════════ */}
      <section className="py-8 bg-[#F5F0E8]">
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
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400 w-full"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={submitNewsletterMutation.isPending}
                  variant="primary"
                  className="rounded-full px-8 py-2.5 border border-white text-white bg-transparent hover:bg-white hover:text-[#016C24] transition-all font-semibold shadow-md shrink-0"
                >
                  {submitNewsletterMutation.isPending ? (
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

      {/* ══ 5. FAQ ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#F5F0E8] border-t border-[#E8E0D2]">
        <div className="container-site max-w-3xl">
          <div className="text-center mb-10">
            <h2
              className="text-2xl md:text-4xl font-bold text-[#016C24]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqsList.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8E0D2]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-sm md:text-base font-semibold text-left transition-colors hover:text-[#016C24] text-[#2D6B4F]"
                >
                  <span>{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="w-4 h-4 flex-shrink-0 text-[#016C24]" />
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
                      <p className="px-6 pb-5 text-xs md:text-sm text-[#767676] leading-relaxed border-t border-[#FAF8F5] pt-3">
                        {faq.a}
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
