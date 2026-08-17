import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

// ── TierCardSkeleton ──────────────────────────────────────────────────────────
// Mirrors PartnersTierCards → card body:
//   relative flex h-full w-full flex-col overflow-hidden rounded-lg
//   border p-6 sm:p-8 2xl:p-10
//   contents: eyebrow "Tier", title, ornamental divider, benefit list, CTA button
function TierCardSkeleton() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-border-strong p-6 sm:p-8 2xl:p-10 xl:min-h-128 2xl:min-h-150">
      {/* Ghost numeral area — keep space so proportions match */}
      {/* Eyebrow "Tier" */}
      <Skeleton className="h-3 2xl:h-4 w-8 mb-2" />
      {/* Title: text-[32px] 2xl:text-[40px] */}
      <Skeleton className="h-9 2xl:h-11 w-36 2xl:w-44 mb-5" />
      {/* Ornamental divider */}
      <Skeleton className="h-px w-full mb-8" />
      {/* Benefits list — 4 rows each: circle icon + text line */}
      <div className="flex flex-col gap-4 flex-1 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-5 w-5 shrink-0 rounded-full mt-0.5" />
            <Skeleton className="h-5 2xl:h-6 w-full" />
          </div>
        ))}
      </div>
      {/* CTA button: h-12.5 2xl:h-14 w-full */}
      <Skeleton className="h-12 2xl:h-14 w-full rounded-sm" />
    </div>
  );
}

// ── PartnerCardSkeleton ───────────────────────────────────────────────────────
// Mirrors ConfirmedPartners → PartnerCard:
//   aspect-286/244 bg-[#131313] border border-[#4E4637] rounded-lg
//   contents: logo area (h-24 w-48) + tier badge
function PartnerCardSkeleton() {
  return (
    <div className="w-full sm:max-w-71.5 mx-auto lg:max-w-none rounded-lg border border-border-strong aspect-[286/244] flex flex-col items-center justify-center gap-6">
      <Skeleton className="h-24 w-48" />
      <Skeleton className="h-6 w-20" />
    </div>
  );
}

// ── PartnersLoading ───────────────────────────────────────────────────────────
export default function PartnersLoading() {
  return (
    <div className="bg-background min-h-screen">

      {/* ── Hero skeleton — mirrors PageHeader (size="narrow", center) ──
            section: pt-14 sm:pt-18 lg:pt-20 2xl:pt-24 pb-10 sm:pb-14 2xl:pb-16
            No border-b (PageHeader doesn't render one)
      ── */}
      <section className="relative bg-background pt-14 sm:pt-18 lg:pt-20 2xl:pt-24 pb-10 sm:pb-14 2xl:pb-16 overflow-hidden text-center">
        <Container size="narrow">
          {/* Eyebrow */}
          <Skeleton className="h-3 w-52 mx-auto" />
          {/* Title */}
          <Skeleton className="h-10 sm:h-12 lg:h-14 2xl:h-16 w-4/5 sm:w-3/4 lg:w-2/3 mx-auto mt-4" />
        </Container>
      </section>

      {/* ── Tier cards skeleton — mirrors PartnersTierCards ──
            section: bg-background pt-8 sm:pt-12 pb-16 sm:pb-20
            grid: grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 xl:grid-cols-3
            max-w per card: max-w-98 xl:max-w-md 2xl:max-w-150 mx-auto lg:mx-0
      ── */}
      <section className="bg-background pt-8 sm:pt-12 pb-16 sm:pb-20">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full max-w-98 xl:max-w-md 2xl:max-w-150 mx-auto lg:mx-0 h-full">
                <TierCardSkeleton />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Confirmed partners skeleton — mirrors ConfirmedPartners ──
            section: bg-[#1F1B15] py-16 sm:py-20 lg:py-24 2xl:py-32
            header row: flex flex-col justify-between gap-4 sm:flex-row sm:items-end mb-10
              left: heading (text-[28px]→text-[56px]) + subtitle
              right: "Excellence Through Collaboration" caption (sm:shrink-0)
            grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 2xl:gap-12
      ── */}
      <section className="bg-[#1F1B15] py-16 sm:py-20 lg:py-24 2xl:py-32">
        <Container size="wide">
          {/* Header row */}
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            {/* Left: heading + subtitle */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-9 sm:h-10 lg:h-12 2xl:h-14 w-48 sm:w-56 lg:w-64" />
              <Skeleton className="h-4 2xl:h-5 w-72 sm:w-96 max-w-lg" />
            </div>
            {/* Right: caption label (sm:shrink-0) */}
            <Skeleton className="hidden sm:block h-3 2xl:h-4 w-52 shrink-0" />
          </div>

          {/* Partner cards grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-8 2xl:gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-full">
                <PartnerCardSkeleton />
              </div>
            ))}
          </div>
        </Container>
      </section>

    </div>
  );
}
