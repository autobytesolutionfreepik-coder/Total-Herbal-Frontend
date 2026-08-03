"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Product, ProductVariant } from "@/features/catalog/types";
import { formatCurrency } from "@/lib/utils/format";
import { useCartStore } from "@/stores/cart-store";
import { useAddToCartMutation } from "@/features/cart/api";
import { useWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } from "@/features/wishlist/api";
import { useProductReviewsQuery, useCreateReviewMutation } from "@/features/reviews/api";
import { useRelatedProductsQuery } from "@/features/catalog/queries";
import { useAuthStore } from "@/stores/auth-store";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { isAuthenticated } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0]?.url || "/placeholder-product.jpg"
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);

  // Reviews State
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Cart & Wishlist hooks
  const addToCartMutation = useAddToCartMutation();
  const addItemToLocalCart = useCartStore((state) => state.addItem);
  const openCartDrawer = useCartStore((state) => state.openCart);

  const { data: wishlistData } = useWishlistQuery();
  const addToWishlistMutation = useAddToWishlistMutation();
  const removeFromWishlistMutation = useRemoveFromWishlistMutation();

  const isWishlisted =
    wishlistData?.some((item) => item.productId === product.id) || false;

  // Reviews hook
  const { data: reviewsResponse, isLoading: isReviewsLoading } = useProductReviewsQuery(product.id);
  const reviews = reviewsResponse?.data || [];
  const createReviewMutation = useCreateReviewMutation(product.id);

  // Related products hook
  const { data: relatedProducts } = useRelatedProductsQuery(product.id);

  // Active Price calculation
  const activePrice = selectedVariant
    ? selectedVariant.price
    : product.price;

  const compareAtPrice = selectedVariant
    ? selectedVariant.compareAtPrice
    : product.compareAtPrice;

  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;

  const handleAddToCart = async () => {
    if (currentStock <= 0) {
      toast.error("This item is currently out of stock.");
      return;
    }

    if (isAuthenticated) {
      try {
        await addToCartMutation.mutateAsync({
          productId: product.id,
          variantId: selectedVariant?.id,
          quantity,
        });
        toast.success(`Added ${quantity} × ${product.name} to cart`);
        openCartDrawer();
      } catch (err) {
        toast.error("Failed to add item to cart.");
      }
    } else {
      // Guest local cart
      addItemToLocalCart({
        productId: product.id,
        variantId: selectedVariant?.id,
        quantity,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          images: product.images,
          stock: product.stock,
        },
        variant: selectedVariant || undefined,
      });
      toast.success(`Added ${quantity} × ${product.name} to cart`);
      openCartDrawer();
    }
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to save items to your wishlist.");
      return;
    }

    try {
      if (isWishlisted) {
        await removeFromWishlistMutation.mutateAsync(product.id);
        toast.success("Removed from wishlist.");
      } else {
        await addToWishlistMutation.mutateAsync(product.id);
        toast.success("Added to wishlist.");
      }
    } catch (err) {
      toast.error("Wishlist action failed.");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in to submit a review.");
      return;
    }

    try {
      await createReviewMutation.mutateAsync({
        rating,
        title: reviewTitle,
        comment: reviewComment,
      });
      toast.success("Thank you! Your review has been submitted for moderation.");
      setReviewTitle("");
      setReviewComment("");
      setShowReviewForm(false);
    } catch (err) {
      toast.error("Failed to submit review.");
    }
  };

  const strainBadgeClass =
    product.strainType === "INDICA"
      ? "badge-indica"
      : product.strainType === "SATIVA"
      ? "badge-sativa"
      : product.strainType === "HYBRID"
      ? "badge-hybrid"
      : product.strainType === "CBD"
      ? "badge-cbd"
      : "badge-none";

  return (
    <div className="container-site section-py">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-ink-subtle mb-6 uppercase tracking-wider">
        <Link href="/" className="hover:text-green-700 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-green-700 transition-colors">
          Shop
        </Link>
        <span>/</span>
        {product.category && (
          <>
            <Link
              href={`/shop?category=${product.category.slug}`}
              className="hover:text-green-700 transition-colors"
            >
              {product.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-ink truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl bg-surface border border-cream-dark/60 overflow-hidden shadow-card">
            <Image
              src={selectedImage}
              alt={product?.name || "Product Image"}
              fill
              priority
              className="object-cover object-center transition-all duration-300 hover:scale-105"
            />
            {/* Strain badge overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              {product.strainType !== "NONE" && (
                <span className={`strain-badge ${strainBadgeClass}`}>
                  {product.strainType}
                </span>
              )}
              {compareAtPrice && (
                <span className="strain-badge badge-sale">SALE</span>
              )}
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img.url
                      ? "border-green-700 shadow-sm"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt || product?.name || `Product thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Information & Purchase Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-green-700">
              {product.brand || "Total Herbal Care"}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-green-950 mt-1">
              {product.name}
            </h1>

            {/* Rating summary */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(product.avgRating || 5)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-ink">
                {product.avgRating ? product.avgRating.toFixed(1) : "5.0"}
              </span>
              <span className="text-xs text-ink-subtle">
                ({product.reviewCount || reviews.length} customer reviews)
              </span>
            </div>
          </div>

          {/* Pricing Block */}
          <div className="flex items-baseline gap-3 pt-2 border-t border-cream-dark/60">
            <span className="text-3xl font-serif font-bold text-green-950">
              {formatCurrency(activePrice)}
            </span>
            {compareAtPrice && (
              <span className="text-lg text-ink-subtle line-through">
                {formatCurrency(compareAtPrice)}
              </span>
            )}
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                currentStock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {currentStock > 0 ? `In Stock (${currentStock})` : "Out of Stock"}
            </span>
          </div>

          {/* Strain Info & THC/CBD Badges */}
          {(product.thcContent !== undefined || product.cbdContent !== undefined) && (
            <div className="flex items-center gap-4 py-3 px-4 bg-cream/60 rounded-xl border border-cream-dark/60 text-xs">
              {product.thcContent !== undefined && (
                <div>
                  <span className="text-ink-subtle uppercase tracking-wider block">
                    THC Content
                  </span>
                  <span className="font-bold text-green-950 text-sm">
                    {product.thcContent}%
                  </span>
                </div>
              )}
              {product.cbdContent !== undefined && (
                <div className="border-l border-cream-dark pl-4">
                  <span className="text-ink-subtle uppercase tracking-wider block">
                    CBD Content
                  </span>
                  <span className="font-bold text-green-950 text-sm">
                    {product.cbdContent}%
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Short Description */}
          <p className="text-sm text-ink-muted leading-relaxed">
            {product.shortDescription || product.description}
          </p>

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
                Select Option / Weight
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all ${
                      selectedVariant?.id === variant.id
                        ? "bg-green-950 text-white border-green-950 shadow-sm"
                        : "bg-surface text-ink border-cream-dark hover:border-green-700"
                    }`}
                  >
                    {variant.name} — {formatCurrency(variant.price)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Cart Actions */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center border border-cream-dark rounded-full bg-surface p-1 shadow-sm">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-ink hover:bg-cream/60 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-semibold text-sm">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(currentStock, q + 1))
                }
                className="w-8 h-8 rounded-full flex items-center justify-center text-ink hover:bg-cream/60 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={currentStock <= 0 || addToCartMutation.isPending}
              className="flex-1 btn-green justify-center py-3.5 text-base shadow-green hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingBag className="w-5 h-5" />
              {addToCartMutation.isPending ? "Adding..." : "Add to Shopping Cart"}
            </button>

            <button
              onClick={handleToggleWishlist}
              className={`p-3.5 rounded-full border transition-all ${
                isWishlisted
                  ? "bg-red-50 text-red-600 border-red-200"
                  : "bg-surface text-ink-muted border-cream-dark hover:text-red-600 hover:border-red-200"
              }`}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-600" : ""}`} />
            </button>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-cream-dark/60 text-xs text-ink-muted">
            <div className="flex flex-col items-center text-center gap-1.5 p-2 bg-surface rounded-xl">
              <ShieldCheck className="w-5 h-5 text-green-700" />
              <span className="font-semibold text-ink">Lab Tested</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 p-2 bg-surface rounded-xl">
              <Truck className="w-5 h-5 text-green-700" />
              <span className="font-semibold text-ink">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5 p-2 bg-surface rounded-xl">
              <RotateCcw className="w-5 h-5 text-green-700" />
              <span className="font-semibold text-ink">100% Organic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description Tabs */}
      <div className="mt-16 bg-surface p-8 rounded-2xl border border-cream-dark/60 shadow-card">
        <h2 className="text-2xl font-serif font-bold text-green-950 mb-4">
          Detailed Description & Potency Info
        </h2>
        <div className="prose prose-green max-w-none text-ink-muted leading-relaxed whitespace-pre-line text-sm">
          {product.description}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-12 bg-surface p-8 rounded-2xl border border-cream-dark/60 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-serif font-bold text-green-950">
              Customer Reviews ({reviews.length})
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Real feedback from verified herbal cannabis buyers
            </p>
          </div>
          <button
            onClick={() => setShowReviewForm((prev) => !prev)}
            className="btn-outline text-xs"
          >
            <MessageSquare className="w-4 h-4" />
            {showReviewForm ? "Close Review Form" : "Write a Review"}
          </button>
        </div>

        {/* Review Form Drawer */}
        {showReviewForm && (
          <form
            onSubmit={handleReviewSubmit}
            className="mb-8 p-6 bg-cream/40 rounded-xl border border-cream-dark space-y-4"
          >
            <h3 className="text-lg font-serif font-bold text-green-950">
              Share Your Experience
            </h3>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-500 focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="review-title" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                Review Headline
              </label>
              <input
                id="review-title"
                type="text"
                required
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Great aroma and quick delivery!"
                className="w-full px-4 py-2.5 bg-surface border border-cream-dark rounded-xl text-sm focus:outline-none focus:border-green-600"
              />
            </div>

            <div>
              <label htmlFor="review-comment" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                Detailed Feedback
              </label>
              <textarea
                id="review-comment"
                required
                rows={4}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Tell us what you liked about this strain..."
                className="w-full px-4 py-2.5 bg-surface border border-cream-dark rounded-xl text-sm focus:outline-none focus:border-green-600"
              />
            </div>

            <button
              type="submit"
              disabled={createReviewMutation.isPending}
              className="btn-green text-sm py-2.5 px-6"
            >
              {createReviewMutation.isPending ? "Submitting..." : "Submit Review for Moderation"}
            </button>
          </form>
        )}

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <p className="text-sm text-ink-subtle py-4">
            No reviews yet for this product. Be the first to share your thoughts!
          </p>
        ) : (
          <div className="space-y-6 divide-y divide-cream-dark">
            {reviews.map((rev) => (
              <div key={rev.id} className="pt-6 first:pt-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-green-950">
                      {rev.user?.name || "Verified Customer"}
                    </span>
                    {rev.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-ink-subtle">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center text-amber-500 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= rev.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <h4 className="font-semibold text-sm text-ink mb-1">
                  {rev.title}
                </h4>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products Grid */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-green-950 mb-6">
            Related Herbal Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className="group card-base overflow-hidden flex flex-col p-4"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-cream/40">
                  <Image
                    src={rel.images?.[0]?.url || "/placeholder-product.jpg"}
                    alt={rel.name || "Related Herbal Product"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-serif font-bold text-green-950 group-hover:text-green-700 transition-colors line-clamp-1">
                  {rel.name}
                </h3>
                <p className="text-sm font-semibold text-green-900 mt-1">
                  {formatCurrency(rel.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
