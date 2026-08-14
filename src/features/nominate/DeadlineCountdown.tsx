"use client";

import { useDeadlineCountdown } from "@/hooks/useDeadlineCountdown";

export interface DeadlineCountdownProps {
  expiresAt?: string | number | Date | null;
  label?: string;
}

export function DeadlineCountdown({
  expiresAt,
  label = "Time Remaining:",
}: DeadlineCountdownProps) {
  const { hours, minutes, seconds, isExpired } = useDeadlineCountdown(expiresAt);

  if (isExpired) {
    return (
      <div className="pt-2.5 2xl:pt-4 border-t border-primary/10 flex items-center justify-between flex-wrap gap-2">
        <span className="text-[10px] sm:text-xs 2xl:text-sm text-foreground-muted uppercase tracking-wider font-semibold">
          {label}
        </span>
        <span className="px-2.5 py-1 rounded bg-danger/10 border border-danger/30 text-danger font-mono font-bold text-xs sm:text-sm">
          EXPIRED
        </span>
      </div>
    );
  }

  return (
    <div className="pt-2.5 2xl:pt-4 border-t border-primary/10 flex items-center justify-between flex-wrap gap-2">
      <span className="text-[10px] sm:text-xs 2xl:text-sm text-foreground-muted uppercase tracking-wider font-semibold">
        {label}
      </span>
      <div className="flex items-center gap-1 sm:gap-2 font-mono">
        <div className="flex items-center gap-1 bg-[#16130d] border border-warning/30 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md text-warning font-bold text-xs sm:text-sm 2xl:text-base shadow-inner">
          <span className="tabular-nums">{String(hours).padStart(2, "0")}</span>
          <span className="text-[9px] sm:text-[10px] 2xl:text-xs text-warning/70">HRS</span>
        </div>
        <span className="text-warning/50 font-bold">:</span>
        <div className="flex items-center gap-1 bg-[#16130d] border border-warning/30 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md text-warning font-bold text-xs sm:text-sm 2xl:text-base shadow-inner">
          <span className="tabular-nums">{String(minutes).padStart(2, "0")}</span>
          <span className="text-[9px] sm:text-[10px] 2xl:text-xs text-warning/70">MIN</span>
        </div>
        <span className="text-warning/50 font-bold">:</span>
        <div className="flex items-center gap-1 bg-[#16130d] border border-warning/30 px-2 py-0.5 2xl:px-3 2xl:py-1 rounded-md text-warning font-bold text-xs sm:text-sm 2xl:text-base shadow-inner">
          <span className="tabular-nums">{String(seconds).padStart(2, "0")}</span>
          <span className="text-[9px] sm:text-[10px] 2xl:text-xs text-warning/70">SEC</span>
        </div>
      </div>
    </div>
  );
}
