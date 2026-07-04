import type { Nominee } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NomineeCard } from "./NomineeCard";

export function FeaturedNominees({ nominees }: { nominees: Nominee[] }) {
  return (
    <section className="bg-[#1F1B15] py-24">
      <Container size="wide">
        <SectionHeading
          title="Featured Nominees"
          description="The projects currently leading the polls across all major categories."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {nominees.map((nominee) => (
            <NomineeCard
              key={nominee.slug}
              nominee={nominee}
              variant="featured"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
