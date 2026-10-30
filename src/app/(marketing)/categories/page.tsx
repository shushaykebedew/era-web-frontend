import type { Metadata } from "next";
import { CategoriesPageContent } from "@/features/categories/CategoriesPageContent";
import { fetchCategories } from "@/services/categories";
import type { AwardCategory } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Award Categories",
  description: "Explore every Ethiopia Real Estate Awards category.",
};

export default async function CategoriesPage() {
  let categories: AwardCategory[] = [];
  try {
    categories = await fetchCategories();
  } catch {
    categories = [];
  }

  return <CategoriesPageContent initialCategories={categories} />;
}
