import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

export default function GalleryLoading() {
  // Mirror the masonry column distribution used in GalleryGrid → PhotoGrid:
  // photos are distributed round-robin across 3 cols, so 9 cards → [0,3,6] [1,4,7] [2,5,8]
  const colCounts = [3, 3, 3];

  return (
    <div className="bg-background min-h-screen">

      {/* ── Hero skeleton — mirrors PageHeader (size="narrow", center) ── */}
      <section className="relative bg-background pt-14 sm:pt-18 lg:pt-20 2xl:pt-24 pb-10 sm:pb-14 2xl:pb-16 overflow-hidden text-center">
        <Container size="narrow">
          {/* Eyebrow */}
          <Skeleton className="h-3 w-48 mx-auto" />
          {/* Title — matches font-display text-3xl → text-6xl, max-w-3xl */}
          <Skeleton className="h-10 sm:h-12 lg:h-14 2xl:h-16 w-4/5 sm:w-3/4 lg:w-2/3 mx-auto mt-4" />
          {/* Description — two lines */}
          <div className="flex flex-col items-center gap-2 mt-4 sm:mt-5">
            <Skeleton className="h-4 2xl:h-5 w-full max-w-xl mx-auto" />
            <Skeleton className="h-4 2xl:h-5 w-full max-w-lg mx-auto" />
          </div>
        </Container>
      </section>

      {/* ── Filter bar skeleton — mirrors GalleryGrid filter section ──
            section: bg-background pb-4 2xl:pb-6 pt-8 2xl:pt-12
            inner: flex flex-col gap-6 md:flex-row md:items-center md:justify-between
              left: EditionSwitcher — label <p> + row of 2 year buttons
              right: FilterPills — row of 4 filter buttons
      ── */}
      <section className="bg-background pb-4 2xl:pb-6 pt-8 2xl:pt-12">
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            {/* Edition switcher: label + 2 large year buttons */}
            <div className="flex flex-col gap-3">
              <Skeleton className="h-3 2xl:h-4 w-28 2xl:w-36" />
              <div className="flex items-baseline gap-4 sm:gap-5 2xl:gap-8">
                <Skeleton className="h-8 sm:h-9 lg:h-10 2xl:h-12 w-16 sm:w-20 2xl:w-24" />
                <Skeleton className="h-8 sm:h-9 lg:h-10 2xl:h-12 w-16 sm:w-20 2xl:w-24" />
              </div>
            </div>

            {/* Filter pills: 4 buttons matching FilterPills shape */}
            <div className="flex flex-wrap gap-3 sm:gap-4 2xl:gap-6">
              {["All Moments", "Winners", "Ceremony", "Networking"].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-9 2xl:h-11 rounded-[1px]"
                  style={{ width: [110, 90, 108, 128][i] }}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Photo grid skeleton — mirrors PhotoGrid masonry (3 col masonry) ──
            section: bg-background pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pb-25 2xl:pb-32
            grid: grid-cols-1 gap-3 2xl:gap-6 md:grid-cols-2 xl:grid-cols-3
            each col: flex flex-col gap-3 2xl:gap-6, cards at aspect-ratio 4/3
      ── */}
      <section className="bg-background pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pb-25 2xl:pb-32">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-3 2xl:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {colCounts.map((count, colIdx) => (
              <div key={colIdx} className="flex min-w-0 flex-col gap-3 2xl:gap-6">
                {Array.from({ length: count }).map((_, cardIdx) => (
                  <Skeleton
                    key={cardIdx}
                    className="w-full min-w-0 rounded-sm"
                    style={{ aspectRatio: "4/3" }}
                  />
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>

    </div>
  );
}
