"use client";

import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";
import { type Sort } from "@/types/ui";
import type { AwardCategory } from "@/types";
import { SortSelect } from "./SortSelect";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

interface NomineesFilterBarProps {
  activeCategoryId: string;
  onCategoryChange: (id: string) => void;
  sort: Sort;
  onSortChange: (sort: Sort) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount?: number;
  categories: AwardCategory[];
}

export function NomineesFilterBar({
  activeCategoryId,
  onCategoryChange,
  sort,
  onSortChange,
  searchQuery,
  onSearchChange,
  categories,
}: NomineesFilterBarProps) {
  const categoryOptions = [{ id: "all", name: "All Projects" }, ...categories];

  return (
    <section className="bg-background py-8 2xl:py-12 overflow-visible font-inter">
      <Container size="wide">
        <div className="flex flex-col gap-6">
          {/* Row 1: Search & Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end justify-between">
            {/* Search Box */}
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-xs 2xl:text-base uppercase tracking-widest font-semibold text-foreground-muted">
                Search Nominees
              </label>
              <div className="relative">
                <Search className="w-4 h-4 2xl:w-5 2xl:h-5 absolute left-4 2xl:left-5 top-1/2 -translate-y-1/2 text-primary/70" />
                <input
                  type="text"
                  placeholder="Search by company name, contact, or reason..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className={cn(
                    "w-full h-11 2xl:h-16 pl-11 2xl:pl-14 pr-11 2xl:pr-14 bg-[#1a1712] border border-primary/20 rounded",
                    "text-foreground text-sm 2xl:text-lg outline-none transition-all duration-200",
                    "focus:border-primary/60 focus:ring-1 focus:ring-primary/25 placeholder:text-foreground-muted/50",
                  )}
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 2xl:w-5 2xl:h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full md:w-72 2xl:w-96 md:shrink-0">
              <SortSelect value={sort} onChange={onSortChange} />
            </div>
          </div>

          {/* Row 2: Category chips — single-row, horizontally scrollable */}
          <div className="flex flex-col gap-2">
            <label className="text-xs 2xl:text-base uppercase tracking-widest font-semibold text-foreground-muted">
              Category
            </label>

            <div className="relative">
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10" />
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 pr-6">
                {categoryOptions.map((cat) => {
                  const isActive = activeCategoryId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => onCategoryChange(cat.id)}
                      className={cn(
                        "relative shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 2xl:px-5 2xl:py-2.5 text-xs 2xl:text-base font-medium transition-colors duration-200 cursor-pointer",
                        isActive
                          ? "text-foreground border-primary"
                          : "text-foreground-muted border-primary/15 hover:border-primary/40 hover:text-foreground",
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryPill"
                          className="absolute inset-0 bg-primary rounded-full -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
