"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Clock,
  Compass,
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  UserCheck,
  Mail,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const locationsList = [
  {
    id: "1",
    name: "TotalHerbalCare - Downtown",
    status: "OPEN",
    address: "1202 Market Street, Suite 400, San Francisco, CA 94103",
    phone: "(415) 555-0123",
    hours: "9:00 AM - 10:00 PM Daily",
  },
  {
    id: "2",
    name: "TotalHerbalCare - Mission",
    status: "OPEN",
    address: "2450 Valencia Street, San Francisco, CA 94110",
    phone: "(415) 555-0199",
    hours: "10:00 AM - 9:00 PM Daily",
  },
];

const amenitiesList = [
  {
    icon: ShoppingBag,
    title: "Curbside Pickup",
    desc: "Fast & secure collection from your vehicle.",
  },
  {
    icon: ShieldCheck,
    title: "ADA Accessible",
    desc: "Fully compliant entryways and layouts.",
  },
  {
    icon: CreditCard,
    title: "ATM On-site",
    desc: "Secure cash access for convenient transactions.",
  },
  {
    icon: UserCheck,
    title: "Expert Consultation",
    desc: "In-house care specialists available daily.",
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

export default function LocationPage() {
  const [searchZip, setSearchZip] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="bg-[#F5F0E8] min-h-screen pb-12 font-[Manrope]">
      {/* ══ 1. HERO HEADER ════════════════════════════════════════════════════ */}
      <section className="py-12 bg-[#F5F0E8] text-center border-b border-[#E8E0D2]">
        <div className="container-site max-w-3xl">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeIn} className="flex items-center justify-center gap-2 text-xs text-[#767676] mb-3">
              <Link href="/" className="hover:text-[#016C24] transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="font-medium text-[#1A1A1A]">Location</span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-3xl md:text-5xl font-bold mb-4 text-[#016C24]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Find Your Local Dispensary
            </motion.h1>

            <motion.p variants={fadeIn} className="text-xs md:text-sm text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto">
              Experience award-winning botanical care and personalized consultations. Visit any of our licensed flagship locations across California or order online for fast same-day delivery.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. LOCATIONS LIST & MAP ═══════════════════════════════════════════ */}
      <section className="py-12">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Filter + Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Zip / City Search Box */}
              <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-[#E8E0D2] flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#767676] ml-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Enter zip code or city..."
                  value={searchZip}
                  onChange={(e) => setSearchZip(e.target.value)}
                  className="bg-transparent text-xs md:text-sm text-[#1A1A1A] placeholder-[#767676] outline-none flex-1 font-medium"
                />
                <button className="bg-[#016C24] hover:bg-[#027F2C] text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm">
                  FILTER
                </button>
              </div>

              {/* Location Cards */}
              <div className="space-y-4">
                {locationsList.map((loc) => (
                  <motion.div
                    key={loc.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E0D2] transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3
                        className="text-base md:text-lg font-bold text-[#1A1A1A]"
                        style={{ fontFamily: "Times New Roman, serif" }}
                      >
                        {loc.name}
                      </h3>
                      <span className="bg-[#E6F4EA] text-[#016C24] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {loc.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs md:text-sm text-[#55605A] mb-5">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#016C24] mt-0.5 flex-shrink-0" />
                        <span>{loc.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#016C24] flex-shrink-0" />
                        <span>{loc.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#016C24] flex-shrink-0" />
                        <span className="text-[#767676]">{loc.hours}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2.5 pt-2 border-t border-[#F0EBE1]">
                      <Button href="/shop" variant="primary" size="sm" className="px-5 py-2 text-xs font-semibold rounded-xl">
                        Order for Pickup
                      </Button>
                      <Button
                        href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                        variant="outline"
                        size="sm"
                        className="px-4 py-2 text-xs font-semibold rounded-xl border-[#D5CECE] hover:border-[#016C24] text-[#1A1A1A]"
                      >
                        <Compass className="w-3.5 h-3.5 mr-1 text-[#016C24]" />
                        Directions
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Map Graphic */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-[#E8E0D2] min-h-[420px] lg:min-h-[540px] w-full bg-[#FAF8F5]">
                <Image
                  src="/images/Find-a-Location-Near-You.png"
                  alt="Dispensary Locations Map"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 55vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />

                {/* Floating Map Pin Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#016C24]/10 flex items-center justify-center text-[#016C24]">
                      <MapPin className="w-5 h-5 text-[#016C24]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1A1A1A]">Los Angeles &amp; Bay Area Dispensaries</h4>
                      <p className="text-xs text-[#767676]">2 Licensed Stores • Open 7 Days a Week</p>
                    </div>
                  </div>
                  <Button href="/shop" variant="primary" size="sm" className="hidden sm:inline-flex text-xs">
                    View Catalog
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. PREMIUM AMENITIES ══════════════════════════════════════════════ */}
      <section className="py-16 bg-[#F5F0E8] border-t border-[#E8E0D2]">
        <div className="container-site">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2
              className="text-2xl md:text-4xl font-bold mb-2 text-[#016C24]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Premium Amenities
            </h2>
            <p className="text-xs md:text-sm text-[#767676]">
              Setting the standard for customer comfort, security, and accessibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenitiesList.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[#E8E0D2] flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[#E6F4EA] flex items-center justify-center mb-4 text-[#016C24]">
                  <Icon className="w-6 h-6 text-[#016C24]" />
                </div>
                <h3
                  className="font-bold text-base text-[#1A1A1A] mb-1.5"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  {title}
                </h3>
                <p className="text-xs md:text-sm text-[#767676] leading-relaxed max-w-[200px]">
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
