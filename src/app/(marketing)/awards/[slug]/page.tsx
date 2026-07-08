import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AwardCategoryPageContent } from "@/features/awards/AwardCategoryPageContent";
import { awardCategories, getCategoryById } from "@/data/award-categories";
import { getNomineesByCategory } from "@/data/nominees";
import { AwardPageProps } from "@/types/marketing";

export function generateStaticParams() {
  return awardCategories.map((category) => ({ id: category.id }));
}

export async function generateMetadata({
  params,
}: AwardPageProps): Promise<Metadata> {
  const { id } = await params;
  const category = getCategoryById(id);
  return { title: category ? `${category.name} Nominees` : "Award Category" };
}

export default async function AwardCategoryPage({ params }: AwardPageProps) {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) notFound();

  return (
    <AwardCategoryPageContent
      category={category}
      nominees={getNomineesByCategory(id)}
    />
  );
}
