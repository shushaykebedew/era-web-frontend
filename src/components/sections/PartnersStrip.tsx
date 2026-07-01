import type { Partner } from "@/types";
import { Container } from "@/components/ui/Container";

export function PartnersStrip({ partners }: { partners: Partner[] }) {
  return (
    <section className="bg-background-muted py-16">
      <Container>
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-foreground-muted">
          Distinguished Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
          {partners.map((partner) => (
            <span
              key={partner.name}
              className="font-display text-lg tracking-wide text-foreground-muted/70 transition-colors hover:text-foreground"
            >
              {partner.name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
