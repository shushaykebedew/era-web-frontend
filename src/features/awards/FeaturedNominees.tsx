import type { Nominee } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NomineeCard } from "@/features/nominees/NomineeCard";

export function FeaturedNominees({ nominees }: { nominees: Nominee[] }) {
  return (
    <section className="bg-[#1F1B15] py-16 sm:py-20 lg:py-24 2xl:py-32">
      <Container size="wide">
        <SectionHeading
          title="Featured Nominees"
          description="The projects currently leading the polls across all major categories."
        />

        <div className="mt-12 2xl:mt-16 grid grid-cols-1 gap-6 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
