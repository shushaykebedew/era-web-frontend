import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";

const VARIANT_STYLES = {
  primary:
    "bg-primary text-primary-foreground hover:bg-accent border border-primary",
  outline:
    "bg-transparent text-foreground border border-border-strong  hover:border-primary",
  ghost: "bg-transparent text-foreground-muted hover:text-primary",
} as const;

const SIZE_STYLES = {
  sm: "px-4 py-2 text-xs 2xl:px-6 2xl:py-3 2xl:text-base",
  md: "px-7 py-3.5 text-sm 2xl:px-10 2xl:py-5 2xl:text-lg",
  lg: "px-9 py-4 text-base 2xl:px-12 2xl:py-6 2xl:text-xl",
} as const;

export type ButtonVariant = keyof typeof VARIANT_STYLES;
export type ButtonSize = keyof typeof SIZE_STYLES;

type ButtonOwnProps<T extends ElementType> = {
  as?: T;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

/**
 * Polymorphic button: renders as <button> by default, or any element/Link
 * via the `as` prop (e.g. `<Button as={Link} href="/nominees">`).
 */
export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";

  return (
    <Component
      className={cn(
        "inline-flex min-w-0 items-center justify-center gap-2 cursor-pointer text-center",
        "font-sans font-semibold uppercase tracking-widest transition-colors duration-200",
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
