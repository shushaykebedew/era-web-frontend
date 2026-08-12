import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";

// Mirrors one NomineeCard (featured variant): image + text block
function FeaturedNomineeCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-[#0f0d0a] border border-primary/20 rounded-xl overflow-hidden">
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

function CategoryCardSkeleton() {
  return (
    <div className="flex h-full flex-col min-h-70 lg:min-h-90 justify-between bg-[#13110e] p-6 sm:p-8 border border-primary/15 rounded-lg">
      <div className="flex flex-col gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="h-7 w-3/4 mt-2" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-4 w-32 mt-8" />
    </div>
  );
}

export default function AwardsLoading() {
  return (
    <div className="bg-background min-h-screen">
      {/* Home Hero skeleton */}
      <section className="relative flex flex-col items-center justify-center pt-16 sm:pt-20 lg:pt-24 pb-12 text-center overflow-hidden">
        <Container size="wide" className="flex flex-col items-center">
          <Skeleton className="h-6 w-44 rounded-full mb-4" />
          <Skeleton className="h-10 sm:h-14 lg:h-16 2xl:h-20 w-80 sm:w-130 lg:w-160 max-w-full" />
          <div className="flex flex-col items-center gap-2 mt-4 max-w-lg">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:justify-center w-full max-w-md">
            <Skeleton className="h-12 w-full sm:w-40" />
            <Skeleton className="h-12 w-full sm:w-52" />
          </div>
        </Container>
      </section>

      {/* Categories section skeleton */}
      <section className="bg-background py-16 sm:py-20">
        <Container size="wide">
          <div className="flex flex-col gap-2 mb-10">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-9 w-64 mt-1" />
          </div>
          <div className="grid grid-cols-1 gap-8 2xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured nominees section skeleton */}
      <section className="bg-[#1F1B15] py-16 sm:py-20">
        <Container size="wide">
          <div className="flex flex-col gap-2 mb-10">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-9 w-64 mt-1" />
          </div>
          <div className="grid grid-cols-1 gap-6 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <FeaturedNomineeCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
