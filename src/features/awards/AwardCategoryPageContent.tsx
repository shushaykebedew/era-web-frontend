import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <section className="bg-background pb-24 2xl:pb-32 pt-40 2xl:pt-48">
      <Container>
        <SlideUp>
          <Link
            href="/awards"
            className={cn(
              "inline-flex items-center gap-2 2xl:gap-3",
              "text-xs 2xl:text-base font-semibold uppercase",
              "tracking-wider 2xl:tracking-widest",
              "text-foreground-muted hover:text-primary transition-colors",
            )}
          >
            <ArrowLeft className="h-3.5 w-3.5 2xl:w-5 2xl:h-5" />
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
                <StaggerItem key={nominee.id}>
                  <NomineeCard nominee={nominee} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <p className="text-sm 2xl:text-base text-foreground-muted">
              Nominees for this category will be announced soon.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
