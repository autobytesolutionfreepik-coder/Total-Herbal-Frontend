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
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const features = [
  {
    icon: Zap,
    title: "Fast Support",
    desc: "Our team prioritizes timely responses to ensure your wellness journey is never interrupted.",
  },
  {
    icon: Award,
    title: "Licensed Experts",
    desc: "Consultations are handled by certified professionals with deep botanical knowledge.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    desc: "Your health information and personal data are protected by industry-leading security.",
  },
  {
    icon: Sparkles,
    title: "Personalized Guidance",
    desc: "We tailor every recommendation to your unique physiological needs and wellness goals.",
  },
];

const faqsList = [
  {
    q: "Do you offer same-day delivery?",
    a: "Yes! We offer fast, discreet, same-day delivery throughout the Los Angeles area for all orders placed before 8:00 PM. Deliveries are fully compliant with local laws and state regulations.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept cash upon delivery/pickup, as well as select secure digital payment methods. Our checkout process is fully encrypted and compliant to protect your transaction details.",
  },
  {
    q: "Are your products laboratory tested?",
    a: "Absolutely. All cannabis products at Total Herbal Care undergo rigorous, independent third-party laboratory testing. We verify terpene profiles, cannabinoid potency, and screen for heavy metals, pesticides, and microbial impurities to ensure maximum safety.",
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
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thank you! Your inquiry has been submitted successfully.");
      setFullName("");
      setEmailAddress("");
      setPhoneNumber("");
      setMessage("");
    }, 800);
  };

  return (
    <div className="bg-[#F5F0E8] min-h-screen pb-12 font-[Manrope]">
      {/* ══ 1. HERO BANNER ════════════════════════════════════════════════════ */}
      <section className="py-8 md:py-12 bg-[#F5F0E8] border-b border-[#E8E0D2]">
        <div className="container-site">
          <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md shadow-sm border border-white/60 p-6 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-xl text-left">
              <motion.div variants={fadeIn} className="flex items-center gap-2 text-xs text-[#767676] mb-3">
                <Link href="/" className="hover:text-[#016C24] transition-colors">
                  Home
                </Link>
                <span>&gt;</span>
                <span className="font-medium text-[#1A1A1A]">Contact</span>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-[#016C24]"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Let&apos;s Start The Conversation
              </motion.h1>

              <motion.p variants={fadeIn} className="text-xs md:text-sm text-[#55605A] leading-relaxed mb-6 max-w-md">
                Our dedicated team of herbalists and wellness experts are here to guide you on your journey. Reach out for personalized support or visit our flagship dispensary.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-wrap gap-3">
                <Button href="#inquiry" variant="primary" className="px-6 py-2.5 text-xs font-semibold rounded-full">
                  Contact Support
                </Button>
                <Button href="/location" variant="outline" className="px-6 py-2.5 text-xs font-semibold rounded-full border-[#D5CECE] hover:border-[#016C24] text-[#1A1A1A] bg-white">
                  Find a Store
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Image Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full lg:w-[48%] h-[220px] md:h-[280px] rounded-2xl overflow-hidden shadow-sm"
            >
              <Image
                src="/images/Apothecary.png"
                alt="Store Interior Apothecary"
                fill
                className="object-cover"
                priority
                sizes="(max-width:1024px) 100vw, 48vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 2. INQUIRY & GUIDANCE FORM SECTION ═════════════════════════════════ */}
      <section id="inquiry" className="py-12 md:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Form Column */}
            <div className="lg:col-span-6 bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-[#E8E0D2] shadow-sm flex flex-col justify-between">
              <div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-2 text-[#016C24]"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Inquiry &amp; Guidance
                </h2>
                <p className="text-xs md:text-sm text-[#767676] leading-relaxed mb-6">
                  Whether you&apos;re exploring herbal remedies for the first time or seeking specific product knowledge, our expert team is ready to assist you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Full Name
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

                    {/* Email Address */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                        Email Address
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
                    {/* Phone Number */}
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

                    {/* Subject */}
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

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">
                      Message
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

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={submitting}
                    variant="primary"
                    className="w-full sm:w-auto px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:scale-102 transition-all"
                  >
                    {submitting ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Image Consultation Column */}
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
                  <p className="text-xs text-white/80 leading-relaxed">
                    Schedule a 1-on-1 session with our certified wellness care team to select ideal dosages and strain profiles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. WHY CONSULT OUR SPECIALISTS? ═══════════════════════════════════ */}
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
                  Subscribe to receive our latest cannabis product drops, wellness insights, discount codes, and exclusive store delivery updates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row w-full lg:w-auto items-stretch sm:items-center gap-3">
                {/* Email input pill */}
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

      {/* ══ 5. FREQUENTLY ASKED QUESTIONS ═════════════════════════════════════ */}
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
                  className="w-full flex items-center justify-between px-6 py-4 text-sm md:text-base font-semibold text-left transition-colors hover:text-[#016C24]"
                  style={{ color: "#2D6B4F" }}
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
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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
