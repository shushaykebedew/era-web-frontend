import Image from "next/image";
import { Trophy, CheckCircle } from "lucide-react";
import type { Nominee } from "@/types";
import { cn } from "@/lib/cn";

// ── Static data (scoped to this module) ─────────────────────────────────────

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
    date: "May 22, 2024",
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
    icon: "A",
    title: "Structural Integrity",
    body: "Innovative use of cross-laminated timber sourced locally, combined with reinforced concrete for seismic resilience.",
  },
  {
    icon: "🌿",
    title: "Passive Cooling",
    body: "Harnessing natural airflows and deep shading to eliminate the need for mechanical cooling in Addis Ababa's climate.",
  },
];

const STATUS_ROWS = [
  { label: "Recognition", value: "Finalist 2024", gold: true },
  { label: "Category", value: "Residential Excellence", gold: false },
] as const;

// ── AwardsTab ────────────────────────────────────────────────────────────────

export function AwardsTab({ nominee }: { nominee: Nominee }) {
  return (
    <div className="flex flex-col gap-12 py-10 lg:py-16">
      {/* Finalist badge */}
      <div className="flex items-center justify-center border border-border-strong bg-background-elevated py-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <Trophy className="h-10 w-10 text-primary" strokeWidth={1.5} />
          <p className="font-display text-[32px] font-bold text-primary">Finalist 2024</p>
          <p className="text-[11px] font-inter font-semibold uppercase tracking-[2px] text-foreground-muted">
            Ethiopia Real Estate Awards
          </p>
        </div>
      </div>

      {/* Status row */}
      <div className="grid grid-cols-3 gap-4 border border-border-strong bg-background-elevated p-6">
        {STATUS_ROWS.map(({ label, value, gold }) => (
          <div key={label}>
            <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
              {label}
            </p>
            <p
              className={cn(
                "mt-1.5 text-[13px] font-semibold",
                gold ? "text-primary" : "text-foreground",
              )}
            >
              {value}
            </p>
          </div>
        ))}
        <div>
          <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
            Jury Status
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
            <CheckCircle className="h-3.5 w-3.5 text-primary" /> Verified
          </p>
        </div>
      </div>

      {/* Nomination Journey */}
      <div>
        <h2 className="mb-8 font-display text-[28px] font-bold text-foreground">
          Nomination Journey
        </h2>
        <div className="relative flex flex-col border-l border-border-strong pl-6">
          {NOMINATION_STEPS.map((step) => (
            <div key={step.id} className="relative pb-8 last:pb-0">
              <span
                className={cn(
                  "absolute -left-[25px] flex h-4 w-4 items-center justify-center rounded-full border-2",
                  step.active
                    ? "border-primary bg-primary"
                    : "border-foreground-muted bg-background",
                )}
              />
              <p
                className={cn(
                  "text-[15px] font-display font-semibold",
                  step.active ? "text-primary" : "text-foreground",
                )}
              >
                {step.label}
              </p>
              <p className="mt-0.5 text-[10px] font-inter text-foreground-muted">
                {step.date}
              </p>
              <p
                className={cn(
                  "mt-2 text-[13px] leading-6",
                  step.active
                    ? "font-semibold text-foreground"
                    : "text-foreground-muted",
                )}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why It Stands Out */}
      <div>
        <h2 className="mb-6 font-display text-[28px] font-bold text-foreground">
          Why It Stands Out
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {STANDOUT_FEATURES.map((f) => (
            <div
              key={f.title}
              className="border border-border-strong bg-background-elevated p-6"
            >
              <span className="text-xl">{f.icon}</span>
              <p className="mt-3 font-display text-[18px] font-semibold text-foreground">
                {f.title}
              </p>
              <p className="mt-2 text-[12px] leading-6 text-foreground-muted">
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
              <Image
                src={src}
                alt={`${nominee.name} image ${i + 1}`}
                fill
                className="object-cover grayscale"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
