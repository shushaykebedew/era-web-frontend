import Link from "next/link";
import type { AwardCategory } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "./CategoryCard";
import { cn } from "@/utils/cn";

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
      <section className="bg-[#0c0c0e] py-16 sm:py-20 lg:py-24 2xl:py-32">
        <Container size="wide">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              title="Award Categories"
              description="The benchmark of excellence. Explore the categories spanning residential, commercial, and urban design."
            />
            <Link
              href="/categories"
              className={cn(
                "flex shrink-0 items-center gap-1 2xl:gap-2 text-[12px] 2xl:text-[16px]",
                "font-inter font-semibold uppercase tracking-[1.2px] 2xl:tracking-[1.6px]",
                "text-primary leading-4 2xl:leading-6 hover:opacity-80",
              )}
            >
              View All Categories
              <img
                src="/icons/forward-arrow.svg"
                alt="arrow"
                className="w-3.75 h-3.75 2xl:w-5 2xl:h-5"
              />
            </Link>
          </div>

          {/* Asymmetric 2-row grid:
              Row 1 — card 1 (802fr) | card 2 (390fr)
              Row 2 — card 3 (390fr) | card 4 (802fr)  */}
          <div className="mt-12 2xl:mt-16 flex flex-col gap-3 2xl:gap-5">
            {/* Row 1 */}
            <div className="flex min-w-0 flex-col gap-3 2xl:gap-5 md:flex-row">
              <div className="w-full md:w-auto md:flex-[802_802_0%]">
                <CategoryCard category={card1} variant="feature" />
              </div>
              <div className="w-full md:w-auto md:flex-[390_390_0%]">
                <CategoryCard category={card2} variant="feature" />
              </div>
            </div>
            {/* Row 2 — swapped proportions */}
            <div className="flex min-w-0 flex-col gap-3 2xl:gap-5 md:flex-row">
              <div className="w-full md:w-auto md:flex-[390_390_0%]">
                <CategoryCard category={card3} variant="feature" />
              </div>
              <div className="w-full md:w-auto md:flex-[802_802_0%]">
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
    <section className="bg-background py-16 sm:py-20 lg:py-24 2xl:py-32">
      <Container size="wide">
        <div className="mt-12 2xl:mt-16 grid grid-cols-1 gap-8 2xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
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
