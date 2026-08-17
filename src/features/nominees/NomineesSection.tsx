"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { NomineeCard } from "@/features/nominees/NomineeCard";
import NomineesLoading from "@/app/(marketing)/nominees/loading";
import { NomineesFilterBar } from "@/features/nominees/NomineesFilterBar";
import { useNomineesFilter } from "@/hooks/useNomineesFilter";
import { useCategories } from "@/hooks/queries/useNominees";
import { NomineeCardSkeleton } from "@/app/(marketing)/nominees/loading";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";
import { NoData } from "@/components/ui/NoData";

function NomineesHero() {
  return (
    <div className="py-6 text-center bg-background">

      <h1 className="font-display font-bold text-foreground tracking-tight text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl leading-tight">
        Nominees &amp; Industry Leaders </h1>
    </div>
  );
}

function EmptyState({
  hasSearch,
  activeCategoryId,
  onClearSearch,
  onResetCategory,
}: {
  hasSearch: boolean;
  activeCategoryId: string;
  onClearSearch: () => void;
  onResetCategory: () => void;
}) {
  if (hasSearch) {
    return (
      <NoData
        icon="search"
        title="No Results Found"
        description="We couldn't find any nominees matching your search. Try different keywords or clear your search to browse all nominees."
        action={{
          label: "Clear Search",
          onClick: onClearSearch,
        }}
        secondaryAction={
          activeCategoryId !== "all"
            ? {
                label: "All Categories",
                onClick: onResetCategory,
              }
            : undefined
        }
      />
    );
  }

  return (
    <NoData
      icon="coming-soon"
      title="Coming Soon"
      description="Nominees for this category will be announced soon. Check back later to see who's competing for the award."
      action={
        activeCategoryId !== "all"
          ? {
              label: "View All Categories",
              onClick: onResetCategory,
            }
          : undefined
      }
    />
  );
}

function NomineesSectionContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get("category") || "all";

  const { data: categoriesList = [], isLoading: categoriesLoading } = useCategories();

  const {
    activeCategoryId,
    handleCategoryChange,
    sort,
    setSort,
    searchQuery,
    setSearchQuery,
    visible,
    sortedLength,
    totalCount,
    isLoading: nomineesLoading,
    isLoadingMore,
    hasMore,
    loadMore,
  } = useNomineesFilter(
    [],
    initialCategory,
    "",
    categoriesList,
    6,
  );

  const isInitialLoading = categoriesLoading && visible.length === 0;

  if (isInitialLoading) {
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
        totalCount={totalCount}
        categories={categoriesList}
      />

      <section className="bg-background py-12 sm:py-16 min-h-[400px]">
        <Container size="wide">
          {nomineesLoading ? (
            <div className="flex flex-col items-center justify-center py-20 min-h-[300px]">
              <LoadingSpinner className="w-10 h-10 text-primary" />
            </div>
          ) : sortedLength === 0 ? (
            <EmptyState
              hasSearch={searchQuery.trim().length > 0}
              activeCategoryId={activeCategoryId}
              onClearSearch={() => setSearchQuery("")}
              onResetCategory={() => handleCategoryChange("all")}
            />
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
                {isLoadingMore && (
                  <>
                    <NomineeCardSkeleton />
                    <NomineeCardSkeleton />
                    <NomineeCardSkeleton />
                  </>
                )}
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
                    disabled={isLoadingMore}
                    className={cn(
                      "w-full sm:w-auto border border-border-strong px-6 sm:px-10 2xl:px-14",
                      "min-h-12 2xl:min-h-14.5 py-3 2xl:py-5 text-sm sm:text-base 2xl:text-[20px]",
                      "cursor-pointer font-inter uppercase tracking-[1.5px] 2xl:tracking-[2px]",
                      "text-foreground hover:border-primary hover:text-primary transition-colors",
                      isLoadingMore && "opacity-60 cursor-not-allowed",
                    )}
                  >
                    {isLoadingMore ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Discovering More...
                      </span>
                    ) : (
                      "Discover More"
                    )}
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
