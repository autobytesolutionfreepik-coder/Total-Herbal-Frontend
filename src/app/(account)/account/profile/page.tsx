"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { User as UserIcon, Mail, Phone, Calendar, Save, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import { useUpdateProfileMutation } from "@/features/auth/queries";
import { getErrorMessage } from "@/lib/api/errors";

export default function AccountProfilePage() {
  const { user } = useAuthStore();
  const updateProfileMutation = useUpdateProfileMutation();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      await updateProfileMutation.mutateAsync({ name, phone });
      toast.success("Profile details updated successfully!");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update profile."));
    }
  };

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card space-y-6">
      <div className="border-b border-cream-dark/60 pb-4">
        <h2 className="text-2xl font-serif font-bold text-green-950">
          Personal Profile Details
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Manage your personal account name, contact phone number, and verified credentials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
        {/* Full Name */}
        <div>
          <label htmlFor="profile-name" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
            Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
              <UserIcon className="w-4 h-4" />
            </div>
            <input
              id="profile-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full pl-10 pr-4 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-ink font-sans text-sm focus:outline-none focus:border-green-600 transition-all"
            />
          </div>
        </div>

        {/* Email (Readonly) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="profile-email" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Email Address (Verified)
            </label>
            <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Locked
            </span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="profile-email"
              type="email"
              disabled
              value={user?.email || ""}
              className="w-full pl-10 pr-4 py-2.5 bg-cream/80 border border-cream-dark rounded-xl text-ink-muted font-sans text-sm cursor-not-allowed"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="profile-phone" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="profile-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full pl-10 pr-4 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-ink font-sans text-sm focus:outline-none focus:border-green-600 transition-all"
            />
          </div>
        </div>

        {/* Date of Birth (Readonly Age Gate Verification) */}
        {user?.dateOfBirth && (
          <div>
            <label htmlFor="profile-dob" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
              Verified Date of Birth (21+ Legal Compliance)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                id="profile-dob"
                type="text"
                disabled
                value={new Date(user.dateOfBirth).toLocaleDateString()}
                className="w-full pl-10 pr-4 py-2.5 bg-cream/80 border border-cream-dark rounded-xl text-ink-muted font-sans text-sm cursor-not-allowed"
              />
            </div>
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="btn-green justify-center px-6 py-3 text-sm shadow-green hover:shadow-lg disabled:opacity-50"
          >
            {updateProfileMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Profile Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
