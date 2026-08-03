"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { useVerifyEmailMutation } from "@/features/auth/queries";
import { getErrorMessage } from "@/lib/api/errors";

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorText, setErrorText] = useState("");

  const verifyMutation = useVerifyEmailMutation();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorText("No verification token provided in the link.");
      return;
    }

    verifyMutation
      .mutateAsync(token)
      .then(() => {
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
        setErrorText(getErrorMessage(err, "Verification failed or token expired."));
      });
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md bg-surface p-8 sm:p-10 rounded-2xl shadow-card border border-cream-dark/60 text-center"
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

      {status === "verifying" && (
        <div className="space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-green-700 mx-auto" />
          <h1 className="text-2xl font-serif font-bold text-green-950">
            Verifying Your Email...
          </h1>
          <p className="text-sm text-ink-muted">
            Please wait a moment while we confirm your account details.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-700 shadow-sm mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-green-950">
            Email Verified Successfully!
          </h1>
          <p className="text-sm text-ink-muted">
            Thank you for verifying your email address. You now have full access to your account.
          </p>
          <div className="pt-4">
            <Link href="/sign-in" className="btn-green w-full justify-center py-3 text-sm">
              Continue to Sign In
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-700 shadow-sm mx-auto">
            <XCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-green-950">
            Verification Failed
          </h1>
          <p className="text-sm text-red-600">{errorText}</p>
          <div className="pt-4">
            <Link href="/sign-in" className="btn-outline w-full justify-center py-3 text-sm">
              Back to Sign In
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <Suspense fallback={
        <div className="w-full max-w-md bg-surface p-8 sm:p-10 rounded-2xl border border-cream-dark/60 flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-green-700" />
        </div>
      }>
        <VerifyEmailForm />
      </Suspense>
    </div>
  );
}
