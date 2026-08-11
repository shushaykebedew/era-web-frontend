import Link from "next/link";
import { ArrowLeft, CircleDashed } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { NomineeCard } from "@/features/nominees/NomineeCard";
import type { AwardCategory, Nominee } from "@/types";
import { cn } from "@/utils/cn";
import {
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations";

export function AwardCategoryPageContent({
  category,
  nominees,
}: {
  category: AwardCategory;
  nominees: Nominee[];
}) {
  return (
    <section className="relative bg-background pb-8 sm:pb-10 pt-8 sm:pt-12 border-b border-primary/10 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
      />
      <Container className="relative z-10">
        <SlideUp>
          <Link
            href="/categories"
            className={cn(
              "group inline-flex items-center gap-2",
              "text-xs font-semibold uppercase tracking-wider",
              "text-foreground-muted hover:text-primary transition-colors mb-4",
            )}
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Categories
          </Link>

          <div className="max-w-2xl 2xl:max-w-4xl border-l-2 border-primary pl-4 sm:pl-6">
            <Eyebrow className="mb-1.5">Category Spotlight • ERA 2026</Eyebrow>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold tracking-tight text-foreground">
              {category.group}
            </h1>
            <p className="font-display text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl italic text-primary mt-1">
              {category.name}
            </p>
            <p className="mt-3 text-sm sm:text-base 2xl:text-lg leading-relaxed text-foreground-muted max-w-2xl">
              {category.description}
            </p>
          </div>
        </SlideUp>

        <div className="mt-16 2xl:mt-24">
          {nominees.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 gap-6 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {nominees.map((nominee) => (
                <StaggerItem
                  key={nominee.id}
                  className="h-full transition-transform duration-300 hover:-translate-y-1"
                >
                  <NomineeCard nominee={nominee} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 2xl:py-20 text-center">
              <div
                className={cn(
                  "mb-6 flex h-16 w-16 2xl:h-20 2xl:w-20 items-center justify-center",
                  "border border-primary/20 bg-primary/5 rounded-full",
                )}
              >
                <CircleDashed
                  className="h-6 w-6 2xl:h-8 2xl:w-8 text-primary"
                  aria-hidden="true"
                />
              </div>
              <h2 className="font-display text-xl sm:text-2xl 2xl:text-3xl font-semibold text-foreground tracking-tight mb-3">
                Nominees coming soon
              </h2>
              <p className="max-w-sm sm:max-w-md 2xl:max-w-lg font-inter text-foreground-muted text-sm sm:text-base 2xl:text-[18px] leading-6 2xl:leading-8">
                Nominees for {category.name} will be announced soon.
                <br />
                Check back later to see who's competing.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}