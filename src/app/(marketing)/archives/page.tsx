import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Archives",
  description: "Explore winners and nominees from previous editions of the awards.",
};

/**
 * Placeholder page — content/design for this section is still being
 * finalized. Structure follows the same hero pattern as other pages so it
 * can be filled in without restructuring later.
 */
export default function Page() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-background pt-32 text-center">
      <Container size="narrow">
        <Eyebrow align="center" className="mb-6">
          Excellence in Architecture
        </Eyebrow>
        <h1 className="font-display text-5xl font-bold sm:text-6xl">Archives</h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-foreground-muted">
          Explore winners and nominees from previous editions of the awards.
        </p>
      </Container>
    </section>
  );
}
