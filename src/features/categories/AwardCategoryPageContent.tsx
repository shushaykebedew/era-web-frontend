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
    <section className="relative bg-background pb-24 2xl:pb-32 pt-40 2xl:pt-48 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
      />
      <Container className="relative">
        <SlideUp>
          <Link
            href="/awards"
            className={cn(
              "group inline-flex items-center gap-2 2xl:gap-3",
              "text-xs 2xl:text-base font-semibold uppercase",
              "tracking-wider 2xl:tracking-widest",
              "text-foreground-muted hover:text-primary transition-colors",
            )}
          >
            <ArrowLeft className="h-3.5 w-3.5 2xl:w-5 2xl:h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Categories
          </Link>

          <div
            className={cn(
              "mt-8 2xl:mt-12 max-w-2xl 2xl:max-w-4xl border-l-2",
              "2xl:border-l-4 border-primary pl-6 2xl:pl-8",
            )}
          >
            <Eyebrow className="mb-3">Excellence in Architecture</Eyebrow>
            <h1 className="font-display text-4xl font-bold sm:text-5xl 2xl:text-7xl">
              {category.group}
            </h1>
            <p className="font-display text-3xl italic text-primary sm:text-4xl 2xl:text-6xl">
              {category.name}
            </p>
            <p className="mt-4 2xl:mt-6 text-sm 2xl:text-lg leading-relaxed 2xl:leading-8 text-foreground-muted">
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
                  className="transition-transform duration-300 hover:-translate-y-1"
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