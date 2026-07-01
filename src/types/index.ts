/**
 * Domain types shared across the app. Co-locating these keeps `data/*`
 * fixtures, server fetchers, and components in sync as the schema evolves —
 * when the design firms up (e.g. a real CMS/API), only `data/` and these
 * types need to change; components consuming them stay the same.
 */

export type AwardCategory = {
  slug: string;
  name: string;
  group: "Residential" | "Commercial" | "Sustainability" | "Culture" | "Interior" | "Emerging";
  tagline: string;
  description: string;
  icon: "compass" | "building" | "leaf" | "landmark" | "interior" | "spark";
  nomineeCount: number;
  coverImage?: string;
};

export type NomineeStatus = "nominee" | "past-winner" | "shortlisted";

export type Nominee = {
  slug: string;
  name: string;
  firm: string;
  location: string;
  categorySlug: string;
  status: NomineeStatus;
  excerpt: string;
  description: string;
  coverImage?: string;
  gallery?: string[];
  scaleSqm?: number;
  completionDate?: string;
  quote?: string;
  achievements?: { title: string; description: string }[];
  votes?: number;
};

export type TimelineMilestone = {
  period: string;
  title: string;
  description: string;
  icon: "draft" | "gavel" | "vote" | "gala" | "trophy";
};

export type ValuePillar = {
  title: string;
  description: string;
};

export type Partner = {
  name: string;
  logo?: string;
  href?: string;
};
