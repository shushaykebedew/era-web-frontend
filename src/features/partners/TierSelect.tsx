"use client";

import { Dropdown } from "@/components/ui/Dropdown";
import { TIERS } from "./PartnersTierCards";
import { cn } from "@/utils/cn";
import { TierSelectProps, TierId } from "@/types/partners";

const selectOptions = TIERS.map((t) => ({ value: t.id, label: t.label }));

export function TierSelect({
  value,
  onChange,
  name = "tier",
  required,
}: TierSelectProps) {
  const selected = TIERS.find((t) => t.id === value);

  return (
    <Dropdown<TierId | "">
      value={value}
      onChange={(val) => onChange(val as TierId)}
      options={selectOptions}
      className="relative"
      renderButton={({ open, onClick, onKeyDown }) => (
        <>
          <input type="hidden" name={name} value={value} required={required} />
          <button
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls="tier-listbox"
            onClick={onClick}
            onKeyDown={onKeyDown}
            className={cn(
              "flex w-full items-center justify-between border-b border-[#4E4637] cursor-pointer",
              "bg-transparent py-3 text-left text-base 2xl:text-[20px] outline-none transition-colors",
              "focus:border-primary font-inter",
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
        </>
      )}
      renderList={({ activeIndex, setActiveIndex, onSelect, options }) => (
        <ul
          id="tier-listbox"
          role="listbox"
          tabIndex={-1}
          className={cn(
            "absolute z-20 mt-2 w-full overflow-hidden border border-[#4E4637]",
            "bg-[#17130B] shadow-[0_12px_32px_rgba(0,0,0,0.5)]",
            "animate-in fade-in slide-in-from-top-1 duration-150",
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
                  "flex cursor-pointer items-center justify-between px-4 py-2.5 text-base",
                  "uppercase tracking-[0.5px] font-inter transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-foreground-muted",
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
  );
}
