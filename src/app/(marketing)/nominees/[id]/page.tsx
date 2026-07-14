import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchNominees, fetchNomineeById } from "@/services/nominees";
import { fetchCategoryById } from "@/services/categories";
import { NomineeDetailShell } from "@/features/nominees/NomineeDetailShell";
import { NomineePageProps } from "@/types/marketing";

export async function generateStaticParams() {
  const list = await fetchNominees();
  return list.map((n) => ({ id: n.id }));
}

export async function generateMetadata({
  params,
}: NomineePageProps): Promise<Metadata> {
  const { id } = await params;
  const nominee = await fetchNomineeById(id);
  return { title: nominee ? nominee.name : "Nominee" };
}

export default async function NomineeDetailPage({ params }: NomineePageProps) {
  const { id } = await params;
  const nominee = await fetchNomineeById(id);
  if (!nominee) notFound();

  const category = nominee.categoryId 
    ? await fetchCategoryById(nominee.categoryId) 
    : null;

  const allNominees = await fetchNominees();
  const currentIndex = allNominees.findIndex((n) => n.id === id);
  const prevId = currentIndex > 0 ? allNominees[currentIndex - 1].id : undefined;
  const nextId =
    currentIndex < allNominees.length - 1
      ? allNominees[currentIndex + 1].id
      : undefined;

  return (
    <NomineeDetailShell
      nominee={nominee}
      category={category || undefined}
      prevId={prevId}
      nextId={nextId}
    />
  );
}
