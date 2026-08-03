import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Budtender Consultation",
  description:
    "Connect with Total Herbal Care's expert herbal consultants. Ask questions regarding product selection, same-day delivery, store locations, or orders.",
  alternates: {
    canonical: "https://totalherbalcare.com/contact",
  },
  openGraph: {
    title: "Contact Us | Total Herbal Care",
    description:
      "Connect with Total Herbal Care's expert herbal consultants for personalized strain advice and customer support.",
    url: "https://totalherbalcare.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
