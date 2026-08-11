"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

export const inputBase = cn(
  "w-full bg-[#0f0d0a] border border-primary/15 rounded-lg",
  "px-4 pl-11 2xl:pl-14 pr-4 py-3 2xl:py-4",
  "text-base 2xl:text-[20px] text-foreground font-inter",
  "placeholder:text-foreground-muted/40",
  "outline-none transition-all duration-200",
  "focus:border-primary/50 focus:ring-1 focus:ring-primary/20 focus:bg-[#13110c]",
  "hover:border-primary/25",
);

export const inputError = "border-danger/50 focus:border-danger/70 focus:ring-danger/20";

export interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 2xl:gap-2.5">
      <label
        htmlFor={id}
        className="text-[10px] 2xl:text-sm font-inter font-semibold uppercase tracking-[1.8px] text-foreground-muted/80"
      >
        {label}
      </label>
      <div className="relative">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-[11px] 2xl:text-sm text-danger font-inter flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export function InputIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <Icon className="absolute left-3.5 2xl:left-4 top-1/2 -translate-y-1/2 w-4 h-4 2xl:w-5 2xl:h-5 text-primary/50 pointer-events-none" />
  );
}
