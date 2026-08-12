import { cn } from "@/utils/cn";
import { type ElementType } from "react";
import { ServerButtonProps } from "@/types/ui";

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

export function ServerButton<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ServerButtonProps<T>) {
  const Component = as ?? "button";
  const base = cn(
    "inline-flex items-center justify-center gap-2 font-inter font-semibold uppercase tracking-widest transition-colors duration-200 rounded-sm",
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    className,
  );

  return (
    <Component className={base} {...rest}>
      {children}
    </Component>
  );
}
