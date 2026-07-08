"use client";

import { useEffect, useRef, useState } from "react";
import { TIERS } from "./PartnersTierCards";
import { cn } from "@/utils/cn";
import { TierSelectProps } from "@/types/partners";

export function TierSelect({
  value,
  onChange,
  name = "tier",
  required,
}: TierSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = TIERS.find((t) => t.id === value);

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
      const idx = TIERS.findIndex((t) => t.id === value);
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
        setActiveIndex((i) => Math.min(i + 1, TIERS.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onChange(TIERS[activeIndex].id);
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
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />

      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="tier-listbox"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex w-full items-center justify-between border-b border-[#4E4637] cursor-pointer",
          "bg-transparent py-3 text-left text-base 2xl:text-[20px] outline-none transition-colors",
          "focus:border-primary",
          selected ? "text-foreground" : "text-[#9A8F7E]",
        )}
      >
        <span className={cn(selected && "uppercase")}>
          {selected ? selected.label : "Select Preferred Tier"}
        </span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          className={cn(
            "shrink-0 text-primary transition-transform duration-200",
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
          ref={listRef}
          id="tier-listbox"
          role="listbox"
          tabIndex={-1}
          className={cn(
            "absolute z-20 mt-2 w-full overflow-hidden border border-[#4E4637]",
            "bg-[#17130B] shadow-[0_12px_32px_rgba(0,0,0,0.5)]",
            "animate-in fade-in slide-in-from-top-1 duration-150",
          )}
        >
          {TIERS.map((t, i) => {
            const isSelected = t.id === value;
            const isActive = i === activeIndex;
            return (
              <li
                key={t.id}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  onChange(t.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex cursor-pointer items-center justify-between px-4 py-3 text-base",
                  "uppercase tracking-[0.5px] font-inter transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-[#D1C5B2]",
                  isSelected && "text-primary",
                )}
              >
                {t.label}
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
  );
}
