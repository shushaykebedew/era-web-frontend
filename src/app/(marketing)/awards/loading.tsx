import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";

// Mirrors one NomineeCard (featured variant): image + text block
function NomineeCardSkeleton() {
  return (
    <div className="flex min-w-0 flex-col bg-background-elevated border border-primary/10">
      <Skeleton className="w-full aspect-4/5" />
      <div className="flex flex-col p-5 sm:p-6 gap-3">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
}

// Mirrors one CategoryCard row item
function CategoryCardSkeleton() {
  return (
    <div className="border-t border-border-strong py-6 flex items-center justify-between gap-4">
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-5 w-full max-w-xs" />
      </div>
      <Skeleton className="h-10 w-10 shrink-0" />
    </div>
  );
}

export default function AwardsLoading() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero skeleton */}
      <div
        className={cn(
          "relative -mt-20 flex w-full min-w-0 flex-col items-center justify-center",
          "min-h-120 sm:min-h-150 lg:min-h-180 xl:min-h-205 2xl:min-h-256",
          "bg-background-elevated"
        )}
      >
        <div className="flex flex-col items-center gap-4 px-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-14 sm:h-20 lg:h-28 w-64 sm:w-96 lg:w-[520px]" />
          <Skeleton className="h-14 sm:h-20 lg:h-28 w-48 sm:w-80 lg:w-96" />
          <Skeleton className="h-5 w-72 sm:w-96 mt-2" />
          <Skeleton className="h-5 w-56 sm:w-80" />
          <div className="flex gap-4 mt-4">
            <Skeleton className="h-12 w-36" />
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      </div>

      {/* Categories section skeleton */}
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col gap-1 mb-10">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-64 mt-2" />
        </div>
        <div className="flex flex-col">
          {Array.from({ length: 6 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </Container>

      {/* Featured nominees skeleton */}
      <section className="bg-background-muted py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="flex flex-col gap-1 mb-10">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-72 mt-2" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <NomineeCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
