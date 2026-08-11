import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

function NomineeCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-[#0f0d0a] border border-primary/15 rounded-sm overflow-hidden">
      <Skeleton className="w-full h-32 2xl:h-48" />
      <div className="flex flex-col flex-1 p-5 2xl:p-7 gap-3">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full mt-1" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex items-center justify-between pt-4 border-t border-primary/10 mt-auto">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-9 2xl:h-12 w-24 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export default function NomineesLoading() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero skeleton */}
      <section className="relative bg-background pt-14 sm:pt-18 lg:pt-20 2xl:pt-24 pb-10 sm:pb-14 2xl:pb-16 border-b border-primary/15 overflow-hidden text-center">
        <Container size="narrow">
          <Skeleton className="h-3 w-48 mx-auto" />
          <Skeleton className="h-10 sm:h-12 w-72 sm:w-115 mx-auto mt-4" />
          <div className="flex flex-col items-center gap-2 mt-4">
            <Skeleton className="h-4 w-full max-w-xl" />
            <Skeleton className="h-4 w-full max-w-lg" />
          </div>
        </Container>
      </section>

      {/* Filter bar skeleton — mirrors NomineesFilterBar 1:1 */}
      <section className="bg-background py-8 2xl:py-12 border-b border-primary/10">
        <Container size="wide">
          <div className="flex flex-col gap-6">
            {/* Row 1: Search & Sort */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end justify-between">
              {/* Search Box Skeleton */}
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-3 w-32 2xl:w-40" />
                <Skeleton className="h-11 2xl:h-16 w-full rounded" />
              </div>
              {/* Sort Dropdown Skeleton */}
              <div className="w-full md:w-72 2xl:w-96 md:shrink-0 flex flex-col gap-2">
                <Skeleton className="h-3 w-24 2xl:w-32" />
                <Skeleton className="h-11 2xl:h-16 w-full rounded" />
              </div>
            </div>

            {/* Row 2: Category Pills Skeleton */}
            <div className="flex flex-col gap-3">
              <Skeleton className="h-3 w-36 2xl:w-44" />
              <div className="flex flex-wrap gap-2.5 sm:gap-3 2xl:gap-4">
                {[110, 150, 140, 125, 170, 135, 160].map((width, i) => (
                  <Skeleton
                    key={i}
                    style={{ width }}
                    className="h-8 sm:h-9 2xl:h-12 rounded"
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Nominee card grid skeleton */}
      <section className="bg-background py-12 sm:py-16">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-x-6 2xl:gap-x-12 gap-y-14 2xl:gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <NomineeCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
