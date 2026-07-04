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

  if (variant === "teaser" && items.length === 4) {
    const [card1, card2, card3, card4] = items;

    return (
      <section className="bg-[#0c0c0e] py-24">
        <Container size="wide">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              title="Award Categories"
              description="The benchmark of excellence. Explore the categories spanning residential, commercial, and urban design."
            />
            <Link
              href="/categories"
              className="flex gap-1 items-center text-[12px] font-inter font-semibold uppercase tracking-[1.2px] text-primary leading-4 hover:opacity-80 shrink-0"
            >
              View All Categories
              <img
                src="/icons/forward-arrow.svg"
                alt="arrow"
                className="w-[15px] h-[15px]"
              />
            </Link>
          </div>

          {/* Asymmetric 2-row grid:
              Row 1 — card 1 (802fr) | card 2 (390fr)
              Row 2 — card 3 (390fr) | card 4 (802fr)  */}
          <div className="mt-12 flex flex-col gap-3">
            {/* Row 1 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full sm:w-auto sm:flex-[802_802_0%]">
                <CategoryCard category={card1} variant="feature" />
              </div>
              <div className="w-full sm:w-auto sm:flex-[390_390_0%]">
                <CategoryCard category={card2} variant="feature" />
              </div>
            </div>
            {/* Row 2 — swapped proportions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full sm:w-auto sm:flex-[390_390_0%]">
                <CategoryCard category={card3} variant="feature" />
              </div>
              <div className="w-full sm:w-auto sm:flex-[802_802_0%]">
                <CategoryCard category={card4} variant="feature" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Full variant — 3-column icon card grid matching the categories page design
  return (
    <section className="bg-background py-24">
      <Container>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              variant="compact"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
