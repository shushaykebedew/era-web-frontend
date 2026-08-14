import { useState, useEffect } from "react";

export interface DeadlineCountdownResult {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isExpired: boolean;
}

/**
 * Hook to calculate and live-tick a deadline countdown.
 * Defaults to a 48-hour window from creation if no expiresAt is passed.
 */
export function useDeadlineCountdown(
  expiresAt?: string | number | Date | null
): DeadlineCountdownResult {
  const [target, setTarget] = useState<number>(() => {
    if (!expiresAt) return Date.now() + 48 * 60 * 60 * 1000;
    const t = new Date(expiresAt).getTime();
    return isNaN(t) ? Date.now() + 48 * 60 * 60 * 1000 : t;
  });

  useEffect(() => {
    if (expiresAt) {
      const t = new Date(expiresAt).getTime();
      if (!isNaN(t)) setTarget(t);
    }
  }, [expiresAt]);

  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, target - Date.now()));

  useEffect(() => {
    const update = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft(diff);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const totalSeconds = Math.floor(timeLeft / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    isExpired: timeLeft <= 0,
  };
}
