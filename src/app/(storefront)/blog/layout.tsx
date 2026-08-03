import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cannabis Education & Terpene Science Blog",
  description:
    "Read expert botanical guides on CBD wellness, terpene chemistry, endocannabinoid health, organic pre-roll craftsmanship, and dosing best practices.",
  alternates: {
    canonical: "https://totalherbalcare.com/blog",
  },
  openGraph: {
    title: "Cannabis Education & Science Blog | Total Herbal Care",
    description:
      "Read expert botanical guides on CBD wellness, terpene chemistry, and dosing best practices.",
    url: "https://totalherbalcare.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
