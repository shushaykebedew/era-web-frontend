import { Hero } from "@/components/sections/Hero";
import { AwardCategoriesSection } from "@/components/sections/AwardCategoriesSection";
import { FeaturedNominees } from "@/components/sections/FeaturedNominees";
import { PartnersStrip } from "@/components/sections/PartnersStrip";
import { NewsletterCta } from "@/components/sections/NewsletterCta";
import { awardCategories } from "@/data/award-categories";
import { getFeaturedNominees } from "@/data/nominees";
import { partners } from "@/data/content";
import TimeCounter from "@/components/sections/TimeCounter";

export default function HomePage() {
  return (
    <>
      <div
        className="relative -mt-20 flex flex-col bg-cover bg-center bg-no-repeat min-h-[480px] sm:min-h-[600px] lg:min-h-[900px] w-full"
        style={{
          backgroundImage: "url(/imgs/hero-image.png)",
        }}
      >
        {/* Spacer that offsets the negative margin so hero content sits below the header */}
        <div className="h-20" aria-hidden />
        <Hero />
      </div>
      <TimeCounter />
      <AwardCategoriesSection categories={awardCategories} variant="teaser" />
      <FeaturedNominees nominees={getFeaturedNominees(3)} />
      <PartnersStrip partners={partners} />
      <NewsletterCta />
    </>
  );
}
