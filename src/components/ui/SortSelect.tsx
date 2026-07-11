"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Sort } from "@/types/ui";
import { SORTS } from "@/constants/ui";

export function SortSelect({
  value,
  onChange,
}: {
  value: Sort;
  onChange: (value: Sort) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open) {
      const idx = SORTS.findIndex((s) => s === value);
      queueMicrotask(() => setActiveIndex(idx >= 0 ? idx : 0));
    }
  }, [open, value]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, SORTS.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onChange(SORTS[activeIndex]);
        setOpen(false);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div
      ref={rootRef}
      className="flex flex-wrap items-center gap-x-4 2xl:gap-x-6 gap-y-2 2xl:gap-y-3"
    >
      <span
        className={cn(
          "text-[12px] 2xl:text-[16px] font-inter uppercase tracking-[1.6px]",
          "2xl:tracking-[2.4px] leading-4 2xl:leading-6 text-foreground-muted",
        )}
      >
        Sort By:
      </span>

      <div className="relative">
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls="sort-listbox"
          onClick={() => setOpen((o) => !o)}
          onKeyDown={handleKeyDown}
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

        {open && (
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
            {SORTS.map((s, i) => {
              const isSelected = s === value;
              const isActive = i === activeIndex;
              return (
                <li
                  key={s}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => {
                    onChange(s);
                    setOpen(false);
                  }}
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
                  {s}
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
      </div>
    </div>
  );
}
