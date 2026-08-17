import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AwardCategoryPageContent } from "@/features/categories/AwardCategoryPageContent";
import { fetchCategories, fetchCategoryById } from "@/services/categories";
import { fetchNomineesList } from "@/services/nominees";
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
  const [category, categoryNominees] = await Promise.all([
    fetchCategoryById(id),
    fetchNomineesList({ categoryId: id, limit: 50 }),
  ]);

  if (!category) notFound();

  return (
    <AwardCategoryPageContent category={category} nominees={categoryNominees} />
  );
}
