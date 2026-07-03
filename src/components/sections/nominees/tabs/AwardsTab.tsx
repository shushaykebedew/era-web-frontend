import { Award, ShieldCheck, Leaf } from "lucide-react";
import type { Nominee } from "@/types";
import { cn } from "@/lib/cn";

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
    <div className="flex flex-col gap-12 py-10 lg:py-16">
      {/* Finalist badge */}
      <div className="relative flex items-center justify-center border border-[#EBC16633] bg-background-elevated py-16">
        <span className="absolute left-4 top-4 h-6 w-6 border-l border-t border-[#EBC16666]" />
        <span className="absolute right-4 top-4 h-6 w-6 border-r border-t border-[#EBC16666]" />
        <span className="absolute left-4 bottom-4 h-6 w-6 border-l border-b border-[#EBC16666]" />
        <span className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-[#EBC16666]" />
        <div className="flex flex-col items-center gap-3 text-center">
          <img src="/icons/award-finalist.svg" alt="" />
          <p className="font-display text-[48px] leading-14 tracking-[-2.4px] uppercase font-semibold text-[#EBC166]">
            Finalist 2024
          </p>
          <p className="text-[12px] font-inter font-semibold uppercase tracking-[1.2px] text-[#F4EFE3] text-base">
            Ethiopia Real Estate Awards
          </p>
        </div>
      </div>

      {/* Nomination Journey */}
      <div>
        <h2 className="mb-8 font-display text-[32px] font-semibold text-[#F4EFE3] leading-10 border-b border-[#EBC16633] pb-3">
          Nomination Journey
        </h2>
        <div className="relative flex flex-col border-l border-border-strong pl-6">
          {NOMINATION_STEPS.map((step) => (
            <div key={step.id} className="relative pb-8 last:pb-0">
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
                  "font-display leading-7.5",
                  step.active
                    ? "text-[#EBC166] text-[24px] font-semibold"
                    : "text-[#F4EFE3] text-[20px] ",
                )}
              >
                {step.label}
              </p>
              <p
                className={cn(
                  "mt-0.5 text-[12px] font-inter font-semibold  leading-4 tracking-[1.2px]",
                  step.active ? "text-[#EBC166CC] uppercase" : "text-[#D1C5B2]",
                )}
              >
                {step.date}
              </p>
              <p
                className={cn(
                  "mt-2 text-base font-inter",
                  step.active
                    ? "font-semibold text-[#F4EFE3] leading-6"
                    : "text-[#D1C5B2] leading-4 ",
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
        <h2 className="mb-6 font-display font-semibold text-[#F4EFE3] text-[32px] leading-10">
          Why It Stands Out
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {STANDOUT_FEATURES.map((f) => (
            <div
              key={f.title}
              className="border border-[#EBC1661A] bg-[#110E08] p-6"
            >
              <img src={f.icon} alt="" />
              <p className="mt-3 font-display text-[20px] font-semibold text-[#F4EFE3] leading-7.5">
                {f.title}
              </p>
              <p className="mt-2 text-base leading-6 text-[#D1C5B2] font-inter ">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      {(nominee.scaleSqm || nominee.completionDate) && (
        <div className="grid grid-cols-2 gap-6 border-t border-border-strong pt-8 sm:grid-cols-4">
          {nominee.scaleSqm && (
            <div>
              <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
                Total Scale
              </p>
              <p className="mt-1.5 font-display text-[22px] font-bold text-foreground">
                {nominee.scaleSqm.toLocaleString()}
                <span className="ml-1 text-[13px] font-normal text-foreground-muted">
                  m²
                </span>
              </p>
            </div>
          )}
          {nominee.completionDate && (
            <div>
              <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
                Completion
              </p>
              <p className="mt-1.5 font-display text-[22px] font-bold text-foreground">
                {new Date(nominee.completionDate).getFullYear()}
              </p>
            </div>
          )}
          <div>
            <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
              LEED Status
            </p>
            <p className="mt-1.5 font-display text-[22px] font-bold text-primary">
              Platinum
            </p>
          </div>
          <div>
            <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
              Urban Impact
            </p>
            <p className="mt-1.5 font-display text-[22px] font-bold text-foreground">
              High
            </p>
          </div>
        </div>
      )}

      {/* Bottom image strip */}
      {nominee.gallery && nominee.gallery.length >= 2 && (
        <div className="flex gap-3" style={{ height: 200 }}>
          {nominee.gallery.slice(0, 2).map((src, i) => (
            <div key={i} className="relative flex-1 overflow-hidden">
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
