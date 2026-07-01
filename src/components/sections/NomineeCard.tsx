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
  const badgeVariant = nominee.status === "past-winner" ? "past-winner" : "nominee";
  const badgeLabel = nominee.status === "past-winner" ? "Past Winner" : "Nominee";

  return (
    <article className="group flex flex-col bg-background-elevated">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-muted">
        <div className="absolute right-4 top-4 z-10">
          <Badge variant={badgeVariant}>{badgeLabel}</Badge>
        </div>
        <div className="h-full w-full bg-gradient-to-br from-muted to-background-muted transition-transform duration-500 group-hover:scale-105" />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
          {nominee.firm}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold leading-snug">
          <Link href={href} className="hover:text-primary">
            {nominee.name}
          </Link>
        </h3>

        {variant === "grid" && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
            {nominee.excerpt}
          </p>
        )}

        {variant === "featured" ? (
          <div className="mt-5 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              {nominee.votes?.toLocaleString()} Votes
            </span>
            <Button as={Link} href={href} size="sm" variant="outline">
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
