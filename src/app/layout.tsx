import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://totalherbalcare.com"),
  title: {
    default: "Total Herbal Care — Premium Organic Cannabis Dispensary & Delivery",
    template: "%s | Total Herbal Care",
  },
  description:
    "Shop lab-tested organic cannabis flowers, precision-dosed edibles, full-spectrum vapes, topicals, and tinctures. Licensed dispensary offering same-day delivery. Adults 21+.",
  keywords: [
    "cannabis dispensary",
    "organic cannabis",
    "premium marijuana",
    "lab tested weed",
    "CBD tinctures",
    "THC vapes",
    "cannabis delivery Los Angeles",
    "indica sativa hybrid",
    "terpene rich flower",
    "dispensary near me",
  ],
  authors: [{ name: "Total Herbal Care Team", url: "https://totalherbalcare.com" }],
  creator: "Total Herbal Care",
  publisher: "Total Herbal Care",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Total Herbal Care",
    title: "Total Herbal Care — Premium Organic Cannabis Dispensary & Delivery",
    description:
      "Shop lab-tested organic cannabis flowers, precision-dosed edibles, full-spectrum vapes, and tinctures. Licensed dispensary with same-day delivery.",
    url: "https://totalherbalcare.com",
    locale: "en_US",
    images: [
      {
        url: "/images/Hero_banner.png",
        width: 1200,
        height: 630,
        alt: "Total Herbal Care Premium Cannabis Dispensary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Total Herbal Care — Premium Organic Cannabis Dispensary",
    description:
      "Shop lab-tested organic cannabis flowers, edibles, vapes, and topicals with same-day delivery.",
    images: ["/images/Hero_banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dispensary",
      "@id": "https://totalherbalcare.com/#dispensary",
      "name": "Total Herbal Care",
      "url": "https://totalherbalcare.com",
      "logo": "https://totalherbalcare.com/icons/Licensed-Dispensary.png",
      "image": "https://totalherbalcare.com/images/Hero_banner.png",
      "description":
        "Licensed premium organic cannabis dispensary offering lab-tested flowers, edibles, topicals, and tinctures with same-day delivery.",
      "telephone": "+1-716-556-0125",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "520 Overthrow Blvd",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "90011",
        "addressCountry": "US",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 34.0522,
        "longitude": -118.2437,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          "opens": "09:00",
          "closes": "22:00",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://totalherbalcare.com/#website",
      "url": "https://totalherbalcare.com",
      "name": "Total Herbal Care",
      "publisher": {
        "@id": "https://totalherbalcare.com/#dispensary",
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://totalherbalcare.com/shop?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F5F0E8]">
        <QueryProvider>
          {children}
          <Toaster
            position="bottom-right"
            richColors
            toastOptions={{
              style: {
                fontFamily: "var(--font-manrope), Manrope, system-ui, sans-serif",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
