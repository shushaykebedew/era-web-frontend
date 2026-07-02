/**
 * NomineeDetailContent
 * All three tab panel components in one file.
 * Exported as named exports; NomineeDetailShell imports and renders them.
 */

import Link from "next/link";
import { Check, Trophy, CheckCircle } from "lucide-react";
import type { Nominee } from "@/types";
import { cn } from "@/lib/cn";

// ─────────────────────────────────────────────────────────────────────────────
// DETAIL TAB
// ─────────────────────────────────────────────────────────────────────────────
export function DetailTab({ nominee }: { nominee: Nominee }) {
  return (
    <div className="flex flex-col gap-16 py-10 lg:py-16">
      {/* Cover image + dot indicators */}
      <div className="relative overflow-hidden bg-background-elevated h-[480px] lg:h-[720px]">
        {nominee.coverImage ? (
          <img src={nominee.coverImage} alt={nominee.name} className="h-full w-full object-cover object-top" />
        ) : (
          <div className="h-full w-full bg-background-elevated" />
        )}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("block h-1.5 rounded-full", i === 0 ? "w-6 bg-primary" : "w-1.5 bg-foreground-muted/40")} />
          ))}
        </div>
      </div>

      {/* Achievements + Quote */}
      {(nominee.achievements?.length || nominee.quote) && (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          {nominee.achievements && nominee.achievements.length > 0 && (
            <div>
              <p className="mb-6 text-[10px] font-inter font-semibold uppercase tracking-[2px] text-foreground-muted">
                Key Achievements
              </p>
              <ul className="flex flex-col gap-6">
                {nominee.achievements.map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/30 mt-0.5">
                      <Check className="h-3 w-3 text-primary" strokeWidth={2.5} />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-foreground leading-5">{item.title}</p>
                      <p className="mt-1 text-[12px] text-foreground-muted leading-5">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col gap-6">
            {nominee.quote && (
              <blockquote className="font-display text-[24px] italic leading-[1.35] text-foreground">
                &ldquo;{nominee.quote}&rdquo;
              </blockquote>
            )}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-[13px] leading-7 text-foreground-muted">
              <p>
                The core philosophy of the {nominee.name} was to move away from the generic glass
                facade that dominates modern metropolitan skylines — instead the design team at{" "}
                {nominee.firm} studied carefully the climate and aerial structures of the Ethiopian
                plateau.
              </p>
              <p>
                The result is a building that breathes. A centre atrium functions as a thermal
                chimney, drawing cool air from the shaded base and routing heat through a rooftop
                garden system. Each unit is oriented to maximise morning light while minimising glare.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gallery strip */}
      {nominee.gallery && nominee.gallery.length > 0 && (
        <div className="grid grid-cols-4 gap-3 h-[400px]">
          {/* Left large image (spans 2 cols, full height) */}
          <div className="relative col-span-2 row-span-2 overflow-hidden bg-background-elevated">
            <img src={nominee.gallery[0] || nominee.coverImage} className="h-full w-full object-cover" alt="" />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="font-display text-[20px] font-semibold text-foreground">Ethiopia Basrie</p>
              <p className="text-[10px] font-inter uppercase tracking-[1.5px] text-foreground-muted mt-1">Zema Architecture Studio</p>
            </div>
          </div>
          {/* Middle column (stacked 2 images) */}
          <div className="relative col-span-1 row-span-1 overflow-hidden bg-background-elevated">
            <img src={nominee.gallery[1] || nominee.coverImage} className="h-full w-full object-cover" alt="" />
          </div>
          <div className="relative col-span-1 row-span-1 overflow-hidden bg-background-elevated col-start-3 row-start-2">
            <img src={nominee.gallery[2] || nominee.coverImage} className="h-full w-full object-cover" alt="" />
          </div>
          {/* Right vertical image (spans 1 col, full height) */}
          <div className="relative col-span-1 row-span-2 overflow-hidden bg-background-elevated col-start-4 row-start-1">
            <img src={nominee.gallery[0] || nominee.coverImage} className="h-full w-full object-cover" alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AWARDS TAB
// ─────────────────────────────────────────────────────────────────────────────
const NOMINATION_STEPS = [
  { id: "shortlisted", label: "Shortlisted", date: "March 12, 2024", body: "Selected from over 400 entries across East Africa for its innovative use of local materials and communal living spaces.", active: false },
  { id: "jury", label: "Jury Reviewed", date: "May 22, 2024", body: 'Technical site visit and presentation to the Grand Jury. Commended for thermal efficiency and "cultural resonance."', active: false },
  { id: "finalist", label: "Finalist", date: "Active Award", body: "Elevated to the final round of the 2024 Ethiopia Real Estate Awards. Now entering public voting and final deliberation.", active: true },
] as const;

const STANDOUT_FEATURES = [
  { icon: "A", title: "Structural Integrity", body: "Innovative use of cross-laminated timber sourced locally, combined with reinforced concrete for seismic resilience." },
  { icon: "🌿", title: "Passive Cooling", body: "Harnessing natural airflows and deep shading to eliminate the need for mechanical cooling in Addis Ababa's climate." },
];

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
        {[
          { label: "Recognition", value: "Finalist 2024", gold: true },
          { label: "Category", value: "Residential Excellence", gold: false },
        ].map(({ label, value, gold }) => (
          <div key={label}>
            <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">{label}</p>
            <p className={cn("mt-1.5 text-[13px] font-semibold", gold ? "text-primary" : "text-foreground")}>{value}</p>
          </div>
        ))}
        <div>
          <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">Jury Status</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-semibold text-foreground">
            <CheckCircle className="h-3.5 w-3.5 text-primary" /> Verified
          </p>
        </div>
      </div>

      {/* Nomination Journey */}
      <div>
        <h2 className="mb-8 font-display text-[28px] font-bold text-foreground">Nomination Journey</h2>
        <div className="relative flex flex-col border-l border-border-strong pl-6">
          {NOMINATION_STEPS.map((step) => (
            <div key={step.id} className="relative pb-8 last:pb-0">
              <span className={cn("absolute -left-[25px] flex h-4 w-4 items-center justify-center rounded-full border-2", step.active ? "border-primary bg-primary" : "border-foreground-muted bg-background")} />
              <p className={cn("text-[15px] font-display font-semibold", step.active ? "text-primary" : "text-foreground")}>{step.label}</p>
              <p className="mt-0.5 text-[10px] font-inter text-foreground-muted">{step.date}</p>
              <p className={cn("mt-2 text-[13px] leading-6", step.active ? "font-semibold text-foreground" : "text-foreground-muted")}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why It Stands Out */}
      <div>
        <h2 className="mb-6 font-display text-[28px] font-bold text-foreground">Why It Stands Out</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {STANDOUT_FEATURES.map((f) => (
            <div key={f.title} className="border border-border-strong bg-background-elevated p-6">
              <span className="text-xl">{f.icon}</span>
              <p className="mt-3 font-display text-[18px] font-semibold text-foreground">{f.title}</p>
              <p className="mt-2 text-[12px] leading-6 text-foreground-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      {(nominee.scaleSqm || nominee.completionDate) && (
        <div className="grid grid-cols-2 gap-6 border-t border-border-strong pt-8 sm:grid-cols-4">
          {nominee.scaleSqm && (
            <div>
              <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">Total Scale</p>
              <p className="mt-1.5 font-display text-[22px] font-bold text-foreground">
                {nominee.scaleSqm.toLocaleString()}<span className="ml-1 text-[13px] font-normal text-foreground-muted">m²</span>
              </p>
            </div>
          )}
          {nominee.completionDate && (
            <div>
              <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">Completion</p>
              <p className="mt-1.5 font-display text-[22px] font-bold text-foreground">{new Date(nominee.completionDate).getFullYear()}</p>
            </div>
          )}
          <div>
            <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">LEED Status</p>
            <p className="mt-1.5 font-display text-[22px] font-bold text-primary">Platinum</p>
          </div>
          <div>
            <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">Urban Impact</p>
            <p className="mt-1.5 font-display text-[22px] font-bold text-foreground">High</p>
          </div>
        </div>
      )}

      {/* Bottom image strip */}
      {nominee.gallery && nominee.gallery.length >= 2 && (
        <div className="flex gap-3" style={{ height: 200 }}>
          {nominee.gallery.slice(0, 2).map((src, i) => (
            <div key={i} className="relative flex-1 overflow-hidden">
              <img src={src} alt={`${nominee.name} image ${i + 1}`} className="h-full w-full object-cover grayscale" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY TAB
// ─────────────────────────────────────────────────────────────────────────────
const IMAGE_LABELS = [
  "Exterior / Night View",
  "Lobby / The Atrium",
  "Sera / Material Fusion",
  "Skyline / Urban Silhouette",
  "Terrace / Private Views",
  "Masterplan / Biometric Paint",
];

type GalleryImage = { src: string; label: string };

function GalleryImg({ src, label, height, className = "" }: { src: string; label: string; height: number; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ height }}>
      <img src={src} alt={label} className="h-full w-full object-cover" />
      <div className="absolute bottom-3 left-3">
        <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground/70">{label}</p>
      </div>
    </div>
  );
}

export function GalleryTab({ nominee, prevSlug, nextSlug }: { nominee: Nominee; prevSlug?: string; nextSlug?: string }) {
  const images: GalleryImage[] = IMAGE_LABELS.map((label, i) => ({
    src: nominee.gallery?.[i % (nominee.gallery?.length ?? 1)] ?? nominee.coverImage ?? "",
    label,
  }));

  return (
    <div className="flex flex-col gap-3 py-10 lg:py-16">
      <GalleryImg src={images[0].src} label={images[0].label} height={360} className="w-full" />
      <div className="flex gap-3">
        <GalleryImg src={images[1].src} label={images[1].label} height={240} className="flex-1" />
        <GalleryImg src={images[2].src} label={images[2].label} height={240} className="flex-1" />
      </div>
      <GalleryImg src={images[3].src} label={images[3].label} height={300} className="w-full" />
      <div className="flex gap-3">
        <GalleryImg src={images[4].src} label={images[4].label} height={240} className="flex-1" />
        <div className="relative flex-1 overflow-hidden bg-background-elevated border border-border-strong" style={{ height: 240 }}>
          <img src={images[5].src} alt={images[5].label} className="h-full w-full object-cover opacity-40" />
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">{images[5].label}</p>
            <p className="text-[9px] font-inter text-foreground-muted mt-0.5">Technical Drawing</p>
          </div>
        </div>
      </div>

      {/* End of gallery nav */}
      <div className="mt-10 flex flex-col items-center gap-4 border-t border-border-strong pt-8">
        <p className="text-[10px] font-inter font-semibold uppercase tracking-[2px] text-foreground-muted">End of Gallery</p>
        <div className="flex items-center gap-6">
          {prevSlug ? (
            <Link href={`/nominees/${prevSlug}`} className="text-[11px] font-inter font-semibold uppercase tracking-[1.2px] text-foreground-muted hover:text-primary transition-colors">
              ← Previous Nominee
            </Link>
          ) : (
            <span className="text-[11px] font-inter text-foreground-muted/40 uppercase tracking-[1.2px]">← Previous Nominee</span>
          )}
          {nextSlug ? (
            <Link href={`/nominees/${nextSlug}`} className="text-[11px] font-inter font-semibold uppercase tracking-[1.2px] text-foreground-muted hover:text-primary transition-colors">
              Next Nominee →
            </Link>
          ) : (
            <span className="text-[11px] font-inter text-foreground-muted/40 uppercase tracking-[1.2px]">Next Nominee →</span>
          )}
        </div>
      </div>
    </div>
  );
}
