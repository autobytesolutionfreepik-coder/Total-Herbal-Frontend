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
      primary: "text-white hover:brightness-110 hover:-translate-y-0.5 shadow-sm active:translate-y-0",
      secondary: "text-green-950 bg-cream-dark hover:bg-cream active:bg-cream-dark border border-green-800/10",
      outline: "text-white border transition-all hover:bg-white hover:text-ink active:scale-98",
      gold: "text-white hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0",
      dark: "text-white hover:brightness-110 active:scale-95 shadow-sm",
      white: "bg-white text-green-900 hover:bg-cream-dark active:bg-white",
      ghost: "text-green-700 hover:bg-cream-dark/50 active:bg-cream-dark",
      link: "p-0 text-sm font-semibold transition-colors hover:opacity-70",
    };

    const inlineStyles: React.CSSProperties = {};
    if (variant === "primary") {
      inlineStyles.background = "#2D6B4F";
    } else if (variant === "outline") {
      inlineStyles.borderColor = "rgba(255,255,255,0.6)";
    } else if (variant === "gold") {
      inlineStyles.background = "#C9A961";
    } else if (variant === "dark") {
      inlineStyles.background = "#0D2318";
    }

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
          style={inlineStyles}
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
        style={inlineStyles}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
