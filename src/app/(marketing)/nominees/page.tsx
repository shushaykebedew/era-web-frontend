import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { NomineeCard } from "@/components/sections/NomineeCard";
import { nominees } from "@/data/nominees";

export const metadata: Metadata = {
  title: "Nominees",
  description: "Browse every nominee competing across all Ethiopia Real Estate Awards categories.",
};

export default function NomineesPage() {
  return (
    <>
      <section className="bg-background pb-12 pt-40 text-center">
        <Container size="narrow">
          <Eyebrow align="center" className="mb-6">
            Excellence in Architecture
          </Eyebrow>
          <h1 className="font-display text-5xl font-bold sm:text-6xl">All Nominees</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-foreground-muted">
            Celebrating homes, workspaces, and landmarks that redefine modern Ethiopian design.
          </p>
        </Container>
      </section>

      <section className="bg-background pb-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nominees.map((nominee) => (
              <NomineeCard key={nominee.slug} nominee={nominee} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
