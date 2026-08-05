import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold" | "dark" | "white" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, className, children, ...props }, ref) => {
    const baseStyles = 
      "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 tracking-wide select-none";
    
    const variants = {
      primary: "text-white bg-gradient-to-r from-[#016C24] to-[#1E4D35] hover:from-[#027F2C] hover:to-[#016C24] hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(1,108,36,0.25)] hover:shadow-[0_8px_24px_rgba(1,108,36,0.35)] active:translate-y-0",
      secondary: "text-[#016C24] bg-[#EDE8DF] hover:bg-[#F5F0E8] active:bg-[#EDE8DF] border border-[#016C24]/15 hover:border-[#016C24]/30",
      outline: "text-white border border-white/70 hover:bg-white hover:text-[#0D2318] hover:border-white active:scale-98 bg-white/10 backdrop-blur-md hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)]",
      gold: "text-[#0D2318] bg-gradient-to-r from-[#E2C98A] via-[#C9A961] to-[#E2C98A] hover:opacity-95 active:scale-98 shadow-[0_4px_16px_rgba(201,169,97,0.3)] hover:shadow-[0_8px_24px_rgba(201,169,97,0.4)] hover:-translate-y-0.5",
      dark: "text-white bg-[#0D2318] hover:bg-[#1B3A2D] active:bg-[#0D2318] shadow-md hover:shadow-xl hover:-translate-y-0.5 border border-white/10",
      white: "bg-white text-[#016C24] hover:bg-[#F5F0E8] active:bg-white shadow-md hover:shadow-xl border border-neutral-100 hover:-translate-y-0.5",
      ghost: "text-[#016C24] hover:bg-[#EDE8DF]/60 active:bg-[#EDE8DF]",
      link: "p-0 text-sm font-semibold transition-colors hover:text-[#027F2C]",
    };

    const sizes = {
      sm: "px-5 py-2.5 text-xs font-extrabold tracking-wider uppercase",
      md: "px-7.5 py-3.5 text-sm font-extrabold tracking-wider uppercase",
      lg: "px-10 py-4.5 text-base sm:text-lg font-extrabold tracking-wider uppercase",
      icon: "w-11 h-11 rounded-full flex items-center justify-center p-0",
    };

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      variant !== "link" ? sizes[size] : "",
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={combinedClassName}
          ref={ref as any}
          {...(props as any)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
