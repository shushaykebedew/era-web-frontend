import Image from "next/image";
import { Hero } from "@/features/home/Hero";
import { AwardCategoriesSection } from "@/features/awards/AwardCategoriesSection";
import { FeaturedNominees } from "@/features/awards/FeaturedNominees";
import { PartnersStrip } from "@/features/partners/PartnersStrip";
import { NewsletterCta } from "@/features/home/NewsletterCta";
import TimeCounter from "@/features/home/TimeCounter";
import type { AwardCategory, Nominee, Partner } from "@/types";
import { cn } from "@/utils/cn";

export function AwardsLandingPage({
  categories,
  featuredNominees,
  partners,
}: {
  categories: AwardCategory[];
  featuredNominees: Nominee[];
  partners: Partner[];
}) {
  return (
    <>
      <div
        className={cn(
          "relative -mt-20 flex w-full min-w-0 flex-col",
          "min-h-120 sm:min-h-150 lg:min-h-180 xl:min-h-205 2xl:min-h-256",
        )}
      >
        <Image
          src="/imgs/hero-img.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12, 12, 14, 0.4) 0%, #0C0C0E 100%)",
          }}
          aria-hidden
        />
        {/* Spacer that offsets the negative margin so hero content sits below the header */}
        <div className="h-20" aria-hidden />
        <Hero />
      </div>
      <TimeCounter />
      <AwardCategoriesSection categories={categories} variant="teaser" />
      <FeaturedNominees nominees={featuredNominees} />
      <PartnersStrip partners={partners} />
      <NewsletterCta />
    </>
  );
}
