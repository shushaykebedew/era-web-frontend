import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/utils/cn";

export function GalleryHero() {
  return (
    <section className="bg-background pb-10 2xl:pb-16 pt-28 text-center sm:pt-36 lg:pt-40 2xl:pt-48">
      <Container size="narrow">
        <Eyebrow align="center" className="">
          Visual Anthology
        </Eyebrow>

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
        <p
          className={cn(
            "mx-auto mt-6 mb-10 sm:mb-16 lg:mb-20",
            "max-w-155 2xl:max-w-200",
            "text-base sm:text-[18px] 2xl:text-[24px]",
            "leading-7 2xl:leading-9 text-foreground-muted font-inter",
          )}
        >
          A curated narrative of architectural excellence and cinematic moments
          from the 2024 Ethiopian Real Estate Awards.
        </p>
      </Container>
    </section>
  );
}
