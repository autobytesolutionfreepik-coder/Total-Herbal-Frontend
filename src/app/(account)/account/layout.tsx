"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User as UserIcon,
  ShieldCheck,
  Package,
  MapPin,
  Heart,
  Star,
  LogOut,
  LayoutDashboard,
  Lock,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useLogoutMutation } from "@/features/auth/queries";
import { toast } from "sonner";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success("Signed out successfully.");
      router.push("/sign-in");
    } catch {
      toast.error("Logout failed.");
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/account", icon: LayoutDashboard },
    { label: "Profile Details", href: "/account/profile", icon: UserIcon },
    { label: "Security & Password", href: "/account/security", icon: Lock },
    { label: "My Orders", href: "/account/orders", icon: Package },
    { label: "Delivery Addresses", href: "/account/addresses", icon: MapPin },
    { label: "Wishlist", href: "/account/wishlist", icon: Heart },
    { label: "My Reviews", href: "/account/reviews", icon: Star },
  ];

  return (
    <div className="container-site section-py">
      {/* Account Header */}
      <div className="bg-surface p-6 sm:p-8 rounded-2xl border border-cream-dark/60 shadow-card mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 text-green-800 font-serif font-bold text-xl flex items-center justify-center border-2 border-green-700/30 shadow-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-green-950">
                {user?.name || "Customer Account"}
              </h1>
              {user?.isEmailVerified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-800 bg-green-100 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <p className="text-xs text-ink-muted mt-0.5">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn-outline text-xs text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-surface p-4 rounded-2xl border border-cream-dark/60 shadow-card space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/account"
                ? pathname === "/account"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-green-950 text-white shadow-sm"
                    : "text-ink-muted hover:bg-cream/60 hover:text-green-950"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-green-700"}`} />
                {item.label}
              </Link>
            );
          })}
        </aside>

        {/* Main Account Content Area */}
        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}
