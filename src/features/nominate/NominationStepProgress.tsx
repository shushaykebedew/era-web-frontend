"use client";

import { Check, ClipboardCheck, ArrowRight, Search } from "lucide-react";

export interface NominationStepProgressProps {
  currentStep?: 1 | 2 | 3;
}

const STEPS = [
  { step: 1, label: "Draft Created", icon: ClipboardCheck },
  { step: 2, label: "Upload Payment", icon: ArrowRight },
  { step: 3, label: "Admin Review", icon: Search },
] as const;

export function NominationStepProgress({ currentStep = 2 }: NominationStepProgressProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-md 2xl:max-w-2xl mx-auto mb-8 2xl:mb-12">
      {STEPS.map((item, i) => {
        const isCompleted = item.step < currentStep;
        const isCurrent = item.step === currentStep;
        const Icon = item.icon;

        return (
          <div key={item.label} className="flex items-center flex-1 last:flex-initial">
            {/* Step node */}
            <div className="flex flex-col items-center gap-1.5 2xl:gap-2">
              <div
                className={`
                  w-8 h-8 sm:w-9 sm:h-9 2xl:w-14 2xl:h-14 rounded-full flex items-center justify-center border-2 transition-all
                  ${
                    isCompleted
                      ? "bg-primary/20 border-primary text-primary"
                      : isCurrent
                        ? "bg-primary/10 border-primary/60 text-primary shadow-[0_0_16px_rgba(201,162,75,0.2)]"
                        : "bg-transparent border-[#3a3529]/60 text-foreground-muted/40"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 2xl:w-6 2xl:h-6" />
                ) : (
                  <Icon className="w-3.5 h-3.5 2xl:w-5 2xl:h-5" />
                )}
              </div>
              <span
                className={`text-[9px] sm:text-[10px] 2xl:text-sm font-inter font-semibold uppercase tracking-wider whitespace-nowrap
                  ${
                    isCompleted
                      ? "text-primary"
                      : isCurrent
                        ? "text-foreground"
                        : "text-foreground-muted/40"
                  }
                `}
              >
                {item.label}
              </span>
            </div>

            {/* Connector line (not after last) */}
            {i < STEPS.length - 1 && (
              <div className="flex-1 mx-2 sm:mx-3 h-px mt-[-18px] sm:mt-[-20px] 2xl:mt-[-30px]">
                <div
                  className={`h-full ${
                    item.step < currentStep
                      ? "bg-gradient-to-r from-primary/50 to-primary/20"
                      : "bg-[#3a3529]/40"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
