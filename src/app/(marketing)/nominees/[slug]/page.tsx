import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, Leaf, Wind } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { nominees, getNomineeBySlug } from "@/data/nominees";

type NomineePageProps = { params: Promise<{ slug: string }> };

const ACHIEVEMENT_ICONS = [Award, Leaf, Wind];

export function generateStaticParams() {
  return nominees.map((nominee) => ({ slug: nominee.slug }));
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

  const badgeVariant = nominee.status === "past-winner" ? "past-winner" : "nominee";
  const badgeLabel = nominee.status === "past-winner" ? "Past Winner" : "Nominee";

  return (
    <>
      <section className="bg-background pb-24 pt-40">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant={badgeVariant} className="mb-4">
              {badgeLabel}
            </Badge>
            <h1 className="font-display text-5xl font-bold leading-tight sm:text-6xl">
              {nominee.name}
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-foreground-muted">
              {nominee.firm}
              {nominee.location ? ` · ${nominee.location}` : ""}
            </p>

            <p className="mt-6 text-base leading-relaxed text-foreground-muted">
              {nominee.description}
            </p>

            {(nominee.scaleSqm || nominee.completionDate) && (
              <div className="mt-8 flex gap-10 border-t border-border pt-6">
                {nominee.scaleSqm && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Scale</p>
                    <p className="mt-1 font-display text-lg font-bold">
                      {nominee.scaleSqm.toLocaleString()} SQM
                    </p>
                  </div>
                )}
                {nominee.completionDate && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Completion
                    </p>
                    <p className="mt-1 font-display text-lg font-bold">
                      {new Date(nominee.completionDate).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>
            )}

            <Button className="mt-8">Vote For This Project</Button>
          </div>

          <div className="aspect-[3/4] w-full max-w-md justify-self-center border border-border-strong bg-background-elevated lg:justify-self-end" />
        </Container>
      </section>

      {nominee.achievements && nominee.achievements.length > 0 && (
        <section className="border-t border-border bg-background py-24">
          <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-8 text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                Key Achievements
              </p>
              <ul className="space-y-6">
                {nominee.achievements.map((achievement, index) => {
                  const Icon = ACHIEVEMENT_ICONS[index % ACHIEVEMENT_ICONS.length];
                  return (
                    <li key={achievement.title} className="flex gap-4">
                      <Icon className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.5} />
                      <div>
                        <p className="font-semibold text-foreground">{achievement.title}</p>
                        <p className="mt-1 text-sm text-foreground-muted">
                          {achievement.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {nominee.quote && (
              <blockquote className="font-display text-2xl italic leading-snug text-foreground sm:text-3xl">
                &ldquo;{nominee.quote}&rdquo;
              </blockquote>
            )}
          </Container>
        </section>
      )}

      <section className="border-t border-border bg-background-muted py-24 text-center">
        <Container size="narrow">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Cast Your Vote</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-foreground-muted">
            Your voice defines the standard of excellence for the next generation of Ethiopian
            architecture.
          </p>
          <Button as={Link} href="/nominees" className="mt-8">
            Vote Now
          </Button>
        </Container>
      </section>
    </>
  );
}
