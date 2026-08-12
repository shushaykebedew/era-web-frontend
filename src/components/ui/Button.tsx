"use client";

import { type ElementType } from "react";
import { cn } from "@/utils/cn";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonProps } from "@/types/ui";
import { LoadingSpinner } from "./LoadingSpinner";

const VARIANT_STYLES = {
  primary:
    "bg-primary text-primary-foreground hover:bg-accent border border-primary",
  outline:
    "bg-transparent text-foreground border border-border-strong hover:border-primary",
  ghost: "bg-transparent text-foreground-muted hover:text-primary",
} as const;

const SIZE_STYLES = {
  sm: "h-9 px-4 text-xs 2xl:h-11 2xl:px-6 2xl:text-base",
  md: "h-11 px-7 text-sm 2xl:h-14 2xl:px-10 2xl:text-lg",
  lg: "h-13 px-9 text-base 2xl:h-16 2xl:px-12 2xl:text-xl",
} as const;

const SPINNER_SIZE_STYLES = {
  sm: "w-4 h-4 2xl:w-5 2xl:h-5",
  md: "w-5 h-5 2xl:w-6 2xl:h-6",
  lg: "w-6 h-6 2xl:w-7 2xl:h-7",
} as const;

// Motion-wrapped button for default usage (not polymorphic)
const MotionButton = motion.button;

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  className,
  children,
  isLoading = false,
  spinnerColor = "currentColor",
  spinnerClassName,
  disabled,
  ...props
}: ButtonProps<T> & {
  isLoading?: boolean;
  spinnerColor?: string;
  spinnerClassName?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const baseClasses = cn(
    "inline-flex min-w-0 items-center justify-center gap-2 cursor-pointer",
    "text-center overflow-hidden whitespace-nowrap rounded-sm",
    "font-inter font-semibold uppercase tracking-widest transition-colors duration-200",
    isLoading && "cursor-not-allowed opacity-90",
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className,
  );

  const content = isLoading ? (
    <LoadingSpinner
      color={spinnerColor}
      className={cn(SPINNER_SIZE_STYLES[size], spinnerClassName)}
    />
  ) : (
    children
  );

  const isDisabled = disabled || isLoading;

  // When rendered as a custom element (e.g. Link), skip motion wrapper
  // to avoid type conflicts with polymorphic props
  if (as) {
    const Component = as as ElementType;
    return (
      <Component
        className={baseClasses}
        aria-disabled={isDisabled}
        {...(props as any)}
      >
        {content}
      </Component>
    );
  }

  // Default: render as a motion-enhanced button
  if (shouldReduceMotion) {
    return (
      <button className={baseClasses} disabled={isDisabled} {...(props as any)}>
        {content}
      </button>
    );
  }

  return (
    <MotionButton
      className={baseClasses}
      whileHover={isDisabled ? undefined : { scale: 1.01 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
      disabled={isDisabled}
      {...(props as any)}
    >
      {content}
    </MotionButton>
  );
}
