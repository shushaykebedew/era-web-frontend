import {
  Compass,
  Building2,
  Trees,
  Landmark,
  Sofa,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { AwardCategory } from "@/types";

const ICON_MAP: Record<AwardCategory["icon"], LucideIcon> = {
  compass: Compass,
  building: Building2,
  leaf: Trees,
  landmark: Landmark,
  interior: Sofa,
  spark: Sparkles,
};

export function CategoryIcon({
  icon,
  className,
}: {
  icon: AwardCategory["icon"];
  className?: string;
}) {
  const Icon = ICON_MAP[icon];
  return <Icon className={className} strokeWidth={1.5} />;
}
