"use client";

import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";
import { type Sort } from "@/types/ui";
import type { AwardCategory, AwardTargetType } from "@/types";
import { AWARD_TARGET_TYPES } from "@/types";
import { Dropdown } from "@/components/ui/Dropdown";
import { SortSelect } from "./SortSelect";

interface NomineesFilterBarProps {
  activeCategoryId: string;
  onCategoryChange: (id: string) => void;
  activeTargetType: string;
  onTargetTypeChange: (code: string) => void;
  sort: Sort;
  onSortChange: (sort: Sort) => void;
  totalCount?: number;
  categories: AwardCategory[];
}

export function NomineesFilterBar({
  activeCategoryId,
  onCategoryChange,
  activeTargetType,
  onTargetTypeChange,
  sort,
  onSortChange,
  totalCount,
  categories,
}: NomineesFilterBarProps) {
  const resolvedCategories = categories;

  // Build dropdown options: "All Projects" first, then each category
  const categoryOptions = [
    { value: "all", label: "All Projects" },
    ...resolvedCategories.map((c) => ({ value: c.id, label: c.name })),
  ];

  const selectedCategory =
    categoryOptions.find((opt) => opt.value === activeCategoryId) ??
    categoryOptions[0];

  // Build target type dropdown options: "All Types" first, then each type
  const targetTypeOptions: { value: string; label: string }[] = [
    { value: "all", label: "All Types" },
    ...AWARD_TARGET_TYPES.map((t: AwardTargetType) => ({
      value: t.code,
      label: t.name,
    })),
  ];

  const selectedTargetType =
    targetTypeOptions.find((opt) => opt.value === activeTargetType) ??
    targetTypeOptions[0];

  return (
    <section className="bg-background py-6 2xl:py-10 border-b border-border-strong overflow-visible">
      <Container size="wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-10 lg:flex lg:flex-row md:gap-6 2xl:gap-10 lg:justify-between">
          {/* ── Category */}
          <div className="relative w-full md:w-72 2xl:w-[26rem] flex flex-col gap-1.5 2xl:gap-3 font-inter">
            <label className="text-xs 2xl:text-base uppercase tracking-wider font-semibold text-foreground-muted">
              Filter by Category
            </label>

            <Dropdown<string>
              value={activeCategoryId}
              onChange={onCategoryChange}
              options={categoryOptions}
              className="relative w-full"
              renderButton={({ open, onClick, onKeyDown }) => (
                <button
                  type="button"
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-expanded={open}
                  aria-controls="category-listbox"
                  onClick={onClick}
                  onKeyDown={onKeyDown}
                  className="w-full h-11 2xl:h-16 px-4 2xl:px-6 bg-background-elevated border border-primary/20 rounded text-foreground text-sm 2xl:text-lg font-inter flex items-center justify-between outline-none cursor-pointer transition-all duration-200 select-none hover:border-primary/40 focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
                >
                  <span className="truncate text-left text-foreground font-medium">
                    {selectedCategory.label}
                  </span>

                  <svg
                    className={cn(
                      "w-4 h-4 2xl:w-6 2xl:h-6 text-primary shrink-0 transition-transform duration-200 ml-2 2xl:ml-4",
                      open && "rotate-180",
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}
              renderList={({
                activeIndex,
                setActiveIndex,
                onSelect,
                options,
              }) => (
                <ul
                  id="category-listbox"
                  role="listbox"
                  tabIndex={-1}
                  className="absolute left-0 right-0 top-[calc(100%+6px)] 2xl:top-[calc(100%+10px)] z-50 max-h-60 2xl:max-h-[360px] overflow-y-auto bg-[#1c1712] border border-primary/30 rounded shadow-[0_12px_32px_rgba(0,0,0,0.8)] py-1.5 2xl:py-3 flex flex-col font-inter scrollbar-thin scrollbar-thumb-primary/30 animate-in fade-in-0 zoom-in-95 duration-150"
                >
                  {options.map((option, i) => {
                    const isSelected = option.value === activeCategoryId;
                    const isActive = i === activeIndex;
                    return (
                      <li
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => onSelect(option)}
                        className={cn(
                          "px-4 py-2.5 2xl:px-6 2xl:py-4 text-sm 2xl:text-lg flex items-center justify-between cursor-pointer transition-colors duration-150 font-inter select-none",
                          "text-foreground-muted hover:text-foreground",
                          isActive && "bg-primary/10 text-primary",
                          isSelected &&
                            "bg-primary/15 text-primary font-semibold",
                        )}
                      >
                        <span className="truncate">{option.label}</span>
                        {isSelected && (
                          <svg
                            className="w-4 h-4 2xl:w-6 2xl:h-6 text-primary shrink-0 ml-2 2xl:ml-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            />
          </div>

          {/* ── Target Type dropdown ── */}
          <div className="relative w-full md:w-72 2xl:w-[26rem] flex flex-col gap-1.5 2xl:gap-3 font-inter">
            <label className="text-xs 2xl:text-base uppercase tracking-wider font-semibold text-foreground-muted">
              Filter by Type
            </label>

            <Dropdown<string>
              value={activeTargetType}
              onChange={onTargetTypeChange}
              options={targetTypeOptions}
              className="relative w-full"
              renderButton={({ open, onClick, onKeyDown }) => (
                <button
                  type="button"
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-expanded={open}
                  aria-controls="target-type-listbox"
                  onClick={onClick}
                  onKeyDown={onKeyDown}
                  className="w-full h-11 2xl:h-16 px-4 2xl:px-6 bg-background-elevated border border-primary/20 rounded text-foreground text-sm 2xl:text-lg font-inter flex items-center justify-between outline-none cursor-pointer transition-all duration-200 select-none hover:border-primary/40 focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
                >
                  <span className="truncate text-left text-foreground font-medium">
                    {selectedTargetType.label}
                  </span>
                  <svg
                    className={cn(
                      "w-4 h-4 2xl:w-6 2xl:h-6 text-primary shrink-0 transition-transform duration-200 ml-2 2xl:ml-4",
                      open && "rotate-180",
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}
              renderList={({
                activeIndex,
                setActiveIndex,
                onSelect,
                options,
              }) => (
                <ul
                  id="target-type-listbox"
                  role="listbox"
                  tabIndex={-1}
                  className="absolute left-0 right-0 top-[calc(100%+6px)] 2xl:top-[calc(100%+10px)] z-50 max-h-60 2xl:max-h-[360px] overflow-y-auto bg-[#1c1712] border border-primary/30 rounded shadow-[0_12px_32px_rgba(0,0,0,0.8)] py-1.5 2xl:py-3 flex flex-col font-inter scrollbar-thin scrollbar-thumb-primary/30 animate-in fade-in-0 zoom-in-95 duration-150"
                >
                  {options.map((option, i) => {
                    const isSelected = option.value === activeTargetType;
                    const isActive = i === activeIndex;
                    return (
                      <li
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => onSelect(option)}
                        className={cn(
                          "px-4 py-2.5 2xl:px-6 2xl:py-4 text-sm 2xl:text-lg flex items-center justify-between cursor-pointer transition-colors duration-150 font-inter select-none",
                          "text-foreground-muted hover:text-foreground",
                          isActive && "bg-primary/10 text-primary",
                          isSelected &&
                            "bg-primary/15 text-primary font-semibold",
                        )}
                      >
                        <span className="truncate">{option.label}</span>
                        {isSelected && (
                          <svg
                            className="w-4 h-4 2xl:w-6 2xl:h-6 text-primary shrink-0 ml-2 2xl:ml-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            />
          </div>

          {/* Sort */}
          <div className="w-full md:w-72 2xl:w-[26rem] md:shrink-0 *:w-full">
            <SortSelect value={sort} onChange={onSortChange} />
          </div>
        </div>
      </Container>
    </section>
  );
}
