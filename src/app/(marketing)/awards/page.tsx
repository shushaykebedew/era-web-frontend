import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CategoryCard } from "@/components/sections/CategoryCard";
import { awardCategories } from "@/data/award-categories";

export const metadata: Metadata = {
  title: "Award Categories",
  description: "Explore every Ethiopia Real Estate Awards category.",
};

export default function AwardsPage() {
  return (
    <>
      <section className="bg-background pb-12 pt-40 text-center">
        <Container size="narrow">
          <Eyebrow align="center" className="mb-6">
            Excellence in Architecture
          </Eyebrow>
          <h1 className="font-display text-5xl font-bold sm:text-6xl">Award Categories</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-foreground-muted">
            Celebrating the visionaries who redefine Ethiopia&apos;s skyline through innovation,
            sustainability, and cultural preservation.
          </p>
        </Container>
      </section>

      <section className="bg-background pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {awardCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} variant="compact" />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/nominees"
              className="text-sm font-semibold uppercase tracking-wider text-primary hover:opacity-80"
            >
              Browse All Nominees &rarr;
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
