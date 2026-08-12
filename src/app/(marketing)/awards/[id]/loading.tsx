import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

// Mirrors NomineeCard grid variant: tall image + text below
function NomineeCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-[#0f0d0a] border border-primary/15 rounded-xl overflow-hidden">
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

export default function AwardCategoryLoading() {
  return (
    <div className="bg-background min-h-screen">
      <section className="bg-background pb-8 sm:pb-10 pt-8 sm:pt-12 border-b border-primary/10">
        <Container>
          {/* Back link */}
          <Skeleton className="h-4 w-36 mb-4" />

          {/* Heading block — mirrors the border-l accent layout */}
          <div className="max-w-2xl border-l-2 border-primary/30 pl-4 sm:pl-6 flex flex-col gap-2">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-4 w-full mt-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </Container>
      </section>

      {/* Nominee grid */}
      <section className="bg-background py-12 sm:py-16">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-6 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <NomineeCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
