import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { NomineeCard } from "@/components/sections/NomineeCard";
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

  const categoryNominees = getNomineesByCategory(slug);

  return (
    <section className="bg-background pb-24 pt-40">
      <Container>
        <Link
          href="/awards"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Categories
        </Link>

        <div className="mt-8 max-w-2xl border-l-2 border-primary pl-6">
          <Eyebrow className="mb-3">Excellence in Architecture</Eyebrow>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            {category.group}
          </h1>
          <p className="font-display text-3xl italic text-primary sm:text-4xl">
            {category.name}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
            {category.description}
          </p>
        </div>

        <div className="mt-16">
          {categoryNominees.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoryNominees.map((nominee) => (
                <NomineeCard key={nominee.slug} nominee={nominee} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground-muted">
              Nominees for this category will be announced soon.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
