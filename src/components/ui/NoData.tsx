"use client";
import { cn } from "@/utils/cn";

export interface NoDataProps {
  title?: string;
  description?: string;
  icon?: "empty" | "coming-soon" | "search" | "error" | "loading";
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Refined SVG illustrations — one per variant
const illustrations = {
  empty: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Inbox / empty tray */}
      <rect x="12" y="38" width="56" height="30" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M12 52h14l4 7h20l4-7h14" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M28 20l12-8 12 8" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <line x1="40" y1="12" x2="40" y2="38" stroke="currentColor" strokeWidth="1.2" />
      <line x1="33" y1="28" x2="40" y2="21" stroke="currentColor" strokeWidth="1.2" />
      <line x1="47" y1="28" x2="40" y2="21" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  "coming-soon": (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Hourglass */}
      <path d="M24 14h32M24 66h32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M26 14c0 14 14 18 14 26S26 52 26 66M54 14c0 14-14 18-14 26s14 12 14 26" stroke="currentColor" strokeWidth="1.2" fill="none" />
      {/* Sand top */}
      <path d="M32 22h16l-8 10z" fill="currentColor" opacity="0.25" />
      {/* Sand bottom drip */}
      <circle cx="40" cy="56" r="5" fill="currentColor" opacity="0.2" />
      <circle cx="40" cy="56" r="2" fill="currentColor" opacity="0.5" />
      {/* Time ticks */}
      <line x1="14" y1="40" x2="19" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="61" y1="40" x2="66" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Magnifying glass */}
      <circle cx="35" cy="34" r="18" stroke="currentColor" strokeWidth="1.2" />
      <line x1="48" y1="48" x2="66" y2="66" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* Sad face inside lens */}
      <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.5" />
      <circle cx="40" cy="30" r="2" fill="currentColor" opacity="0.5" />
      <path d="M30 40 Q35 36 40 40" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Triangle warning */}
      <path d="M40 14L72 66H8L40 14Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <line x1="40" y1="34" x2="40" y2="52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="59" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  ),
  loading: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-spin" style={{ animationDuration: "1.4s" }}>
      {/* Spinner arc */}
      <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.15" />
      <path d="M40 14 A26 26 0 0 1 66 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

const defaultTitles = {
  empty: "No Data Available",
  "coming-soon": "Coming Soon",
  search: "No Results Found",
  error: "Something Went Wrong",
  loading: "Loading...",
};

const defaultDescriptions = {
  empty: "There's nothing to display at the moment. Please check back later.",
  "coming-soon": "This content will be available soon. Stay tuned for updates.",
  search: "We couldn't find any results matching your search. Try different keywords.",
  error: "An error occurred while loading the data. Please try again.",
  loading: "We're gathering the latest information for you.",
};

export function NoData({
  title,
  description,
  icon = "empty",
  className,
  action,
}: NoDataProps) {
  const displayTitle = title || defaultTitles[icon];
  const displayDescription = description || defaultDescriptions[icon];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center text-center",
        "py-16 sm:py-20 lg:py-28 2xl:py-36 px-6",
        className
      )}
    >
      {/* Ambient glow behind illustration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden
      >
        <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Illustration frame */}
      <div className="relative mb-8 2xl:mb-10 shrink-0">
        {/* Outer ring */}
        <div
          className={cn(
            "w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 2xl:w-36 2xl:h-36",
            "rounded-full border border-primary/15 bg-background-elevated",
            "flex items-center justify-center",
            "shadow-[0_0_40px_rgba(235,193,102,0.08)]"
          )}
        >
          {/* Inner ring */}
          <div
            className={cn(
              "w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 2xl:w-28 2xl:h-28",
              "rounded-full border border-primary/10",
              "flex items-center justify-center",
              "text-primary/50"
            )}
          >
            {/* Icon */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 2xl:w-13 2xl:h-13 text-primary/60">
              {illustrations[icon]}
            </div>
          </div>
        </div>

        {/* Corner bracket accents */}
        <span className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-primary/30" aria-hidden />
        <span className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-primary/30" aria-hidden />
        <span className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-primary/30" aria-hidden />
        <span className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-primary/30" aria-hidden />
      </div>

      {/* Label chip */}
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 2xl:mb-6 rounded-full border border-primary/20 bg-background-elevated">
        <span
          className={cn(
            "block w-1.5 h-1.5 rounded-full bg-primary/60",
            icon === "loading" && "animate-pulse"
          )}
        />
        <span className="text-[10px] sm:text-[11px] 2xl:text-xs font-inter font-semibold uppercase tracking-[1.4px] text-primary/70">
          {icon === "loading" ? "In Progress" : icon === "error" ? "Error" : icon === "search" ? "Search" : icon === "coming-soon" ? "Upcoming" : "Empty"}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-[2rem] 2xl:text-4xl font-semibold text-foreground tracking-tight mb-4 2xl:mb-5 max-w-sm sm:max-w-md">
        {displayTitle}
      </h2>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5 2xl:mb-6">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30" />
        <div className="w-1 h-1 rounded-full bg-primary/40" />
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30" />
      </div>

      {/* Description */}
      <p className="max-w-xs sm:max-w-sm lg:max-w-md 2xl:max-w-lg font-inter text-foreground-muted text-sm sm:text-base lg:text-[17px] 2xl:text-lg leading-relaxed mb-8 2xl:mb-10">
        {displayDescription}
      </p>

      {/* Action button */}
      {action && (
        <button
          onClick={action.onClick}
          className={cn(
            "group inline-flex items-center gap-2.5",
            "px-7 py-3 sm:px-9 sm:py-3.5 2xl:px-11 2xl:py-4",
            "text-xs sm:text-sm 2xl:text-base font-inter font-semibold",
            "uppercase tracking-[1.5px] 2xl:tracking-[2px]",
            "text-primary border border-primary/30 rounded-sm",
            "hover:border-primary hover:bg-primary/5 active:bg-primary/10",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          )}
        >
          {action.label}
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
            aria-hidden
          >
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
