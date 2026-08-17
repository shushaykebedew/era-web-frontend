"use client";

import Link from "next/link";
import { Button } from "./Button";
import { Container } from "./Container";
import { cn } from "@/utils/cn";

export interface NotFoundAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NotFoundProps {
  title?: string;
  description?: string;
  primaryAction?: NotFoundAction;
  secondaryAction?: NotFoundAction;
}

const quickLinks = [
  { label: "Categories", href: "/categories" },
  { label: "Nominees", href: "/nominees" },
  { label: "Partners", href: "/partners" },
  { label: "Gallery", href: "/gallery" },
];

export function NotFound({
  title = "Page Not Found",
  description = "The requested page cannot be located in the ERA 2026 architectural index. The page may have been relocated or is under development.",
  primaryAction = { label: "Return Home", href: "/" },
  secondaryAction = { label: "Go Back", onClick: () => typeof window !== "undefined" && window.history.back() },
}: NotFoundProps) {
  return (
    <div className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center py-10 sm:py-16 md:py-20 lg:py-24 2xl:py-32 overflow-hidden bg-background">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-72 sm:w-[36rem] lg:w-[48rem] h-64 sm:h-96 rounded-full bg-primary/[0.04] blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 w-48 sm:w-80 h-48 sm:h-80 rounded-full bg-primary/[0.03] blur-3xl -z-10"
        aria-hidden="true"
      />

      <Container size="default">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 2xl:gap-24 items-center">

            {/* ── LEFT / VISUAL: Architectural Blueprint Drafting Card ── */}
            <div className="lg:col-span-6 flex items-center justify-center order-2 lg:order-1 w-full">
              <div
                className={cn(
                  "relative w-full max-w-[270px] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none aspect-square",
                  "border border-primary/20 bg-[#120F0A] rounded-xl",
                  "shadow-[0_0_40px_rgba(201,162,75,0.08)]",
                  "overflow-hidden p-4 sm:p-6 flex items-center justify-center mx-auto"
                )}
              >
                {/* Blueprint Drafting Grid Texture */}
                <svg
                  className="absolute inset-0 w-full h-full text-primary/[0.07]"
                  viewBox="0 0 400 400"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern id="nf-grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#nf-grid-pattern)" />
                </svg>

                {/* Technical Architectural Geometry */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* Outer coordinate axes */}
                  <line x1="40" y1="40" x2="360" y2="40" stroke="#C9A24B" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 3" />
                  <line x1="40" y1="360" x2="360" y2="360" stroke="#C9A24B" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 3" />
                  <line x1="40" y1="40" x2="40" y2="360" stroke="#C9A24B" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 3" />
                  <line x1="360" y1="40" x2="360" y2="360" stroke="#C9A24B" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 3" />

                  {/* Architectural Monument Structure */}
                  {/* Roof Spire / Apex */}
                  <path d="M200 68 L200 42" stroke="#C9A24B" strokeWidth="1.5" strokeOpacity="0.7" strokeLinecap="round" />
                  <circle cx="200" cy="42" r="3" fill="#C9A24B" fillOpacity="0.9" />

                  {/* Triangular pediment / roof */}
                  <path
                    d="M80 150 L200 70 L320 150 Z"
                    stroke="#C9A24B"
                    strokeWidth="1.2"
                    strokeOpacity="0.5"
                    fill="rgba(201,162,75,0.04)"
                  />

                  {/* Building facade columns & floors */}
                  <rect x="90" y="150" width="220" height="180" stroke="#C9A24B" strokeWidth="1" strokeOpacity="0.35" fill="rgba(201,162,75,0.02)" />

                  {/* Vertical structural mullions */}
                  <line x1="134" y1="150" x2="134" y2="330" stroke="#C9A24B" strokeWidth="0.6" strokeOpacity="0.25" />
                  <line x1="178" y1="150" x2="178" y2="330" stroke="#C9A24B" strokeWidth="0.6" strokeOpacity="0.25" />
                  <line x1="222" y1="150" x2="222" y2="330" stroke="#C9A24B" strokeWidth="0.6" strokeOpacity="0.25" />
                  <line x1="266" y1="150" x2="266" y2="330" stroke="#C9A24B" strokeWidth="0.6" strokeOpacity="0.25" />

                  {/* Horizontal floor levels */}
                  <line x1="90" y1="195" x2="310" y2="195" stroke="#C9A24B" strokeWidth="0.6" strokeOpacity="0.25" />
                  <line x1="90" y1="240" x2="310" y2="240" stroke="#C9A24B" strokeWidth="0.6" strokeOpacity="0.25" />
                  <line x1="90" y1="285" x2="310" y2="285" stroke="#C9A24B" strokeWidth="0.6" strokeOpacity="0.25" />

                  {/* Main entrance portal */}
                  <rect x="175" y="270" width="50" height="60" stroke="#C9A24B" strokeWidth="1" strokeOpacity="0.6" fill="rgba(201,162,75,0.06)" />
                  <path d="M175 270 Q200 250 225 270" stroke="#C9A24B" strokeWidth="1" strokeOpacity="0.6" fill="none" />

                  {/* Dimension markers & precision ticks */}
                  <line x1="70" y1="150" x2="70" y2="330" stroke="#C9A24B" strokeWidth="0.8" strokeOpacity="0.4" />
                  <line x1="64" y1="150" x2="76" y2="150" stroke="#C9A24B" strokeWidth="0.8" strokeOpacity="0.4" />
                  <line x1="64" y1="330" x2="76" y2="330" stroke="#C9A24B" strokeWidth="0.8" strokeOpacity="0.4" />

                  <circle cx="200" cy="70" r="2.5" fill="#C9A24B" />
                  <circle cx="80" cy="150" r="2" fill="#C9A24B" />
                  <circle cx="320" cy="150" r="2" fill="#C9A24B" />
                </svg>

                {/* Large recessed 404 watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  <span
                    className="font-display font-black text-primary leading-none select-none tracking-tighter"
                    style={{ fontSize: "clamp(80px, 22vw, 170px)", opacity: 0.08 }}
                  >
                    404
                  </span>
                </div>

                {/* Drafting corner markers */}
                <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-3.5 h-3.5 sm:w-4 sm:h-4 border-t-2 border-l-2 border-primary/50" aria-hidden="true" />
                <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-3.5 h-3.5 sm:w-4 sm:h-4 border-t-2 border-r-2 border-primary/50" aria-hidden="true" />
                <span className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-3.5 h-3.5 sm:w-4 sm:h-4 border-b-2 border-l-2 border-primary/50" aria-hidden="true" />
                <span className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-3.5 h-3.5 sm:w-4 sm:h-4 border-b-2 border-r-2 border-primary/50" aria-hidden="true" />

                {/* Coordinate metadata watermark tag */}
                <div className="absolute bottom-2 sm:bottom-4 inset-x-0 flex justify-between px-3 sm:px-6 text-[8px] sm:text-[9px] font-mono text-primary/50 tracking-wider select-none">
                  <span>LAT: 9.0300° N</span>
                  <span className="hidden xs:inline">ERA-ERR-404</span>
                  <span>LON: 38.7400° E</span>
                </div>
              </div>
            </div>

            {/* ── RIGHT / CONTENT: Typography & Interactive Actions ── */}
            <div className="lg:col-span-6 order-1 lg:order-2 text-center lg:text-left">

              {/* Status Pill Badge */}
              <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-primary/25 bg-[#18140E] shadow-sm mb-4 sm:mb-6 2xl:mb-8">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs 2xl:text-[13px] font-inter font-semibold uppercase tracking-[1.5px] sm:tracking-[1.8px] text-primary/90">
                  404 • Missing Blueprint
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-[2.6rem] 2xl:text-5xl font-bold text-foreground tracking-tight leading-tight mb-3 sm:mb-4 2xl:mb-6">
                {title}
              </h1>

              {/* Architectural Diamond Divider */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 2xl:mb-8 justify-center lg:justify-start" aria-hidden="true">
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-primary/50" />
                <div className="w-1.5 h-1.5 rotate-45 border border-primary/70 bg-primary/30" />
                <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-primary/50" />
              </div>

              {/* Narrative description */}
              <p className="text-foreground-muted text-xs xs:text-sm sm:text-base  2xl:text-lg mb-6 sm:mb-8 2xl:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-inter px-2 sm:px-0">
                {description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10 2xl:mb-12 max-w-xs sm:max-w-none mx-auto lg:mx-0">
                {primaryAction &&
                  (primaryAction.href ? (
                    <Button
                      as={Link}
                      href={primaryAction.href}
                      variant="primary"
                      size="md"
                      className="w-full sm:w-auto"
                    >
                      <span>{primaryAction.label}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="group-hover:translate-x-0.5 transition-transform duration-200 shrink-0"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 7h10M8 3l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  ) : (
                    <Button
                      onClick={primaryAction.onClick}
                      variant="primary"
                      size="md"
                      className="w-full sm:w-auto"
                    >
                      <span>{primaryAction.label}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="group-hover:translate-x-0.5 transition-transform duration-200 shrink-0"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 7h10M8 3l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  ))}

                {secondaryAction &&
                  (secondaryAction.href ? (
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
                  ))}
              </div>

              {/* Quick Navigation Links */}
              <div className="border-t border-primary/15 pt-5 sm:pt-6 2xl:pt-8">
                <p className="text-[10px] sm:text-[11px] 2xl:text-xs font-inter text-foreground-muted/70 uppercase tracking-[1.4px] mb-2.5 sm:mb-3">
                  Or explore curated sections
                </p>
                <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-2 justify-center lg:justify-start items-center">
                  {quickLinks.map((link, idx) => (
                    <span key={link.href} className="inline-flex items-center gap-3 sm:gap-4">
                      {idx > 0 && (
                        <span className="text-primary/35 text-xs sm:text-sm 2xl:text-base font-light select-none" aria-hidden="true">
                          |
                        </span>
                      )}
                      <Link
                        href={link.href}
                        className={cn(
                          "text-xs sm:text-sm 2xl:text-[18px] font-inter text-foreground-muted",
                          "hover:text-primary hover:underline underline-offset-4 transition-colors duration-200"
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
    </div>
  );
}
