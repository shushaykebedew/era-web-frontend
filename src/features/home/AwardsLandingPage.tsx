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
          "relative -mt-20 flex w-full min-w-0 flex-col bg-cover bg-center bg-no-repeat",
          "min-h-[480px] sm:min-h-[600px] lg:min-h-[720px] xl:min-h-[820px] 2xl:min-h-[1024px]",
        )}
        style={{
          backgroundImage: "url(/imgs/hero-image.png)",
        }}
      >
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
