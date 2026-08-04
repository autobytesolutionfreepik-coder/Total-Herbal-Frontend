"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useWishlistQuery, useRemoveFromWishlistMutation } from "@/features/wishlist/api";
import { WishlistItem } from "@/features/wishlist/types";
import { useAddToCartMutation } from "@/features/cart/api";
import { formatCurrency } from "@/lib/utils/format";
import { useCartStore } from "@/stores/cart-store";

export default function AccountWishlistPage() {
  const { data: wishlist = [], isLoading } = useWishlistQuery();
  const removeFromWishlistMutation = useRemoveFromWishlistMutation();
  const addToCartMutation = useAddToCartMutation();
  const openCartDrawer = useCartStore((s) => s.openCart);

  const handleRemove = async (productId: string) => {
    try {
      await removeFromWishlistMutation.mutateAsync(productId);
      toast.success("Item removed from wishlist.");
    } catch {
      toast.error("Failed to remove item.");
    }
  };

  const handleAddToCart = async (productId: string, productName: string) => {
    try {
      await addToCartMutation.mutateAsync({ productId, quantity: 1 });
      toast.success(`Added ${productName} to cart!`);
      openCartDrawer();
    } catch {
      toast.error("Failed to add item to cart.");
    }
  };

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card space-y-6">
      <div className="border-b border-cream-dark/60 pb-4">
        <h2 className="text-2xl font-serif font-bold text-green-950">
          My Saved Wishlist ({wishlist.length})
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Keep track of your favorite organic strains and herbal wellness products.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-cream/40 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : wishlist.length === 0 ? (
        <div className="py-12 text-center max-w-sm mx-auto">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-serif font-bold text-green-950">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-ink-muted mt-1 mb-4">
            Click the heart icon on any product page to save items for later.
          </p>
          <Link href="/shop" className="btn-green inline-flex text-xs px-6 py-2.5">
            Explore Shop Catalog <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item: WishlistItem) => {
            const product = item.product;
            if (!product) return null;

            return (
              <div
                key={item.id}
                className="group relative bg-surface p-4 rounded-xl border border-cream-dark shadow-sm hover:shadow-card transition-all flex flex-col"
              >
                <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-3 bg-cream/40">
                  <Image
                    src={product.images?.[0]?.url || "/placeholder-product.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="absolute top-2 right-2 p-2 bg-surface/80 hover:bg-red-50 text-ink-subtle hover:text-red-600 rounded-full transition-colors backdrop-blur-sm"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  href={`/products/${product.slug}`}
                  className="font-serif font-bold text-base text-green-950 hover:text-green-700 transition-colors line-clamp-1"
                >
                  {product.name}
                </Link>

                <p className="text-sm font-bold text-green-950 mt-1 mb-3">
                  {formatCurrency(product.price)}
                </p>

                <button
                  onClick={() => handleAddToCart(product.id, product.name)}
                  className="btn-green w-full justify-center text-xs py-2 mt-auto"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
