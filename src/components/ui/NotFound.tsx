"use client";
import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./Container";

export interface NotFoundProps {
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function NotFound({
  title = "Page Not Found",
  description = "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
  primaryAction = { label: "Go Home", href: "/" },
  secondaryAction = { label: "Go Back", onClick: () => window.history.back() },
}: NotFoundProps) {
  return (
    <Container
      size="default"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-lg w-full text-center">
        <h1 className="font-display text-[120px] sm:text-[140px] lg:text-[160px] 2xl:text-[180px] font-bold text-primary leading-none tracking-tight">
          404
        </h1>
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-semibold text-foreground mt-6 mb-4">
          {title}
        </h2>
        <p className="text-foreground-muted text-base sm:text-lg 2xl:text-xl mb-8 max-w-md mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryAction.href ? (
            <Button
              as={Link}
              href={primaryAction.href}
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
            >
              {primaryAction.label}
            </Button>
          ) : (
            <Button
              onClick={primaryAction.onClick}
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <>
              {secondaryAction.href ? (
                <Button
                  as={Link}
                  href={secondaryAction.href}
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  {secondaryAction.label}
                </Button>
              ) : (
                <Button
                  onClick={secondaryAction.onClick}
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto"
                >
                  {secondaryAction.label}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
