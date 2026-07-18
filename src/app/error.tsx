"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "Times New Roman, serif" }}>
          Something went wrong
        </h2>
        <p className="text-[#767676] text-sm mb-6">{error.message || "An unexpected error occurred."}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-green">
            Try again
          </button>
          <Link href="/" className="btn-outline">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
