import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

// Mirrors NomineeCard grid variant: tall image + text below
function NomineeCardSkeleton() {
  return (
    <div className="flex min-w-0 flex-col">
      <Skeleton className="w-full aspect-4/5" />
      <div className="flex flex-col pt-4 gap-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-3/4 mt-1" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-5 w-20 mt-2" />
      </div>
    </div>
  );
}

export default function AwardCategoryLoading() {
  return (
    <section className="bg-background pb-24 2xl:pb-32 pt-40 2xl:pt-48">
      <Container>
        {/* Back link */}
        <Skeleton className="h-4 w-36 mb-10" />

        {/* Heading block — mirrors the border-l accent layout */}
        <div className="max-w-2xl border-l-2 border-primary/30 pl-6 flex flex-col gap-3">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-10 w-56" />
          <Skeleton className="h-4 w-full mt-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Nominee grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <NomineeCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
