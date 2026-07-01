import type { TimelineMilestone } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MilestoneIcon } from "@/components/ui/MilestoneIcon";
import { cn } from "@/lib/cn";

export function TimelineSection({ milestones }: { milestones: TimelineMilestone[] }) {
  return (
    <section className="bg-background py-24">
      <Container size="narrow">
        <SectionHeading eyebrow="The Path to Glory" title="The 2026 Roadmap" align="center" />

        <ol className="relative mt-16 space-y-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border-strong sm:block" />

          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <li
                key={milestone.title}
                className={cn(
                  "relative flex flex-col items-center gap-4 sm:flex-row",
                  isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "flex-1 text-center",
                    isEven ? "sm:text-right" : "sm:text-left"
                  )}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {milestone.period}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    {milestone.description}
                  </p>
                </div>

                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary bg-background">
                  <MilestoneIcon icon={milestone.icon} className="h-6 w-6 text-primary" />
                </div>

                <div className="hidden flex-1 sm:block" />
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
