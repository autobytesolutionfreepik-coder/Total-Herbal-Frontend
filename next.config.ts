import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── React Compiler (stable in Next 16) ─────────────────────────────────────
  reactCompiler: true,

  // ── Partial Pre-Rendering (replaces experimental.ppr) ──────────────────────
  cacheComponents: true,

  // ── Image config ────────────────────────────────────────────────────────────
  images: {
    qualities: [60, 75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
    ],
  },

  // ── Smooth scroll for Next 16 (must be explicit) ───────────────────────────
  // Applied via data-scroll-behavior="smooth" on <html> in layout.tsx

  // ── Security headers ────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
