"use client";

import Link from "next/link";
import { Package, ExternalLink, ArrowRight, Clock } from "lucide-react";
import { useMyOrdersQuery } from "@/features/orders/api";
import { Order } from "@/features/orders/types";
import { formatCurrency } from "@/lib/utils/format";

export default function AccountOrdersPage() {
  const { data: orders = [], isLoading } = useMyOrdersQuery();

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card space-y-6">
      <div className="border-b border-cream-dark/60 pb-4">
        <h2 className="text-2xl font-serif font-bold text-green-950">
          My Order History
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Track active shipments and view details of past organic herbal purchases.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-cream/40 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="py-12 text-center max-w-sm mx-auto">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-serif font-bold text-green-950">
            No Orders Found
          </h3>
          <p className="text-xs text-ink-muted mt-1 mb-4">
            You haven&apos;t placed any orders yet. Start exploring our herbal selection!
          </p>
          <Link href="/shop" className="btn-green inline-flex text-xs px-6 py-2.5">
            Explore Shop Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: Order) => (
            <div
              key={order.id}
              className="p-5 rounded-xl border border-cream-dark bg-cream/20 hover:border-green-700/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-lg text-green-950">
                    Order #{order.orderNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      order.status === "DELIVERED"
                        ? "bg-green-100 text-green-800"
                        : order.status === "CANCELLED"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-ink-subtle">
                  Placed on {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} item(s) • Payment: {order.paymentMethod}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-cream-dark">
                <div className="text-right">
                  <span className="text-xs text-ink-subtle block">Total Amount</span>
                  <span className="font-serif font-bold text-lg text-green-950">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>

                <Link
                  href={`/account/orders/${order.id}`}
                  className="btn-outline text-xs px-4 py-2"
                >
                  Details & Receipt <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
