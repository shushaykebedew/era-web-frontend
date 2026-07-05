import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AwardCategoryPageContent } from "@/features/awards/AwardCategoryPageContent";
import { awardCategories, getCategoryBySlug } from "@/data/award-categories";
import { getNomineesByCategory } from "@/data/nominees";

type AwardPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return awardCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: AwardPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return { title: category ? `${category.name} Nominees` : "Award Category" };
}

export default async function AwardCategoryPage({ params }: AwardPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <AwardCategoryPageContent
      category={category}
      nominees={getNomineesByCategory(slug)}
    />
  );
}
