import Link from "next/link";
import Image from "next/image";
import type { Nominee } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

type NomineeCardProps = {
  nominee: Nominee;
  variant?: "featured" | "grid";
};

const OVERLAY_GRADIENT =
  "linear-gradient(0deg, #16130D 0%, rgba(22, 19, 13, 0) 50%, rgba(22, 19, 13, 0) 100%)";

export function NomineeCard({ nominee, variant = "grid" }: NomineeCardProps) {
  const href = `/nominees/${nominee.slug}`;
  const badgeVariant =
    nominee.status === "past-winner" ? "past-winner" : "nominee";
  const badgeLabel =
    nominee.status === "past-winner" ? "Past Winner" : "Nominee";

  if (variant === "featured") {
    return (
      <article className="group flex min-w-0 flex-col bg-background-elevated border border-primary/10">
        <Link
          href={href}
          className="relative block overflow-hidden bg-muted w-full aspect-[4/5]"
        >
          <div className="absolute left-4 top-4 2xl:left-6 2xl:top-6 z-10">
            <Badge variant={badgeVariant}>{badgeLabel}</Badge>
          </div>
          {nominee.coverImage ? (
            <Image
              src={nominee.coverImage}
              alt={nominee.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-muted to-background-muted" />
          )}
        </Link>
        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6 2xl:p-8">
          <h3
            className={cn(
              "mt-1 font-display text-2xl sm:text-3xl lg:text-[32px] 2xl:text-[40px]",
              "leading-tight lg:leading-10 2xl:leading-[48px] font-semibold",
            )}
          >
            <Link href={href} className="hover:text-primary">
              {nominee.name}
            </Link>
          </h3>
          <p className="text-base 2xl:text-[20px] leading-6 2xl:leading-8 text-foreground-muted">
            {nominee.firm}
          </p>
          <div className="mt-5 2xl:mt-8 flex flex-wrap items-center justify-between gap-3 2xl:gap-5">
            <span
              className={cn(
                "text-[12px] 2xl:text-[16px] font-semibold uppercase tracking-[1.2px]",
                "2xl:tracking-[1.6px] leading-4 2xl:leading-6 text-primary",
              )}
            >
              {nominee.votes?.toLocaleString()} Votes
            </span>
            <Button
              as={Link}
              href={href}
              size="sm"
              variant="outline"
              className={cn(
                "text-[10px] 2xl:text-[14px] leading-[15px] 2xl:leading-[20px]",
                "tracking-[1px] 2xl:tracking-[1.5px] text-foreground",
                "font-normal border border-primary/20",
              )}
            >
              Vote
            </Button>
          </div>
        </div>
      </article>
    );
  }

  // "grid" variant
  return (
    <article className="group flex min-w-0 flex-col">
      <Link
        href={href}
        className={cn(
          "group relative block overflow-hidden bg-muted border border-primary/40",
          "w-full aspect-[4/5]",
        )}
      >
        <div className="absolute left-4 top-4 2xl:left-6 2xl:top-6 z-10">
          <Badge variant={badgeVariant}>{badgeLabel}</Badge>
        </div>
        {nominee.coverImage ? (
          <Image
            src={nominee.coverImage}
            alt={nominee.name}
            fill
            className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted to-background-muted" />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: OVERLAY_GRADIENT }}
          aria-hidden
        />
      </Link>

      {/* Text */}
      <div className="flex flex-1 flex-col pt-4">
        <p
          className={cn(
            "flex min-w-0 items-center gap-2 2xl:gap-3 text-[10px] 2xl:text-[14px] font-inter",
            "uppercase tracking-[1.5px] 2xl:tracking-[2px] text-primary",
          )}
        >
          <span
            className="h-4 w-0.5 2xl:h-6 2xl:w-1 bg-primary shrink-0"
            aria-hidden
          />
          {nominee.firm}
        </p>
        <h3
          className={cn(
            "mt-2 2xl:mt-3 font-display text-2xl sm:text-3xl lg:text-[32px]",
            "2xl:text-[40px] leading-[1.2] font-semibold text-foreground",
          )}
        >
          {nominee.name}
        </h3>
        <p className="mt-2 2xl:mt-3 text-base 2xl:text-[20px] leading-6 2xl:leading-8 text-foreground-muted font-inter">
          {nominee.excerpt}
        </p>
        <Link
          href={href}
          className={cn(
            "mt-4 2xl:mt-6 inline-flex items-center gap-1 2xl:gap-2",
            "text-base 2xl:text-[20px] font-inter leading-6 2xl:leading-8",
            "uppercase tracking-[1.6px] 2xl:tracking-[2px]",
            "text-primary hover:text-primary/80 transition-colors",
          )}
        >
          View Profile{" "}
          <img
            src="/icons/forward-arrow.svg"
            alt=""
            className="h-2.5 w-2.5 2xl:h-4 2xl:w-4"
          />
        </Link>
      </div>
    </article>
  );
}
