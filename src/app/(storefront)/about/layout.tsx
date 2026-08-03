import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Organic Sourcing & Lab Testing Standards",
  description:
    "Discover Total Herbal Care's commitment to regenerative organic agriculture, ISO-accredited third-party lab testing, and radical botanical transparency.",
  alternates: {
    canonical: "https://totalherbalcare.com/about",
  },
  openGraph: {
    title: "About Us | Total Herbal Care",
    description:
      "Discover Total Herbal Care's commitment to regenerative organic agriculture and third-party lab testing.",
    url: "https://totalherbalcare.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
