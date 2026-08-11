import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

export default function GalleryLoading() {
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

      {/* Filter bar skeleton — Edition switcher + Filter pills */}
      <section className="bg-background pb-4 2xl:pb-6 pt-8 2xl:pt-12">
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Edition switcher skeleton */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-28" />
              <div className="flex items-center gap-5">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-20" />
              </div>
            </div>
            {/* Filter pills skeleton */}
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-28 rounded-[1px]" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery 3-column photo grid skeleton */}
      <section className="bg-background pt-10 pb-16 sm:pt-12">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-3 2xl:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full rounded-sm"
                style={{ aspectRatio: "4/3" }}
              />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
