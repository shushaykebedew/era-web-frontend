import { type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";

/** Badge status variants — must stay in sync with VARIANT_STYLES in Badge.tsx */
export type BadgeVariant = "nominee" | "past-winner" | "shortlisted";

/** Button colour / fill variants */
export type ButtonVariant = "primary" | "outline" | "ghost";

/** Button size scale */
export type ButtonSize = "sm" | "md" | "lg";

/** Container width scale */
export type ContainerSize = "narrow" | "default" | "wide";

/** Sort options for the nominees list */
export type Sort = "Alphabetical" | "Most Votes";

// ── Component prop shapes ────────────────────────────────────────────────────

export type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export type ButtonOwnProps<T extends ElementType> = {
  as?: T;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

export type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

export type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
  as?: "div" | "section" | "article";
};

export type EyebrowProps = {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export type ServerButtonProps<T extends ElementType = "button"> = {
  as?: T;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "variant" | "size" | "className" | "children"
>;

export type AnimationProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
};

export type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  once?: boolean;
};
