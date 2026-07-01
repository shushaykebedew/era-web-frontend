import type { Partner } from "@/types";
import { Container } from "@/components/ui/Container";

export function PartnersStrip({ partners }: { partners: Partner[] }) {
  return (
    <section className="bg-background-muted py-16">
      <Container>
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-foreground-muted">
          Distinguished Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-12 lg:px-30">
          {partners.map((partner) => (
            <span
              key={partner.name}
              className="font-display text-[32px] tracking-[-1.6px] text-[#EAE1D7CC] leading-10 uppercase transition-colors hover:text-foreground"
            >
              {partner.name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
