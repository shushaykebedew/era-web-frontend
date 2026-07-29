import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { NomineeSidebarProps } from "@/types/nominees";
import {
  getStatusRows,
  GALLERY_EXPLORATION_LABELS,
} from "@/constants/nominees";

function formatScale(sqm?: number) {
  if (!sqm) return null;
  return `${sqm.toLocaleString()} SQM`;
}

function formatCompletion(date?: string) {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function NomineeSidebar({
  nominee,
  category,
  activeTab = "detail",
  onVoteClick,
}: NomineeSidebarProps) {
  const eyebrow = category?.tagline
    ? activeTab === "detail"
      ? `Best ${category.tagline} Design`
      : `Best ${category.tagline}`
    : activeTab === "detail"
      ? "Best Residential Design"
      : "Best Residential";

  const scale = formatScale(nominee.scaleSqm);
  const completion = formatCompletion(nominee.completionDate);
  const statusRows = getStatusRows(nominee, category);

  return (
    <aside
      className={cn(
        "flex min-w-0 flex-col gap-6 2xl:gap-10 py-8 sm:py-10",
        "lg:py-16 2xl:py-24 lg:pr-10 2xl:pr-16 lg:mt-20",
      )}
    >
      <p
        className={cn(
          "flex min-w-0 items-center gap-2 2xl:gap-3 text-primary leading-4 2xl:leading-6",
          "text-[11px] sm:text-[12px] 2xl:text-[16px] font-inter font-semibold",
          "uppercase tracking-[2px] sm:tracking-[3px] 2xl:tracking-[4px]",
        )}
      >
        <span
          className="h-4 w-0.5 2xl:h-6 2xl:w-1 bg-primary shrink-0"
          aria-hidden
        />
        {eyebrow}
      </p>

      <div>
        <h1
          className={cn(
            "font-display text-[28px] sm:text-[36px] lg:text-[44px] 2xl:text-[50px]",
            "font-semibold leading-tight lg:leading-15 2xl:leading-20 text-foreground",
          )}
        >
          {nominee.name}
        </h1>

        <p
          className={cn(
            "mt-2 2xl:mt-3 text-[12px] 2xl:text-[16px] font-inter uppercase",
            "tracking-[1.5px] 2xl:tracking-[2px] text-foreground-muted",
          )}
        >
          {nominee.firm}
        </p>

        {nominee.location && (
          <div
            className={cn(
              "mt-1 flex min-w-0 items-center gap-1.5 2xl:gap-2.5 text-sm sm:text-base",
              "2xl:text-[20px] font-inter text-foreground-muted/60 leading-6 2xl:leading-8",
            )}
          >
            <Image
              src="/icons/location.svg"
              alt=""
              width={16}
              height={16}
              className="shrink-0 2xl:w-6 2xl:h-6"
            />
            {nominee.location}
          </div>
        )}
      </div>

      <p className="text-base 2xl:text-[20px] leading-7 2xl:leading-9 text-foreground-muted font-inter">
        {nominee.description}
      </p>

      {activeTab === "detail" && (scale || completion) && (
        <div className="grid gap-6 grid-cols-2 sm:gap-12 lg:gap-16 xl:gap-24 2xl:gap-32 mt-4 border-t border-border-strong pt-6">
          {scale && (
            <div>
              <p
                className={cn(
                  "text-[10px] 2xl:text-[14px] font-inter uppercase text-primary",
                  "tracking-[1px] 2xl:tracking-[1.5px] leading-3.75 2xl:leading-5",
                )}
              >
                Scale
              </p>
              <p className="mt-1 2xl:mt-2 font-inter text-base 2xl:text-[20px] leading-6 2xl:leading-8 text-foreground">
                {scale}
              </p>
            </div>
          )}
          {completion && (
            <div>
              <p
                className={cn(
                  "text-[10px] 2xl:text-[14px] font-inter uppercase tracking-[1px]",
                  "2xl:tracking-[1.5px] leading-3.75 2xl:leading-5 text-primary",
                )}
              >
                Completion
              </p>
              <p className="mt-1 2xl:mt-2 font-inter text-base 2xl:text-[20px] leading-6 2xl:leading-8 text-foreground">
                {completion}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "gallery" && (
        <div className="mt-4">
          <p
            className={cn(
              "mb-3 2xl:mb-4 text-[12px] 2xl:text-[16px] font-inter font-semibold uppercase",
              "tracking-[1.2px] 2xl:tracking-[1.6px] text-primary leading-4 2xl:leading-6",
            )}
          >
            Gallery Exploration
          </p>
          <ul className="flex flex-col gap-2">
            {GALLERY_EXPLORATION_LABELS.map((item) => (
              <li
                key={item}
                className={cn(
                  "flex items-center gap-2 2xl:gap-3 font-inter",
                  "text-[12px] 2xl:text-[16px] text-foreground-muted font-medium",
                  "leading-4 2xl:leading-6 tracking-[1.2px] 2xl:tracking-[1.6px]",
                )}
              >
                <span className="h-2 w-2 2xl:h-3 2xl:w-3 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "awards" && (
        <div className="mt-4 2xl:mt-6 flex flex-col bg-[#1F1B15] px-5 2xl:px-8 border border-primary/10">
          {statusRows.map((row, i) => (
            <div
              key={row.label}
              className={cn(
                "flex flex-wrap items-center justify-between gap-3 2xl:gap-5 py-4 2xl:py-6",
                i !== statusRows.length - 1 && "border-b border-primary/5",
              )}
            >
              <p className="font-inter text-[12px] 2xl:text-[16px] font-semibold text-[#F4EFE3]">
                {row.label}
              </p>

              {row.variant === "badge" ? (
                <span
                  className={cn(
                    "flex items-center gap-1.5 2xl:gap-2.5 font-inter text-sm",
                    "2xl:text-[20px] font-semibold text-primary",
                  )}
                >
                  <Image
                    src="/icons/checkmark-star.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="shrink-0 2xl:w-6 2xl:h-6"
                  />
                  {row.value}
                </span>
              ) : (
                <p
                  className={cn(
                    "font-inter text-[12px] 2xl:text-[16px] font-semibold",
                    "leading-4 2xl:leading-6 tracking-[1.2px] 2xl:tracking-[1.6px]",
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

      <div className="mt-4 flex flex-col gap-2">
        <Button
          size="md"
          variant="primary"
          className={cn(
            "w-full bg-[#C9A24B] text-[#4F3900] hover:bg-primary/90 2xl:h-16",
            "text-sm sm:text-base 2xl:text-[20px] uppercase font-bold",
            "tracking-[1.2px] 2xl:tracking-[1.6px] leading-4 2xl:leading-6",
          )}
          onClick={onVoteClick}
        >
          Vote For This Project
        </Button>
        {activeTab === "detail" && (
          <p className="text-[10px] 2xl:text-[14px] font-inter leading-3.75 2xl:leading-5 text-foreground-muted">
            Voting closes in 14 days
          </p>
        )}
      </div>
    </aside>
  );
}
