import Image from "next/image";
import Link from "next/link";
import type { Nominee } from "@/types";
import { cn } from "@/utils/cn";

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
      className={cn(
        "relative min-w-0 overflow-hidden w-full",
        heightClass,
        className,
      )}
    >
      <Image
        src={src}
        alt={label}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
      <div
        className={cn(
          "absolute bottom-3 left-3 right-3 w-fit max-w-[calc(100%-1.5rem)]",
          "bg-background/40 border border-primary/20 py-1 px-2",
        )}
      >
        <p
          className={cn(
            "text-[10px] sm:text-[12px] 2xl:text-[16px] font-inter font-semibold",
            "uppercase tracking-[1px] sm:tracking-[1.2px] 2xl:tracking-[1.6px]",
            "leading-4 2xl:leading-6 text-primary",
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

export function GalleryTab({
  nominee,
  prevId,
  nextId,
}: {
  nominee: Nominee;
  prevId?: string;
  nextId?: string;
}) {
  const images = IMAGE_LABELS.map((label, i) => ({
    src:
      nominee.gallery?.[i % (nominee.gallery?.length ?? 1)] ??
      nominee.coverImage ??
      "",
    label,
  }));

  return (
    <div className="flex flex-col gap-3 2xl:gap-6 py-10 lg:py-16 2xl:py-24">
      <GalleryImg
        src={images[0].src}
        label={images[0].label}
        heightClass="aspect-video w-full"
        className="w-full"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <GalleryImg
          src={images[1].src}
          label={images[1].label}
          heightClass="aspect-video w-full"
          className="flex-1 min-w-0"
        />
        <GalleryImg
          src={images[2].src}
          label={images[2].label}
          heightClass="aspect-video w-full"
          className="flex-1 min-w-0"
        />
      </div>

      <GalleryImg
        src={images[3].src}
        label={images[3].label}
        heightClass="aspect-video w-full"
        className="w-full"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <GalleryImg
          src={images[4].src}
          label={images[4].label}
          heightClass="aspect-video w-full"
          className="flex-1 min-w-0"
        />
        {/* Blueprint / technical drawing card */}
        <div
          className={cn(
            "relative flex-1 min-w-0 overflow-hidden bg-background-elevated",
            "border border-border-strong aspect-video w-full",
          )}
        >
          <Image
            src={images[5].src}
            alt={images[5].label}
            fill
            className="object-cover opacity-40"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <div
            className={cn(
              "absolute bottom-3 left-3 right-3 w-fit max-w-[calc(100%-1.5rem)]",
              "bg-background/40 border border-primary/20 py-1 px-2",
            )}
          >
            <p
              className={cn(
                "text-[10px] sm:text-[12px] 2xl:text-[16px] font-inter font-semibold uppercase",
                "tracking-[1px] sm:tracking-[1.2px] 2xl:tracking-[1.6px] leading-4 2xl:leading-6 text-primary",
              )}
            >
              MASTERPLAN | GEOMETRIC PURITY
            </p>
          </div>
        </div>
      </div>

      {/* End of gallery navigation */}
      <div
        className={cn(
          "mt-10 2xl:mt-16 flex flex-col items-center gap-4 2xl:gap-6",
          "border-t border-primary/10 pt-16 2xl:pt-24",
        )}
      >
        <p
          className={cn(
            "text-[12px] 2xl:text-[16px] font-inter font-semibold leading-4 2xl:leading-6",
            "uppercase tracking-[1.2px] 2xl:tracking-[1.6px] text-foreground-muted/60",
          )}
        >
          End of Gallery
        </p>
        <div className="flex items-center gap-4  sm:gap-6">
          {prevId ? (
            <Link
              href={`/nominees/${prevId}`}
              className={cn(
                "flex items-center gap-2 2xl:gap-3 transition-colors hover:text-primary",
                "text-[12px] 2xl:text-[16px] font-inter font-semibold",
                "tracking-[1.2px] 2xl:tracking-[1.6px] text-foreground",
              )}
            >
              <Image
                src="/icons/forward-arrow.svg"
                alt=""
                width={12}
                height={12}
                className="h-3 w-3 2xl:h-4 2xl:w-4 rotate-180"
              />
              Previous Nominee
            </Link>
          ) : (
            <span
              className={cn(
                "flex items-center gap-2 2xl:gap-3 font-inter font-semibold text-foreground-muted/60",
                "text-[12px] 2xl:text-[16px] tracking-[1.2px] 2xl:tracking-[1.6px]",
              )}
            >
              <Image
                src="/icons/forward-arrow.svg"
                alt=""
                width={12}
                height={12}
                className="h-3 w-3 2xl:h-4 2xl:w-4 rotate-180 opacity-40"
              />
              Previous Nominee
            </span>
          )}

          {nextId ? (
            <Link
              href={`/nominees/${nextId}`}
              className={cn(
                "flex items-center gap-2 2xl:gap-3 text-[12px] 2xl:text-[16px] font-inter",
                "font-semibold tracking-[1.2px] 2xl:tracking-[1.6px] text-foreground",
                "transition-colors hover:text-primary",
              )}
            >
              Next Nominee
              <Image
                src="/icons/forward-arrow.svg"
                alt=""
                width={12}
                height={12}
                className="h-3 w-3 2xl:h-4 2xl:w-4"
              />
            </Link>
          ) : (
            <span
              className={cn(
                "flex items-center gap-2 2xl:gap-3 font-inter font-semibold text-foreground-muted/60",
                "text-[12px] 2xl:text-[16px] tracking-[1.2px] 2xl:tracking-[1.6px] ",
              )}
            >
              Next Nominee
              <Image
                src="/icons/forward-arrow.svg"
                alt=""
                width={12}
                height={12}
                className="h-3 w-3 2xl:h-4 2xl:w-4 opacity-40"
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
