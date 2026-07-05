import type { Nominee, AwardCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { BadgeCheck } from "lucide-react";
import { cn } from "@/utils/cn";

type NomineeSidebarProps = {
  nominee: Nominee;
  category?: AwardCategory;
  activeTab?: string;
};

type StatusRow = {
  label: string;
  value: string;
  variant: "gold" | "solid" | "badge";
};

const STATUS_ROWS: StatusRow[] = [
  { label: "Recognition", value: "Finalist 2024", variant: "gold" },
  { label: "Category", value: "Residential Excellence", variant: "solid" },
  { label: "Jury status", value: "Verified", variant: "badge" },
];

export function NomineeSidebar({
  nominee,
  category,
  activeTab = "detail",
}: NomineeSidebarProps) {
  const eyebrow = category?.tagline
    ? activeTab === "detail"
      ? `Best ${category.tagline} Design`
      : `Best ${category.tagline}`
    : activeTab === "detail"
      ? "Best Residential Design"
      : "Best Residential";

  return (
    <aside className="flex min-w-0 flex-col gap-6 py-8 sm:py-10 lg:py-16 lg:pr-10 lg:mt-20">
      {/* Eyebrow */}
      <p className="flex min-w-0 items-center gap-2 text-[11px] sm:text-[12px] font-inter font-semibold uppercase tracking-[2px] sm:tracking-[3px] text-primary leading-4">
        <span className="h-4 w-0.5 bg-primary shrink-0" aria-hidden />
        {eyebrow}
      </p>

      {/* Name */}
      <div>
        <h1 className="font-display text-[32px] sm:text-[40px] lg:text-[48px] font-semibold leading-tight lg:leading-15 text-foreground">
          {nominee.name}
        </h1>

        <p className="mt-2 text-[12px] font-inter uppercase tracking-[1.5px] text-[#D1C5B2]">
          {nominee.firm}
        </p>

        {nominee.location && (
          <div className="mt-1 flex min-w-0 items-center gap-1.5 text-sm sm:text-base font-inter text-[#D1C5B299] leading-6">
            <img src="/icons/location.svg" alt="" />
            {nominee.location}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-base leading-7 text-foreground-muted font-inter">
        {nominee.description}
      </p>

      {/* Scale & Completion (Detail Tab) */}
      {activeTab === "detail" && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12 lg:gap-16 xl:gap-24 mt-4 border-t border-border-strong pt-6">
          <div>
            <p className="text-[10px] font-inter uppercase tracking-[1px] leading-[15px] text-primary">
              Scale
            </p>
            <p className="mt-1 font-inter text-base leading-6 text-foreground">
              4,500 SQM
            </p>
          </div>

          <div>
            <p className="text-[10px] font-inter uppercase tracking-[1px] leading-[15px] text-primary">
              Completion
            </p>
            <p className="mt-1 font-inter text-base leading-6 text-foreground">
              March, 2024
            </p>
          </div>
        </div>
      )}

      {/* Gallery exploration label (Gallery Tab) */}
      {activeTab === "gallery" && (
        <div className="mt-4">
          <p className="mb-3 text-[12px] font-inter font-semibold uppercase tracking-[1.2px] text-primary leading-4">
            Gallery Exploration
          </p>
          <ul className="flex flex-col gap-2">
            {[
              "Exterior Views",
              "Interior Spaces",
              "Facade Details",
              "Masterplan",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[12px] text-foreground-muted font-semibold leading-4 tracking-[1.2px]"
              >
                <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Project Status Area (Awards Tab) */}
      {activeTab === "awards" && (
        <div className="mt-4 flex flex-col bg-[#1F1B15] px-5 border border-[#EBC1661A]">
          {STATUS_ROWS.map((row, i) => (
            <div
              key={row.label}
              className={cn(
                "flex flex-wrap items-center justify-between gap-3 py-4",
                i !== STATUS_ROWS.length - 1 && "border-b border-[#EBC1660D]",
              )}
            >
              <p className="font-inter text-[12px] font-semibold text-[#F4EFE3]">
                {row.label}
              </p>

              {row.variant === "badge" ? (
                <span className="flex items-center gap-1.5 font-inter text-sm font-semibold text-primary">
                  <img src="/icons/checkmark-star.svg" alt="" />
                  {row.value}
                </span>
              ) : (
                <p
                  className={cn(
                    "font-inter text-[12px] font-semibold leading-4 tracking-[1.2px]",
                    row.variant === "gold" ? "text-primary" : "text-[#F4EFE3]",
                  )}
                >
                  {row.value}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Vote CTA */}
      <div className="mt-4 flex flex-col gap-2">
        <Button
          size="lg"
          variant="primary"
          className="text-sm sm:text-base uppercase tracking-[1.2px] leading-4 font-bold w-full bg-[#C9A24B] text-[#4F3900] hover:bg-primary/90"
        >
          Vote For This Project
        </Button>
        {activeTab === "detail" && (
          <p className="text-[10px] font-inter leading-[15px] text-foreground-muted">
            Voting closes in 14 days
          </p>
        )}
      </div>
    </aside>
  );
}
