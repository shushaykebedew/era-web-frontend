import Link from "next/link";
import Image from "next/image";
import type { Nominee } from "@/types";
import { cn } from "@/lib/cn";

// ── Static data ──────────────────────────────────────────────────────────────

const IMAGE_LABELS = [
  "Exterior / Night View",
  "Lobby / The Atrium",
  "Sera / Material Fusion",
  "Skyline / Urban Silhouette",
  "Terrace / Private Views",
  "Masterplan / Biometric Paint",
];

// ── Internal sub-component ───────────────────────────────────────────────────

type GalleryImgProps = {
  src: string;
  label: string;
  height: number;
  className?: string;
};

function GalleryImg({ src, label, height, className = "" }: GalleryImgProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ height }}>
      <Image src={src} alt={label} fill className="object-cover" />
      <div className="absolute bottom-3 left-3">
        <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground/70">
          {label}
        </p>
      </div>
    </div>
  );
}

// ── GalleryTab ───────────────────────────────────────────────────────────────

export function GalleryTab({
  nominee,
  prevSlug,
  nextSlug,
}: {
  nominee: Nominee;
  prevSlug?: string;
  nextSlug?: string;
}) {
  const images = IMAGE_LABELS.map((label, i) => ({
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
        {/* Last image — "technical drawing" treatment */}
        <div
          className="relative flex-1 overflow-hidden bg-background-elevated border border-border-strong"
          style={{ height: 240 }}
        >
          <Image
            src={images[5].src}
            alt={images[5].label}
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute bottom-3 left-3 right-3">
            <p className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted">
              {images[5].label}
            </p>
            <p className="text-[9px] font-inter text-foreground-muted mt-0.5">
              Technical Drawing
            </p>
          </div>
        </div>
      </div>

      {/* End of gallery nav */}
      <div className="mt-10 flex flex-col items-center gap-4 border-t border-border-strong pt-8">
        <p className="text-[10px] font-inter font-semibold uppercase tracking-[2px] text-foreground-muted">
          End of Gallery
        </p>
        <div className="flex items-center gap-6">
          {prevSlug ? (
            <Link
              href={`/nominees/${prevSlug}`}
              className="text-[11px] font-inter font-semibold uppercase tracking-[1.2px] text-foreground-muted hover:text-primary transition-colors"
            >
              ← Previous Nominee
            </Link>
          ) : (
            <span className="text-[11px] font-inter text-foreground-muted/40 uppercase tracking-[1.2px]">
              ← Previous Nominee
            </span>
          )}
          {nextSlug ? (
            <Link
              href={`/nominees/${nextSlug}`}
              className="text-[11px] font-inter font-semibold uppercase tracking-[1.2px] text-foreground-muted hover:text-primary transition-colors"
            >
              Next Nominee →
            </Link>
          ) : (
            <span className="text-[11px] font-inter text-foreground-muted/40 uppercase tracking-[1.2px]">
              Next Nominee →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
