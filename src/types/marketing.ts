import type { AwardCategory } from "./index";

export type NavLink = {
  label: string;
  href: string;
};

export type AwardCategoriesSectionProps = {
  categories: AwardCategory[];
  /** Homepage shows a teaser with a "view all" link; the categories page shows everything. */
  variant?: "teaser" | "full";
};

export type CategoryCardProps = {
  category: AwardCategory;
  variant?: "compact" | "feature";
};

export type HeroProps = {
  eyebrow?: string;
  title?: string;
  highlightedWord?: string;
  description?: string;
};

export type NewsletterCtaProps = {
  title?: string;
  description?: string;
};

export type AwardPageProps = { params: Promise<{ id: string }> };
export type NomineePageProps = { params: Promise<{ id: string }> };
