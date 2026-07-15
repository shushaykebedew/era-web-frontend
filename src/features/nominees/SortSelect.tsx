"use client";

import { cn } from "@/utils/cn";
import { Sort } from "@/types/ui";
import { SORTS } from "@/constants/ui";
import { Dropdown } from "@/components/ui/Dropdown";

const selectOptions = SORTS.map((s) => ({ value: s, label: s }));

export function SortSelect({
  value,
  onChange,
}: {
  value: Sort;
  onChange: (value: Sort) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 2xl:gap-x-6 gap-y-2 2xl:gap-y-3">
      <span
        className={cn(
          "text-[12px] 2xl:text-[16px] font-inter uppercase tracking-[1.6px]",
          "2xl:tracking-[2.4px] leading-4 2xl:leading-6 text-foreground-muted",
        )}
      >
        Sort By:
      </span>

      <Dropdown<Sort>
        value={value}
        onChange={onChange}
        options={selectOptions}
        className="relative"
        renderButton={({ open, onClick, onKeyDown }) => (
          <button
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls="sort-listbox"
            onClick={onClick}
            onKeyDown={onKeyDown}
            className={cn(
              "flex items-center gap-1.5 2xl:gap-2.5 bg-transparent text-sm sm:text-base",
              "2xl:text-[20px] font-inter uppercase tracking-[1.2px] 2xl:tracking-[1.6px]",
              "text-primary outline-none cursor-pointer",
            )}
          >
            {value}
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
        renderList={({ activeIndex, setActiveIndex, onSelect, options }) => (
          <ul
            id="sort-listbox"
            role="listbox"
            tabIndex={-1}
            className={cn(
              "absolute left-0 top-full z-20 mt-2 min-w-40",
              "2xl:min-w-60 overflow-hidden border border-border-strong",
              "bg-background-elevated shadow-[0_12px_32px_rgba(0,0,0,0.5)]",
            )}
          >
            {options.map((option, i) => {
              const isSelected = option.value === value;
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
  );
}
