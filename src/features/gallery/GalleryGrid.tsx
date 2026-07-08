"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";
import { EDITIONS, FILTERS, galleryPhotos } from "@/data/gallery";
import type { Edition, GalleryFilter, GalleryPhoto } from "@/types/gallery";
import { motion } from "framer-motion";
import { ease } from "@/components/ui/animations";

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
      <p
        className={cn(
          "mb-3 2xl:mb-4 text-[12px] 2xl:text-[16px] font-inter font-semibold uppercase",
          "tracking-[1.2px] 2xl:tracking-[1.6px] leading-4 2xl:leading-6 text-primary",
        )}
      >
        Select Edition
      </p>
      <div className="flex flex-wrap items-baseline gap-4 sm:gap-5 2xl:gap-8">
        {EDITIONS.map((yr) => (
          <button
            key={yr}
            onClick={() => onChange(yr)}
            className={cn(
              "font-display font-semibold transition-colors text-2xl sm:text-3xl lg:text-[32px]",
              "2xl:text-[40px] leading-tight lg:leading-10 2xl:leading-12 cursor-pointer",
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
    <div className="flex flex-wrap gap-3 sm:gap-4 2xl:gap-6">
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={cn(
            "rounded-[1px] border px-4 py-2 2xl:px-6 2xl:py-3 cursor-pointer text-[12px]",
            "2xl:text-[16px] font-inter font-semibold tracking-[1.2px] 2xl:tracking-[1.6px]",
            "leading-4 2xl:leading-6 transition-colors",
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

function PhotoCard({
  photo,
  index = 0,
}: {
  photo: GalleryPhoto;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className="relative w-full min-w-0 overflow-hidden border border-[#4E4637]"
      style={{
        height: `clamp(180px, ${photo.height / 10}vw, ${photo.height}px)`,
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
      />
    </motion.div>
  );
}

// ── PhotoGrid ─────────────────────────────────────────────────────────────────

function PhotoGrid({ photos }: { photos: GalleryPhoto[] }) {
  if (photos.length === 0) {
    return (
      <p className="py-20 2xl:py-32 text-center text-foreground-muted 2xl:text-xl">
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
    <div className="grid grid-cols-1 gap-3 2xl:gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cols.map((col, colIdx) => (
        <div key={colIdx} className="flex min-w-0 flex-col gap-3 2xl:gap-6">
          {col.map((photo, photoIdx) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={colIdx * 2 + photoIdx}
            />
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
      <section className="bg-background pb-4 2xl:pb-6 pt-8 2xl:pt-12">
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <EditionSwitcher active={edition} onChange={setEdition} />
            <FilterPills active={filter} onChange={setFilter} />
          </div>
        </Container>
      </section>

      {/* Photo grid */}
      <section className="bg-background pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pb-25 2xl:pb-32">
        <Container size="wide">
          <PhotoGrid photos={visible} />
        </Container>
      </section>
    </>
  );
}
