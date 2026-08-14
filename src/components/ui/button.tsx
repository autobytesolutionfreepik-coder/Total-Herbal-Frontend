import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold" | "dark" | "white" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "xl" | "icon";
  href?: string;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement & HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "lg", href, className, children, ...props }, ref) => {
    const baseStyles = 
      "inline-flex items-center justify-center gap-2.5 font-extrabold rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#016C24] focus-visible:ring-offset-2 tracking-wider uppercase select-none text-center";
    
    const variants = {
      primary: "text-white bg-[#007A2B] hover:bg-[#00581F] active:bg-[#004A1A] shadow-[0_4px_16px_rgba(0,122,43,0.3)] hover:shadow-[0_8px_24px_rgba(0,122,43,0.4)] hover:scale-[1.02] active:scale-[0.98]",
      secondary: "text-[#006828] bg-[#E5EAE7] hover:bg-white active:bg-[#E5EAE7] border border-[#006828]/15 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
      outline: "text-white border-2 border-white/80 hover:bg-white hover:text-[#006828] active:scale-[0.98] bg-white/10 backdrop-blur-md shadow-sm hover:shadow-lg",
      gold: "text-[#0D2318] bg-gradient-to-r from-[#E2C98A] via-[#C9A961] to-[#E2C98A] hover:opacity-95 active:scale-[0.98] shadow-[0_4px_16px_rgba(201,169,97,0.3)] hover:shadow-[0_8px_24px_rgba(201,169,97,0.4)] hover:scale-[1.02]",
      dark: "text-white bg-[#0D2318] hover:bg-[#1B3A2D] active:bg-[#0D2318] shadow-md hover:shadow-xl hover:scale-[1.02] border border-white/10",
      white: "bg-white text-[#006828] hover:bg-white/90 active:bg-white shadow-md hover:shadow-xl border border-neutral-100 hover:scale-[1.02]",
      ghost: "text-[#006828] hover:bg-[#EDE8DF]/60 active:bg-[#EDE8DF]",
      link: "p-0 text-sm font-semibold transition-colors hover:text-[#00581F] normal-case tracking-normal",
    };

    const sizes = {
      sm: "px-5 py-2.5 text-xs tracking-wider",
      md: "px-7 py-3 text-xs sm:text-sm tracking-wider",
      lg: "px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base tracking-wider shadow-md",
      xl: "px-10 sm:px-12 py-4 sm:py-5 text-base sm:text-lg tracking-widest shadow-lg",
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
