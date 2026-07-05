/**
 * Formats a target date into a countdown breakdown. Pure function — safe to
 * call on both server (initial render) and client (interval tick).
 */
export function getCountdown(targetDate: string | Date) {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = Math.max(target - now, 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isComplete: diff === 0 };
}

export function pad2(value: number) {
  return value.toString().padStart(2, "0");
}
