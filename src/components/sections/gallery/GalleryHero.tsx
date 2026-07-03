import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function GalleryHero() {
  return (
    <section className="bg-background pb-10 pt-40 text-center">
      <Container size="narrow">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-primary" aria-hidden />
          <Eyebrow align="center" className="">
            Visual Anthology
          </Eyebrow>
          <span className="h-px w-8 bg-primary" aria-hidden />
        </div>
        <h1 className="font-display text-[40px] sm:text-[56px] lg:text-[72px] font-bold leading-tight lg:leading-20 tracking-tight lg:tracking-[-1.44px] text-foreground max-w-[728px]">
          The Gallery
        </h1>
        <p className="mx-auto mt-6 mb-10 sm:mb-16 lg:mb-20 max-w-[620px] text-[18px] leading-7.5 text-foreground-muted font-inter">
          A curated narrative of architectural excellence and cinematic moments
          from the 2024 Ethiopian Real Estate Awards.
        </p>
      </Container>
    </section>
  );
}
