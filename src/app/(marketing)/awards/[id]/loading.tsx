import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

// ── NomineeCardSkeleton ───────────────────────────────────────────────────────
// Mirrors NomineeCard (default/grid variant):
//   flex flex-col h-full bg-[#0f0d0a] border border-primary/15 rounded-xl overflow-hidden
//   image | p-5 2xl:p-7 text block | footer row with vote count + button
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

// ── AwardCategoryLoading ──────────────────────────────────────────────────────
// Mirrors AwardCategoryPageContent exactly:
//   ONE <section> — relative bg-background pb-8 sm:pb-10 pt-8 sm:pt-12
//                   border-b border-primary/10 overflow-hidden
//   Container (default size, no "wide"):
//     1. Back link row            — inline-flex items-center gap-2 mb-4
//     2. Heading block            — max-w-2xl 2xl:max-w-4xl border-l-2 border-primary pl-4 sm:pl-6
//          Eyebrow                — text-xs uppercase tracking-wider  (h-3)
//          h1 group name          — text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl bold
//          p  category name       — text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl italic mt-1
//          p  description         — text-sm sm:text-base 2xl:text-lg mt-3, two lines
//     3. Nominee grid wrapper     — mt-16 2xl:mt-24
//          grid grid-cols-1 gap-6 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3
export default function AwardCategoryLoading() {
  return (
    <div className="bg-background min-h-screen">
      <section className="relative bg-background pb-8 sm:pb-10 pt-8 sm:pt-12 border-b border-primary/10 overflow-hidden">
        <Container className="relative z-10">

          {/* Back link: inline-flex items-center gap-2 text-xs uppercase mb-4 */}
          <div className="inline-flex items-center gap-2 mb-4">
            <Skeleton className="h-3.5 w-3.5 rounded-sm" />
            <Skeleton className="h-3 w-32" />
          </div>

          {/* Heading block: border-l-2 border-primary pl-4 sm:pl-6 max-w-2xl 2xl:max-w-4xl */}
          <div className="max-w-2xl 2xl:max-w-4xl border-l-2 border-primary pl-4 sm:pl-6 flex flex-col">
            {/* Eyebrow: "Category Spotlight • ERA 2026" — text-xs uppercase */}
            <Skeleton className="h-3 w-52 mb-1.5" />
            {/* h1 group name: text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl bold */}
            <Skeleton className="h-7 sm:h-9 lg:h-11 2xl:h-13 w-3/4" />
            {/* p category name: text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl italic mt-1 */}
            <Skeleton className="h-6 sm:h-7 lg:h-9 2xl:h-11 w-1/2 mt-1" />
            {/* description: text-sm sm:text-base 2xl:text-lg mt-3 — two lines */}
            <div className="mt-3 flex flex-col gap-2">
              <Skeleton className="h-4 2xl:h-5 w-full max-w-2xl" />
              <Skeleton className="h-4 2xl:h-5 w-3/4 max-w-xl" />
            </div>
          </div>

          {/* Nominee grid: mt-16 2xl:mt-24 — same Container, no size change */}
          <div className="mt-16 2xl:mt-24">
            <div className="grid grid-cols-1 gap-6 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <NomineeCardSkeleton key={i} />
              ))}
            </div>
          </div>

        </Container>
      </section>
    </div>
  );
}
