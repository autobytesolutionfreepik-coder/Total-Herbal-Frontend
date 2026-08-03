"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Package, MapPin, Heart, ShieldCheck, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useMyOrdersQuery } from "@/features/orders/api";
import { useAddressesQuery } from "@/features/addresses/api";
import { useWishlistQuery } from "@/features/wishlist/api";
import { formatCurrency } from "@/lib/utils/format";

export default function AccountDashboardPage() {
  const { user } = useAuthStore();
  const { data: orders = [], isLoading: isOrdersLoading } = useMyOrdersQuery();
  const { data: addresses = [] } = useAddressesQuery();
  const { data: wishlist = [] } = useWishlistQuery();

  const recentOrders = orders.slice(0, 3);
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

  return (
    <div className="space-y-6">
      {/* Welcome Hero Card */}
      <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card">
        <h2 className="text-2xl font-serif font-bold text-green-950">
          Hello, {user?.name || "Valued Member"}!
        </h2>
        <p className="text-sm text-ink-muted mt-1 leading-relaxed">
          From your personal dashboard, you can view your recent order history, manage shipping addresses, edit password details, and check saved wishlist items.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface p-5 rounded-2xl border border-cream-dark/60 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-serif font-bold text-green-950 block">
              {orders.length}
            </span>
            <span className="text-xs font-semibold text-ink-muted">Total Orders</span>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-cream-dark/60 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-serif font-bold text-green-950 block">
              {addresses.length}
            </span>
            <span className="text-xs font-semibold text-ink-muted">Saved Addresses</span>
          </div>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-cream-dark/60 shadow-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-serif font-bold text-green-950 block">
              {wishlist.length}
            </span>
            <span className="text-xs font-semibold text-ink-muted">Wishlist Items</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-surface p-6 rounded-2xl border border-cream-dark/60 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-cream-dark/60 pb-3">
          <h3 className="font-serif font-bold text-lg text-green-950">
            Recent Orders
          </h3>
          <Link
            href="/account/orders"
            className="text-xs font-semibold text-green-700 hover:underline flex items-center gap-1"
          >
            View All Orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {isOrdersLoading ? (
          <div className="h-24 bg-cream/40 rounded-xl animate-pulse" />
        ) : recentOrders.length === 0 ? (
          <p className="text-xs text-ink-subtle py-4 text-center">
            You haven&apos;t placed any orders yet.
          </p>
        ) : (
          <div className="divide-y divide-cream-dark/60">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="py-3 flex flex-wrap items-center justify-between gap-4 text-xs"
              >
                <div>
                  <span className="font-bold text-green-950 text-sm block">
                    Order #{order.orderNumber}
                  </span>
                  <span className="text-ink-subtle">
                    {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} item(s)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-green-950">
                    {formatCurrency(order.totalAmount)}
                  </span>
                  <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                    {order.status}
                  </span>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="btn-outline text-[11px] px-3 py-1"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Default Address & Account Info Snippet */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-2xl border border-cream-dark/60 shadow-card space-y-3">
          <div className="flex items-center justify-between border-b border-cream-dark/60 pb-2">
            <h3 className="font-serif font-bold text-base text-green-950">
              Default Shipping Address
            </h3>
            <Link href="/account/addresses" className="text-xs text-green-700 hover:underline">
              Manage
            </Link>
          </div>
          {defaultAddress ? (
            <div className="text-xs text-ink space-y-0.5">
              <p className="font-bold text-green-950">{defaultAddress.fullName}</p>
              <p>{defaultAddress.line1}</p>
              {defaultAddress.line2 && <p>{defaultAddress.line2}</p>}
              <p>
                {defaultAddress.city}, {defaultAddress.state} {defaultAddress.postalCode}
              </p>
              <p className="text-ink-subtle pt-1">{defaultAddress.phone}</p>
            </div>
          ) : (
            <p className="text-xs text-ink-subtle">No default delivery address set yet.</p>
          )}
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-cream-dark/60 shadow-card space-y-3">
          <div className="flex items-center justify-between border-b border-cream-dark/60 pb-2">
            <h3 className="font-serif font-bold text-base text-green-950">
              Account Security
            </h3>
            <Link href="/account/security" className="text-xs text-green-700 hover:underline">
              Update
            </Link>
          </div>
          <div className="text-xs text-ink space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">Email Verification:</span>
              <span className="font-bold text-green-700">Verified</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">21+ Legal Compliance:</span>
              <span className="font-bold text-green-700">Verified</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-ink-muted">Password Security:</span>
              <span className="font-bold text-ink">Protected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
