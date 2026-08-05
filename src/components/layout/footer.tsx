import Link from "next/link";
import { MapPin, Phone, Mail, Share2, Send, Camera, Play, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Flowers", href: "/shop?category=flowers" },
  { label: "Pre-Rolls", href: "/shop?category=pre-rolls" },
  { label: "Vapes", href: "/shop?category=vapes" },
  { label: "Edibles", href: "/shop?category=edibles" },
  { label: "Lab Results", href: "/about" },
];

const supportLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Shipping Info", href: "/faq" },
  { label: "FAQ", href: "/faq" },
];

export function Footer() {
  return (
    <footer className="relative text-white overflow-hidden bg-[#0D2318] border-t border-[#EDE8DF]/20">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#016C24]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#C9A961]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-site py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center group gap-0.5">
              <span style={{ fontFamily: "Times New Roman, serif", fontSize: "1.85rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                Total
              </span>
              <span style={{ fontFamily: "Times New Roman, serif", fontSize: "1.85rem", fontWeight: 700, color: "#4CAF80", letterSpacing: "-0.02em" }}>
                Herbal
              </span>
              <span style={{ fontFamily: "Times New Roman, serif", fontSize: "1.85rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                Care
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A961] ml-0.5" />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm font-medium">
              Premium lab-tested organic cannabis formulas, craft flowers, and apothecary remedies. Sourced from certified California cultivators. Adults 21+ only.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[Share2, Send, Camera, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#016C24] hover:scale-110 flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-white/30"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4 text-white/90" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#C9A961] mb-5">Catalog Categories</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-[#C9A961] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#C9A961] mb-5">Customer Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-[#C9A961] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#C9A961] mb-5">Dispensary Storefront</h4>
            <div className="space-y-3 text-sm text-white/70 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-[#4CAF80] flex-shrink-0" />
                <span>520 Overthrow Blvd, Green District<br />Los Angeles, CA 90011</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#4CAF80] flex-shrink-0" />
                <span>(716) 556-0125</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#4CAF80] flex-shrink-0" />
                <span>hello@totalherbalcare.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10 bg-black/30 backdrop-blur-md">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2026 Total Herbal Care. All Rights Reserved. Adults 21+ Only. License No. C10-0000123-LIC.</p>
          <div className="flex items-center gap-6 font-medium">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Live Chat Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button variant="primary" size="md" className="shadow-[0_8px_30px_rgba(1,108,36,0.4)] border border-white/20 flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all">
          <MessageCircle className="w-4.5 h-4.5" />
          <span>Consult Budtender</span>
        </Button>
      </div>
    </footer>
  );
}
