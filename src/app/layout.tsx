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
  title: {
    default: "Total Herbal Care — Premium Cannabis Dispensary",
    template: "%s | Total Herbal Care",
  },
  description:
    "Premium cannabis products for every lifestyle. Lab-tested, licensed dispensary with same-day delivery. Adults 21+ only.",
  keywords: [
    "cannabis dispensary",
    "premium cannabis",
    "CBD",
    "indica",
    "sativa",
    "hybrid",
    "lab tested cannabis",
    "cannabis delivery",
  ],
  openGraph: {
    type: "website",
    siteName: "Total Herbal Care",
    title: "Total Herbal Care — Premium Cannabis Dispensary",
    description:
      "Premium cannabis products for every lifestyle. Lab-tested, licensed dispensary.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
