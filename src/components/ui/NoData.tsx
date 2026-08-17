"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./Button";
import { cn } from "@/utils/cn";

export type NoDataVariant = "empty" | "coming-soon" | "search" | "error" | "loading";

export interface NoDataAction {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
}

export interface NoDataProps {
  title?: string;
  description?: string;
  icon?: NoDataVariant;
  className?: string;
  action?: NoDataAction;
  secondaryAction?: NoDataAction;
  children?: React.ReactNode;
}

// ── Luxury Architectural Illustrations ────────────────────────────────────────
const illustrations: Record<NoDataVariant, React.ReactNode> = {
  empty: (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-primary"
      aria-hidden="true"
    >
      {/* Background architectural grid */}
      <path
        d="M20 50L50 35L80 50L50 65Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.25"
        strokeDasharray="2 2"
        fill="currentColor"
        fillOpacity="0.03"
      />
      {/* Base platform pedestal */}
      <path
        d="M20 56L50 71L80 56M20 62L50 77L80 62"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      {/* Isometric cube outline (empty exhibition plinth) */}
      <path
        d="M50 20L78 35V65L50 80L22 65V35L50 20Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />
      <path
        d="M50 20V50M78 35L50 50M22 35L50 50"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      {/* Floating blueprint markers */}
      <circle cx="50" cy="20" r="2" fill="currentColor" />
      <circle cx="78" cy="35" r="1.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="22" cy="35" r="1.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="50" cy="80" r="2" fill="currentColor" />
      <circle cx="50" cy="50" r="2.5" fill="currentColor" />
      {/* Drafting corner ticks */}
      <path d="M15 15H22M15 15V22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M85 15H78M85 15V22" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M15 85H22M15 85V78" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M85 85H78M85 85V78" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  ),

  "coming-soon": (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-primary"
      aria-hidden="true"
    >
      {/* Outer orbital celestial ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.25"
        strokeDasharray="4 3"
      />
      {/* Hourglass top & bottom arches */}
      <path
        d="M32 24H68M32 76H68"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
      {/* Elegant hourglass glass curves */}
      <path
        d="M36 24C36 40 46 44 50 50C54 44 64 40 64 24M36 76C36 60 46 56 50 50C54 56 64 60 64 76"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.75"
        fill="currentColor"
        fillOpacity="0.02"
      />
      {/* Golden sand reservoir & trickle */}
      <path d="M42 32H58L50 44Z" fill="currentColor" fillOpacity="0.35" />
      <circle cx="50" cy="53" r="1.5" fill="currentColor" className="animate-ping" style={{ animationDuration: "2s" }} />
      <circle cx="50" cy="66" r="4" fill="currentColor" fillOpacity="0.25" />
      <circle cx="50" cy="66" r="2" fill="currentColor" fillOpacity="0.6" />
      {/* Precision compass notches */}
      <line x1="50" y1="8" x2="50" y2="14" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="50" y1="86" x2="50" y2="92" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="8" y1="50" x2="14" y2="50" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="86" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
    </svg>
  ),

  search: (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-primary"
      aria-hidden="true"
    >
      {/* Outer blueprint coordinate circle */}
      <circle
        cx="46"
        cy="46"
        r="28"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.75"
        fill="currentColor"
        fillOpacity="0.03"
      />
      <circle
        cx="46"
        cy="46"
        r="22"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.3"
        strokeDasharray="2 3"
      />
      {/* Reticle / Crosshair center */}
      <line x1="46" y1="28" x2="46" y2="36" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
      <line x1="46" y1="56" x2="46" y2="64" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
      <line x1="28" y1="46" x2="36" y2="46" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
      <line x1="56" y1="46" x2="64" y2="46" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
      <circle cx="46" cy="46" r="2" fill="currentColor" strokeOpacity="0.9" />
      {/* Handle stem & grip */}
      <path
        d="M66 66L86 86"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
      <path
        d="M74 74L84 84"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinecap="round"
        strokeOpacity="0.4"
      />
      {/* Corner calibration accents */}
      <path d="M16 16H24M16 16V24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M84 16H76M84 16V24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  ),

  error: (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-primary"
      aria-hidden="true"
    >
      {/* Outer diamond frame */}
      <path
        d="M50 14L86 50L50 86L14 50Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.75"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* Inner dashed warning diamond */}
      <path
        d="M50 24L76 50L50 76L24 50Z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.3"
        strokeDasharray="3 3"
      />
      {/* Exclamation stem and dot */}
      <line
        x1="50"
        y1="38"
        x2="50"
        y2="54"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
      <circle cx="50" cy="63" r="2.2" fill="currentColor" />
      {/* Ticks on 4 vertices */}
      <circle cx="50" cy="14" r="1.5" fill="currentColor" />
      <circle cx="86" cy="50" r="1.5" fill="currentColor" />
      <circle cx="50" cy="86" r="1.5" fill="currentColor" />
      <circle cx="14" cy="50" r="1.5" fill="currentColor" />
    </svg>
  ),

  loading: (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-primary animate-spin"
      style={{ animationDuration: "3s" }}
      aria-hidden="true"
    >
      {/* Outer track */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.15"
      />
      {/* Leading arc */}
      <path
        d="M50 12A38 38 0 0 1 88 50"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
      {/* Counter rotating inner ring */}
      <circle
        cx="50"
        cy="50"
        r="24"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.25"
        strokeDasharray="4 4"
      />
      <circle cx="50" cy="50" r="3" fill="currentColor" strokeOpacity="0.8" />
    </svg>
  ),
};

const defaultTitles: Record<NoDataVariant, string> = {
  empty: "No Data Available",
  "coming-soon": "Announcements Pending",
  search: "No Matching Records",
  error: "Unable to Load Content",
  loading: "Retrieving Information...",
};

const defaultDescriptions: Record<NoDataVariant, string> = {
  empty: "There are currently no records available in this section. Please check back as new updates are published.",
  "coming-soon": "Official nominees, categories, and event schedules are being prepared for release. Stay tuned for upcoming announcements.",
  search: "No results matched your search criteria. Try refining your keywords, adjusting filters, or clearing your query.",
  error: "A temporary connection issue prevented loading this data. Please verify your connection and try again.",
  loading: "Synchronizing the latest architectural awards data. This will just take a moment.",
};

const defaultBadgeLabels: Record<NoDataVariant, string> = {
  empty: "Archived & Ready",
  "coming-soon": "Upcoming ERA 2026",
  search: "Search Refinement",
  error: "System Notice",
  loading: "Synchronizing",
};

export function NoData({
  title,
  description,
  icon = "empty",
  className,
  action,
  secondaryAction,
  children,
}: NoDataProps) {
  const displayTitle = title ?? defaultTitles[icon];
  const displayDescription = description ?? defaultDescriptions[icon];
  const badgeLabel = defaultBadgeLabels[icon];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center text-center",
        "py-10 sm:py-16 md:py-20 lg:py-24 2xl:py-32 px-3 sm:px-6 w-full max-w-2xl mx-auto",
        className
      )}
      role="status"
      aria-live="polite"
    >
      {/* Radial ambient gold halo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="w-44 h-44 xs:w-52 xs:h-52 sm:w-72 sm:h-72 rounded-full bg-primary/[0.07] blur-3xl" />
      </div>

      {/* Frame Container */}
      <div className="relative mb-5 sm:mb-6 2xl:mb-8 shrink-0">
        {/* Outer glowing frame */}
        <div
          className={cn(
            "w-20 h-20 xs:w-22 xs:h-22 sm:w-26 sm:h-26 md:w-28 md:h-28 lg:w-32 lg:h-32 2xl:w-36 2xl:h-36",
            "rounded-xl border border-primary/25 bg-[#12100C]",
            "flex items-center justify-center",
            "shadow-[0_0_35px_rgba(201,162,75,0.12)]",
            "relative"
          )}
        >
          {/* Inner inset ring */}
          <div
            className={cn(
              "w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 lg:w-24 lg:h-24 2xl:w-28 2xl:h-28",
              "rounded-lg border border-primary/15 bg-[#17140F]",
              "flex items-center justify-center p-3 sm:p-3.5 2xl:p-4"
            )}
          >
            {illustrations[icon]}
          </div>

          {/* Precision drafting corner accents */}
          <span className="absolute -top-1 -left-1 sm:-top-1.5 sm:-left-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 border-t-2 border-l-2 border-primary/50" aria-hidden="true" />
          <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 border-t-2 border-r-2 border-primary/50" aria-hidden="true" />
          <span className="absolute -bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 border-b-2 border-l-2 border-primary/50" aria-hidden="true" />
          <span className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 w-3 h-3 sm:w-3.5 sm:h-3.5 border-b-2 border-r-2 border-primary/50" aria-hidden="true" />
        </div>
      </div>

      {/* Status Pill Badge */}
      <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 mb-3.5 sm:mb-4 2xl:mb-5 rounded-full border border-primary/25 bg-[#1a1610] shadow-sm">
        <span
          className={cn(
            "block w-1.5 h-1.5 rounded-full bg-primary",
            icon === "loading" ? "animate-spin" : "animate-pulse"
          )}
          aria-hidden="true"
        />
        <span className="text-[9px] xs:text-[10px] sm:text-[11px] 2xl:text-xs font-inter font-semibold uppercase tracking-[1.4px] sm:tracking-[1.6px] text-primary/90">
          {badgeLabel}
        </span>
      </div>

      {/* Main Title */}
      <h3 className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-[28px] 2xl:text-4xl font-semibold text-foreground tracking-tight mb-2.5 sm:mb-3 2xl:mb-4 max-w-lg leading-tight break-words px-2">
        {displayTitle}
      </h3>

      {/* Architectural Geometric Divider */}
      <div className="flex items-center gap-2 sm:gap-3 mb-3.5 sm:mb-4 2xl:mb-5" aria-hidden="true">
        <div className="h-px w-8 sm:w-12 md:w-14 bg-gradient-to-r from-transparent to-primary/40" />
        <div className="w-1.5 h-1.5 rotate-45 border border-primary/60 bg-primary/20" />
        <div className="h-px w-8 sm:w-12 md:w-14 bg-gradient-to-l from-transparent to-primary/40" />
      </div>

      {/* Description Text */}
      <p className="max-w-xs xs:max-w-sm sm:max-w-md 2xl:max-w-lg font-inter text-foreground-muted text-xs xs:text-sm sm:text-base 2xl:text-lg leading-relaxed mb-5 sm:mb-6 2xl:mb-8 px-2">
        {displayDescription}
      </p>

      {/* Optional Children */}
      {children && <div className="mb-5 sm:mb-6 2xl:mb-8 w-full">{children}</div>}

      {/* Action Buttons */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-center w-full max-w-xs sm:max-w-none mx-auto">
          {action &&
            (action.href ? (
              <Button
                as={Link}
                href={action.href}
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
              >
                <span>{action.label}</span>
                {action.icon ?? (
                  icon === "search" ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-80 group-hover:opacity-100 group-hover:rotate-45 transition-transform duration-300 shrink-0"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="8" y1="8" x2="14" y2="14" />
                      <line x1="14" y1="8" x2="8" y2="14" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )
                )}
              </Button>
            ) : (
              <Button
                onClick={action.onClick}
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
              >
                <span>{action.label}</span>
                {action.icon ?? (
                  icon === "search" ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-80 group-hover:opacity-100 group-hover:rotate-45 transition-transform duration-300 shrink-0"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="8" y1="8" x2="14" y2="14" />
                      <line x1="14" y1="8" x2="8" y2="14" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )
                )}
              </Button>
            ))}

          {secondaryAction &&
            (secondaryAction.href ? (
              <Button
                as={Link}
                href={secondaryAction.href}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                {secondaryAction.label}
              </Button>
            ) : (
              <Button
                onClick={secondaryAction.onClick}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto"
              >
                {secondaryAction.label}
              </Button>
            ))}
        </div>
      )}
    </div>
  );
}
