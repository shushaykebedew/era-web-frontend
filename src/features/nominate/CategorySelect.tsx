"use client";

import { Dropdown } from "@/components/ui/Dropdown";
import { FormField, inputBase, inputError } from "@/components/ui/FormField";
import { Award } from "lucide-react";
import { cn } from "@/utils/cn";
import type { AwardCategory } from "@/types";

export interface CategorySelectProps {
  value: string;
  onChange: (id: string) => void;
  categories: AwardCategory[];
  error?: string;
}

export function CategorySelect({
  value,
  onChange,
  categories,
  error,
}: CategorySelectProps) {
  const options = categories.map((c) => ({ value: c.id, label: c.name }));
  const selected = options.find((o) => o.value === value);

  return (
    <FormField id="nom-category" label="Award Category *" error={error}>
      <Dropdown<string>
        value={value}
        onChange={onChange}
        options={options}
        className="relative"
        renderButton={({ open, onClick, onKeyDown }) => (
          <>
            <input type="hidden" name="awardCategoryId" value={value} required />
            <button
              id="nom-category"
              type="button"
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-controls="category-listbox"
              onClick={onClick}
              onKeyDown={onKeyDown}
              className={cn(
                inputBase,
                "flex items-center justify-between cursor-pointer text-left",
                error ? inputError : "",
                open && "border-primary/50 ring-1 ring-primary/20 bg-[#13110c]",
                !selected && "text-foreground-muted/40",
              )}
            >
              <Award className="absolute left-3.5 2xl:left-4 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-primary/50" />
              <span className="text-base 2xl:text-[20px] truncate">
                {selected ? selected.label : "Select a category..."}
              </span>
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                className={cn(
                  "shrink-0 text-primary/60 transition-transform duration-200 2xl:w-4 2xl:h-3",
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
          </>
        )}
        renderList={({ activeIndex, setActiveIndex, onSelect, options: opts }) => (
          <ul
            id="category-listbox"
            role="listbox"
            tabIndex={-1}
            className={cn(
              "absolute z-20 top-[calc(100%+6px)] w-full border border-primary/20",
              "bg-[#0f0d0a] shadow-[0_16px_40px_rgba(0,0,0,0.7)] rounded-lg overflow-hidden",
              "max-h-64 2xl:max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30",
              "animate-in fade-in slide-in-from-top-2 duration-150",
            )}
          >
            {opts.map((option, i) => {
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
                    "flex cursor-pointer items-center justify-between px-4 2xl:px-6 py-3 2xl:py-4",
                    "text-sm 2xl:text-lg font-inter transition-colors border-b border-primary/5 last:border-0",
                    isActive && !isSelected
                      ? "bg-primary/8 text-foreground"
                      : "text-foreground-muted",
                    isSelected && "bg-primary/10 text-primary font-semibold",
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg
                      width="12"
                      height="10"
                      viewBox="0 0 12 10"
                      fill="none"
                      className="shrink-0 2xl:w-4 2xl:h-4 text-primary"
                    >
                      <path
                        d="M1 5L4.5 8.5L11 1"
                        stroke="currentColor"
                        strokeWidth="2"
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
    </FormField>
  );
}
