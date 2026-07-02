"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

// ── Types ────────────────────────────────────────────────────────────────────
export const EDITIONS = [2024, 2023, 2022] as const;
export type Edition = (typeof EDITIONS)[number];

export const FILTERS = ["All Moments", "Winners", "Ceremony", "Networking"] as const;
export type GalleryFilter = (typeof FILTERS)[number];

export type GalleryPhoto = {
  id: number;
  src: string;
  alt: string;
  edition: Edition;
  tag: Exclude<GalleryFilter, "All Moments">;
  /** tall = taller aspect ratio in the masonry grid */
  tall?: boolean;
};

// ── Static photo data ────────────────────────────────────────────────────────
const photos: GalleryPhoto[] = [
  { id: 1, src: "/imgs/categories/award-category-1.png", alt: "Stage lights at the 2024 gala ceremony",    edition: 2024, tag: "Ceremony",    tall: true  },
  { id: 2, src: "/imgs/nominees/nominee-2.png",           alt: "Guests networking at the 2024 awards",      edition: 2024, tag: "Networking"              },
  { id: 3, src: "/imgs/nominees/nominee-3.png",           alt: "Winner holding the ERA trophy",             edition: 2024, tag: "Winners",    tall: true  },
  { id: 4, src: "/imgs/categories/award-category-2.png", alt: "Award venue exterior at night",             edition: 2024, tag: "Ceremony"                },
  { id: 5, src: "/imgs/nominees/nominee-1.png",           alt: "ERA trophy on display",                     edition: 2024, tag: "Winners",    tall: true  },
  { id: 6, src: "/imgs/categories/award-category-3.png", alt: "Gala dinner table setting",                 edition: 2024, tag: "Ceremony"                },
  { id: 7, src: "/imgs/categories/award-category-4.png", alt: "2023 ceremony stage",                       edition: 2023, tag: "Ceremony",   tall: true  },
  { id: 8, src: "/imgs/nominees/nominee-1.png",           alt: "2023 winner announcement",                  edition: 2023, tag: "Winners"                 },
  { id: 9, src: "/imgs/nominees/nominee-2.png",           alt: "2023 networking evening",                   edition: 2023, tag: "Networking", tall: true  },
  { id: 10, src: "/imgs/categories/award-category-1.png", alt: "2022 inaugural ceremony",                  edition: 2022, tag: "Ceremony",   tall: true  },
  { id: 11, src: "/imgs/nominees/nominee-3.png",           alt: "2022 award winners",                       edition: 2022, tag: "Winners"                 },
];

// ── Sub-components ───────────────────────────────────────────────────────────
function EditionSwitcher({
  active,
  onChange,
}: {
  active: Edition;
  onChange: (e: Edition) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[10px] font-inter font-semibold uppercase tracking-[2px] text-foreground-muted">
        Select Edition
      </p>
      <div className="flex items-baseline gap-5">
        {EDITIONS.map((yr) => (
          <button
            key={yr}
            onClick={() => onChange(yr)}
            className={cn(
              "font-display font-bold transition-colors",
              yr === active
                ? "text-[32px] text-foreground"
                : "text-[22px] text-foreground-muted hover:text-foreground",
            )}
          >
            {yr}
          </button>
        ))}
      </div>
    </div>
  );
}

function FilterPills({
  active,
  onChange,
}: {
  active: GalleryFilter;
  onChange: (f: GalleryFilter) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={cn(
            "rounded-sm border px-4 py-1.5 text-[11px] font-inter font-semibold uppercase tracking-[1px] transition-colors",
            f === active
              ? "border-primary bg-transparent text-primary"
              : "border-border-strong bg-transparent text-foreground-muted hover:border-primary hover:text-primary",
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

function PhotoCard({ photo }: { photo: GalleryPhoto }) {
  return (
    <div
      className={cn(
        "mb-3 overflow-hidden break-inside-avoid",
        photo.tall ? "aspect-[3/4]" : "aspect-[4/3]",
      )}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
      />
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export function GalleryGrid() {
  const [edition, setEdition] = useState<Edition>(2024);
  const [filter, setFilter] = useState<GalleryFilter>("All Moments");

  const visible = photos.filter(
    (p) => p.edition === edition && (filter === "All Moments" || p.tag === filter),
  );

  return (
    <>
      {/* Filters row */}
      <section className="bg-background pb-4 pt-8">
        <Container size="wide">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <EditionSwitcher active={edition} onChange={setEdition} />
            <FilterPills active={filter} onChange={setFilter} />
          </div>
        </Container>
      </section>

      {/* Masonry grid */}
      <section className="bg-background py-10">
        <Container size="wide">
          {visible.length === 0 ? (
            <p className="py-20 text-center text-foreground-muted">
              No photos for this selection yet.
            </p>
          ) : (
            <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
              {visible.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
