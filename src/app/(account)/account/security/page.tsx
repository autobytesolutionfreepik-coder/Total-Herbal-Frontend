"use client";

import { useState } from "react";
import { Lock, ShieldCheck, Loader2, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/features/auth/queries";
import { getErrorMessage } from "@/lib/api/errors";

export default function AccountSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePasswordMutation = useChangePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast.error("Current password is required.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({ currentPassword, newPassword });
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to change password."));
    }
  };

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card space-y-6">
      <div className="border-b border-cream-dark/60 pb-4">
        <h2 className="text-2xl font-serif font-bold text-green-950">
          Security & Password
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Update your account security password and review authentication protection.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
        {/* Current Password */}
        <div>
          <label htmlFor="current-pass" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
            Current Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="current-pass"
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-ink font-sans text-sm focus:outline-none focus:border-green-600 transition-all"
            />
          </div>
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="new-pass" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
            New Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              id="new-pass"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full pl-10 pr-4 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-ink font-sans text-sm focus:outline-none focus:border-green-600 transition-all"
            />
          </div>
        </div>

        {/* Confirm New Password */}
        <div>
          <label htmlFor="confirm-pass" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
            Confirm New Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              id="confirm-pass"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-ink font-sans text-sm focus:outline-none focus:border-green-600 transition-all"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={changePasswordMutation.isPending}
            className="btn-green justify-center px-6 py-3 text-sm shadow-green hover:shadow-lg disabled:opacity-50"
          >
            {changePasswordMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating Password...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Update Password
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
