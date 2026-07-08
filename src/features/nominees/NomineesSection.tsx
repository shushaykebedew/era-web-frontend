"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { NomineeCard } from "@/features/nominees/NomineeCard";
import { NomineesFilterBar } from "@/features/nominees/NomineesFilterBar";
import { nominees } from "@/data/nominees";
import { cn } from "@/utils/cn";
import { type Sort } from "@/types/ui";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeIn } from "@/components/ui/animations";

const PAGE_SIZE = 6;

// ── NomineesSectionContent ───────────────────────────────────────────────────────────
function NomineesSectionContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get("category") || "all";

  const [activeCategoryId, setActiveCategoryId] =
    useState<string>(initialCategory);
  const [sort, setSort] = useState<Sort>("Alphabetical");
  const [page, setPage] = useState(1);

  const filtered = nominees.filter((n) => {
    if (activeCategoryId !== "all") {
      return n.categoryId === activeCategoryId;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Most Votes") return (b.votes ?? 0) - (a.votes ?? 0);
    return a.name.localeCompare(b.name);
  });

  const visible = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < sorted.length;

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-background pt-28 text-center pb-10 sm:pt-36 lg:pt-40 2xl:pt-48">
        <Container size="narrow">
          <Eyebrow align="center" className="">
            Excellence in Architecture
          </Eyebrow>

          <FadeIn>
            <h1
              className={cn(
                "mx-auto w-full max-w-full lg:max-w-182 2xl:max-w-4xl",
                "text-center font-display text-[40px] sm:text-[56px] lg:text-[72px] 2xl:text-[96px]",
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

      {/* ── Filter bar ── */}
      <NomineesFilterBar
        activeCategoryId={activeCategoryId}
        onCategoryChange={(id) => {
          setActiveCategoryId(id);
          setPage(1);
        }}
        sort={sort}
        onSortChange={setSort}
      />

      {/* ── Grid ── */}
      <section className="bg-background py-12 sm:py-16">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-x-6 2xl:gap-x-12 gap-y-14 2xl:gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((nominee) => (
              <NomineeCard key={nominee.id} nominee={nominee} variant="grid" />
            ))}
          </div>
          <div className="mt-16 flex flex-col items-center gap-6">
            <p
              className={cn(
                "text-center text-sm sm:text-base 2xl:text-[20px] leading-6 2xl:leading-8 font-inter",
                "uppercase tracking-[1.2px] sm:tracking-[1.6px] 2xl:tracking-[2px] text-foreground-muted",
              )}
            >
              Showing {visible.length} of {sorted.length} Excellence Nominees
            </p>
            {hasMore && (
              <button
                onClick={() => setPage((p) => p + 1)}
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
