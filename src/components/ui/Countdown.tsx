"use client";

import { useEffect, useState } from "react";
import { getCountdown, pad2 } from "@/lib/date";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Mins" },
  { key: "seconds", label: "Secs" },
] as const;

/**
 * Live countdown to a target date. Renders a static value on first paint
 * (matching the server) and starts ticking once mounted to avoid
 * hydration mismatches.
 */
export function Countdown({
  targetDate,
  className,
}: {
  targetDate: string;
  className?: string;
}) {
  const [countdown, setCountdown] = useState(() => getCountdown(targetDate));

  useEffect(() => {
    const interval = setInterval(
      () => setCountdown(getCountdown(targetDate)),
      1000,
    );
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={className}>
      <div className="flex justify-center gap-6 sm:justify-between mx-32">
        {UNITS.map(({ key, label }, index) => (
          <div key={key} className="flex gap-6 sm:12">
            <div className="text-center">
              <div className="font-display text-[72px] leading-20 tracking-[-1.44px] font-bold text-primary sm:text-5xl">
                {pad2(countdown[key])}
              </div>
              <div className="mt-2 text-[12px] font-semibold font-inter uppercase leading-4 tracking-[1.2px] text-foreground-muted">
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
