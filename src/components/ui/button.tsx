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
      "inline-flex items-center justify-center gap-2 font-bold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
    
    const variants = {
      primary: "text-white bg-[#016C24] hover:bg-[#027F2C] active:bg-[#01531B] hover:-translate-y-0.5 shadow-sm active:translate-y-0",
      secondary: "text-[#016C24] bg-cream-dark hover:bg-cream active:bg-cream-dark border border-green-800/10",
      outline: "text-white border border-white/60 hover:bg-white hover:text-ink hover:border-white active:scale-98 bg-transparent",
      gold: "text-white bg-[#C9A961] hover:bg-[#E2C98A] active:bg-[#C9A961] hover:-translate-y-0.5 active:translate-y-0",
      dark: "text-white bg-[#0D2318] hover:bg-[#1B3A2D] active:bg-[#0D2318] active:scale-95 shadow-sm",
      white: "bg-white text-[#016C24] hover:bg-cream-dark active:bg-white shadow-sm border border-neutral-100",
      ghost: "text-[#016C24] hover:bg-cream-dark/50 active:bg-cream-dark",
      link: "p-0 text-sm font-semibold transition-colors hover:opacity-70",
    };

    const sizes = {
      sm: "px-4 py-1.5 text-xs",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3 text-base",
      icon: "w-10 h-10 rounded-full flex items-center justify-center p-0",
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
