"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Lock, Mail, User as UserIcon, Calendar, Phone, ArrowRight, AlertCircle, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRegisterMutation, useResendVerificationMutation } from "@/features/auth/queries";
import { registerSchema } from "@/features/auth/schemas";
import { getErrorMessage, isApiError } from "@/lib/api/errors";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const registerMutation = useRegisterMutation();
  const resendVerificationMutation = useResendVerificationMutation();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const formatted: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          formatted[issue.path[0].toString()] = issue.message;
        }
      });
      setFieldErrors(formatted);
      return;
    }

    try {
      await registerMutation.mutateAsync(formData);
      // Automatically trigger sending verification code to email & phone
      try {
        await resendVerificationMutation.mutateAsync();
      } catch {
        // Ignored if backend sent verification automatically during register
      }

      setIsSuccess(true);
      toast.success("Account created successfully! Verification sent.");
    } catch (err: unknown) {
      if (isApiError(err) && err.errors && err.errors.length > 0) {
        const errorsMap: Record<string, string> = {};
        err.errors.forEach((f) => {
          errorsMap[f.field] = f.message;
        });
        setFieldErrors(errorsMap);
      } else {
        toast.error(getErrorMessage(err, "Registration failed. Please try again."));
      }
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg bg-surface p-8 sm:p-10 rounded-2xl shadow-card border border-cream-dark/60 relative overflow-hidden text-center"
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Logo Header */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <Link href="/" className="inline-flex items-center gap-1 group hover:opacity-90 transition-opacity mb-2">
            <span
              className="text-2xl sm:text-3xl font-bold leading-none text-[#1B3A2D]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Total
            </span>
            <span
              className="text-2xl sm:text-3xl font-bold leading-none text-[#027F2C]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Herbal
            </span>
            <span
              className="text-2xl sm:text-3xl font-bold leading-none text-[#1B3A2D]"
              style={{ fontFamily: "Times New Roman, serif" }}
            >
              Care
            </span>
          </Link>
          <div className="w-12 h-0.5 bg-[#027F2C]/30 rounded-full" />
        </div>

        {isSuccess ? (
          <div className="py-6 space-y-5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-700 shadow-sm mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-green-950">
              Account Created Successfully!
            </h2>
            <div className="bg-cream/60 p-4 rounded-xl border border-cream-dark/80 text-sm text-ink-muted text-left space-y-2">
              <p className="font-semibold text-green-900">
                Verification Sent:
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-700 flex-shrink-0" />
                <span>Verification link sent to <strong className="text-ink">{formData.email}</strong></span>
              </p>
              {formData.phone && (
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <span>SMS Code dispatched to <strong className="text-ink">{formData.phone}</strong></span>
                </p>
              )}
            </div>
            <p className="text-xs text-ink-subtle">
              Please check your inbox or phone messages to complete your account activation.
            </p>
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => router.push("/")}
                className="w-full btn-green justify-center py-3 text-sm"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-serif font-bold text-green-950 tracking-tight">
                Create Your Account
              </h1>
              <p className="mt-1 text-xs text-ink-muted flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-700 inline" />
                Age restricted: Minimum 21 years legal purchase age
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left" id="sign-up-form">
              {/* Full Name */}
              <div>
                <label htmlFor="signup-name" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Jane Doe"
                    className={`w-full pl-10 pr-4 py-2.5 bg-cream/40 border rounded-xl text-ink font-sans text-sm focus:outline-none transition-all ${
                      fieldErrors.name ? "border-red-500" : "border-cream-dark focus:border-green-600"
                    }`}
                  />
                </div>
                {fieldErrors.name && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="signup-email" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="jane@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 bg-cream/40 border rounded-xl text-ink font-sans text-sm focus:outline-none transition-all ${
                      fieldErrors.email ? "border-red-500" : "border-cream-dark focus:border-green-600"
                    }`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Date of Birth & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="signup-dob" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    Date of Birth (21+) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      id="signup-dob"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                      className={`w-full pl-10 pr-3 py-2.5 bg-cream/40 border rounded-xl text-ink font-sans text-sm focus:outline-none transition-all ${
                        fieldErrors.dateOfBirth ? "border-red-500" : "border-cream-dark focus:border-green-600"
                      }`}
                    />
                  </div>
                  {fieldErrors.dateOfBirth && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.dateOfBirth}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="signup-phone" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="signup-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-2.5 bg-cream/40 border border-cream-dark rounded-xl text-ink font-sans text-sm focus:outline-none focus:border-green-600 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="signup-password" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-subtle">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="signup-password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="At least 8 chars, 1 uppercase & 1 number"
                    className={`w-full pl-10 pr-4 py-2.5 bg-cream/40 border rounded-xl text-ink font-sans text-sm focus:outline-none transition-all ${
                      fieldErrors.password ? "border-red-500" : "border-cream-dark focus:border-green-600"
                    }`}
                  />
                </div>
                {fieldErrors.password && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                id="sign-up-submit-btn"
                disabled={registerMutation.isPending}
                className="w-full btn-green justify-center py-3.5 text-sm shadow-green hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
              >
                {registerMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account & Join Rewards
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-cream-dark/60 text-center">
              <p className="text-sm text-ink-muted">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-green-700 hover:text-green-800 transition-colors underline-offset-2 hover:underline"
                >
                  Sign In Here
                </Link>
              </p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
