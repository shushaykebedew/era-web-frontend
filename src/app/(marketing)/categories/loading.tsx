import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

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

export default function CategoriesLoading() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero skeleton */}
      <section className="pt-28 sm:pt-36 lg:pt-40 2xl:pt-48 pb-10 text-center">
        <Container size="wide">
          <Skeleton className="h-3 w-44 mx-auto" />
          <Skeleton className="h-14 sm:h-20 lg:h-24 w-72 sm:w-96 mx-auto mt-6" />
          <div className="flex flex-col items-center gap-2 mt-6 mb-12 sm:mb-20">
            <Skeleton className="h-5 w-full max-w-lg" />
            <Skeleton className="h-5 w-full max-w-md" />
          </div>
        </Container>
      </section>

      {/* Categories grid skeleton */}
      <Container className="py-8">
        <div className="flex flex-col">
          {Array.from({ length: 6 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </Container>

      {/* Visual excellence section skeleton */}
      <section className="py-16 sm:py-20 border-t border-border-strong">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex flex-col gap-4 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-10 w-40 mt-4" />
            </div>
            <Skeleton className="w-full lg:w-1/2 aspect-4/3" />
          </div>
        </Container>
      </section>
    </div>
  );
}
