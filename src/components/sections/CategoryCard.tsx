import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AwardCategory } from "@/types";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

type CategoryCardProps = {
  category: AwardCategory;
  /** "compact" mirrors the icon-led card grid; "feature" mirrors the large image-led tile. */
  variant?: "compact" | "feature";
};

export function CategoryCard({ category, variant = "compact" }: CategoryCardProps) {
  const href = `/awards/${category.slug}`;

  if (variant === "feature") {
    return (
      <Link
        href={href}
        className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden bg-muted p-8 transition-transform duration-300 hover:-translate-y-1"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="relative z-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {category.tagline}
          </p>
          <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
            {category.name}
          </h3>
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
            See Nominees
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col justify-between bg-background-elevated p-8 transition-colors duration-300 hover:bg-muted"
    >
      <div>
        <CategoryIcon icon={category.icon} className="h-8 w-8 text-primary" />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {category.tagline}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold leading-tight">{category.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{category.description}</p>
      </div>

      <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
        View Nominees
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
