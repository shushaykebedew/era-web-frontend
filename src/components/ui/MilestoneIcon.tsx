import { FileEdit, Gavel, Vote, Building, Trophy, type LucideIcon } from "lucide-react";
import type { TimelineMilestone } from "@/types";

const ICON_MAP: Record<TimelineMilestone["icon"], LucideIcon> = {
  draft: FileEdit,
  gavel: Gavel,
  vote: Vote,
  gala: Building,
  trophy: Trophy,
};

export function MilestoneIcon({ icon, className }: { icon: TimelineMilestone["icon"]; className?: string }) {
  const Icon = ICON_MAP[icon];
  return <Icon className={className} strokeWidth={1.5} />;
}
