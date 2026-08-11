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
    <section className="relative bg-[#1F1B15] py-16 sm:py-20 lg:py-24 2xl:py-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
      />
      <Container size="wide" className="relative">
        <FadeIn>
          <SectionHeading
            title="Featured Nominees"
            description="The projects currently leading the polls across all major categories."
          />
        </FadeIn>

        {nominees.length === 0 ? (
          <FadeIn delay={0.1}>
            <div className="mt-12 2xl:mt-16 flex flex-col items-center justify-center gap-2 rounded-lg border border-primary/10 bg-primary/[0.02] py-16 text-center">
              <p className="font-inter text-sm 2xl:text-base font-semibold text-foreground">
                Nominees coming soon
              </p>
              <p className="font-inter text-xs 2xl:text-sm text-foreground-muted max-w-sm">
                Check back once voting opens to see the leading projects across every category.
              </p>
            </div>
          </FadeIn>
        ) : (
          <StaggerContainer className="mt-12 2xl:mt-16 grid grid-cols-1 gap-6 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {nominees.map((nominee) => (
              <StaggerItem
                key={nominee.id}
                className="h-full transition-transform duration-300 hover:-translate-y-1"
              >
                <NomineeCard nominee={nominee} variant="featured" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </Container>
    </section>
  );
}