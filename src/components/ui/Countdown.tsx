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
      <div className="flex justify-center gap-4 sm:gap-6 lg:gap-10 xl:gap-16 px-4">
        {UNITS.map(({ key, label }, index) => (
          <div key={key} className="flex items-start gap-4 sm:gap-6 lg:gap-10 xl:gap-16">
            <div className="text-center">
              <div className="font-display text-[28px] sm:text-[40px] lg:text-[56px] xl:text-[72px] leading-none tracking-tight xl:tracking-[-1.44px] font-bold text-[#EBC166]">
                {pad2(countdown[key])}
              </div>
              <div className="mt-2 text-[9px] sm:text-[10px] xl:text-[12px] font-inter font-semibold uppercase leading-6 tracking-[1.2px] text-[#D1C5B299]">
                {label}
              </div>
            </div>

            {index < UNITS.length - 1 && (
              <div className="font-display text-[28px] sm:text-[40px] lg:text-[56px] xl:text-[72px] leading-none tracking-tight xl:tracking-[-1.44px] font-bold text-[#EBC166]">
                :
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
