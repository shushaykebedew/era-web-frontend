import Image from "next/image";
import type { Nominee } from "@/types";
import { cn } from "@/utils/cn";

const ACHIEVEMENT_ICONS = [
  "/icons/platinum.svg",
  "/icons/tower.svg",
  "/icons/globe.svg",
];

export function DetailTab({ nominee }: { nominee: Nominee }) {
  return (
    <div className="flex min-w-0 flex-col gap-12 sm:gap-16 2xl:gap-24 py-12 sm:py-16 2xl:py-24 border-t border-primary/10">
      {/* ── Achievements + Quote ── */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,448px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,478fr)_minmax(0,688fr)]">
        {/* Left — Key Achievements (always shown) */}
        <div>
          <p
            className={cn(
              "mb-6 2xl:mb-8 text-[11px] 2xl:text-[14px] font-inter leading-4 2xl:leading-6",
              "tracking-[3.3px] 2xl:tracking-[4.2px] uppercase text-primary",
            )}
          >
            Key Achievements
          </p>
          {nominee.achievements && nominee.achievements.length > 0 ? (
            <ul className="flex min-w-0 flex-col gap-6 2xl:gap-8">
              {nominee.achievements.map((item, i) => {
                const icon = ACHIEVEMENT_ICONS[i % ACHIEVEMENT_ICONS.length];
                return (
                  <li
                    key={item.title}
                    className="flex items-start gap-5 2xl:gap-8"
                  >
                    <Image
                      src={icon}
                      alt=""
                      width={24}
                      height={24}
                      className="mt-1 shrink-0"
                    />
                    <div>
                      <p className="text-base 2xl:text-[20px] font-semibold text-foreground font-inter leading-6 2xl:leading-8">
                        {item.title}
                      </p>
                      <p className="mt-1 2xl:mt-2 text-[14px] 2xl:text-[20px] text-foreground-muted leading-5 2xl:leading-7 font-inter">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-[12px] 2xl:text-[16px] text-foreground-muted leading-5 2xl:leading-7 font-inter">
              Achievements will be published as the jury process concludes.
            </p>
          )}
        </div>

        {/* Right — Quote + two-col body */}
        <div className="flex min-w-0 flex-col gap-6">
          {nominee.quote && (
            <blockquote
              className={cn(
                "font-display text-[28px] sm:text-[36px] lg:text-[48px] 2xl:text-[64px]",
                "italic leading-tight lg:leading-12 2xl:leading-20",
                "text-foreground/90 tracking-tight lg:tracking-[-1.2px]",
              )}
            >
              &ldquo;{nominee.quote}&rdquo;
            </blockquote>
          )}
          <div
            className={cn(
              "grid grid-cols-1 gap-5 sm:grid-cols-2 text-base 2xl:text-[24px]",
              "leading-7 2xl:leading-9 text-foreground-muted/80 font-inter",
            )}
          >
            <p className="whitespace-pre-line">
              {nominee.description || nominee.excerpt || "Description will be published soon."}
            </p>
          </div>
        </div>
      </div>

      {/* ── Gallery strip ── */}
      {nominee.gallery && nominee.gallery.length > 0 && (
        <div className="grid w-full grid-cols-1 gap-3 2xl:gap-6 md:grid-cols-3">
          {nominee.gallery.map((src, i) => (
            <div
              key={i}
              className="relative min-w-0 overflow-hidden aspect-video md:aspect-4/3 lg:aspect-video"
            >
              <Image
                src={src}
                alt={`${nominee.name} — view ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Caption on center image */}
              {i === 1 && (
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="font-display text-[18px] 2xl:text-[24px] font-semibold text-foreground">
                    {nominee.name}
                  </p>
                  <p
                    className={cn(
                      "text-[10px] 2xl:text-[14px] font-inter uppercase tracking-[1.5px]",
                      "2xl:tracking-[2px] text-foreground-muted mt-0.5 2xl:mt-1",
                    )}
                  >
                    {nominee.category?.name || nominee.firm || nominee.location || "Ethiopia"}
                  </p>
                </div>
              )}
              {/* ADDIS / ETHIOPIA / FINALIST on first image */}
              {i === 0 && (
                <div className="absolute bottom-4 left-3 right-3 2xl:bottom-6 2xl:left-5 flex flex-wrap gap-3 2xl:gap-4">
                  {[nominee.location || "Ethiopia", nominee.status].filter(Boolean).map((label) => (
                    <span
                      key={label}
                      className={cn(
                        "text-[9px] 2xl:text-[12px] font-inter font-semibold uppercase",
                        "tracking-[2px] 2xl:tracking-[2.5px] text-foreground/60",
                      )}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
