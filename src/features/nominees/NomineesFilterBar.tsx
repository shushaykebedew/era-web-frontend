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
    <section className="bg-background py-6 border-b border-border-strong overflow-visible">
      <Container size="wide">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
          {/* ── Category */}
          <div className="flex min-w-0 items-center justify-between gap-4">
            {/* Category Select dropdown */}
            <div className="flex min-w-0 items-center gap-4">
              <span
                className={cn(
                  "text-[12px] 2xl:text-[16px] font-inter uppercase tracking-[1.2px]",
                  "sm:tracking-[1.6px] 2xl:tracking-[2px] leading-4 2xl:leading-6",
                  "text-foreground-muted shrink-0",
                )}
              >
                Filter by Category:
              </span>

              <Dropdown<string>
                value={activeCategoryId}
                onChange={onCategoryChange}
                options={categoryOptions}
                className="relative min-w-40 sm:min-w-48"
                renderButton={({ open, onClick, onKeyDown }) => (
                  <button
                    type="button"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-controls="category-listbox"
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    className={cn(
                      "flex items-center gap-1.5 2xl:gap-2.5 bg-transparent text-sm sm:text-base",
                      "2xl:text-[20px] font-inter uppercase tracking-[1.2px] 2xl:tracking-[1.6px]",
                      "text-primary outline-none cursor-pointer",
                    )}
                  >
                    {selectedCategory.label}
                    <svg
                      width="10"
                      height="7"
                      viewBox="0 0 12 8"
                      fill="none"
                      className={cn(
                        "shrink-0 transition-transform duration-200",
                        open && "rotate-180",
                      )}
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                    className={cn(
                      "absolute left-0 top-full z-20 mt-2 min-w-40 sm:min-w-48",
                      "2xl:min-w-60 overflow-hidden border border-border-strong",
                      "bg-background-elevated shadow-[0_12px_32px_rgba(0,0,0,0.5)]",
                    )}
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
                            "flex cursor-pointer items-center gap-1 justify-between px-4 py-3",
                            "2xl:px-6 2xl:py-4 text-sm 2xl:text-base uppercase tracking-[0.5px]",
                            "2xl:tracking-[0.8px] font-inter transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-foreground-muted",
                            isSelected && "text-primary",
                          )}
                        >
                          {option.label}
                          {isSelected && (
                            <svg
                              width="12"
                              height="10"
                              viewBox="0 0 12 10"
                              fill="none"
                              className="shrink-0"
                            >
                              <path
                                d="M1 5L4.5 8.5L11 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              />

              {/* Nominee count badge */}
              <span
                className={cn(
                  "text-[12px] 2xl:text-[18px] font-inter font-semibold",
                  "text-foreground-muted",
                )}
              >
                ({totalCount ?? 0})
              </span>
            </div>
          </div>

          {/* ── Target Type dropdown ── */}
          <div className="flex min-w-0 items-center gap-4">
            <span
              className={cn(
                "text-[12px] 2xl:text-[16px] font-inter uppercase tracking-[1.2px]",
                "sm:tracking-[1.6px] 2xl:tracking-[2px] leading-4 2xl:leading-6",
                "text-foreground-muted shrink-0",
              )}
            >
              Filter by Type:
            </span>

            <Dropdown<string>
              value={activeTargetType}
              onChange={onTargetTypeChange}
              options={targetTypeOptions}
              className="relative min-w-40 sm:min-w-48"
              renderButton={({ open, onClick, onKeyDown }) => (
                <button
                  type="button"
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-expanded={open}
                  aria-controls="target-type-listbox"
                  onClick={onClick}
                  onKeyDown={onKeyDown}
                  className={cn(
                    "flex items-center gap-1.5 2xl:gap-2.5 bg-transparent text-sm sm:text-base",
                    "2xl:text-[20px] font-inter uppercase tracking-[1.2px] 2xl:tracking-[1.6px]",
                    "text-primary outline-none cursor-pointer",
                  )}
                >
                  {selectedTargetType.label}
                  <svg
                    width="10"
                    height="7"
                    viewBox="0 0 12 8"
                    fill="none"
                    className={cn(
                      "shrink-0 transition-transform duration-200",
                      open && "rotate-180",
                    )}
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                  className={cn(
                    "absolute left-0 top-full z-20 mt-2 min-w-40 sm:min-w-48",
                    "2xl:min-w-60 overflow-hidden border border-border-strong",
                    "bg-background-elevated shadow-[0_12px_32px_rgba(0,0,0,0.5)]",
                  )}
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
                          "flex cursor-pointer items-center gap-1 justify-between px-4 py-3",
                          "2xl:px-6 2xl:py-4 text-sm 2xl:text-base uppercase tracking-[0.5px]",
                          "2xl:tracking-[0.8px] font-inter transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-foreground-muted",
                          isSelected && "text-primary",
                        )}
                      >
                        {option.label}
                        {isSelected && (
                          <svg
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                            className="shrink-0"
                          >
                            <path
                              d="M1 5L4.5 8.5L11 1"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
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
          <div className="shrink-0">
            <SortSelect value={sort} onChange={onSortChange} />
          </div>
        </div>
      </Container>
    </section>
  );
}
