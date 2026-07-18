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
    <footer
      className="relative text-white overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/footer.png')" }}
    >
      <div className="absolute inset-0 bg-black/5 z-0" />
      <div className="container-site py-14 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-0.5 mb-4">
              <span style={{ fontFamily: "Times New Roman, serif", fontSize: "1.35rem", fontWeight: 700, color: "#fff" }}>
                Total
              </span>
              <span style={{ fontFamily: "Times New Roman, serif", fontSize: "1.35rem", fontWeight: 700, color: "#027F2C" }}>
                Herbal
              </span>
              <span style={{ fontFamily: "Times New Roman, serif", fontSize: "1.35rem", fontWeight: 700, color: "#fff" }}>
                Care
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Premium cannabis products, lab-tested and sourced from the finest cultivators. Adults 21+ only.
            </p>
            <div className="flex items-center gap-3">
              {[Share2, Send, Camera, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#2D6B4F] flex items-center justify-center transition-colors duration-200"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-[#4CAF80] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Support</h4>
            <ul className="space-y-2.5">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-[#4CAF80] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">Our Location</h4>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#4CAF80] flex-shrink-0" />
                <span>123 Wellness Blvd, Green District<br />Los Angeles, CA 90015</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#4CAF80] flex-shrink-0" />
                <span>(716) 556-0125</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#4CAF80] flex-shrink-0" />
                <span>hello@totalherbalcare.com</span>
              </div>
            </div>
            {/* Small map placeholder */}
            <div className="mt-4 w-full h-20 rounded-lg bg-white/10 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container-site py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© 2026 Total Herbal Care. Adults 21+ Only. Lab Tested & Secure.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* Live Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button variant="primary" size="sm" className="shadow-lg flex items-center gap-2 hover:shadow-[0_4px_20px_rgba(1,108,36,0.4)]">
          <MessageCircle className="w-4 h-4" />
          Live Chat
        </Button>
      </div>
    </footer>
  );
}
