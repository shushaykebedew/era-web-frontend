"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NomineeCard } from "@/features/nominees/NomineeCard";
import { nominees } from "@/data/nominees";
import { cn } from "@/utils/cn";
import { SortSelect, type Sort } from "@/components/ui/SortSelect";
import { Eyebrow } from "@/components/ui/Eyebrow";

const FILTERS = ["All Projects", "Urban Estates", "Villa Retreats"] as const;
type Filter = (typeof FILTERS)[number];

const PAGE_SIZE = 6;

// ── NomineesSection ───────────────────────────────────────────────────────────
// Combines the page hero, filter bar, card grid, and pagination into one

export function NomineesSection() {
  const [filter, setFilter] = useState<Filter>("All Projects");
  const [sort, setSort] = useState<Sort>("Alphabetical");
  const [page, setPage] = useState(1);

  const filtered = nominees.filter((n) => {
    if (filter === "Urban Estates") return n.categorySlug === "urban-sanctuary";
    if (filter === "Villa Retreats")
      return n.categorySlug === "bespoke-living-award";
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
      <section className="bg-background pt-28 text-center pb-10 sm:pt-36 lg:pt-40">
        <Container size="narrow">
          <Eyebrow align="center" className="">
            Excellence in Architecture
          </Eyebrow>

          <h1 className="text-center mx-auto font-display text-[40px] sm:text-[56px] lg:text-[72px] font-bold leading-tight lg:leading-[72px] tracking-tight lg:tracking-[-1.44px] text-foreground w-full max-w-full lg:max-w-[728px]">
            Residential
            <br />
            <span className="italic text-primary">Excellence Nominees</span>
          </h1>
          <p className="text-center mx-auto mt-6 mb-12 sm:mb-20 w-full max-w-full lg:max-w-[665px] text-base sm:text-[18px] leading-7 text-foreground-muted font-inter">
            Celebrating homes that redefine modern living in Ethiopia. This
            category honors projects that balance environmental context,
            structural innovation, and cultural legacy.
          </p>
        </Container>
      </section>

      {/* ── Filter bar ── */}
      <section className="bg-background py-6 border-b border-border-strong">
        <Container size="wide">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-4 sm:gap-8">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setPage(1);
                  }}
                  className={cn(
                    "text-sm sm:text-base font-inter uppercase tracking-[1.2px] sm:tracking-[1.6px] leading-4 pb-2 cursor-pointer transition-colors",
                    f === filter
                      ? "text-foreground border-b-2 border-primary"
                      : "text-foreground-muted hover:text-foreground",
                  )}
                >
                  {f}
                  {f === "All Projects" && (
                    <span className="ml-1.5 text-[10px]">
                      {nominees.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </Container>
      </section>

      {/* ── Grid ── */}
      <section className="bg-background py-12 sm:py-16">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((nominee) => (
              <NomineeCard
                key={nominee.slug}
                nominee={nominee}
                variant="grid"
              />
            ))}
          </div>
          <div className="mt-16 flex flex-col items-center gap-6">
            <p className="text-center text-sm sm:text-base leading-6 font-inter uppercase tracking-[1.2px] sm:tracking-[1.6px] text-foreground-muted">
              Showing {visible.length} of {sorted.length} Excellence Nominees
            </p>
            {hasMore && (
              <button
                onClick={() => setPage((p) => p + 1)}
                className="w-full sm:w-auto border border-border-strong px-6 sm:px-10 min-h-[48px] sm:min-h-[58px] py-3 text-sm sm:text-base cursor-pointer font-inter uppercase tracking-[1.5px] text-foreground hover:border-primary hover:text-primary transition-colors"
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
