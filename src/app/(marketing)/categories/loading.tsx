import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

// ── CategoryCardSkeleton ──────────────────────────────────────────────────────
// Mirrors CategoryCard compact variant:
//   flex h-full flex-col min-h-70 lg:min-h-90 xl:min-h-100 2xl:min-h-120
//   justify-between gap-3 bg-[#13110e] p-6 sm:p-8 2xl:p-10
//   border border-primary/15 rounded-lg
//   contents: icon circle (w-12 h-12 rounded-full mb-10) | h3 title | p description | "View Nominees" link row
function CategoryCardSkeleton() {
  return (
    <div className="flex h-full flex-col min-h-70 lg:min-h-90 xl:min-h-100 2xl:min-h-120 justify-between gap-3 bg-[#13110e] p-6 sm:p-8 2xl:p-10 border border-primary/15 rounded-lg">
      <div className="flex flex-col">
        {/* Icon circle */}
        <Skeleton className="w-12 h-12 rounded-full mb-10" />
        {/* Title */}
        <Skeleton className="h-7 sm:h-8 2xl:h-10 w-3/4" />
        {/* Description — 3 lines */}
        <div className="mt-4 flex flex-col gap-2">
          <Skeleton className="h-4 2xl:h-5 w-full" />
          <Skeleton className="h-4 2xl:h-5 w-5/6" />
          <Skeleton className="h-4 2xl:h-5 w-2/3" />
        </div>
      </div>
      {/* "View Nominees" link row */}
      <Skeleton className="h-4 2xl:h-5 w-32 mt-8" />
    </div>
  );
}

export default function CategoriesLoading() {
  return (
    <div className="bg-background min-h-screen">

      {/* ── Hero skeleton — mirrors CategoriesHero ──
            Real: <div className="py-10 mt-10 text-center bg-background">
              <h1 font-display bold text-2xl→text-5xl>Award Categories</h1>
            No PageHeader, no eyebrow, no description, no border-b.
      ── */}
      <div className="py-10 mt-10 text-center bg-background">
        <Skeleton className="h-8 sm:h-10 lg:h-11 2xl:h-14 w-64 sm:w-80 lg:w-96 mx-auto" />
      </div>

      {/* ── Categories grid skeleton — mirrors AwardCategoriesSection full variant ──
            section: bg-background py-10 sm:py-16 lg:py-20 2xl:py-24
            grid: grid-cols-1 gap-8 2xl:gap-12 sm:grid-cols-2 lg:grid-cols-3
      ── */}
      <section className="bg-background py-10 sm:py-16 lg:py-20 2xl:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-8 2xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── VisualExcellenceSection skeleton ──
            section: bg-background py-16 sm:py-20 lg:py-24 2xl:py-32 border-t border-primary/20
            inner: max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16
            flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-8
              left (lg:w-1/2 max-w-md 2xl:max-w-175):
                eyebrow label, h2 heading, p description, CTA button
              right (lg:w-1/2 aspect-4/3 lg:aspect-auto):
                blueprint SVG illustration panel
      ── */}
      <section className="bg-background py-16 sm:py-20 lg:py-24 2xl:py-32 border-t border-primary/20">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="flex min-w-0 flex-col gap-12 lg:flex-row lg:justify-between lg:gap-8">

            {/* Left — text block */}
            <div className="flex min-w-0 flex-col justify-center w-full lg:w-1/2 max-w-full lg:max-w-md 2xl:max-w-175">
              {/* Eyebrow */}
              <Skeleton className="h-3 2xl:h-4 w-32 mb-4 2xl:mb-6" />
              {/* Heading — text-[36px] sm:text-[48px] 2xl:text-[52px] */}
              <Skeleton className="h-10 sm:h-12 lg:h-13 2xl:h-14 w-full" />
              <Skeleton className="h-10 sm:h-12 lg:h-13 2xl:h-14 w-3/4 mt-2" />
              {/* Description */}
              <div className="mt-6 flex flex-col gap-2">
                <Skeleton className="h-4 2xl:h-5 w-full" />
                <Skeleton className="h-4 2xl:h-5 w-full" />
                <Skeleton className="h-4 2xl:h-5 w-2/3" />
              </div>
              {/* CTA button: h-10 sm:h-10.5 2xl:h-15 */}
              <Skeleton className="h-10 sm:h-10.5 2xl:h-15 w-full sm:w-48 2xl:w-56 mt-10" />
            </div>

            {/* Right — blueprint illustration panel */}
            <Skeleton
              className="w-full min-h-60 sm:min-h-90 lg:w-1/2 lg:min-h-90 2xl:min-h-120 border border-primary/10"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
