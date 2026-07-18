"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "Times New Roman, serif" }}>
            Critical Error
          </h2>
          <p className="text-gray-500 text-sm mb-6">{error.message}</p>
          <button
            onClick={reset}
            className="bg-[#2D6B4F] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#1B3A2D] transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
