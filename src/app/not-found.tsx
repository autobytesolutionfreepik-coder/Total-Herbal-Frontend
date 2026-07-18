import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
      <div className="text-center">
        <p className="text-8xl font-bold text-[#2D6B4F]" style={{ fontFamily: "Times New Roman, serif" }}>404</p>
        <h1 className="text-2xl font-bold mt-2 mb-3" style={{ fontFamily: "Times New Roman, serif" }}>Page Not Found</h1>
        <p className="text-[#767676] text-sm mb-6">The page you are looking for does not exist.</p>
        <Link href="/" className="btn-green">Back to Home</Link>
      </div>
    </div>
  );
}
