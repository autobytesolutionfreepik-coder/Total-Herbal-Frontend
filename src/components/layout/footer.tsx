import Link from "next/link";
import Image from "next/image";
import { MessageSquare } from "lucide-react";

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

function FacebookIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative text-white overflow-hidden bg-[#07130C] border-t border-white/10">
      {/* Background Image from public directory */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer.png"
          alt=""
          fill
          className="object-cover object-center opacity-40 pointer-events-none select-none"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07130C] via-[#07130C]/85 to-[#07130C]/90" />
      </div>

      <div className="container-site pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center group whitespace-nowrap">
              <span
                className="text-2xl sm:text-3xl font-medium leading-none text-white tracking-tight"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Total
              </span>
              <span
                className="text-2xl sm:text-3xl font-medium leading-none text-[#006828] tracking-tight"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Herbal
              </span>
              <span
                className="text-2xl sm:text-3xl font-medium leading-none text-white tracking-tight"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                Care
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs font-normal pt-1">
              Experience our hand-crafted organic formulas and seasonal herbal remedies tailored for your wellness.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { icon: FacebookIcon, label: "Facebook", href: "#" },
                { icon: TwitterIcon, label: "Twitter", href: "#" },
                { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
                { icon: YoutubeIcon, label: "YouTube", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white text-black hover:bg-[#006828] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-5 font-sans">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/80 hover:text-white transition-colors font-sans"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="lg:col-span-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-5 font-sans">
              SUPPORT
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/80 hover:text-white transition-colors font-sans"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Our Location & Map */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white mb-4 font-sans">
              OUR LOCATION
            </h4>
            <div className="text-sm text-white/80 leading-relaxed font-sans space-y-1">
              <p>123 Wellness Blvd, Green District</p>
              <p>Los Angeles, CA 90012</p>
            </div>
            {/* Map Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/20 w-full h-28 shadow-lg mt-3">
              <Image
                src="/images/Find-a-Location-Near-You.png"
                alt="Store Location Map"
                fill
                className="object-cover"
                sizes="300px"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10 py-5 text-center">
        <div className="container-site">
          <p className="text-xs sm:text-sm text-white/60 font-normal">
            © 2026 TotalHerbalCare. Adults 21+ Only. Lab Tested & Secure.
          </p>
        </div>
      </div>

      {/* Floating Live Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-[#006828] hover:bg-[#005220] text-white text-xs sm:text-sm font-semibold rounded-full px-5 py-3 shadow-[0_10px_25px_rgba(0,0,0,0.3)] border border-white/20 inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          aria-label="Live Chat"
        >
          <MessageSquare className="w-4 h-4 text-white" />
          <span>Live Chat</span>
        </button>
      </div>
    </footer>
  );
}
