import Image from "next/image";
import { cn } from "@/utils/cn";
import { PartnersStrip } from "@/features/partners/PartnersStrip";
import { Hero } from "./Hero";
import { AwardCategoriesSection } from "./AwardCategoriesSection";
import { FeaturedNominees } from "./FeaturedNominees";
import { NewsletterCta } from "./NewsletterCta";
import TimeCounter from "./TimeCounter";
import type { AwardCategory, Nominee, Partner } from "@/types";

export function Home({
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
