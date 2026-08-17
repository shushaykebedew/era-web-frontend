import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/ui/Container";

// ── NomineeCardSkeleton ───────────────────────────────────────────────────────
// Mirrors NomineeCard "featured" variant (same structure as grid variant):
//   flex flex-col h-full bg-[#0f0d0a] border border-primary/20 rounded-xl overflow-hidden
//   image area | p-5 2xl:p-7 text block | footer row
function NomineeCardSkeleton() {
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

// ── FeatureCategoryCardSkeleton ───────────────────────────────────────────────
// Mirrors CategoryCard "feature" variant:
//   relative flex min-h-50 sm:min-h-60 lg:min-h-65 2xl:min-h-80
//   flex-col justify-end overflow-hidden bg-[#13110e] p-6 sm:p-8 lg:p-10
//   border border-primary/20 rounded-lg
//   contents (bottom): tiny eyebrow label | h3 title | link text
function FeatureCategoryCardSkeleton() {
  return (
    <div className="relative flex min-h-50 sm:min-h-60 lg:min-h-65 2xl:min-h-80 flex-col justify-end overflow-hidden bg-[#13110e] p-6 sm:p-8 lg:p-10 border border-primary/20 rounded-lg">
      {/* Bottom-anchored content block */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-3 w-36" />
        <Skeleton className="h-7 sm:h-8 2xl:h-10 w-3/4" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
}

// ── SectionHeadingRowSkeleton ─────────────────────────────────────────────────
// Mirrors the heading row used in both AwardCategoriesSection (teaser) and
// FeaturedNominees:
//   flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end
//   left: SectionHeading (h2 + description)
//   right: "View All …" link text (shrink-0, hidden below sm via sm:block)
function SectionHeadingRowSkeleton() {
  return (
    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
      {/* Left — SectionHeading: h2 bold text-3xl→text-[64px] + description */}
      <div className="flex flex-col gap-3">
        <Skeleton className="h-9 sm:h-11 lg:h-14 2xl:h-16 w-56 sm:w-72 lg:w-80 2xl:w-96" />
        <Skeleton className="h-4 2xl:h-5 w-72 sm:w-96 max-w-lg" />
        <Skeleton className="h-4 2xl:h-5 w-52 sm:w-72 max-w-lg" />
      </div>
      {/* Right — "View All …" link */}
      <Skeleton className="hidden sm:block h-3 2xl:h-4 w-40 shrink-0" />
    </div>
  );
}

export default function AwardsLoading() {
  return (
    <div className="bg-background min-h-screen">

      {/* ── Hero skeleton ──────────────────────────────────────────────────────
            Real: relative -mt-20 flex w-full min-w-0 flex-col
              min-h-120 sm:min-h-150 lg:min-h-180 xl:min-h-205 2xl:min-h-256
            + Hero centred content:
                eyebrow pill | h1 (two lines) | description | two CTA buttons
            We render a dark full-bleed section at the same min-heights and
            place skeleton content centred inside.
      ── */}
      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#0c0c0e] min-h-120 sm:min-h-150 lg:min-h-180 xl:min-h-205 2xl:min-h-256">
        <Container size="wide" className="flex flex-col items-center text-center gap-0">
          {/* Eyebrow pill: rounded-full border h-6 */}
          <Skeleton className="h-6 2xl:h-8 w-48 2xl:w-64 rounded-full mb-6 2xl:mb-10" />
          {/* h1: text-[26px] sm:text-4xl md:text-6xl lg:text-[60px] 2xl:text-[88px], two lines */}
          <Skeleton className="h-9 sm:h-12 md:h-16 lg:h-18 2xl:h-24 w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl 2xl:max-w-5xl" />
          <Skeleton className="h-9 sm:h-12 md:h-16 lg:h-18 2xl:h-24 w-4/5 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl mt-2" />
          {/* Description: mt-6 max-w-lg md:max-w-164.5 */}
          <div className="mt-6 flex flex-col items-center gap-2 w-full max-w-lg md:max-w-2xl">
            <Skeleton className="h-4 2xl:h-6 w-full" />
            <Skeleton className="h-4 2xl:h-6 w-4/5" />
          </div>
          {/* Two CTA buttons */}
          <div className="mt-10 2xl:mt-16 flex flex-col sm:flex-row items-center gap-4 2xl:gap-6 w-full max-w-sm sm:max-w-none sm:justify-center">
            <Skeleton className="h-12 2xl:h-18 w-full sm:w-40 2xl:w-60" />
            <Skeleton className="h-12 2xl:h-18 w-full sm:w-52 2xl:w-80" />
          </div>
        </Container>
      </section>

      {/* ── TimeCounter skeleton ───────────────────────────────────────────────
            Real: bg-[#110E08] border-y border-primary/10
              min-h-45 sm:min-h-55 xl:min-h-66.5 2xl:min-h-85
            contents: centred label + 4 countdown units (DD : HH : MM : SS)
      ── */}
      <div className="relative z-10 min-h-45 sm:min-h-55 xl:min-h-66.5 2xl:min-h-85 border-y border-primary/10 bg-[#110E08] flex items-center py-10 sm:py-12 xl:py-0">
        <Container className="text-center flex flex-col items-center gap-8 2xl:gap-12">
          {/* "ERA CEREMONY BEGINS IN" label */}
          <Skeleton className="h-3 xl:h-4 2xl:h-6 w-52 xl:w-64 2xl:w-80" />
          {/* 4 countdown units: each is a large number + small label, separated by colons */}
          <div className="flex items-start justify-center gap-1.5 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-16 2xl:gap-24 flex-wrap px-2 sm:px-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-1.5 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-16 2xl:gap-24">
                <div className="flex flex-col items-center gap-2">
                  {/* Number: text-2xl → text-[96px] */}
                  <Skeleton className="h-8 sm:h-11 lg:h-14 xl:h-18 2xl:h-24 w-10 sm:w-14 lg:w-18 xl:w-22 2xl:w-28" />
                  {/* Label */}
                  <Skeleton className="h-2.5 2xl:h-4 w-8 2xl:w-12" />
                </div>
                {/* Colon separator (not after last) */}
                {i < 3 && (
                  <Skeleton className="h-8 sm:h-11 lg:h-14 xl:h-18 2xl:h-24 w-3 sm:w-4 lg:w-5 2xl:w-6 mt-0" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ── AwardCategoriesSection teaser skeleton ─────────────────────────────
            Real: bg-[#0c0c0e] py-16 sm:py-20 lg:py-24 2xl:py-32
            heading row (SectionHeading + "View All" link)
            mt-12 2xl:mt-16 asymmetric 2-row flex layout:
              Row 1: card (flex-[802]) | card (flex-[390]), gap-3 2xl:gap-5
              Row 2: card (flex-[390]) | card (flex-[802]), gap-3 2xl:gap-5
            Both rows wrapped in flex-col gap-3 2xl:gap-5
      ── */}
      <section className="relative bg-[#0c0c0e] py-16 sm:py-20 lg:py-24 2xl:py-32 overflow-hidden">
        <Container size="wide">
          <SectionHeadingRowSkeleton />
          <div className="mt-12 2xl:mt-16 flex flex-col gap-3 2xl:gap-5">
            {/* Row 1: wide | narrow */}
            <div className="flex min-w-0 flex-col gap-3 2xl:gap-5 md:flex-row">
              <div className="w-full md:flex-[802_802_0%]">
                <FeatureCategoryCardSkeleton />
              </div>
              <div className="w-full md:flex-[390_390_0%]">
                <FeatureCategoryCardSkeleton />
              </div>
            </div>
            {/* Row 2: narrow | wide */}
            <div className="flex min-w-0 flex-col gap-3 2xl:gap-5 md:flex-row">
              <div className="w-full md:flex-[390_390_0%]">
                <FeatureCategoryCardSkeleton />
              </div>
              <div className="w-full md:flex-[802_802_0%]">
                <FeatureCategoryCardSkeleton />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FeaturedNominees skeleton ──────────────────────────────────────────
            Real: bg-[#1F1B15] py-16 sm:py-20 lg:py-24 2xl:py-32
            heading row (SectionHeading + "View All Nominees" link)
            mt-12 2xl:mt-16 grid grid-cols-1 gap-6 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3
      ── */}
      <section className="relative bg-[#1F1B15] py-16 sm:py-20 lg:py-24 2xl:py-32 overflow-hidden">
        <Container size="wide">
          <SectionHeadingRowSkeleton />
          <div className="mt-12 2xl:mt-16 grid grid-cols-1 gap-6 2xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <NomineeCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── PartnersStrip skeleton ─────────────────────────────────────────────
            Real: bg-background py-16
            centred label + flex-wrap row of partner name text items
      ── */}
      <section className="bg-background py-16">
        <div className="w-full mx-auto min-w-0 px-8 lg:px-10 xl:px-12 2xl:px-16 max-w-7xl 2xl:max-w-screen-2xl">
          <Skeleton className="h-3 2xl:h-4 w-28 2xl:w-36 mx-auto mb-10 2xl:mb-16" />
          <div className="flex bg-[#141311] flex-wrap items-center justify-center py-8 2xl:py-12 px-4 gap-x-8 sm:gap-x-14 2xl:gap-x-20 gap-y-8 sm:gap-y-12 2xl:gap-y-16 rounded-xl border border-primary/10">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-7 sm:h-9 xl:h-10 2xl:h-12"
                style={{ width: [120, 96, 140, 108, 130][i] }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── NewsletterCta skeleton ─────────────────────────────────────────────
            Real: bg-[#0c0c0e] py-16 sm:py-20 lg:py-24 2xl:py-32
            Container size="narrow" text-center
            icon circle | h2 heading | description | email input + button row
      ── */}
      <section className="relative bg-[#0c0c0e] py-16 sm:py-20 lg:py-24 2xl:py-32 overflow-hidden">
        <Container size="narrow" className="text-center flex flex-col items-center">
          {/* Icon circle */}
          <Skeleton className="h-12 w-12 2xl:h-16 2xl:w-16 rounded-full mb-5 2xl:mb-8" />
          {/* Heading: text-[32px] sm:text-[40px] lg:text-[48px] 2xl:text-[64px] */}
          <Skeleton className="h-9 sm:h-11 lg:h-14 2xl:h-16 w-64 sm:w-80 lg:w-96 2xl:w-120" />
          {/* Description */}
          <div className="mt-4 flex flex-col items-center gap-2 w-full max-w-lg 2xl:max-w-200">
            <Skeleton className="h-4 2xl:h-6 w-full" />
            <Skeleton className="h-4 2xl:h-6 w-4/5" />
          </div>
          {/* Email input + button row */}
          <div className="mt-8 2xl:mt-12 flex flex-col sm:flex-row gap-4 2xl:gap-6 w-full max-w-158 2xl:max-w-200">
            <Skeleton className="h-12.5 2xl:h-18 flex-1" />
            <Skeleton className="h-12.5 2xl:h-18 w-full sm:w-44 2xl:w-72 shrink-0" />
          </div>
        </Container>
      </section>

    </div>
  );
}
