import { AwardsLandingPage } from "@/features/home/AwardsLandingPage";
import { partners } from "@/data/content";
import { fetchNominees } from "@/services/nominees";
import { fetchCategories } from "@/services/categories";

export default async function HomePage() {
  const [allNominees, categories] = await Promise.all([
    fetchNominees(),
    fetchCategories(),
  ]);

  const featuredNominees = allNominees.slice(0, 3);

  return (
    <AwardsLandingPage
      categories={categories}
      featuredNominees={featuredNominees}
      partners={partners}
    />
  );
}
