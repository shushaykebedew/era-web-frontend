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
                    <img src={icon} className="mt-1" />
                    <div>
                      <p className="text-base 2xl:text-[20px] font-semibold text-[#EAE1D7] font-inter leading-6 2xl:leading-8">
                        {item.title}
                      </p>
                      <p className="mt-1 2xl:mt-2 text-[14px] 2xl:text-[20px] text-[#D1C5B2] leading-5 2xl:leading-7 font-inter">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-[12px] 2xl:text-[16px] text-foreground-muted leading-5 2xl:leading-7">
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
                "text-[#EAE1D7E5] tracking-tight lg:tracking-[-1.2px]",
              )}
            >
              &ldquo;{nominee.quote}&rdquo;
            </blockquote>
          )}
          <div
            className={cn(
              "grid grid-cols-1 gap-5 sm:grid-cols-2 text-base 2xl:text-[24px]",
              "leading-7 2xl:leading-9 text-[#D1C5B2CC] font-inter",
            )}
          >
            <p>
              The core philosophy of the {nominee.name} was to move away from
              the generic glass facade that dominates modern metropolitan
              skylines — instead the design team at {nominee.firm} studied
              carefully the climate and aerial structures of the Ethiopian
              plateau.
            </p>
            <p>
              The result is a building that breathes. A centre atrium functions
              as a thermal chimney, drawing cool air from the shaded base and
              routing heat through a rooftop garden system. Each unit is
              oriented to maximise morning light while minimising glare.
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
              className="relative min-w-0 overflow-hidden aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9]"
            >
              <img
                src={src}
                alt={`${nominee.name} — view ${i + 1}`}
                className="h-full w-full object-cover"
              />
              {/* Caption on center image */}
              {i === 1 && (
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="font-display text-[18px] 2xl:text-[24px] font-semibold text-foreground">
                    Ethiopia Basrie
                  </p>
                  <p className="text-[10px] 2xl:text-[14px] font-inter uppercase tracking-[1.5px] 2xl:tracking-[2px] text-foreground-muted mt-0.5 2xl:mt-1">
                    Zema Architecture Studio
                  </p>
                </div>
              )}
              {/* ADDIS / ETHIOPIA / FINALIST on first image */}
              {i === 0 && (
                <div className="absolute bottom-4 left-3 right-3 2xl:bottom-6 2xl:left-5 flex flex-wrap gap-3 2xl:gap-4">
                  {["Addis", "Ethiopia", "Finalist"].map((label) => (
                    <span
                      key={label}
                      className="text-[9px] 2xl:text-[12px] font-inter font-semibold uppercase tracking-[2px] 2xl:tracking-[2.5px] text-foreground/60"
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
