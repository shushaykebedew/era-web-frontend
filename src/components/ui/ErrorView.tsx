"use client";

import { useEffect } from "react";

interface ErrorViewProps {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  message?: string;
  logLabel?: string;
}

export function ErrorView({
  error,
  reset,
  title = "Something went wrong",
  message = "We apologize for the inconvenience. Please try again.",
  logLabel = "Application error",
}: ErrorViewProps) {
  useEffect(() => {
    console.error(`${logLabel}:`, error);
  }, [error, logLabel]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="font-display text-3xl font-bold text-primary mb-4">
          {title}
        </h2>
        <p className="text-foreground-muted mb-8">
          {message}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
