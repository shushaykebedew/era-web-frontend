import Link from "next/link";
import type { Nominee } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type NomineeCardProps = {
  nominee: Nominee;
  /** "featured" includes a vote count + CTA; "grid" is the denser listing-page card. */
  variant?: "featured" | "grid";
};

export function NomineeCard({ nominee, variant = "grid" }: NomineeCardProps) {
  const href = `/nominees/${nominee.slug}`;
  const badgeVariant =
    nominee.status === "past-winner" ? "past-winner" : "nominee";
  const badgeLabel =
    nominee.status === "past-winner" ? "Past Winner" : "Nominee";

  return (
    <article className="group flex flex-col bg-background-elevated">
      <Link
        href={href}
        className="relative block aspect-[4/5] overflow-hidden bg-muted"
      >
        <div className="absolute right-4 top-4 z-10">
          <Badge variant={badgeVariant}>{badgeLabel}</Badge>
        </div>
        {nominee.coverImage ? (
          <img
            src={nominee.coverImage}
            alt={nominee.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted to-background-muted transition-transform duration-500 group-hover:scale-105" />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mt-1 font-display text-[32px] leading-10 tracking-0 font-semibold">
          <Link href={href} className="hover:text-primary">
            {nominee.name}
          </Link>
        </h3>
        <p className="text-base tracking-0 leading-6 text-[#D1C5B2]">
          {nominee.firm}
        </p>

        {variant === "grid" && (
          <p className="mt-3 flex-1 text-base tracking-0 leading-6 text-[#D1C5B2]">
            {nominee.excerpt}
          </p>
        )}

        {variant === "featured" ? (
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
        ) : (
          <Link
            href={href}
            className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary hover:opacity-80"
          >
            View Profile &rarr;
          </Link>
        )}
      </div>
    </article>
  );
}
