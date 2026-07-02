import type { Nominee } from "@/types";
import type { AwardCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

type NomineeSidebarProps = {
  nominee: Nominee;
  category?: AwardCategory;
};

export function NomineeSidebar({ nominee, category }: NomineeSidebarProps) {
  const eyebrow = category?.tagline
    ? `Best ${category.tagline} Project`
    : "Best Residential Project";

  return (
    <aside className="flex flex-col gap-6 py-10 lg:py-16 lg:pr-10">
      {/* Eyebrow */}
      <p className="flex items-center gap-2 text-[10px] font-inter font-semibold uppercase tracking-[2px] text-primary">
        <span className="h-4 w-0.5 bg-primary shrink-0" aria-hidden />
        {eyebrow}
      </p>

      {/* Name */}
      <div>
        <h1 className="font-display text-[40px] font-bold leading-[1.1] text-primary">
          {nominee.name}
        </h1>
        <p className="mt-2 text-[13px] font-inter text-foreground-muted">
          by {nominee.firm}
        </p>
        {nominee.location && (
          <p className="mt-1 flex items-center gap-1.5 text-[11px] font-inter text-foreground-muted">
            <span>📍</span>
            {nominee.location}
          </p>
        )}
      </div>

      {/* Description */}
      <p className="text-[13px] leading-6 text-foreground-muted">
        {nominee.description}
      </p>

      {/* Gallery exploration label */}
      {nominee.gallery && nominee.gallery.length > 0 && (
        <div>
          <p className="mb-3 text-[10px] font-inter font-semibold uppercase tracking-[2px] text-foreground-muted">
            Gallery Exploration
          </p>
          <ul className="flex flex-col gap-2">
            {["Exterior Views", "Interior Spaces", "Facade Details", "Masterplan"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[12px] text-foreground-muted">
                <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Vote CTA */}
      <div className="mt-2 flex flex-col gap-2">
        <Button size="sm" variant="primary" className="text-[10px] tracking-[1.5px] w-full">
          Vote For This Project
        </Button>
        {nominee.votes && (
          <p className="text-[11px] font-inter text-center text-foreground-muted">
            {nominee.votes.toLocaleString()} votes
          </p>
        )}
      </div>
    </aside>
  );
}
