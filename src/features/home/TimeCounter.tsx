"use client";

import { useEffect, useState } from "react";
import { getCountdown, pad2 } from "@/utils/date";
import { cn } from "@/utils/cn";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/data/site";
import { FadeIn } from "@/components/ui/animations";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Mins" },
  { key: "seconds", label: "Secs" },
] as const;

// Static fallback shown on server render AND on the client's first paint,
// so the two always match. Real value is swapped in after mount.
const ZERO_COUNTDOWN = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function Countdown({
  targetDate,
  className,
}: {
  targetDate: string;
  className?: string;
}) {
  const [countdown, setCountdown] = useState(ZERO_COUNTDOWN);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCountdown(getCountdown(targetDate)); // compute real value once mounted

    const interval = setInterval(
      () => setCountdown(getCountdown(targetDate)),
      1000,
    );
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={className}>
      <div
        className={cn(
          "flex justify-center gap-1.5 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-16",
          "2xl:gap-24 px-2 sm:px-4 2xl:px-8 flex-wrap",
        )}
      >
        {UNITS.map(({ key, label }, index) => (
          <div
            key={key}
            className="flex items-start gap-1.5 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-16 2xl:gap-24"
          >
            <div className="text-center">
              <div
                className={cn(
                  "font-display text-2xl sm:text-[40px] lg:text-[56px] xl:text-[72px] 2xl:text-[96px]",
                  "leading-none tracking-tight xl:tracking-[-1.44px] 2xl:tracking-[-1.92px] font-bold text-primary",
                )}
              >
                {mounted ? pad2(countdown[key]) : "00"}
              </div>
              <div
                className={cn(
                  "mt-2 text-[9px] sm:text-[10px] xl:text-[12px] 2xl:text-[16px] font-inter",
                  "font-semibold uppercase leading-6 2xl:leading-8 tracking-[1.2px]",
                  "2xl:tracking-[1.6px] text-foreground-muted/60",
                )}
              >
                {label}
              </div>
            </div>

            {index < UNITS.length - 1 && (
              <div
                className={cn(
                  "font-display text-2xl sm:text-[40px] lg:text-[56px] xl:text-[72px] 2xl:text-[96px]",
                  "leading-none tracking-tight xl:tracking-[-1.44px] 2xl:tracking-[-1.92px] font-bold text-primary",
                )}
              >
                :
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TimeCounter() {
  return (
    <div
      className={cn(
        "relative z-10 min-h-45 sm:min-h-55 xl:min-h-66.5 2xl:min-h-85",
        "border-y border-primary/10 bg-[#110E08] flex items-center py-10 sm:py-12 xl:py-0",
      )}
    >
      <Container className="text-center">
        <FadeIn>
          <h3
            className={cn(
              "mb-8 2xl:mb-12 font-inter font-semibold",
              "text-[12px] xl:text-base 2xl:text-[24px] leading-4 2xl:leading-6",
              "tracking-[1.2px] 2xl:tracking-[1.6px] uppercase mx-auto text-primary",
            )}
          >
            ERA CEREMONY BEGINS IN
          </h3>
          <Countdown targetDate={siteConfig.ceremonyDate} />
        </FadeIn>
      </Container>
    </div>
  );
}
