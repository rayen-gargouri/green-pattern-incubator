"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

const variants = {
  primary: "bg-primary text-primary-foreground shadow-sm hover:shadow-md",
  secondary: "bg-accent text-accent-foreground shadow-sm hover:shadow-md",
  outline: "border border-border bg-white text-foreground hover:bg-muted hover:border-muted-foreground/30",
  ghost: "text-foreground hover:bg-muted"
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base"
};

export function Button({ href, variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  };

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a className={classes} {...motionProps}>
          {children}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  );
}
