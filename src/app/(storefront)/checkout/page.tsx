"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  Plus,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertCircle,
  Loader2,
  MapPin,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils/format";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import { useCartQuery } from "@/features/cart/api";
import { useAddressesQuery, useCreateAddressMutation } from "@/features/addresses/api";
import { useCheckoutMutation, usePaymentConfigQuery } from "@/features/orders/api";
import { PaymentMethod } from "@/types/enums";

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  // Cart
  const localCartItems = useCartStore((state) => state.items);
  const { data: serverCart } = useCartQuery();

  const items = isAuthenticated
    ? serverCart?.items || []
    : localCartItems.map((local, idx) => ({
        id: `local_${idx}`,
        productId: local.productId,
        quantity: local.quantity,
        product: local.product || {
          id: local.productId,
          name: "Herbal Item",
          price: "45.00",
          images: [{ url: "https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&w=800&q=80" }],
        },
        variant: local.variant,
      }));

  const subtotal = items.reduce((total, item) => {
    const price = item.variant ? Number(item.variant.price) : Number(item.product.price);
    return total + price * item.quantity;
  }, 0);

  const estimatedTax = subtotal * 0.09;
  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 10.0;
  const grandTotal = subtotal + estimatedTax + shippingFee;

  // Delivery Addresses
  const { data: addresses = [], isLoading: isAddressesLoading } = useAddressesQuery();
  const createAddressMutation = useCreateAddressMutation();

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    fullName: user?.name || "",
    phone: user?.phone || "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    isDefault: true,
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CARD");
  const [couponCode, setCouponCode] = useState("");
  const [notes, setNotes] = useState("");

  const { data: paymentConfig } = usePaymentConfigQuery();
  const checkoutMutation = useCheckoutMutation();

  const handleCreateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createAddressMutation.mutateAsync(newAddress);
      setSelectedAddressId(res.data.id);
      setShowNewAddressForm(false);
      toast.success("Delivery address saved.");
    } catch {
      toast.error("Failed to save address.");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please sign in or register to complete your order.");
      router.push("/sign-in?redirect=/checkout");
      return;
    }

    const addressIdToUse = selectedAddressId || addresses[0]?.id;

    if (!addressIdToUse && !showNewAddressForm) {
      toast.error("Please select or add a delivery address.");
      setShowNewAddressForm(true);
      return;
    }

    try {
      let activeAddrId = addressIdToUse;
      if (showNewAddressForm || !activeAddrId) {
        const addrRes = await createAddressMutation.mutateAsync(newAddress);
        activeAddrId = addrRes.data.id;
      }

      const checkoutRes = await checkoutMutation.mutateAsync({
        addressId: activeAddrId,
        paymentMethod,
        couponCode: couponCode || undefined,
        notes: notes || undefined,
      });

      const { order, clientSecret } = checkoutRes.data;

      if (paymentMethod === "CARD" && clientSecret) {
        // Stripe integration secret received
        toast.success(`Order #${order.orderNumber} initialized! Complete card payment.`);
        router.push(`/orders/${order.id}`);
      } else {
        toast.success(`Order #${order.orderNumber} placed successfully!`);
        router.push(`/orders/${order.id}`);
      }
    } catch (err: unknown) {
      toast.error("Order processing failed. Please check your details.");
    }
  };

  return (
    <div className="container-site section-py">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-green-950">
          Secure Checkout
        </h1>
        <p className="text-sm text-ink-muted mt-1 flex items-center gap-1.5">
          <Lock className="w-4 h-4 text-green-700 inline" />
          Encrypted 256-Bit SSL Connection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Steps */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Delivery Address */}
          <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card space-y-6">
            <div className="flex items-center justify-between border-b border-cream-dark/60 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-950 text-white font-serif font-bold flex items-center justify-center text-sm">
                  1
                </span>
                <h2 className="text-xl font-serif font-bold text-green-950">
                  Delivery Address
                </h2>
              </div>
              {addresses.length > 0 && !showNewAddressForm && (
                <button
                  onClick={() => setShowNewAddressForm(true)}
                  className="btn-outline text-xs"
                >
                  <Plus className="w-4 h-4" /> Add New Address
                </button>
              )}
            </div>

            {/* Saved Addresses List */}
            {addresses.length > 0 && !showNewAddressForm && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => {
                  const isSelected =
                    selectedAddressId === addr.id ||
                    (!selectedAddressId && addr.isDefault);

                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-green-700 bg-green-50/50 shadow-sm"
                          : "border-cream-dark hover:border-green-600 bg-surface"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-green-950 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-green-700" />
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] uppercase font-bold text-green-800 bg-green-100 px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-ink">{addr.fullName}</p>
                      <p className="text-xs text-ink-muted">{addr.line1}</p>
                      {addr.line2 && <p className="text-xs text-ink-muted">{addr.line2}</p>}
                      <p className="text-xs text-ink-muted">
                        {addr.city}, {addr.state} {addr.postalCode}
                      </p>
                      <p className="text-xs text-ink-subtle mt-1">{addr.phone}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add Address Form */}
            {(addresses.length === 0 || showNewAddressForm) && (
              <form onSubmit={handleCreateAddress} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                      Address Label (e.g. Home, Office)
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.label}
                      onChange={(e) =>
                        setNewAddress((p) => ({ ...p, label: e.target.value }))
                      }
                      placeholder="Home"
                      className="w-full px-3.5 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.fullName}
                      onChange={(e) =>
                        setNewAddress((p) => ({ ...p, fullName: e.target.value }))
                      }
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={newAddress.phone}
                      onChange={(e) =>
                        setNewAddress((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.line1}
                      onChange={(e) =>
                        setNewAddress((p) => ({ ...p, line1: e.target.value }))
                      }
                      placeholder="123 Organic Way"
                      className="w-full px-3.5 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress((p) => ({ ...p, city: e.target.value }))
                      }
                      placeholder="Los Angeles"
                      className="w-full px-3.5 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.state}
                      onChange={(e) =>
                        setNewAddress((p) => ({ ...p, state: e.target.value }))
                      }
                      placeholder="CA"
                      className="w-full px-3.5 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={newAddress.postalCode}
                      onChange={(e) =>
                        setNewAddress((p) => ({ ...p, postalCode: e.target.value }))
                      }
                      placeholder="90210"
                      className="w-full px-3.5 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-sm"
                    />
                  </div>
                </div>

                {addresses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowNewAddressForm(false)}
                    className="text-xs text-ink-subtle hover:underline"
                  >
                    Cancel and select saved address
                  </button>
                )}
              </form>
            )}
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card space-y-6">
            <div className="flex items-center gap-3 border-b border-cream-dark/60 pb-4">
              <span className="w-8 h-8 rounded-full bg-green-950 text-white font-serif font-bold flex items-center justify-center text-sm">
                2
              </span>
              <h2 className="text-xl font-serif font-bold text-green-950">
                Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMethod("CARD")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === "CARD"
                    ? "border-green-700 bg-green-50/50"
                    : "border-cream-dark bg-surface"
                }`}
              >
                <CreditCard className="w-6 h-6 text-green-700" />
                <div>
                  <span className="font-bold text-sm text-green-950 block">
                    Credit / Debit Card
                  </span>
                  <span className="text-xs text-ink-muted">Powered by Stripe</span>
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod("CASH_ON_DELIVERY")}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentMethod === "CASH_ON_DELIVERY"
                    ? "border-green-700 bg-green-50/50"
                    : "border-cream-dark bg-surface"
                }`}
              >
                <Truck className="w-6 h-6 text-green-700" />
                <div>
                  <span className="font-bold text-sm text-green-950 block">
                    Cash on Delivery
                  </span>
                  <span className="text-xs text-ink-muted">Pay when order arrives</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Order Notes */}
          <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card space-y-4">
            <h3 className="text-lg font-serif font-bold text-green-950 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-700" />
              Delivery Notes (Optional)
            </h3>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g., Please leave package at front porch or ring doorbell."
              className="w-full px-4 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-sm focus:outline-none focus:border-green-600"
            />
          </div>
        </div>

        {/* Right Column: Checkout Summary & Complete Order */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card space-y-6">
            <h2 className="text-xl font-serif font-bold text-green-950 border-b border-cream-dark/60 pb-4">
              Items in Order ({items.length})
            </h2>

            {/* Items summary */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="truncate pr-2">
                    <span className="font-semibold text-ink">{item.product.name}</span>
                    <span className="text-ink-subtle block">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-green-950">
                    {formatCurrency(
                      (item.variant ? Number(item.variant.price) : Number(item.product.price)) *
                        item.quantity
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Breakdown */}
            <div className="space-y-2.5 text-sm border-t border-cream-dark/60 pt-4">
              <div className="flex justify-between text-ink-muted">
                <span>Subtotal</span>
                <span className="font-semibold text-ink">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>Shipping</span>
                <span className="font-semibold text-ink">
                  {shippingFee === 0 ? "FREE" : formatCurrency(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>Tax (9%)</span>
                <span className="font-semibold text-ink">{formatCurrency(estimatedTax)}</span>
              </div>
              <div className="flex justify-between text-lg font-serif font-bold text-green-950 border-t border-cream-dark/60 pt-3">
                <span>Total Due</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={checkoutMutation.isPending}
              className="btn-green w-full justify-center py-4 text-base shadow-green hover:shadow-lg disabled:opacity-50"
            >
              {checkoutMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Order...
                </>
              ) : (
                <>
                  Place Order & Pay
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
