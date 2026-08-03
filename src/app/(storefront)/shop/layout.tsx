import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Organic Cannabis Catalog — Flowers, Edibles, Vapes & Topicals",
  description:
    "Explore our complete catalog of lab-tested organic cannabis. Filter by strain type (Indica, Sativa, Hybrid, CBD), potency, and category. Same-day local delivery available.",
  alternates: {
    canonical: "https://totalherbalcare.com/shop",
  },
  openGraph: {
    title: "Shop Organic Cannabis Catalog | Total Herbal Care",
    description:
      "Explore our complete catalog of lab-tested organic cannabis flowers, pre-rolls, vapes, edibles, and apothecary formulas.",
    url: "https://totalherbalcare.com/shop",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
