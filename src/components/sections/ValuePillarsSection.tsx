import type { ValuePillar } from "@/types";
import { Container } from "@/components/ui/Container";

export function ValuePillarsSection({ pillars }: { pillars: ValuePillar[] }) {
  return (
    <section className="border-y border-border bg-background py-20">
      <Container className="grid grid-cols-1 gap-12 sm:grid-cols-3">
        {pillars.map((pillar, index) => (
          <div
            key={pillar.title}
            className={index > 0 ? "border-t border-border pt-8 sm:border-l sm:border-t-0 sm:pl-12 sm:pt-0" : ""}
          >
            <h3 className="font-display text-2xl font-bold italic text-foreground">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{pillar.description}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
