"use client";

import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SortSelect } from "@/components/ui/SortSelect";
import { awardCategories as fallbackCategories } from "@/data/award-categories";
import { cn } from "@/utils/cn";
import { type Sort } from "@/types/ui";
import type { AwardCategory } from "@/types";

interface NomineesFilterBarProps {
  activeCategoryId: string;
  onCategoryChange: (id: string) => void;
  sort: Sort;
  onSortChange: (sort: Sort) => void;
  totalCount?: number;
  categories?: AwardCategory[];
}

export function NomineesFilterBar({
  activeCategoryId,
  onCategoryChange,
  sort,
  onSortChange,
  totalCount,
  categories,
}: NomineesFilterBarProps) {
  const resolvedCategories = categories ?? fallbackCategories;
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategoriesNext = () => {
    categoryScrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <section className="bg-background py-6 border-b border-border-strong overflow-visible">
      <Container size="wide">
        <div className="flex flex-col gap-4">
          {/* ── Category tabs + scroll button ── */}
          <div className="flex min-w-0 items-center gap-4 sm:gap-8">
            {/* "All Projects" — always visible */}
            <button
              onClick={() => onCategoryChange("all")}
              className={cn(
                "text-sm sm:text-base 2xl:text-[20px] font-inter uppercase tracking-[1.2px]",
                "sm:tracking-[1.6px] 2xl:tracking-[2px] leading-4 2xl:leading-6",
                "cursor-pointer transition-colors shrink-0",
                activeCategoryId === "all"
                  ? "text-foreground border-b-2 border-primary pb-2"
                  : "text-foreground-muted hover:text-foreground pb-2 border-b-2 border-transparent",
              )}
            >
              All Projects
              <span className="ml-1.5 2xl:ml-2.5 text-[10px] 2xl:text-[14px]">
                {totalCount ?? 0}
              </span>
            </button>

            {/* Scrollable category buttons */}
            <div
              ref={categoryScrollRef}
              className={cn(
                "flex min-w-0 items-center gap-4 sm:gap-8 whitespace-nowrap overflow-x-auto",
                "[-ms-overflow-style:none] [scrollbar-none] [&::-webkit-scrollbar]:hidden",
              )}
            >
              {resolvedCategories.map((c) => {
                const isActive = activeCategoryId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onCategoryChange(c.id)}
                    className={cn(
                      "text-sm sm:text-base 2xl:text-[20px] font-inter uppercase tracking-[1.2px]",
                      "sm:tracking-[1.6px] 2xl:tracking-[2px] leading-4 2xl:leading-6",
                      "cursor-pointer transition-colors shrink-0",
                      isActive
                        ? "text-foreground border-b-2 border-primary pb-2"
                        : "text-foreground-muted hover:text-foreground pb-2 border-b-2 border-transparent",
                    )}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>

            {/* Scroll-right button */}
            <button
              onClick={scrollCategoriesNext}
              aria-label="Show more categories"
              className={cn(
                "flex shrink-0 items-center justify-center rounded-full",
                "h-8 w-8 2xl:h-10 2xl:w-10 border border-border-strong",
                "text-foreground-muted hover:border-primary hover:text-primary",
                "cursor-pointer transition-colors",
              )}
            >
              <ChevronRight
                size={18}
                strokeWidth={1.75}
                className="2xl:size-5"
              />
            </button>
          </div>

          {/* ── Sort ── */}
          <div className="shrink-0">
            <SortSelect value={sort} onChange={onSortChange} />
          </div>
        </div>
      </Container>
    </section>
  );
}
