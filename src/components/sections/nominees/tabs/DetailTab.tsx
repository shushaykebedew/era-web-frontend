import Image from "next/image";
import { Check } from "lucide-react";
import type { Nominee } from "@/types";
import { cn } from "@/lib/cn";

export function DetailTab({ nominee }: { nominee: Nominee }) {
  return (
    <div className="flex flex-col gap-16 py-10 lg:py-16">
      {/* Cover image + dot indicators */}
      <div className="relative overflow-hidden bg-background-elevated h-[480px] lg:h-[720px]">
        {nominee.coverImage ? (
          <Image
            src={nominee.coverImage}
            alt={nominee.name}
            fill
            className="object-cover object-top"
          />
        ) : (
          <div className="h-full w-full bg-background-elevated" />
        )}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "block h-1.5 rounded-full",
                i === 0 ? "w-6 bg-primary" : "w-1.5 bg-foreground-muted/40"
              )}
            />
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
                      <p className="text-[13px] font-semibold text-foreground leading-5">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[12px] text-foreground-muted leading-5">
                        {item.description}
                      </p>
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
                The core philosophy of the {nominee.name} was to move away from the
                generic glass facade that dominates modern metropolitan skylines —
                instead the design team at {nominee.firm} studied carefully the
                climate and aerial structures of the Ethiopian plateau.
              </p>
              <p>
                The result is a building that breathes. A centre atrium functions as
                a thermal chimney, drawing cool air from the shaded base and routing
                heat through a rooftop garden system. Each unit is oriented to
                maximise morning light while minimising glare.
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
            <Image
              src={nominee.gallery[0] || nominee.coverImage || ""}
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="font-display text-[20px] font-semibold text-foreground">
                Ethiopia Basrie
              </p>
              <p className="text-[10px] font-inter uppercase tracking-[1.5px] text-foreground-muted mt-1">
                Zema Architecture Studio
              </p>
            </div>
          </div>
          {/* Middle column (stacked 2 images) */}
          <div className="relative col-span-1 row-span-1 overflow-hidden bg-background-elevated">
            <Image
              src={nominee.gallery[1] || nominee.coverImage || ""}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          <div className="relative col-span-1 row-span-1 overflow-hidden bg-background-elevated col-start-3 row-start-2">
            <Image
              src={nominee.gallery[2] || nominee.coverImage || ""}
              alt=""
              fill
              className="object-cover"
            />
          </div>
          {/* Right vertical image (spans 1 col, full height) */}
          <div className="relative col-span-1 row-span-2 overflow-hidden bg-background-elevated col-start-4 row-start-1">
            <Image
              src={nominee.gallery[0] || nominee.coverImage || ""}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
