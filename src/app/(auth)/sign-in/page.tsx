"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLoginMutation } from "@/features/auth/queries";
import { getErrorMessage, isApiError } from "@/lib/api/errors";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    if (!email) {
      setFieldErrors((prev) => ({ ...prev, email: "Email address is required." }));
      return;
    }
    if (!password) {
      setFieldErrors((prev) => ({ ...prev, password: "Password is required." }));
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
      toast.success("Welcome back to Total Herbal Care!");
      router.push(redirect);
    } catch (err: unknown) {
      if (isApiError(err) && err.errors && err.errors.length > 0) {
        const errorsMap: Record<string, string> = {};
        err.errors.forEach((f) => {
          errorsMap[f.field] = f.message;
        });
        setFieldErrors(errorsMap);
      } else {
        toast.error(getErrorMessage(err, "Invalid email or password."));
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md bg-surface p-8 sm:p-10 rounded-2xl shadow-card border border-cream-dark/60 relative overflow-hidden"
    >
      {/* Accent background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

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
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-green-950 tracking-tight">
          Welcome Back
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-ink-muted">
          Sign in to access your Total Herbal Care account & rewards
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" id="sign-in-form">
        {/* Email input */}
        <div>
          <label htmlFor="email-input" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
              <Mail className="w-5 h-5" />
            </div>
            <input
              id="email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className={`w-full pl-11 pr-4 py-3 bg-cream/40 border rounded-xl text-ink font-sans text-sm focus:outline-none transition-all ${
                fieldErrors.email
                  ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
                  : "border-cream-dark focus:border-green-600 focus:ring-1 focus:ring-green-600"
              }`}
            />
          </div>
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password-input" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-green-700 hover:text-green-800 transition-colors underline-offset-2 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
              <Lock className="w-5 h-5" />
            </div>
            <input
              id="password-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full pl-11 pr-4 py-3 bg-cream/40 border rounded-xl text-ink font-sans text-sm focus:outline-none transition-all ${
                fieldErrors.password
                  ? "border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500"
                  : "border-cream-dark focus:border-green-600 focus:ring-1 focus:ring-green-600"
              }`}
            />
          </div>
          {fieldErrors.password && (
            <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          id="sign-in-submit-btn"
          disabled={loginMutation.isPending}
          className="w-full btn-green justify-center py-3.5 text-sm shadow-green hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2"
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-cream-dark/60 text-center">
        <p className="text-sm text-ink-muted">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-green-700 hover:text-green-800 transition-colors underline-offset-2 hover:underline"
          >
            Create Account (21+)
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="w-full max-w-md bg-surface p-8 sm:p-10 rounded-2xl border border-cream-dark/60 flex flex-col items-center justify-center min-h-[350px]">
          <Loader2 className="w-8 h-8 animate-spin text-green-700" />
        </div>
      }>
        <SignInForm />
      </Suspense>
    </div>
  );
}
