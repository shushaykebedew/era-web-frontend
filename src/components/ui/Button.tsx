"use client";

import { type ElementType } from "react";
import { cn } from "@/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonProps } from "@/types/ui";

const VARIANT_STYLES = {
  primary:
    "bg-primary text-primary-foreground hover:bg-accent border border-primary",
  outline:
    "bg-transparent text-foreground border border-border-strong hover:border-primary",
  ghost: "bg-transparent text-foreground-muted hover:text-primary",
} as const;

const SIZE_STYLES = {
  sm: "px-4 py-2 text-xs 2xl:px-6 2xl:py-3 2xl:text-base",
  md: "px-7 py-3.5 text-sm 2xl:px-10 2xl:py-5 2xl:text-lg",
  lg: "px-9 py-4 text-base 2xl:px-12 2xl:py-6 2xl:text-xl",
} as const;
// Motion-wrapped button for default usage (not polymorphic)
const MotionButton = motion.button;

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps<T>) {
  const shouldReduceMotion = useReducedMotion();

  const baseClasses = cn(
    "inline-flex min-w-0 items-center justify-center gap-2 cursor-pointer text-center",
    "font-sans font-semibold uppercase tracking-widest transition-colors duration-200",
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className,
  );

  // When rendered as a custom element (e.g. Link), skip motion wrapper
  // to avoid type conflicts with polymorphic props
  if (as) {
    const Component = as as ElementType;
    return (
      <Component className={baseClasses} {...(props as any)}>
        {children}
      </Component>
    );
  }

  // Default: render as a motion-enhanced button
  if (shouldReduceMotion) {
    return (
      <button className={baseClasses} {...(props as any)}>
        {children}
      </button>
    );
  }

  return (
    <MotionButton
      className={baseClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      {...(props as any)}
    >
      {children}
    </MotionButton>
  );
}
