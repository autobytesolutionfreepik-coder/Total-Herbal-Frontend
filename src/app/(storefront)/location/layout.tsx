import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dispensary Locations & Store Hours",
  description:
    "Locate Total Herbal Care licensed dispensary storefronts in Westside and Downtown Los Angeles. View hours, driving directions, phone numbers, and delivery zones.",
  alternates: {
    canonical: "https://totalherbalcare.com/location",
  },
  openGraph: {
    title: "Dispensary Locations | Total Herbal Care",
    description:
      "Locate Total Herbal Care licensed dispensary storefronts. View operating hours, directions, and phone numbers.",
    url: "https://totalherbalcare.com/location",
  },
};

export default function LocationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
