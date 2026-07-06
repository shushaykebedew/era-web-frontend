import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

/**
 * Size scale:
 *  narrow  — page-hero text blocks, CTAs, forms (centered copy)
 *  default — standard content sections
 *  wide    — full-bleed grids, galleries, category cards
 */
const SIZE_STYLES = {
  narrow: "max-w-4xl 2xl:max-w-6xl",
  default: "max-w-7xl 2xl:max-w-screen-xl",
  wide: "max-w-screen-xl 2xl:max-w-screen-2xl",
} as const;

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: keyof typeof SIZE_STYLES;
  as?: "div" | "section" | "article";
};

export function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full min-w-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16",
        SIZE_STYLES[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
