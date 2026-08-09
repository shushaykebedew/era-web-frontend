import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/utils/cn";
import { SlideUp, FadeIn } from "@/components/ui/animations";

export function GalleryHero() {
  return (
    <section className="relative bg-background pb-10 2xl:pb-16 pt-28 text-center sm:pt-36 lg:pt-40 2xl:pt-48 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
      />
      <Container size="narrow" className="relative">
        <FadeIn>
          <Eyebrow align="center" className="">
            Visual Anthology
          </Eyebrow>
        </FadeIn>

        <SlideUp delay={0.1}>
          <h1
            className={cn(
              "mx-auto font-display text-[40px] sm:text-[56px] lg:text-[72px] 2xl:text-[96px]",
              "font-bold leading-tight lg:leading-20 2xl:leading-28",
              "tracking-tight lg:tracking-[-1.44px] text-foreground",
              "w-full max-w-full lg:max-w-182 2xl:max-w-4xl",
            )}
          >
            The Gallery
          </h1>
        </SlideUp>
        <SlideUp delay={0.2}>
          <p
            className={cn(
              "mx-auto mt-6 mb-10 sm:mb-16 lg:mb-20",
              "max-w-155 2xl:max-w-200",
              "text-base sm:text-[18px] 2xl:text-[24px]",
              "leading-7 2xl:leading-9 text-foreground-muted font-inter",
            )}
          >
            A curated narrative of architectural excellence and cinematic
            moments from the Ethiopian Real Estate Awards.
          </p>
        </SlideUp>
      </Container>
    </section>
  );
}