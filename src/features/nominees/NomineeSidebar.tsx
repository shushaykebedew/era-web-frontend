import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { NomineeSidebarProps } from "@/types/nominees";

export function NomineeSidebar({
  nominee,
  category,
  onVoteClick,
}: NomineeSidebarProps) {
  const eyebrow = category?.tagline
    ? `Best ${category.tagline} Design`
    : "Best Residential Design";

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
          {nominee.category?.name || nominee.contactPerson}
        </p>

        {nominee.email && (
          <div className="mt-3 text-sm sm:text-base 2xl:text-[20px] font-inter text-foreground-muted/60 leading-6">
            <span className="text-primary mr-1">Email:</span> {nominee.email}
          </div>
        )}

        {nominee.website && (
          <div className="mt-1 text-sm sm:text-base 2xl:text-[20px] font-inter text-foreground-muted/60 leading-6">
            <span className="text-primary mr-1">Website:</span>{" "}
            <a
              href={nominee.website}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              {nominee.website.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          </div>
        )}
      </div>

      <p className="text-base 2xl:text-[20px] leading-7 2xl:leading-9 text-foreground-muted font-inter">
        {nominee.reason}
      </p>

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
          Vote For This Nominee
        </Button>
        <p className="text-[10px] 2xl:text-[14px] font-inter leading-3.75 2xl:leading-5 text-foreground-muted">
          Voting closes in 14 days
        </p>
      </div>
    </aside>
  );
}
