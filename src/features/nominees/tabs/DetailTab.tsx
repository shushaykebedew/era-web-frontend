import type { Nominee } from "@/types";

const ACHIEVEMENT_ICONS = [
  "/icons/platinum.svg",
  "/icons/tower.svg",
  "/icons/globe.svg",
];

export function DetailTab({ nominee }: { nominee: Nominee }) {
  return (
    <div className="flex min-w-0 flex-col gap-12 sm:gap-16 py-12 sm:py-16 border-t border-primary/10">
      {/* ── Achievements + Quote ── */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,448px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,478fr)_minmax(0,688fr)]">
        {/* Left — Key Achievements (always shown) */}
        <div>
          <p className="mb-6 text-[11px] font-inter leading-4 tracking-[3.3px] uppercase text-primary">
            Key Achievements
          </p>
          {nominee.achievements && nominee.achievements.length > 0 ? (
            <ul className="flex min-w-0 flex-col gap-6">
              {nominee.achievements.map((item, i) => {
                const icon = ACHIEVEMENT_ICONS[i % ACHIEVEMENT_ICONS.length];
                return (
                  <li key={item.title} className="flex items-start gap-5">
                    <img src={icon} className="mt-1" />
                    <div>
                      <p className="text-base font-semibold text-[#EAE1D7] font-inter leading-6">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[14px] text-[#D1C5B2] leading-5 font-inter">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-[12px] text-foreground-muted leading-5">
              Achievements will be published as the jury process concludes.
            </p>
          )}
        </div>

        {/* Right — Quote + two-col body */}
        <div className="flex min-w-0 flex-col gap-6">
          {nominee.quote && (
            <blockquote className="font-display text-[28px] sm:text-[36px] lg:text-[48px] italic leading-tight lg:leading-12 text-[#EAE1D7E5] tracking-tight lg:tracking-[-1.2px]">
              &ldquo;{nominee.quote}&rdquo;
            </blockquote>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 text-base leading-7 text-[#D1C5B2CC] font-inter">
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
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
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
                  <p className="font-display text-[18px] font-semibold text-foreground">
                    Ethiopia Basrie
                  </p>
                  <p className="text-[10px] font-inter uppercase tracking-[1.5px] text-foreground-muted mt-0.5">
                    Zema Architecture Studio
                  </p>
                </div>
              )}
              {/* ADDIS / ETHIOPIA / FINALIST on first image */}
              {i === 0 && (
                <div className="absolute bottom-4 left-3 right-3 flex flex-wrap gap-3">
                  {["Addis", "Ethiopia", "Finalist"].map((label) => (
                    <span
                      key={label}
                      className="text-[9px] font-inter font-semibold uppercase tracking-[2px] text-foreground/60"
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
