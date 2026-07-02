import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { nominees, getNomineeBySlug } from "@/data/nominees";
import { awardCategories } from "@/data/award-categories";
import { NomineeDetailShell } from "@/components/sections/nominees/NomineeDetailShell";

type NomineePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return nominees.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: NomineePageProps): Promise<Metadata> {
  const { slug } = await params;
  const nominee = getNomineeBySlug(slug);
  return { title: nominee ? nominee.name : "Nominee" };
}

export default async function NomineeDetailPage({ params }: NomineePageProps) {
  const { slug } = await params;
  const nominee = getNomineeBySlug(slug);
  if (!nominee) notFound();

  const category = awardCategories.find((c) => c.slug === nominee.categorySlug);
  const currentIndex = nominees.findIndex((n) => n.slug === slug);
  const prevSlug = currentIndex > 0 ? nominees[currentIndex - 1].slug : undefined;
  const nextSlug = currentIndex < nominees.length - 1 ? nominees[currentIndex + 1].slug : undefined;

  return (
    <NomineeDetailShell
      nominee={nominee}
      category={category}
      prevSlug={prevSlug}
      nextSlug={nextSlug}
    />
  );
}
