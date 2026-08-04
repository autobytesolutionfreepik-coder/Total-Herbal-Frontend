"use client";

import { useState } from "react";
import { MapPin, Plus, Trash2, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} from "@/features/addresses/api";
import { Address } from "@/features/addresses/types";
import { useAuthStore } from "@/stores/auth-store";

export default function AccountAddressesPage() {
  const { user } = useAuthStore();
  const { data: addresses = [], isLoading } = useAddressesQuery();

  const createMutation = useCreateAddressMutation();
  const deleteMutation = useDeleteAddressMutation();
  const setDefaultMutation = useSetDefaultAddressMutation();

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    label: "Home",
    fullName: user?.name || "",
    phone: user?.phone || "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    isDefault: false,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync(formData);
      toast.success("Address added successfully!");
      setShowAddForm(false);
      setFormData({
        label: "Home",
        fullName: user?.name || "",
        phone: user?.phone || "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "US",
        isDefault: false,
      });
    } catch {
      toast.error("Failed to add address.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Address deleted.");
    } catch {
      toast.error("Failed to delete address.");
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultMutation.mutateAsync(id);
      toast.success("Default shipping address updated.");
    } catch {
      toast.error("Failed to set default address.");
    }
  };

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card space-y-6">
      <div className="flex items-center justify-between border-b border-cream-dark/60 pb-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-green-950">
            Saved Delivery Addresses
          </h2>
          <p className="text-sm text-ink-muted mt-1">
            Manage your default shipping destinations for faster herbal dispensary checkout.
          </p>
        </div>
        {!showAddForm && (
          <button onClick={() => setShowAddForm(true)} className="btn-green text-xs">
            <Plus className="w-4 h-4" /> Add Address
          </button>
        )}
      </div>

      {/* Add New Address Form */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="p-6 bg-cream/40 rounded-xl border border-cream-dark space-y-4">
          <h3 className="text-lg font-serif font-bold text-green-950">New Shipping Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-ink-muted mb-1">
                Label (e.g. Home, Office)
              </label>
              <input
                type="text"
                required
                value={formData.label}
                onChange={(e) => setFormData((p) => ({ ...p, label: e.target.value }))}
                placeholder="Home"
                className="w-full px-3.5 py-2 bg-surface border border-cream-dark rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-ink-muted mb-1">
                Recipient Full Name
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="Jane Doe"
                className="w-full px-3.5 py-2 bg-surface border border-cream-dark rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-ink-muted mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2 bg-surface border border-cream-dark rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-ink-muted mb-1">
                Street Address Line 1
              </label>
              <input
                type="text"
                required
                value={formData.line1}
                onChange={(e) => setFormData((p) => ({ ...p, line1: e.target.value }))}
                placeholder="123 Organic Way"
                className="w-full px-3.5 py-2 bg-surface border border-cream-dark rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-ink-muted mb-1">
                City
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                placeholder="Los Angeles"
                className="w-full px-3.5 py-2 bg-surface border border-cream-dark rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-ink-muted mb-1">
                State
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData((p) => ({ ...p, state: e.target.value }))}
                placeholder="CA"
                className="w-full px-3.5 py-2 bg-surface border border-cream-dark rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-ink-muted mb-1">
                Postal Code
              </label>
              <input
                type="text"
                required
                value={formData.postalCode}
                onChange={(e) => setFormData((p) => ({ ...p, postalCode: e.target.value }))}
                placeholder="90210"
                className="w-full px-3.5 py-2 bg-surface border border-cream-dark rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="btn-green text-xs px-6 py-2.5"
            >
              {createMutation.isPending ? "Saving..." : "Save Address"}
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="btn-outline text-xs px-4 py-2.5"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Address Cards List */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-36 bg-cream/40 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <p className="text-xs text-ink-subtle text-center py-6">
          No saved addresses found. Click &quot;Add Address&quot; above to create one.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr: Address) => (
            <div
              key={addr.id}
              className={`p-5 rounded-xl border-2 space-y-2 transition-all ${
                addr.isDefault
                  ? "border-green-700 bg-green-50/40"
                  : "border-cream-dark bg-surface"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-green-950 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-green-700" />
                  {addr.label}
                </span>
                {addr.isDefault ? (
                  <span className="text-[10px] uppercase font-bold text-green-800 bg-green-100 px-2 py-0.5 rounded-full">
                    Default
                  </span>
                ) : (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-[11px] font-semibold text-green-700 hover:underline"
                  >
                    Set as Default
                  </button>
                )}
              </div>

              <div className="text-xs text-ink space-y-0.5">
                <p className="font-semibold text-ink">{addr.fullName}</p>
                <p>{addr.line1}</p>
                {addr.line2 && <p>{addr.line2}</p>}
                <p>
                  {addr.city}, {addr.state} {addr.postalCode}
                </p>
                <p className="text-ink-subtle pt-1">{addr.phone}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-xs text-ink-subtle hover:text-red-600 transition-colors p-1"
                  title="Delete address"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
