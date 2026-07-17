import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

export default function NomineesLoading() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero skeleton */}
      <section className="pt-28 sm:pt-36 lg:pt-40 2xl:pt-48 pb-10 text-center">
        <Container size="narrow">
          <Skeleton className="h-3 w-44 mx-auto" />
          <div className="flex flex-col items-center gap-3 mt-6">
            <Skeleton className="h-14 sm:h-20 lg:h-24 w-72 sm:w-105 lg:w-140" />
            <Skeleton className="h-14 sm:h-20 lg:h-24 w-56 sm:w-80 lg:w-96" />
          </div>
          <div className="flex flex-col items-center gap-2 mt-6 mb-12 sm:mb-20">
            <Skeleton className="h-5 w-full max-w-lg" />
            <Skeleton className="h-5 w-full max-w-md" />
            <Skeleton className="h-5 w-3/4 max-w-sm" />
          </div>
        </Container>
      </section>

      {/* Filter bar skeleton */}
      <div className="border-t border-b border-border-strong py-4">
        <Container size="wide">
          <div className="flex flex-wrap items-center gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24" />
            ))}
          </div>
        </Container>
      </div>

      {/* Nominee card grid skeleton */}
      <section className="py-12 sm:py-16">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex min-w-0 flex-col">
                <Skeleton className="w-full aspect-4/5" />
                <div className="flex flex-col pt-4 gap-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-8 w-3/4 mt-1" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-20 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
