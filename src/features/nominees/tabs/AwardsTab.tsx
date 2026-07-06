import { Award, ShieldCheck, Leaf } from "lucide-react";
import type { Nominee } from "@/types";
import { cn } from "@/utils/cn";

const NOMINATION_STEPS = [
  {
    id: "shortlisted",
    label: "Shortlisted",
    date: "March 12, 2024",
    body: "Selected from over 400 entries across East Africa for its innovative use of local materials and communal living spaces.",
    active: false,
  },
  {
    id: "jury",
    label: "Jury Reviewed",
    date: "May 05, 2024",
    body: 'Technical site visit and presentation to the Grand Jury. Commended for thermal efficiency and "cultural resonance."',
    active: false,
  },
  {
    id: "finalist",
    label: "Finalist",
    date: "Active Award",
    body: "Elevated to the final round of the 2024 Ethiopia Real Estate Awards. Now entering public voting and final deliberation.",
    active: true,
  },
] as const;

const STANDOUT_FEATURES = [
  {
    icon: "/icons/tower.svg",
    title: "Structural Integrity",
    body: "Innovative use of cross-laminated timber sourced locally, combined with reinforced concrete for seismic resilience.",
  },
  {
    icon: "/icons/leaf.svg",
    title: "Passive Cooling",
    body: "Harnessing natural airflows and deep shading to eliminate the need for mechanical cooling in Addis Ababa's climate.",
  },
];

export function AwardsTab({ nominee }: { nominee: Nominee }) {
  return (
    <div className="flex min-w-0 flex-col gap-10 sm:gap-12 py-10 lg:py-16 2xl:py-24">
      {/* Finalist badge */}
      <div className="relative flex items-center justify-center border border-primary/20 bg-background-elevated px-4 py-12 sm:py-16 2xl:py-24">
        <span className="absolute left-4 top-4 h-6 w-6 border-l border-t border-primary/40" />
        <span className="absolute right-4 top-4 h-6 w-6 border-r border-t border-primary/40" />
        <span className="absolute left-4 bottom-4 h-6 w-6 border-l border-b border-primary/40" />
        <span className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-primary/40" />
        <div className="flex flex-col items-center gap-3 text-center">
          <img src="/icons/award-finalist.svg" alt="" />
          <p
            className={cn(
              "font-display text-[32px] sm:text-[48px] 2xl:text-[64px]",
              "leading-tight lg:leading-14 2xl:leading-[80px]",
              "tracking-tight lg:tracking-[-2.4px] uppercase font-semibold text-primary",
            )}
          >
            Finalist 2024
          </p>
          <p
            className={cn(
              "text-[12px] 2xl:text-[16px] font-inter font-semibold uppercase",
              "tracking-[1.2px] 2xl:tracking-[1.6px] text-[#F4EFE3]",
            )}
          >
            Ethiopia Real Estate Awards
          </p>
        </div>
      </div>

      {/* Nomination Journey */}
      <div>
        <h2
          className={cn(
            "mb-8 2xl:mb-12 font-display text-[32px] 2xl:text-[40px] font-semibold",
            "text-[#F4EFE3] leading-10 2xl:leading-[56px]",
            "border-b border-primary/20 pb-3 2xl:pb-5",
          )}
        >
          Nomination Journey
        </h2>
        <div className="relative flex flex-col border-l border-border-strong pl-6">
          {NOMINATION_STEPS.map((step) => (
            <div key={step.id} className="relative pb-8 2xl:pb-12 last:pb-0">
              <span
                className={cn(
                  "absolute -left-6 top-1 flex h-4 w-4 items-center justify-center rounded-full",
                  step.active
                    ? "border-2 border-primary bg-background"
                    : "bg-transparent",
                )}
              >
                <span
                  className={cn(
                    "rounded-full bg-primary",
                    step.active ? "h-1.5 w-1.5" : "h-2.5 w-2.5",
                  )}
                />
              </span>
              <p
                className={cn(
                  "font-display leading-7.5 2xl:leading-[40px]",
                  step.active
                    ? "text-[#EBC166] text-[24px] 2xl:text-[32px] font-semibold"
                    : "text-[#F4EFE3] text-[20px] 2xl:text-[28px]",
                )}
              >
                {step.label}
              </p>
              <p
                className={cn(
                  "mt-0.5 2xl:mt-1 text-[12px] 2xl:text-[16px] font-inter font-semibold",
                  "leading-4 2xl:leading-6 tracking-[1.2px] 2xl:tracking-[1.6px]",
                  step.active ? "text-[#EBC166CC] uppercase" : "text-[#D1C5B2]",
                )}
              >
                {step.date}
              </p>
              <p
                className={cn(
                  "mt-2 2xl:mt-3 text-base 2xl:text-[20px] font-inter",
                  step.active
                    ? "font-semibold text-[#F4EFE3] leading-6 2xl:leading-8"
                    : "text-[#D1C5B2] leading-4 2xl:leading-6 ",
                )}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why It Stands Out */}
      <div className="mt-5">
        <h2 className="mb-6 font-display font-semibold text-[#F4EFE3] text-[32px] 2xl:text-[40px] leading-10 2xl:leading-[56px]">
          Why It Stands Out
        </h2>
        <div className="grid grid-cols-1 gap-8 2xl:gap-12 sm:grid-cols-2">
          {STANDOUT_FEATURES.map((f) => (
            <div
              key={f.title}
              className="border border-[#EBC1661A] bg-[#110E08] p-6 2xl:p-10"
            >
              <img src={f.icon} alt="" />
              <p className="mt-3 font-display text-[20px] 2xl:text-[28px] font-semibold text-[#F4EFE3] leading-7.5 2xl:leading-[40px]">
                {f.title}
              </p>
              <p className="mt-2 text-base 2xl:text-[20px] leading-6 2xl:leading-[32px] text-[#D1C5B2] font-inter ">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      {(nominee.scaleSqm || nominee.completionDate) && (
        <div
          className={cn(
            "grid grid-cols-2 gap-6 2xl:gap-10 border-y border-primary/20",
            "py-8 2xl:py-12 sm:grid-cols-2 sm:py-10 md:grid-cols-4",
          )}
        >
          {nominee.scaleSqm && (
            <div>
              <p
                className={cn(
                  "text-[12px] 2xl:text-[16px] font-inter font-semibold uppercase text-[#F4EFE3]",
                  "tracking-[-0.6px] 2xl:tracking-[-0.8px]  leading-4 2xl:leading-6",
                )}
              >
                Total Scale
              </p>
              <p
                className={cn(
                  "mt-1.5 2xl:mt-2.5 font-display text-2xl sm:text-[28px] 2xl:text-[40px]",
                  "text-[#EBC166] leading-10 2xl:leading-[48px]",
                )}
              >
                {nominee.scaleSqm.toLocaleString()}
                <span className="ml-1 2xl:ml-2 text-[12px] 2xl:text-[16px] leading-4 2xl:leading-6">
                  m²
                </span>
              </p>
            </div>
          )}
          {nominee.completionDate && (
            <div>
              <p
                className={cn(
                  "text-[12px] 2xl:text-[16px] font-inter font-semibold uppercase text-[#F4EFE3]",
                  "tracking-[-0.6px] 2xl:tracking-[-0.8px] leading-4 2xl:leading-6",
                )}
              >
                Completion
              </p>
              <p
                className={cn(
                  "mt-1.5 2xl:mt-2.5 font-display text-2xl sm:text-[28px] 2xl:text-[40px]",
                  "text-[#EBC166] leading-10 2xl:leading-[48px]",
                )}
              >
                {new Date(nominee.completionDate).getFullYear()}
              </p>
            </div>
          )}
          <div>
            <p
              className={cn(
                "text-[12px] 2xl:text-[16px] font-inter font-semibold uppercase text-[#F4EFE3]",
                "tracking-[-0.6px] 2xl:tracking-[-0.8px]  leading-4 2xl:leading-6",
              )}
            >
              LEED Status
            </p>
            <p
              className={cn(
                "mt-1.5 2xl:mt-2.5 font-display text-2xl sm:text-[28px] 2xl:text-[40px]",
                "text-[#EBC166] leading-10 2xl:leading-[48px]",
              )}
            >
              Platinum
            </p>
          </div>
          <div>
            <p
              className={cn(
                "text-[12px] 2xl:text-[16px] font-inter font-semibold uppercase text-[#F4EFE3]",
                "tracking-[-0.6px] 2xl:tracking-[-0.8px] leading-4 2xl:leading-6",
              )}
            >
              Urban Impact
            </p>
            <p
              className={cn(
                "mt-1.5 2xl:mt-2.5 font-display text-2xl sm:text-[28px] 2xl:text-[40px]",
                "text-[#EBC166] leading-10 2xl:leading-[48px]",
              )}
            >
              High
            </p>
          </div>
        </div>
      )}
      {/* Bottom image strip */}
      {nominee.gallery && nominee.gallery.length >= 2 && (
        <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4 2xl:gap-6">
          {nominee.gallery.slice(0, 2).map((src, i) => (
            <div
              key={i}
              className="relative aspect-[8/5] min-w-0 flex-1 overflow-hidden border border-[#EBC1661A]"
            >
              <img
                src={src}
                alt={`${nominee.name} image ${i + 1}`}
                className="h-full w-full object-cover grayscale"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
