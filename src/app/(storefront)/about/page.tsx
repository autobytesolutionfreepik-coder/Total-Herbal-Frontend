"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Leaf,
  FlaskConical,
  Eye,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const valuesList = [
  {
    icon: Leaf,
    title: "Responsibly Sourced",
    desc: "We partner exclusively with small-scale farmers who prioritize regenerative agriculture and organic soil health.",
  },
  {
    icon: FlaskConical,
    title: "Evidence Based",
    desc: "Every formula is backed by clinical research and developed in collaboration with leading botanical scientists.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    desc: "Complete lab results and sourcing origins are provided for every single batch we produce.",
  },
];

const teamList = [
  {
    name: "Elena Thorne",
    role: "CEO & FOUNDER",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Julian Vance",
    role: "CHIEF MEDICAL OFFICER",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Maya Patel",
    role: "DIRECTOR OF SOURCING",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Marcus Reed",
    role: "CHIEF OPERATIONS OFFICER",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
  },
];

const purityFeatures = [
  {
    icon: ShieldCheck,
    title: "Triple-Tested Batching",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: Zap,
    title: "Advanced Extraction",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: HeartHandshake,
    title: "Patient Safety First",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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

export default function AboutPage() {
  return (
    <div className="bg-[#F5F0E8] min-h-screen font-[Manrope]">
      {/* ══ 1. FULL BLEED EDGE-TO-EDGE HERO BANNER (FIGMA MATCH) ════════════ */}
      <section className="relative w-full bg-[#162B1D] overflow-hidden min-h-[340px] sm:min-h-[400px] md:min-h-[460px] 2xl:min-h-[500px] flex items-center justify-center text-center">
        {/* Full Bleed Dewy Leaf Background Image */}
        <Image
          src="/images/Hero_banner.png"
          alt="Our Mission Background"
          fill
          priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />

        {/* Content Container */}
        <div className="container-site relative z-10 py-12 md:py-16">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeIn} className="flex items-center justify-center gap-1.5 text-xs text-[#E2DAD0] mb-3 font-medium">
              <Link href="/" className="hover:text-[#C9A961] transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="font-semibold text-white">About</span>
            </motion.div>

            <motion.p
              variants={fadeIn}
              className="text-xs font-bold tracking-[0.25em] uppercase mb-2 text-[#C9A961]"
            >
              OUR FOUNDATION
            </motion.p>

            <motion.h1
              variants={fadeIn}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold leading-tight mb-4 text-white"
              style={{ fontFamily: "Times New Roman, serif", color: "#FFFFFF" }}
            >
              Our Mission for Better Wellness
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xs md:text-sm 2xl:text-base text-white/80 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══ 2. THE TOTALHERBALCARE JOURNEY ════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#F5F0E8]">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6 space-y-5"
            >
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#016C24]"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                The TotalHerbalCare Journey
              </h2>

              <p className="text-xs md:text-sm 2xl:text-base text-[#4A4A4A] leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset&apos;s Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged.
              </p>

              <p className="text-xs md:text-sm 2xl:text-base text-[#4A4A4A] leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset&apos;s Body Type sheets. It has survived not only many decades.
              </p>
            </motion.div>

            {/* Right Large Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-6"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#E8E0D2] aspect-[4/3] w-full bg-white">
                <Image
                  src="/images/OUR-COMMITMENT.png"
                  alt="Budtender examining herbal flowers"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ 3. VALUES THAT DEFINE US ═════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#EFEBE2]">
        <div className="container-site">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#016C24]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Values That Define Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valuesList.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E0D2] hover:shadow-md transition-shadow flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-full bg-[#E6F4EA] flex items-center justify-center mb-6 text-[#016C24]">
                  <Icon className="w-5 h-5 text-[#016C24]" />
                </div>

                <h3
                  className="font-bold text-xl text-[#1A1A1A] mb-3"
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

      {/* ══ 4. UNCOMPROMISING PURITY & LAB ═════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#F5F0E8]">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Card: Feature List */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 md:p-10 border border-[#E8E0D2] shadow-sm flex flex-col justify-between">
              <div>
                <h2
                  className="text-2xl md:text-4xl font-bold mb-6 text-[#016C24]"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  Uncompromising Purity
                </h2>

                <div className="space-y-6">
                  {purityFeatures.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#E6F4EA] flex items-center justify-center flex-shrink-0 mt-1 text-[#016C24]">
                        <Icon className="w-4 h-4 text-[#016C24]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm md:text-base text-[#1A1A1A] mb-1">
                          {title}
                        </h4>
                        <p className="text-xs md:text-sm text-[#767676] leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Lab Image + Quote Box */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              {/* Lab Photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-sm border border-[#E8E0D2] h-[260px] md:h-[300px] w-full bg-white">
                <Image
                  src="/images/science.png"
                  alt="Laboratory Scientist Cannabis Research"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>

              {/* Quote Box */}
              <div className="bg-[#0A2616] rounded-3xl p-6 md:p-8 text-white shadow-md flex flex-col justify-center flex-1">
                <p className="text-xs md:text-sm italic leading-relaxed text-white/90">
                  &ldquo;Our standards aren&apos;t just met; they are exceeded. We believe transparency is the foundation of trust between us and our community.&rdquo;
                </p>
                <p className="text-xs font-semibold text-[#C9A961] mt-3 uppercase tracking-wider">
                  — Chief Compliance Officer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. LEADERSHIP SECTION ═════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#EFEBE2]">
        <div className="container-site">
          <div className="mb-12">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#016C24]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamList.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[4/4] bg-[#FAF8F5] border border-[#E8E0D2] shadow-sm">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-105"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  />
                </div>

                <h3
                  className="font-bold text-lg text-[#016C24]"
                  style={{ fontFamily: "Times New Roman, serif" }}
                >
                  {member.name}
                </h3>
                <p className="text-[11px] font-extrabold text-[#767676] tracking-widest uppercase">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. STAY ELEVATED NEWSLETTER BANNER ════════════════════════════════ */}
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
