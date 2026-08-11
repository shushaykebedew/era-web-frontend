import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

function TierCardSkeleton() {
  return (
    <div className="border border-border-strong p-6 sm:p-8 flex flex-col gap-4">
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-px w-full" />
      <div className="flex flex-col gap-3 flex-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
      <Skeleton className="h-12 w-full mt-4" />
    </div>
  );
}

function PartnerCardSkeleton() {
  return (
    <div className="border border-border-strong aspect-286/244 flex flex-col items-center justify-center gap-6">
      <Skeleton className="h-24 w-48" />
      <Skeleton className="h-6 w-20" />
    </div>
  );
}

export default function PartnersLoading() {
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

      {/* Tier cards skeleton */}
      <section className="py-8 sm:py-12">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <TierCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Confirmed partners skeleton */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container size="wide">
          <div className="flex flex-col gap-2 mb-10">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-5 w-96" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <PartnerCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
