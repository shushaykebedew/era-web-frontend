"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      id,
      value,
      defaultValue,
      maxLength,
      showCount = false,
      onChange,
      rows = 4,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      value !== undefined
        ? String(value)
        : defaultValue !== undefined
          ? String(defaultValue)
          : "",
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(String(value));
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let val = e.target.value;
      if (maxLength !== undefined && val.length > maxLength) {
        val = val.slice(0, maxLength);
        e.target.value = val;
      }
      setInternalValue(val);
      if (onChange) {
        onChange(e);
      }
    };

    const charCount = internalValue.length;

    return (
      <div className="w-full flex flex-col gap-1.5 font-inter">
        {label && (
          <label
            htmlFor={id}
            className="text-[10px] 2xl:text-sm font-inter font-semibold uppercase tracking-[1.8px] text-foreground-muted/80"
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          <textarea
            id={id}
            ref={ref}
            rows={rows}
            value={value}
            defaultValue={defaultValue}
            maxLength={maxLength}
            onChange={handleChange}
            className={cn(
              "w-full bg-[#0f0d0a] border border-primary/15 rounded-lg",
              "px-4 py-3 2xl:py-4 text-base 2xl:text-[20px] text-foreground font-inter",
              "placeholder:text-foreground-muted/40 resize-none leading-relaxed",
              "outline-none transition-all duration-200",
              "focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-[#13110c]",
              "hover:border-primary/25",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-danger/50 focus:border-danger/70 focus:ring-danger/20",
              className,
            )}
            {...props}
          />
        </div>
        <div className="flex items-center justify-between min-h-[18px]">
          {error ? (
            <span className="text-[11px] 2xl:text-sm text-danger font-inter">
              {error}
            </span>
          ) : (
            <span />
          )}
          {(showCount || maxLength !== undefined) && maxLength !== undefined && (
            <span
              className={cn(
                "text-xs 2xl:text-sm font-mono ml-auto transition-colors",
                charCount >= maxLength
                  ? "text-danger font-semibold"
                  : charCount >= maxLength * 0.9
                    ? "text-amber-500"
                    : "text-foreground-muted/50",
              )}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
