"use client";

import type { Nominee } from "@/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NomineeCard } from "@/features/nominees/NomineeCard";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations";

export function FeaturedNominees({ nominees }: { nominees: Nominee[] }) {
  return (
    <section className="bg-[#1F1B15] py-16 sm:py-20 lg:py-24 2xl:py-32">
      <Container size="wide">
        <FadeIn>
          <SectionHeading
            title="Featured Nominees"
            description="The projects currently leading the polls across all major categories."
          />
        </FadeIn>

        <StaggerContainer className="mt-12 2xl:mt-16 grid grid-cols-1 gap-6 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {nominees.map((nominee) => (
            <StaggerItem key={nominee.id}>
              <NomineeCard nominee={nominee} variant="featured" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
