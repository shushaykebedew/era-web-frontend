import Link from "next/link";
import type { Nominee } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type NomineeCardProps = {
  nominee: Nominee;
  variant?: "featured" | "grid";
};

const IMAGE_STYLE = { width: 384, height: 480 } as const;
const BORDER_STYLE = { border: "1px solid #4E4637" } as const;
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
      <article className="group flex flex-col bg-background-elevated">
        <Link
          href={href}
          className="relative block overflow-hidden bg-muted"
          style={{ width: 384, height: 480 }}
        >
          <div className="absolute left-4 top-4 z-10">
            <Badge variant={badgeVariant}>{badgeLabel}</Badge>
          </div>
          {nominee.coverImage ? (
            <img
              src={nominee.coverImage}
              alt={nominee.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-muted to-background-muted" />
          )}
        </Link>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mt-1 font-display text-[32px] leading-10 font-semibold">
            <Link href={href} className="hover:text-primary">
              {nominee.name}
            </Link>
          </h3>
          <p className="text-base leading-6 text-[#D1C5B2]">{nominee.firm}</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-[12px] font-semibold uppercase tracking-[1.2px] leading-4 text-[#EBC166]">
              {nominee.votes?.toLocaleString()} Votes
            </span>
            <Button
              as={Link}
              href={href}
              size="sm"
              variant="outline"
              className="text-[10px] leading-[15px] tracking-[1px] text-[#EAE1D7] font-normal border border-[#EBC16633]"
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
    <article className="group flex flex-col">
      <Link
        href={href}
        className="relative block overflow-hidden bg-muted"
        style={{ ...IMAGE_STYLE, ...BORDER_STYLE }}
      >
        <div className="absolute left-4 top-4 z-10">
          <Badge variant={badgeVariant}>{badgeLabel}</Badge>
        </div>
        {nominee.coverImage ? (
          <img
            src={nominee.coverImage}
            alt={nominee.name}
            className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
            // style={{ opacity: 0.6 }}
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
        <p className="text-base font-inter  uppercase leading-4  text-[#EBC166] border-l-2 border-primary pl-2">
          {nominee.firm}
        </p>
        <h3 className="mt-2 font-display text-[32px] leading-10 font-semibold text-[#EAE1D7]">
          {nominee.name}
        </h3>
        <p className="mt-2 text-base leading-6 text-[#D1C5B2] font-inter">
          {nominee.excerpt}
        </p>
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-base font-inter leading-6  uppercase tracking-[1.6px] text-[#EBC166] hover:text-primary transition-colors"
        >
          View Profile{" "}
          <img src="/icons/forward-arrow.svg" alt="" className="h-2.5 w-2.5" />
        </Link>
      </div>
    </article>
  );
}
