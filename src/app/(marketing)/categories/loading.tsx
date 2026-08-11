import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

function CategoryCardSkeleton() {
  return (
    <div className="flex h-full flex-col min-h-70 lg:min-h-90 justify-between bg-[#13110e] p-6 sm:p-8 border border-primary/15 rounded-lg">
      <div className="flex flex-col gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="h-7 w-3/4 mt-2" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="h-4 w-32 mt-8" />
    </div>
  );
}

export default function CategoriesLoading() {
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

      {/* Categories 3-column grid skeleton */}
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-8 2xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Visual excellence section skeleton */}
      <section className="bg-background py-16 sm:py-20 border-t border-primary/20">
        <Container size="wide">
          <div className="flex flex-col lg:flex-row gap-12 justify-between">
            <div className="flex flex-col gap-4 flex-1 max-w-md">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-10 w-40 mt-6" />
            </div>
            <Skeleton className="w-full lg:w-1/2 aspect-4/3 min-h-60 rounded-lg" />
          </div>
        </Container>
      </section>
    </div>
  );
}
