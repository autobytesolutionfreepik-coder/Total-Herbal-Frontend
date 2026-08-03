"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cart-store";
import { useAuthStore } from "@/stores/auth-store";
import {
  useCartQuery,
  useUpdateCartQuantityMutation,
  useRemoveCartItemMutation,
} from "@/features/cart/api";
import { formatCurrency } from "@/lib/utils/format";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);

  const { isAuthenticated } = useAuthStore();

  // Guest Cart State
  const localItems = useCartStore((s) => s.items);
  const updateLocalQuantity = useCartStore((s) => s.updateQuantity);
  const removeLocalItem = useCartStore((s) => s.removeItem);

  // Authenticated Server Cart Query
  const { data: serverCart } = useCartQuery();
  const updateQuantityMutation = useUpdateCartQuantityMutation();
  const removeItemMutation = useRemoveCartItemMutation();

  const items = isAuthenticated
    ? serverCart?.items || []
    : localItems.map((local, idx) => ({
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
        },
        variant: local.variant,
      }));

  const subtotal = items.reduce((sum, item) => {
    const price = item.variant ? Number(item.variant.price) : Number(item.product.price);
    return sum + price * item.quantity;
  }, 0);

  const handleUpdateQty = async (
    itemId: string,
    productId: string,
    variantId: string | undefined,
    newQty: number
  ) => {
    if (isAuthenticated) {
      if (newQty <= 0) {
        await removeItemMutation.mutateAsync(itemId);
      } else {
        await updateQuantityMutation.mutateAsync({ itemId, quantity: newQty });
      }
    } else {
      updateLocalQuantity(productId, variantId, newQty);
    }
  };

  const handleRemove = async (itemId: string, productId: string, variantId?: string) => {
    if (isAuthenticated) {
      await removeItemMutation.mutateAsync(itemId);
    } else {
      removeLocalItem(productId, variantId);
    }
    toast.success("Item removed from cart.");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black"
          />

          {/* Right Drawer Slide */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 bottom-0 right-0 z-50 w-full max-w-md bg-surface shadow-2xl p-6 flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-cream-dark/60">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-green-700" />
                <h2 className="text-xl font-serif font-bold text-green-950">
                  Your Cart ({items.length})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 rounded-full hover:bg-cream/60 text-ink-subtle hover:text-ink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream/60 flex items-center justify-center text-green-700">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-serif font-bold text-green-950">
                  Your Cart is Empty
                </p>
                <p className="text-xs text-ink-muted max-w-xs">
                  Discover our organic flowers, full-spectrum vapes, edibles, and tinctures.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="btn-green text-xs px-6 py-2.5"
                >
                  Explore Dispensary Shop
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 divide-y divide-cream-dark/60">
                {items.map((item) => {
                  const price = item.variant
                    ? Number(item.variant.price)
                    : Number(item.product.price);

                  return (
                    <div key={item.id} className="pt-4 first:pt-0 flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl bg-cream/40 overflow-hidden flex-shrink-0 border border-cream-dark/60">
                        <Image
                          src={item.product.images?.[0]?.url || "/placeholder-product.jpg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-green-950 truncate">
                          {item.product.name}
                        </h4>
                        {item.variant && (
                          <p className="text-[11px] font-semibold text-green-800">
                            {item.variant.name}
                          </p>
                        )}
                        <p className="text-xs font-bold text-green-950 mt-0.5">
                          {formatCurrency(price)}
                        </p>
                      </div>

                      {/* Qty Adjuster */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-cream-dark rounded-full bg-surface p-0.5">
                          <button
                            onClick={() =>
                              handleUpdateQty(
                                item.id,
                                item.productId,
                                item.variantId || undefined,
                                item.quantity - 1
                              )
                            }
                            className="w-6 h-6 rounded-full flex items-center justify-center text-ink hover:bg-cream/60"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQty(
                                item.id,
                                item.productId,
                                item.variantId || undefined,
                                item.quantity + 1
                              )
                            }
                            className="w-6 h-6 rounded-full flex items-center justify-center text-ink hover:bg-cream/60"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            handleRemove(item.id, item.productId, item.variantId || undefined)
                          }
                          className="text-ink-subtle hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="pt-4 border-t border-cream-dark/60 space-y-4">
                <div className="flex justify-between items-baseline font-serif font-bold text-lg text-green-950">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="btn-outline justify-center text-xs py-3"
                  >
                    View Full Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn-green justify-center text-xs py-3 shadow-green"
                  >
                    Checkout <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
