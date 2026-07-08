import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { nominees, getNomineeById } from "@/data/nominees";
import { awardCategories } from "@/data/award-categories";
import { NomineeDetailShell } from "@/features/nominees/NomineeDetailShell";
import { NomineePageProps } from "@/types/marketing";

export function generateStaticParams() {
  return nominees.map((n) => ({ id: n.id }));
}

export async function generateMetadata({
  params,
}: NomineePageProps): Promise<Metadata> {
  const { id } = await params;
  const nominee = getNomineeById(id);
  return { title: nominee ? nominee.name : "Nominee" };
}

export default async function NomineeDetailPage({ params }: NomineePageProps) {
  const { id } = await params;
  const nominee = getNomineeById(id);
  if (!nominee) notFound();

  const category = awardCategories.find((c) => c.id === nominee.categoryId);
  const currentIndex = nominees.findIndex((n) => n.id === id);
  const prevId = currentIndex > 0 ? nominees[currentIndex - 1].id : undefined;
  const nextId =
    currentIndex < nominees.length - 1
      ? nominees[currentIndex + 1].id
      : undefined;

  return (
    <NomineeDetailShell
      nominee={nominee}
      category={category}
      prevId={prevId}
      nextId={nextId}
    />
  );
}
