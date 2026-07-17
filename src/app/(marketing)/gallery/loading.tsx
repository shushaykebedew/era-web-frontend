import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

export default function GalleryLoading() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero skeleton */}
      <section className="pt-28 sm:pt-36 lg:pt-40 2xl:pt-48 pb-10 text-center">
        <Container size="narrow">
          <Skeleton className="h-3 w-32 mx-auto" />
          <Skeleton className="h-14 sm:h-20 w-48 sm:w-64 mx-auto mt-6" />
          <div className="flex flex-col items-center gap-2 mt-6 mb-12">
            <Skeleton className="h-5 w-full max-w-lg" />
            <Skeleton className="h-5 w-full max-w-md" />
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

      {/* Gallery grid skeleton — 3 columns of varying heights */}
      <section className="py-12 sm:py-16">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[480, 256, 384, 288, 480, 216].map((h, i) => (
              <Skeleton key={i} style={{ height: h }} className="w-full" />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
