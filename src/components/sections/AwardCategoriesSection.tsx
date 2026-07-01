import Link from "next/link";
import type { AwardCategory } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "./CategoryCard";

type AwardCategoriesSectionProps = {
  categories: AwardCategory[];
  /** Homepage shows a teaser with a "view all" link; the categories page shows everything. */
  variant?: "teaser" | "full";
};

export function AwardCategoriesSection({
  categories,
  variant = "full",
}: AwardCategoriesSectionProps) {
  const items = variant === "teaser" ? categories.slice(0, 4) : categories;

  return (
    <section className="bg-background py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={variant === "full" ? "Excellence in Architecture" : undefined}
            title="Award Categories"
            description={
              variant === "teaser"
                ? "The benchmark of excellence. Explore the categories spanning residential, commercial, and urban design."
                : "Celebrating the visionaries who redefine Ethiopia's skyline through innovation, sustainability, and cultural preservation."
            }
          />
          {variant === "teaser" && (
            <Link
              href="/awards"
              className="shrink-0 text-xs font-semibold uppercase tracking-wider text-primary hover:opacity-80"
            >
              View All Categories &rarr;
            </Link>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((category) => (
            <CategoryCard key={category.slug} category={category} variant="feature" />
          ))}
        </div>
      </Container>
    </section>
  );
}
