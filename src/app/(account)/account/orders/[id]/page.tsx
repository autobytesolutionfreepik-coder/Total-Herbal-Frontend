"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, MapPin, CreditCard, ShieldCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useOrderDetailQuery, useCancelOrderMutation } from "@/features/orders/api";
import { formatCurrency } from "@/lib/utils/format";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function SingleOrderDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { data: order, isLoading } = useOrderDetailQuery(id);
  const cancelOrderMutation = useCancelOrderMutation();

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      await cancelOrderMutation.mutateAsync(id);
      toast.success("Order cancelled successfully.");
    } catch {
      toast.error("Unable to cancel order.");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-surface p-8 rounded-2xl border border-cream-dark shadow-card animate-pulse space-y-4">
        <div className="h-8 bg-cream/60 rounded w-1/3" />
        <div className="h-32 bg-cream/40 rounded-xl" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-surface p-8 rounded-2xl border border-cream-dark text-center">
        <h2 className="text-xl font-serif font-bold text-green-950">Order Not Found</h2>
        <Link href="/account/orders" className="btn-outline text-xs mt-4 inline-flex">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream-dark/60 pb-4">
        <div>
          <Link
            href="/account/orders"
            className="text-xs font-semibold text-green-700 hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Orders
          </Link>
          <h2 className="text-2xl font-serif font-bold text-green-950">
            Order #{order.orderNumber}
          </h2>
          <p className="text-xs text-ink-subtle mt-0.5">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
              order.status === "DELIVERED"
                ? "bg-green-100 text-green-800"
                : order.status === "CANCELLED"
                ? "bg-red-100 text-red-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            Status: {order.status}
          </span>

          {order.status === "PENDING" && (
            <button
              onClick={handleCancel}
              disabled={cancelOrderMutation.isPending}
              className="btn-outline text-xs text-red-600 border-red-200 hover:bg-red-600 hover:text-white"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-lg text-green-950">
          Purchased Items ({order.items.length})
        </h3>
        <div className="divide-y divide-cream-dark border border-cream-dark rounded-xl overflow-hidden">
          {order.items.map((item) => (
            <div key={item.id} className="p-4 flex items-center gap-4 bg-cream/20">
              <div className="relative w-16 h-16 rounded-lg bg-surface overflow-hidden flex-shrink-0 border border-cream-dark">
                <Image
                  src={item.product?.images?.[0]?.url || "/placeholder-product.jpg"}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-serif font-bold text-sm text-green-950 truncate">
                  {item.productName}
                </h4>
                {item.variantName && (
                  <p className="text-xs font-semibold text-green-800">
                    Option: {item.variantName}
                  </p>
                )}
                <p className="text-xs text-ink-subtle mt-0.5">
                  Qty: {item.quantity} × {formatCurrency(item.unitPrice)}
                </p>
              </div>

              <span className="font-serif font-bold text-sm text-green-950">
                {formatCurrency(item.totalPrice)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Address & Payment Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-cream-dark/60">
        <div>
          <h4 className="font-serif font-bold text-base text-green-950 mb-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-green-700" /> Shipping Destination
          </h4>
          {order.address ? (
            <div className="text-xs text-ink space-y-0.5 bg-cream/30 p-4 rounded-xl border border-cream-dark">
              <p className="font-bold text-green-950">{order.address.fullName}</p>
              <p>{order.address.line1}</p>
              {order.address.line2 && <p>{order.address.line2}</p>}
              <p>
                {order.address.city}, {order.address.state} {order.address.postalCode}
              </p>
              <p className="text-ink-subtle pt-1">{order.address.phone}</p>
            </div>
          ) : (
            <p className="text-xs text-ink-subtle">Address information saved.</p>
          )}
        </div>

        <div>
          <h4 className="font-serif font-bold text-base text-green-950 mb-2 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-green-700" /> Payment & Summary
          </h4>
          <div className="text-xs space-y-2 bg-cream/30 p-4 rounded-xl border border-cream-dark">
            <div className="flex justify-between text-ink-muted">
              <span>Subtotal</span>
              <span className="font-semibold text-ink">{formatCurrency(order.subtotal)}</span>
            </div>
            {Number(order.discountAmount) > 0 && (
              <div className="flex justify-between text-green-700 font-semibold">
                <span>Discount</span>
                <span>-{formatCurrency(order.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-ink-muted">
              <span>Shipping Fee</span>
              <span className="font-semibold text-ink">{formatCurrency(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>Tax (9%)</span>
              <span className="font-semibold text-ink">{formatCurrency(order.taxAmount)}</span>
            </div>
            <div className="flex justify-between font-serif font-bold text-sm text-green-950 border-t border-cream-dark pt-2">
              <span>Total Paid</span>
              <span>{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
