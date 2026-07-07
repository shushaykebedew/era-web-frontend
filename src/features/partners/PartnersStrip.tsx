import type { Partner } from "@/types";
import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";

export function PartnersStrip({ partners }: { partners: Partner[] }) {
  return (
    <section className={cn("bg-[#16130D]", "py-16")}>
      <Container size="wide" className="w-full">
        <p
          className={cn(
            "mb-10 2xl:mb-16 text-center text-xs 2xl:text-[16px] text-foreground-muted",
            "font-semibold uppercase tracking-[0.3em] 2xl:tracking-[0.4em]",
          )}
        >
          Distinguished Partners
        </p>
        <div
          className={cn(
            "flex bg-[#141311] flex-wrap items-center justify-center",
            "gap-x-8 sm:gap-x-14 2xl:gap-x-20",
            "gap-y-8 sm:gap-y-12 2xl:gap-y-16",
            "py-8 2xl:py-12 px-4",
          )}
        >
          {partners.map((partner) => (
            <span
              key={partner.name}
              className={cn(
                "font-display text-[20px] sm:text-[28px] xl:text-[32px] 2xl:text-[40px]",
                "tracking-tight xl:tracking-[-1.6px]",
                "text-[#EAE1D7CC] leading-tight sm:leading-10 2xl:leading-12",
                "uppercase transition-colors hover:text-foreground",
              )}
            >
              {partner.name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
