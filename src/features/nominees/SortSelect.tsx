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
    <div className="relative w-64 flex flex-col gap-1.5 font-inter">
      <label className="text-xs uppercase tracking-wider font-semibold text-foreground-muted">
        Sort By
      </label>

      <Dropdown<Sort>
        value={value}
        onChange={onChange}
        options={selectOptions}
        className="relative w-full"
        renderButton={({ open, onClick, onKeyDown }) => (
          <button
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls="sort-listbox"
            onClick={onClick}
            onKeyDown={onKeyDown}
            className="w-full h-11 px-4 bg-background-elevated border border-primary/20 rounded text-foreground text-sm font-inter flex items-center justify-between outline-none cursor-pointer transition-all duration-200 select-none hover:border-primary/40 focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
          >
            <span className="truncate text-left text-foreground font-medium">
              {value}
            </span>
            <svg
              className="w-4 h-4 text-primary shrink-0 transition-transform duration-200 ml-2"
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
        renderList={({ activeIndex, setActiveIndex, onSelect, options }) => (
          <ul
            id="sort-listbox"
            role="listbox"
            tabIndex={-1}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-y-auto bg-[#1c1712] border border-primary/30 rounded shadow-[0_12px_32px_rgba(0,0,0,0.8)] py-1.5 flex flex-col font-inter scrollbar-thin scrollbar-thumb-primary/30 animate-in fade-in-0 zoom-in-95 duration-150"
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
                    "px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors duration-150 font-inter select-none",
                    "text-foreground-muted hover:text-foreground",
                    isActive && "bg-primary/10 text-primary",
                    isSelected && "bg-primary/15 text-primary font-semibold"
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-primary shrink-0 ml-2"
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
  );
}
