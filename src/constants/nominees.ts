import type { StatusRow } from "@/types/nominees";
import type { Nominee, AwardCategory } from "@/types";

export const GALLERY_EXPLORATION_LABELS = [
  "Exterior Views",
  "Interior Spaces",
  "Facade Details",
  "Masterplan",
] as const;

export function getStatusRows(
  nominee: Nominee,
  category?: AwardCategory | null,
): StatusRow[] {
  const recognition =
    nominee.status === "past-winner"
      ? "Past Winner"
      : nominee.status === "shortlisted"
        ? "Shortlisted"
        : "Finalist 2026";

  const categoryLabel = category?.name ?? "Residential Excellence";

  return [
    { label: "Recognition",  value: recognition,   variant: "gold" },
    { label: "Category",     value: categoryLabel, variant: "solid" },
    { label: "Jury status",  value: "Verified",    variant: "badge" },
  ];
}
