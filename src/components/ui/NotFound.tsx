"use client";
import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./Container";
import { cn } from "@/utils/cn";

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

const quickLinks = [
  { label: "Awards",      href: "/awards" },
  { label: "Nominees",    href: "/nominees" },
  { label: "Categories",  href: "/categories" },
  { label: "Gallery",     href: "/gallery" },
];

export function NotFound({
  title = "Page Not Found",
  description = "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
  primaryAction = { label: "Go Home", href: "/" },
  secondaryAction = { label: "Go Back", onClick: () => window.history.back() },
}: NotFoundProps) {
  return (
    <Container
      size="default"
      className="min-h-screen flex items-center justify-center py-16 sm:py-20 lg:py-24 2xl:py-32"
    >
      <div className="max-w-5xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 2xl:gap-28 items-center">

          {/* ── LEFT: visual ── */}
          <div className="relative order-2 lg:order-1 flex items-center justify-center">
            {/* Soft ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-primary/6 blur-3xl" />
            </div>

            {/* Blueprint card */}
            <div
              className={cn(
                "relative w-full max-w-xs sm:max-w-sm lg:max-w-full aspect-square",
                "border border-primary/15 bg-background-elevated rounded-sm",
                "overflow-hidden"
              )}
            >
              {/* Grid texture */}
              <svg
                className="absolute inset-0 w-full h-full text-primary/[0.06]"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <defs>
                  <pattern id="nf-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.6" />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#nf-grid)" />
              </svg>

              {/* Main blueprint lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                {/* Building silhouette */}
                <rect x="90" y="140" width="220" height="200" stroke="#C9A24B" strokeWidth="1" strokeOpacity="0.25" fill="rgba(201,162,75,0.02)" />
                {/* Roof ridge */}
                <path d="M90 140 L200 72 L310 140" stroke="#C9A24B" strokeWidth="1" strokeOpacity="0.35" />
                {/* Window grid */}
                <path d="M120 160 L120 330 M160 160 L160 330 M200 160 L200 330 M240 160 L240 330 M280 160 L280 330"
                  stroke="#C9A24B" strokeWidth="0.5" strokeOpacity="0.18" />
                <path d="M90 190 L310 190 M90 220 L310 220 M90 250 L310 250 M90 280 L310 280 M90 310 L310 310"
                  stroke="#C9A24B" strokeWidth="0.5" strokeOpacity="0.18" />
                {/* Door */}
                <rect x="178" y="290" width="44" height="50" stroke="#C9A24B" strokeWidth="0.8" strokeOpacity="0.35" fill="none" />
                {/* Spire */}
                <path d="M194 72 L200 48 L206 72" stroke="#C9A24B" strokeWidth="0.8" strokeOpacity="0.4" />
                {/* Measurement ticks */}
                <path d="M78 140 L302 140 M78 136 L78 144 M302 136 L302 144"
                  stroke="#C9A24B" strokeWidth="0.6" strokeOpacity="0.35" />
                {/* Corner dots */}
                <circle cx="90"  cy="140" r="2.5" fill="#C9A24B" fillOpacity="0.4" />
                <circle cx="310" cy="140" r="2.5" fill="#C9A24B" fillOpacity="0.4" />
                <circle cx="200" cy="72"  r="2.5" fill="#C9A24B" fillOpacity="0.5" />
              </svg>

              {/* Large 404 — centred, recessed */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
                <span className="font-display font-bold text-primary leading-none select-none"
                  style={{ fontSize: "clamp(90px, 22vw, 160px)", opacity: 0.10 }}>
                  404
                </span>
              </div>

              {/* Corner bracket accents */}
              <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-primary/40" aria-hidden />
              <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-primary/40" aria-hidden />
              <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-primary/40" aria-hidden />
              <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-primary/40" aria-hidden />
            </div>
          </div>

          {/* ── RIGHT: content ── */}
          <div className="order-1 lg:order-2 text-center lg:text-left">

            {/* Status chip */}
            <div className="inline-flex items-center gap-2 px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-full border border-primary/20 bg-background-elevated mb-7 2xl:mb-9">
              <span className="w-2 h-2 rounded-full bg-primary/70 animate-pulse" />
              <span className="text-[10px] sm:text-xs 2xl:text-[12px] font-inter font-semibold uppercase tracking-[1.5px] text-primary/80">
                Page Unavailable
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] 2xl:text-5xl font-semibold text-foreground tracking-tight leading-tight mb-5 2xl:mb-7">
              {title}
            </h1>

            {/* Ornamental divider */}
            <div className="flex items-center gap-3 mb-5 2xl:mb-7 justify-center lg:justify-start">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-primary/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-primary/40" />
            </div>

            {/* Description */}
            <p className="text-foreground-muted text-sm sm:text-base lg:text-[17px] 2xl:text-xl mb-9 2xl:mb-12 max-w-md mx-auto lg:mx-0 leading-relaxed">
              {description}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10 2xl:mb-12">
              {primaryAction.href ? (
                <Button as={Link} href={primaryAction.href} variant="primary" size="md" className="w-full sm:w-auto">
                  {primaryAction.label}
                </Button>
              ) : (
                <Button onClick={primaryAction.onClick} variant="primary" size="md" className="w-full sm:w-auto">
                  {primaryAction.label}
                </Button>
              )}

              {secondaryAction && (
                secondaryAction.href ? (
                  <Button as={Link} href={secondaryAction.href} variant="outline" size="md" className="w-full sm:w-auto">
                    {secondaryAction.label}
                  </Button>
                ) : (
                  <Button onClick={secondaryAction.onClick} variant="outline" size="md" className="w-full sm:w-auto">
                    {secondaryAction.label}
                  </Button>
                )
              )}
            </div>

            {/* Quick links */}
            <div className="border-t border-primary/10 pt-7 2xl:pt-9">
              <p className="text-xs 2xl:text-sm font-inter text-muted-foreground uppercase tracking-[1.2px] mb-4 2xl:mb-5">
                Or explore
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center lg:justify-start">
                {quickLinks.map((link, i) => (
                  <span key={link.href} className="flex items-center gap-4">
                    {i > 0 && <span className="text-primary/20 text-xs select-none">·</span>}
                    <Link
                      href={link.href}
                      className={cn(
                        "text-xs sm:text-sm 2xl:text-base font-inter text-foreground-muted",
                        "hover:text-primary transition-colors duration-200"
                      )}
                    >
                      {link.label}
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Container>
  );
}
