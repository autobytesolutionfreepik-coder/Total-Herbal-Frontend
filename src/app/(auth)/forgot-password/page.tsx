"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Mail, ArrowLeft, Send, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/features/auth/queries";
import { getErrorMessage } from "@/lib/api/errors";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const forgotMutation = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await forgotMutation.mutateAsync(email);
      setIsSent(true);
      toast.success("Password reset instructions sent to your email.");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to send reset link. Please check your email."));
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-surface p-8 sm:p-10 rounded-2xl shadow-card border border-cream-dark/60 text-center relative"
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

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-700 mb-4 shadow-sm">
          {isSent ? <CheckCircle2 className="w-7 h-7" /> : <Mail className="w-7 h-7" />}
        </div>

        <h1 className="text-2xl font-serif font-bold text-green-950">
          {isSent ? "Check Your Email" : "Forgot Password?"}
        </h1>

        <p className="mt-2 text-sm text-ink-muted leading-relaxed">
          {isSent
            ? `We sent a password reset link to ${email}. Click the link in your inbox to reset your password.`
            : "No worries! Enter your registered email address below and we'll send you a link to reset your password."}
        </p>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
            <div>
              <label htmlFor="forgot-email" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="forgot-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-ink font-sans text-sm focus:outline-none focus:border-green-600 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={forgotMutation.isPending}
              className="w-full btn-green justify-center py-3 text-sm shadow-green hover:shadow-lg disabled:opacity-50 transition-all mt-2"
            >
              {forgotMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Link...
                </>
              ) : (
                <>
                  Send Reset Link
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsSent(false)}
            className="mt-6 btn-outline w-full justify-center text-sm"
          >
            Resend Email
          </button>
        )}

        <div className="mt-8 pt-6 border-t border-cream-dark/60">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
