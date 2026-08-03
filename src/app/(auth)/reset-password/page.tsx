"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/features/auth/queries";
import { getErrorMessage } from "@/lib/api/errors";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const resetMutation = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!token) {
      setErrorMsg("Invalid or missing password reset token.");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      await resetMutation.mutateAsync({ token, password });
      toast.success("Password reset successfully! Please sign in with your new password.");
      router.push("/sign-in");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to reset password. Token may have expired."));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md bg-surface p-8 sm:p-10 rounded-2xl shadow-card border border-cream-dark/60 relative"
    >
      {/* Brand Logo Header */}
      <div className="mb-6 flex flex-col items-center justify-center text-center">
        <Link href="/" className="inline-flex items-center group hover:opacity-90 transition-opacity mb-2">
          <span
            className="text-3xl sm:text-4xl font-bold leading-none text-[#1B3A2D] tracking-tight"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Total
          </span>
          <span
            className="text-3xl sm:text-4xl font-bold leading-none text-[#027F2C] tracking-tight"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Herbal
          </span>
          <span
            className="text-3xl sm:text-4xl font-bold leading-none text-[#1B3A2D] tracking-tight"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Care
          </span>
        </Link>
        <div className="w-12 h-0.5 bg-[#027F2C]/30 rounded-full" />
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-700 mb-4 shadow-sm">
          <Lock className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-green-950">
          Set New Password
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Enter your new secure password below to complete the reset process.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label htmlFor="reset-new-password" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
            New Password
          </label>
          <input
            id="reset-new-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-ink font-sans text-sm focus:outline-none focus:border-green-600 transition-all"
          />
        </div>

        <div>
          <label htmlFor="reset-confirm-password" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
            Confirm New Password
          </label>
          <input
            id="reset-confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-ink font-sans text-sm focus:outline-none focus:border-green-600 transition-all"
          />
        </div>

        {errorMsg && (
          <p className="text-xs text-red-600 flex items-center gap-1.5 mt-2">
            <AlertCircle className="w-4 h-4" />
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={resetMutation.isPending}
          className="w-full btn-green justify-center py-3 text-sm shadow-green hover:shadow-lg disabled:opacity-50 transition-all mt-4"
        >
          {resetMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Resetting Password...
            </>
          ) : (
            <>
              Reset Password
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/sign-in"
          className="text-xs font-semibold text-green-700 hover:text-green-800 transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <Suspense fallback={
        <div className="w-full max-w-md bg-surface p-8 sm:p-10 rounded-2xl border border-cream-dark/60 flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-green-700" />
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
