import type { Metadata } from "next";
import { MissionSection } from "@/components/sections/MissionSection";
import { ValuePillarsSection } from "@/components/sections/ValuePillarsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { valuePillars, roadmapMilestones } from "@/data/content";

export const metadata: Metadata = {
  title: "The Awards",
  description: "Learn about the mission, values, and roadmap behind the Ethiopia Real Estate Awards.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-background pb-12 pt-40 text-center">
        <Container size="narrow">
          <Eyebrow align="center" className="mb-6">
            Excellence in Architecture
          </Eyebrow>
          <h1 className="font-display text-5xl font-bold leading-tight text-balance sm:text-6xl">
            Defining the Horizon of Ethiopia
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-foreground-muted">
            Celebrating the visionaries who transform our landscapes into legacies. The Ethiopia
            Real Estate Awards represent the pinnacle of architectural achievement.
          </p>
        </Container>
      </section>

      <MissionSection />
      <ValuePillarsSection pillars={valuePillars} />
      <TimelineSection milestones={roadmapMilestones} />
    </>
  );
}
