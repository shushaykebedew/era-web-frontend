"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { NomineeCard } from "@/features/nominees/NomineeCard";
import { NomineesFilterBar } from "@/features/nominees/NomineesFilterBar";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/ui/animations";
import { useNomineesFilter } from "@/hooks/useNomineesFilter";
import { fetchNominees } from "@/services/nominees";
import { fetchCategories } from "@/services/categories";
import type { Nominee, AwardCategory } from "@/types";

function NomineesHero() {
  return (
    <section className="bg-background pt-28 text-center pb-10 sm:pt-36 lg:pt-40 2xl:pt-48">
      <Container size="narrow">
        <Eyebrow align="center">Excellence in Architecture</Eyebrow>

        <FadeIn>
          <h1
            className={cn(
              "mx-auto w-full max-w-full lg:max-w-182 2xl:max-w-4xl text-center font-display",
              "text-[40px] sm:text-[56px] lg:text-[72px] 2xl:text-[96px]",
              "font-bold leading-tight lg:leading-18 2xl:leading-28",
              "tracking-tight lg:tracking-[-1.44px] 2xl:tracking-[-1.92px] text-foreground",
            )}
          >
            Residential
            <br />
            <span className="italic text-primary">Excellence Nominees</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p
            className={cn(
              "mx-auto mt-6 mb-12 sm:mb-20 w-full max-w-full lg:max-w-166.25 2xl:max-w-200",
              "text-center text-base sm:text-[18px] 2xl:text-[24px]",
              "leading-7 2xl:leading-9 text-foreground-muted font-inter",
            )}
          >
            Celebrating homes that redefine modern living in Ethiopia. This
            category honors projects that balance environmental context,
            structural innovation, and cultural legacy.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-6 sm:py-10 text-center">
      <div
        className={cn(
          "mb-6 flex h-16 w-16 2xl:h-20 2xl:w-20 items-center justify-center",
          "border border-border-strong bg-background-subtle rounded-full",
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground-muted 2xl:w-8 2xl:h-8"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      </div>
      <h2
        className={cn(
          "font-display text-xl sm:text-2xl 2xl:text-3xl font-semibold",
          "text-foreground tracking-tight mb-3",
        )}
      >
        Coming Soon
      </h2>
      <p
        className={cn(
          "max-w-sm sm:max-w-md 2xl:max-w-lg font-inter text-foreground-muted",
          "text-sm sm:text-base 2xl:text-[18px] leading-6 2xl:leading-8 ",
        )}
      >
        Nominees for this category will be announced soon. <br />
        Check back later to see who&apos;s competing for the award.
      </p>
    </div>
  );
}

function NomineesSectionContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get("category") || "all";

  const [nomineesList, setNomineesList] = useState<Nominee[]>([]);
  const [categoriesList, setCategoriesList] = useState<AwardCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [nominees, cats] = await Promise.all([
          fetchNominees(),
          fetchCategories(),
        ]);
        setNomineesList(nominees);
        setCategoriesList(cats);
      } catch (err) {
        console.error("Failed to load nominees from API:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const {
    activeCategoryId,
    handleCategoryChange,
    sort,
    setSort,
    visible,
    sortedLength,
    hasMore,
    loadMore,
  } = useNomineesFilter(nomineesList, initialCategory, 6);

  if (isLoading) {
    return (
      <>
        {/* Hero skeleton — same structure as NomineesHero */}
        <section className="bg-background pt-28 text-center pb-10 sm:pt-36 lg:pt-40 2xl:pt-48">
          <Container size="narrow">
            <Skeleton className="h-3 w-44 mx-auto" />
            <div className="flex flex-col items-center gap-3 mt-6">
              <Skeleton className="h-14 sm:h-20 lg:h-24 w-72 sm:w-105 lg:w-140" />
              <Skeleton className="h-14 sm:h-20 lg:h-24 w-56 sm:w-80 lg:w-96" />
            </div>
            <div className="flex flex-col items-center gap-2 mt-6 mb-12 sm:mb-20">
              <Skeleton className="h-5 w-full max-w-lg" />
              <Skeleton className="h-5 w-full max-w-md" />
              <Skeleton className="h-5 w-3/4 max-w-sm" />
            </div>
          </Container>
        </section>

        {/* Filter bar skeleton */}
        <div className="border-t border-b border-border-strong py-4">
          <Container size="wide">
            <div className="flex flex-wrap items-center gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-24" />
              ))}
            </div>
          </Container>
        </div>

        {/* Nominee card grid skeleton */}
        <section className="bg-background py-12 sm:py-16">
          <Container size="wide">
            <div className="grid grid-cols-1 gap-x-6 2xl:gap-x-12 gap-y-14 2xl:gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex min-w-0 flex-col">
                  <Skeleton className="w-full aspect-4/5" />
                  <div className="flex flex-col pt-4 gap-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-8 w-3/4 mt-1" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-20 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      <NomineesHero />

      <NomineesFilterBar
        activeCategoryId={activeCategoryId}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={setSort}
        totalCount={nomineesList.length}
        categories={categoriesList.length > 0 ? categoriesList : undefined}
      />

      <section className="bg-background py-12 sm:py-16">
        <Container size="wide">
          {sortedLength === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div id="nominees-grid" className="grid grid-cols-1 gap-x-6 2xl:gap-x-12 gap-y-14 2xl:gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((nominee) => (
                  <NomineeCard
                    key={nominee.id}
                    nominee={nominee}
                    variant="grid"
                  />
                ))}
              </div>
              <div className="mt-16 flex flex-col items-center gap-6">
                <p
                  className={cn(
                    "text-center text-sm sm:text-base 2xl:text-[20px] leading-6 2xl:leading-8 font-inter",
                    "uppercase tracking-[1.2px] sm:tracking-[1.6px] 2xl:tracking-[2px] text-foreground-muted",
                  )}
                >
                  Showing {visible.length} of {sortedLength} Excellence Nominees
                </p>
                {hasMore && (
                  <button
                    onClick={loadMore}
                    className={cn(
                      "w-full sm:w-auto border border-border-strong px-6 sm:px-10 2xl:px-14",
                      "min-h-12 2xl:min-h-14.5 py-3 2xl:py-5 text-sm sm:text-base 2xl:text-[20px]",
                      "cursor-pointer font-inter uppercase tracking-[1.5px] 2xl:tracking-[2px]",
                      "text-foreground hover:border-primary hover:text-primary transition-colors",
                    )}
                  >
                    Discover More
                  </button>
                )}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}

export function NomineesSection() {
  return (
    <Suspense>
      <NomineesSectionContent />
    </Suspense>
  );
}
