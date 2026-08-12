"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { NomineeCard } from "@/features/nominees/NomineeCard";
import NomineesLoading from "@/app/(marketing)/nominees/loading";
import { NomineesFilterBar } from "@/features/nominees/NomineesFilterBar";
import { useNomineesFilter } from "@/hooks/useNomineesFilter";
import { useNominees, useCategories } from "@/hooks/queries/useNominees";
import { cn } from "@/utils/cn";

function NomineesHero() {
  return (
    <div className="py-6 text-center bg-background">

      <h1 className="font-display font-bold text-foreground tracking-tight text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl leading-tight">
        Nominees &amp; Industry Leaders </h1>
    </div>
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

  const { data: nomineesList = [], isLoading: nomineesLoading } = useNominees();
  const { data: categoriesList = [], isLoading: categoriesLoading } = useCategories();

  const isLoading = nomineesLoading || categoriesLoading;

  const {
    activeCategoryId,
    handleCategoryChange,
    sort,
    setSort,
    searchQuery,
    setSearchQuery,
    visible,
    sortedLength,
    hasMore,
    loadMore,
  } = useNomineesFilter(
    nomineesList,
    initialCategory,
    "",
    categoriesList,
    6,
  );

  if (isLoading) {
    return <NomineesLoading />;
  }

  return (
    <>
      <NomineesHero />

      <NomineesFilterBar
        activeCategoryId={activeCategoryId}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={setSort}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={nomineesList.length}
        categories={categoriesList}
      />

      <section className="bg-background py-12 sm:py-16">
        <Container size="wide">
          {sortedLength === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div
                id="nominees-grid"
                className="grid grid-cols-1 gap-x-6 2xl:gap-x-12 gap-y-14 2xl:gap-y-20 sm:grid-cols-2 lg:grid-cols-3"
              >
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
