"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { EDITIONS, FILTERS } from "@/types/gallery";
import type { Edition, GalleryFilter, GalleryPhoto } from "@/types/gallery";
import { galleryPhotos } from "@/data/gallery";


// ── EditionSwitcher ───────────────────────────────────────────────────────────
function EditionSwitcher({
  active,
  onChange,
}: {
  active: Edition;
  onChange: (e: Edition) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[12px] font-inter font-semibold uppercase tracking-[1.2px] leading-4 text-primary">
        Select Edition
      </p>
      <div className="flex items-baseline gap-5">
        {EDITIONS.map((yr) => (
          <button
            key={yr}
            onClick={() => onChange(yr)}
            className={cn(
              "font-display font-semibold transition-colors text-[32px] leading-10 cursor-pointer",
              yr === active
                ? "text-primary border-b border-primary"
                : "text-foreground-muted/40 hover:text-foreground-muted",
            )}
          >
            {yr}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── FilterPills ───────────────────────────────────────────────────────────────
function FilterPills({
  active,
  onChange,
}: {
  active: GalleryFilter;
  onChange: (f: GalleryFilter) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={cn(
            "rounded-[1px] border px-4 py-2 cursor-pointer text-[12px] font-inter font-semibold tracking-[1.2px] leading-4 transition-colors",
            f === active
              ? "border-primary text-primary"
              : "border-primary/20 text-foreground-muted bg-transparent hover:border-primary hover:text-primary",
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
      className="relative w-full overflow-hidden"
      style={{ height: `clamp(120px, ${photo.height / 10}vw, ${photo.height}px)` }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
      />
    </div>
  );
}

// ── PhotoGrid ─────────────────────────────────────────────────────────────────

function PhotoGrid({ photos }: { photos: GalleryPhoto[] }) {
  if (photos.length === 0) {
    return (
      <p className="py-20 text-center text-foreground-muted">
        No photos for this selection yet.
      </p>
    );
  }

  // Split into 3 columns in sequential pairs: [0,1] / [2,3] / [4,5]
  const cols: GalleryPhoto[][] = [
    photos.slice(0, 2),
    photos.slice(2, 4),
    photos.slice(4, 6),
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {cols.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-1 flex-col gap-3">
          {col.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ── GalleryGrid (main export) ─────────────────────────────────────────────────
export function GalleryGrid() {
  const [edition, setEdition] = useState<Edition>(2024);
  const [filter, setFilter] = useState<GalleryFilter>("All Moments");

  const visible = galleryPhotos.filter(
    (p) =>
      p.edition === edition && (filter === "All Moments" || p.tag === filter),
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

      {/* Photo grid */}
      <section className="bg-background pt-12 pb-25">
        <Container size="wide">
          <PhotoGrid photos={visible} />
        </Container>
      </section>
    </>
  );
}
