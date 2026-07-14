import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AwardCategoryPageContent } from "@/features/awards/AwardCategoryPageContent";
import { fetchCategories, fetchCategoryById } from "@/services/categories";
import { fetchNominees } from "@/services/nominees";
import { AwardPageProps } from "@/types/marketing";

export async function generateStaticParams() {
  const categories = await fetchCategories();
  return categories.map((category) => ({ id: category.id }));
}

export async function generateMetadata({
  params,
}: AwardPageProps): Promise<Metadata> {
  const { id } = await params;
  const category = await fetchCategoryById(id);
  return { title: category ? `${category.name} Nominees` : "Award Category" };
}

export default async function AwardCategoryPage({ params }: AwardPageProps) {
  const { id } = await params;
  const [category, allNominees] = await Promise.all([
    fetchCategoryById(id),
    fetchNominees(),
  ]);

  if (!category) notFound();

  const categoryNominees = allNominees.filter((n) => n.categoryId === id);

  return (
    <AwardCategoryPageContent
      category={category}
      nominees={categoryNominees}
    />
  );
}
