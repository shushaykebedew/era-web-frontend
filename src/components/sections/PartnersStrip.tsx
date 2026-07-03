import type { Partner } from "@/types";
import { Container } from "@/components/ui/Container";

export function PartnersStrip({ partners }: { partners: Partner[] }) {
  return (
    <section className="bg-[#16130D] py-16">
      <Container>
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-foreground-muted">
          Distinguished Partners
        </p>
        <div className="flex bg-[#141311] flex-wrap items-center justify-center gap-x-8 sm:gap-x-14 gap-y-8 sm:gap-y-12 py-8 lg:px-12 xl:px-24">
          {partners.map((partner) => (
            <span
              key={partner.name}
              className="font-display text-[20px] sm:text-[28px] xl:text-[32px] tracking-tight xl:tracking-[-1.6px] text-[#EAE1D7CC] leading-tight sm:leading-10 uppercase transition-colors hover:text-foreground"
            >
              {partner.name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
