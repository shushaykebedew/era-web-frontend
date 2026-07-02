import { Container } from "@/components/ui/Container";

export function GalleryHero() {
  return (
    <section className="bg-background pb-10 pt-40 text-center">
      <Container size="narrow">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-primary" aria-hidden />
          <p className="text-[11px] font-inter font-semibold uppercase tracking-[2.5px] text-primary">
            Visual Anthology
          </p>
          <span className="h-px w-8 bg-primary" aria-hidden />
        </div>
        <h1 className="font-display text-5xl font-bold sm:text-6xl">
          The Gallery
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-foreground-muted">
          A curated narrative of architectural excellence and cinematic moments
          from the 2024 Ethiopian Real Estate Awards.
        </p>
      </Container>
    </section>
  );
}
