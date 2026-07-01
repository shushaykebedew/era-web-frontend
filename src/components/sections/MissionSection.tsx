import { Container } from "@/components/ui/Container";

type MissionSectionProps = {
  eyebrow?: string;
  title?: string;
  paragraphs?: string[];
  stat?: { value: string; label: string };
};

export function MissionSection({
  title = "Our Mission",
  paragraphs = [
    "Established in 2020, the Ethiopia Real Estate Awards (ERA) serves as a beacon for quality, innovation, and sustainable development within the Horn of Africa.",
    "We believe that architecture is more than just stone and steel; it is the physical manifestation of a nation's soul and its aspirations for the future. Our goal is to honor those who dare to build beyond the ordinary.",
  ],
  stat = { value: "04", label: "Years of Excellence" },
}: MissionSectionProps) {
  return (
    <section className="bg-background py-24">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-bold italic sm:text-5xl">{title}</h2>
          <span className="mt-4 block h-px w-24 bg-primary" aria-hidden />
          <div className="mt-8 space-y-5">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-foreground-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full border border-border-strong bg-background-elevated" />
          <div className="absolute -bottom-6 left-0 bg-primary px-8 py-6 text-primary-foreground sm:left-8">
            <p className="font-display text-3xl font-bold">{stat.value}</p>
            <p className="text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
