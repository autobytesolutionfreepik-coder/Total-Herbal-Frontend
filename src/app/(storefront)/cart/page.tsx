"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils/format";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import {
  useCartQuery,
  useUpdateCartQuantityMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} from "@/features/cart/api";
import { useValidateCouponMutation } from "@/features/coupons/api";

export default function CartPage() {
  const { isAuthenticated } = useAuthStore();

  // Guest Cart Store
  const localCartItems = useCartStore((state) => state.items);
  const updateLocalQuantity = useCartStore((state) => state.updateQuantity);
  const removeLocalItem = useCartStore((state) => state.removeItem);
  const clearLocalCart = useCartStore((state) => state.clearLocalCart);

  // Authenticated Server Cart Query
  const { data: serverCart, isLoading: isCartLoading } = useCartQuery();
  const updateQuantityMutation = useUpdateCartQuantityMutation();
  const removeItemMutation = useRemoveCartItemMutation();
  const clearCartMutation = useClearCartMutation();

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    discount: number;
    newTotal: number;
  } | null>(null);

  const validateCouponMutation = useValidateCouponMutation();

  // Calculate items and subtotal based on auth status
  const items = isAuthenticated
    ? serverCart?.items || []
    : localCartItems.map((local, idx) => ({
        id: `local_${idx}`,
        productId: local.productId,
        variantId: local.variantId,
        quantity: local.quantity,
        product: local.product || {
          id: local.productId,
          name: "Herbal Product",
          slug: "herbal-product",
          price: "45.00",
          images: [{ url: "https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=800&q=80" }],
          stock: 50,
        },
        variant: local.variant,
      }));

  const subtotalNumber = items.reduce((total: number, item: any) => {
    const itemPrice = item.variant ? Number(item.variant.price) : Number(item.product.price);
    return total + itemPrice * item.quantity;
  }, 0);

  const discountAmount = appliedDiscount ? appliedDiscount.discount : 0;
  const estimatedTax = subtotalNumber * 0.09; // 9% tax
  const estimatedShipping = subtotalNumber > 100 || subtotalNumber === 0 ? 0 : 10.0;
  const finalTotal = Math.max(0, subtotalNumber - discountAmount + estimatedTax + estimatedShipping);

  const handleUpdateQuantity = async (
    itemId: string,
    productId: string,
    variantId: string | undefined,
    newQuantity: number
  ) => {
    if (isAuthenticated) {
      if (newQuantity <= 0) {
        try {
          await removeItemMutation.mutateAsync(itemId);
          toast.success("Item removed from cart.");
        } catch {
          toast.error("Failed to remove item.");
        }
      } else {
        try {
          await updateQuantityMutation.mutateAsync({ itemId, quantity: newQuantity });
        } catch {
          toast.error("Failed to update quantity.");
        }
      }
    } else {
      updateLocalQuantity(productId, variantId, newQuantity);
    }
  };

  const handleRemoveItem = async (itemId: string, productId: string, variantId?: string) => {
    if (isAuthenticated) {
      try {
        await removeItemMutation.mutateAsync(itemId);
        toast.success("Item removed from cart.");
      } catch {
        toast.error("Failed to remove item.");
      }
    } else {
      removeLocalItem(productId, variantId);
      toast.success("Item removed from cart.");
    }
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    try {
      const res = await validateCouponMutation.mutateAsync({
        code: couponCode.trim(),
        subtotal: subtotalNumber,
      });
      setAppliedDiscount({
        code: res.data.code,
        discount: res.data.discount,
        newTotal: res.data.newTotal,
      });
      toast.success(`Coupon "${res.data.code}" applied successfully!`);
    } catch {
      toast.error("Invalid or expired coupon code.");
    }
  };

  return (
    <div className="container-site section-py">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-green-950">
          Shopping Cart
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          Review your organic herbal items before proceeding to secure checkout.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-surface rounded-2xl p-12 text-center border border-cream-dark/60 shadow-card max-w-xl mx-auto">
          <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-green-950">
            Your Cart is Currently Empty
          </h2>
          <p className="text-sm text-ink-muted mt-2 mb-6">
            Explore our premium selection of organic flowers, edibles, and tinctures.
          </p>
          <Link href="/shop" className="btn-green inline-flex px-8 py-3 text-sm">
            Browse Product Catalog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List (Left Column) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-surface rounded-2xl border border-cream-dark/60 shadow-card divide-y divide-cream-dark/60 overflow-hidden">
              {items.map((item: any) => {
                const itemPrice = item.variant
                  ? Number(item.variant.price)
                  : Number(item.product.price);
                const lineTotal = itemPrice * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                  >
                    {/* Item Image */}
                    <div className="relative w-20 h-20 rounded-xl bg-cream/40 overflow-hidden flex-shrink-0 border border-cream-dark/60">
                      <Image
                        src={item.product.images?.[0]?.url || "/placeholder-product.jpg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-serif font-bold text-lg text-green-950 hover:text-green-700 transition-colors block truncate"
                      >
                        {item.product.name}
                      </Link>
                      {item.variant && (
                        <p className="text-xs font-semibold text-green-800 mt-0.5">
                          Variant: {item.variant.name}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-green-950 mt-1">
                        {formatCurrency(itemPrice)} each
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-cream-dark rounded-full bg-surface p-0.5 shadow-sm">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              item.productId,
                              item.variantId || undefined,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 rounded-full flex items-center justify-center text-ink hover:bg-cream/60 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-semibold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              item.productId,
                              item.variantId || undefined,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 rounded-full flex items-center justify-center text-ink hover:bg-cream/60 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-serif font-bold text-green-950 w-24 text-right">
                        {formatCurrency(lineTotal)}
                      </span>

                      <button
                        onClick={() =>
                          handleRemoveItem(item.id, item.productId, item.variantId || undefined)
                        }
                        className="p-2 text-ink-subtle hover:text-red-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clear Cart Button */}
            <div className="flex justify-between items-center pt-2">
              <Link
                href="/shop"
                className="text-xs font-semibold text-green-700 hover:text-green-800 transition-colors"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={async () => {
                  if (isAuthenticated) {
                    await clearCartMutation.mutateAsync();
                  } else {
                    clearLocalCart();
                  }
                  toast.success("Cart cleared.");
                }}
                className="text-xs font-semibold text-ink-subtle hover:text-red-600 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Column (Right Column) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card space-y-6">
              <h2 className="text-xl font-serif font-bold text-green-950 border-b border-cream-dark/60 pb-4">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Promo / Coupon Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-3 text-ink-subtle" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="HERBAL20"
                      className="w-full pl-9 pr-3 py-2 bg-cream/40 border border-cream-dark rounded-xl text-xs uppercase font-mono font-bold text-green-950 focus:outline-none focus:border-green-600"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={validateCouponMutation.isPending}
                    className="btn-outline text-xs px-4"
                  >
                    Apply
                  </button>
                </div>
                {appliedDiscount && (
                  <p className="text-xs text-green-700 font-semibold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Coupon &quot;{appliedDiscount.code}&quot; applied (-{formatCurrency(discountAmount)})
                  </p>
                )}
              </form>

              {/* Summary Calculations */}
              <div className="space-y-3 text-sm border-t border-cream-dark/60 pt-4">
                <div className="flex justify-between text-ink-muted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ink">{formatCurrency(subtotalNumber)}</span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Discount</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-ink-muted">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-ink">
                    {estimatedShipping === 0 ? "FREE" : formatCurrency(estimatedShipping)}
                  </span>
                </div>

                <div className="flex justify-between text-ink-muted">
                  <span>Estimated Tax (9%)</span>
                  <span className="font-semibold text-ink">{formatCurrency(estimatedTax)}</span>
                </div>

                <div className="flex justify-between text-lg font-serif font-bold text-green-950 border-t border-cream-dark/60 pt-3">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <Link
                href="/checkout"
                className="btn-green w-full justify-center py-3.5 text-sm shadow-green hover:shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-xs text-ink-subtle pt-2">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
