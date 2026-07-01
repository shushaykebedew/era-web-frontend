import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

const SIZE_STYLES = {
  default: "max-w-7xl",
  narrow: "max-w-4xl",
  wide: "max-w-[1920px]",
} as const;

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: keyof typeof SIZE_STYLES;
  as?: "div" | "section" | "article";
};

/** Centralized horizontal padding/max-width so layout stays consistent. */
export function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        SIZE_STYLES[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
