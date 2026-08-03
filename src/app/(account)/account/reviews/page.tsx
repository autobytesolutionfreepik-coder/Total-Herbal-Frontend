"use client";

import Link from "next/link";
import { Star, MessageSquare, Check, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

export default function AccountReviewsPage() {
  const { user } = useAuthStore();

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card space-y-6">
      <div className="border-b border-cream-dark/60 pb-4">
        <h2 className="text-2xl font-serif font-bold text-green-950">
          My Product Reviews
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          View your submitted feedback and ratings for Total Herbal Care strains and products.
        </p>
      </div>

      <div className="py-12 text-center max-w-sm mx-auto">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
          <Star className="w-6 h-6 fill-amber-400" />
        </div>
        <h3 className="text-lg font-serif font-bold text-green-950">
          Review Your Purchases
        </h3>
        <p className="text-xs text-ink-muted mt-1 mb-4">
          Visited product pages allow you to leave verified star reviews and community feedback.
        </p>
        <Link href="/account/orders" className="btn-green inline-flex text-xs px-6 py-2.5">
          View Delivered Orders <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
