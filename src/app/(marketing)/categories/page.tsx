import type { Metadata } from "next";
import { CategoriesPageContent } from "@/features/categories/CategoriesPageContent";

export const metadata: Metadata = {
  title: "Award Categories",
  description: "Explore every Ethiopia Real Estate Awards category.",
};

export default function CategoriesPage() {
  return <CategoriesPageContent />;
}
