"use client";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/utils/cn";
import { FadeIn, SlideUp } from "@/components/ui/animations";
import { ReactNode } from "react";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string | ReactNode;
  description?: string | ReactNode;
  align?: "center" | "left";
  className?: string;
  children?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  children,
}: PageHeaderProps) {
  const isLeft = align === "left";

  return (
    <section
      className={cn(
        "relative bg-background pt-14 sm:pt-18 lg:pt-20 2xl:pt-24 pb-10 sm:pb-14 2xl:pb-16 border-b border-primary/15 overflow-hidden",
        isLeft ? "text-left" : "text-center",
        className,
      )}
    >
      {/* Background glow accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[30rem] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl"
      />

      <Container size={isLeft ? "default" : "narrow"} className="relative z-10">
        {eyebrow && (
          <FadeIn>
            <Eyebrow align={align} className="mb-3">
              {eyebrow}
            </Eyebrow>
          </FadeIn>
        )}

        <SlideUp delay={0.05}>
          <h1
            className={cn(
              "font-display font-bold text-foreground tracking-tight",
              "text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl",
              "leading-tight sm:leading-tight lg:leading-tight",
              isLeft ? "max-w-3xl 2xl:max-w-5xl" : "mx-auto max-w-3xl 2xl:max-w-5xl",
            )}
          >
            {title}
          </h1>
        </SlideUp>

        {description && (
          <SlideUp delay={0.1}>
            <p
              className={cn(
                "font-inter text-foreground-muted text-base sm:text-lg lg:text-xl 2xl:text-2xl leading-relaxed mt-4 sm:mt-5",
                isLeft
                  ? "max-w-2xl 2xl:max-w-4xl"
                  : "mx-auto max-w-2xl sm:max-w-3xl 2xl:max-w-4xl",
              )}
            >
              {description}
            </p>
          </SlideUp>
        )}

        {children && <SlideUp delay={0.15}>{children}</SlideUp>}
      </Container>
    </section>
  );
}
