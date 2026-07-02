import type { Nominee, AwardCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

type NomineeSidebarProps = {
  nominee: Nominee;
  category?: AwardCategory;
  activeTab?: string;
};

export function NomineeSidebar({ nominee, category, activeTab = "detail" }: NomineeSidebarProps) {
  const eyebrow = category?.tagline
    ? activeTab === "detail" ? `Best ${category.tagline} Design` : `Best ${category.tagline}`
    : activeTab === "detail" ? "Best Residential Design" : "Best Residential";

  return (
    <aside className="flex flex-col gap-6 py-10 lg:py-16 lg:pr-10">
      {/* Eyebrow */}
      <p className="flex items-center gap-2 text-[10px] font-inter font-semibold uppercase tracking-[2px] text-primary">
        <span className="h-4 w-0.5 bg-primary shrink-0" aria-hidden />
        {eyebrow}
      </p>

      {/* Name */}
      <div>
        <h1 className="font-display text-[48px] font-bold leading-[1.1] text-primary">
          {nominee.name}
        </h1>
        {activeTab === "detail" ? (
          <p className="mt-4 font-display text-[24px] text-foreground">
            {nominee.firm}
          </p>
        ) : (
          <p className="mt-2 text-[12px] font-inter uppercase tracking-[1.5px] text-foreground">
            {nominee.firm}
          </p>
        )}
        
        {nominee.location && (
          <p className={
            activeTab === "detail"
              ? "mt-2 text-[10px] font-inter uppercase tracking-[1.5px] text-foreground-muted"
              : "mt-1 flex items-center gap-1.5 text-[11px] font-inter text-foreground-muted"
          }>
            {activeTab !== "detail" && <span>📍</span>}
            {nominee.location}
          </p>
        )}
      </div>

      {/* Description */}
      <p className="text-[13px] leading-6 text-foreground-muted">
        {nominee.description}
      </p>

      {/* Scale & Completion (Detail Tab) */}
      {activeTab === "detail" && (nominee.scaleSqm || nominee.completionDate) && (
        <div className="flex gap-12 mt-4 border-t border-border-strong pt-6">
          {nominee.scaleSqm && (
            <div>
              <p className="text-[9px] font-inter font-semibold uppercase tracking-[2px] text-foreground-muted">Scale</p>
              <p className="mt-1 font-inter text-[13px] font-semibold text-foreground">{nominee.scaleSqm.toLocaleString()} SQM</p>
            </div>
          )}
          {nominee.completionDate && (
            <div>
              <p className="text-[9px] font-inter font-semibold uppercase tracking-[2px] text-foreground-muted">Completion</p>
              <p className="mt-1 font-inter text-[13px] font-semibold text-foreground">
                {new Date(nominee.completionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Gallery exploration label (Gallery Tab) */}
      {activeTab === "gallery" && nominee.gallery && nominee.gallery.length > 0 && (
        <div className="mt-4">
          <p className="mb-3 text-[10px] font-inter font-semibold uppercase tracking-[2px] text-primary">
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
      <div className="mt-4 flex flex-col gap-2">
        <Button size="lg" variant="primary" className="text-[11px] uppercase tracking-[2px] font-semibold w-full bg-primary text-background hover:bg-primary/90">
          Vote For This Project
        </Button>
        {activeTab === "detail" ? (
          <p className="text-[10px] font-inter text-foreground-muted">
            voting closes in 14 days
          </p>
        ) : (
          nominee.votes && (
            <p className="text-[11px] font-inter text-center text-foreground-muted">
              {nominee.votes.toLocaleString()} votes
            </p>
          )
        )}
      </div>
    </aside>
  );
}
