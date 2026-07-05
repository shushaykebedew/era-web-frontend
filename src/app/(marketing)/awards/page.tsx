import { AwardsLandingPage } from "@/features/home/AwardsLandingPage";
import { awardCategories } from "@/data/award-categories";
import { getFeaturedNominees } from "@/data/nominees";
import { partners } from "@/data/content";

export default function HomePage() {
  return (
    <AwardsLandingPage
      categories={awardCategories}
      featuredNominees={getFeaturedNominees(3)}
      partners={partners}
    />
  );
}
