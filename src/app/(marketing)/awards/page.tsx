import { Home } from "@/features/home/Home";
import { partners } from "@/data/content";
import { fetchNomineesList } from "@/services/nominees";
import { fetchCategories } from "@/services/categories";

export default async function HomePage() {
  const [featuredNominees, categories] = await Promise.all([
    fetchNomineesList({ limit: 3 }),
    fetchCategories(),
  ]);

  return (
    <Home
      categories={categories}
      featuredNominees={featuredNominees}
      partners={partners}
    />
  );
}
