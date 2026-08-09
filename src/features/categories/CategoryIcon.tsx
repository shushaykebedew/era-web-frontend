import type { AwardCategory } from "@/types";

export function CategoryIcon({
  icon,
  className,
}: {
  icon: AwardCategory["icon"];
  className?: string;
}) {
  return (
    <img
      src={`/icons/${icon}.svg`}
      alt=""
      className={className}
      aria-hidden="true"
    />
  );
}