import Link from "next/link";
import type { Nominee } from "@/types";
import { cn } from "@/lib/cn";

const IMAGE_LABELS = [
  "Exterior / Night View",
  "Lobby / The Atrium",
  "Sera / Material Fusion",
  "Skyline / Urban Silhouette",
  "Terrace / Private Views",
  "Masterplan / Biometric Paint",
];

function GalleryImg({
  src,
  label,
  heightClass,
  className = "",
}: {
  src: string;
  label: string;
  heightClass?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden w-full", heightClass, className)}
    >
      <img src={src} alt={label} className="h-full w-full object-cover" />
      <div className="absolute bottom-3 left-3 bg-[#16130D66] border border-[#EBC16633] py-1 px-2">
        <p className="text-[12px] font-inter font-semibold uppercase tracking-[1.2px] leading-4 text-[#EBC166]">
          {label}
        </p>
      </div>
    </div>
  );
}

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
    src:
      nominee.gallery?.[i % (nominee.gallery?.length ?? 1)] ??
      nominee.coverImage ??
      "",
    label,
  }));

  return (
    <div className="flex flex-col gap-3 py-10 lg:py-16">
      <GalleryImg
        src={images[0].src}
        label={images[0].label}
        heightClass="aspect-video sm:h-[360px]"
        className="w-full"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <GalleryImg
          src={images[1].src}
          label={images[1].label}
          heightClass="aspect-video sm:h-[240px]"
          className="flex-1"
        />
        <GalleryImg
          src={images[2].src}
          label={images[2].label}
          heightClass="aspect-video sm:h-[240px]"
          className="flex-1"
        />
      </div>

      <GalleryImg
        src={images[3].src}
        label={images[3].label}
        heightClass="aspect-video sm:h-[300px]"
        className="w-full"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <GalleryImg
          src={images[4].src}
          label={images[4].label}
          heightClass="aspect-video sm:h-[240px]"
          className="flex-1"
        />
        {/* Blueprint / technical drawing card */}
        <div
          className="relative flex-1 overflow-hidden bg-background-elevated border border-border-strong aspect-video sm:h-[240px]"
        >
          <img
            src={images[5].src}
            alt={images[5].label}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute bottom-3 left-3 bg-[#16130D66] border border-[#EBC16633] py-1 px-2">
            <p className="text-[12px] font-inter font-semibold uppercase tracking-[1.2px] leading-4 text-[#EBC166]">
              MASTERPLAN | GEOMETRIC PURITY
            </p>
          </div>
        </div>
      </div>

      {/* End of gallery navigation */}
      <div className="mt-10 flex flex-col items-center gap-4 border-t border-[#EBC1661A] pt-16">
        <p className="text-[12px] font-inter font-semibold leading-4 uppercase tracking-[1.2px] text-[#D1C5B299]">
          End of Gallery
        </p>
        <div className="flex items-center gap-6">
          {prevSlug ? (
            <Link
              href={`/nominees/${prevSlug}`}
              className="flex items-center gap-2 text-[12px] font-inter font-semibold tracking-[1.2px] text-[#EAE1D7] transition-colors hover:text-primary"
            >
              <img
                src="/icons/forward-arrow.svg"
                alt=""
                className="h-3 w-3 rotate-180"
              />
              Previous Nominee
            </Link>
          ) : (
            <span className="flex items-center gap-2 text-[12px] font-inter font-semibold tracking-[1.2px] text-[#D1C5B299]">
              <img
                src="/icons/forward-arrow.svg"
                alt=""
                className="h-3 w-3 rotate-180 opacity-40"
              />
              Previous Nominee
            </span>
          )}

          {nextSlug ? (
            <Link
              href={`/nominees/${nextSlug}`}
              className="flex items-center gap-2 text-[12px] font-inter font-semibold tracking-[1.2px] text-[#EAE1D7] transition-colors hover:text-primary"
            >
              Next Nominee
              <img src="/icons/forward-arrow.svg" alt="" className="h-3 w-3" />
            </Link>
          ) : (
            <span className="flex items-center gap-2 text-[12px] font-inter font-semibold tracking-[1.2px] text-[#D1C5B299]">
              Next Nominee
              <img
                src="/icons/forward-arrow.svg"
                alt=""
                className="h-3 w-3 opacity-40"
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
