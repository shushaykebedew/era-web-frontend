export type AwardCategory = {
  slug: string;
  name: string;
  group:
    | "Residential"
    | "Commercial"
    | "Sustainability"
    | "Culture"
    | "Interior"
    | "Emerging";
  tagline: string;
  description: string;
  icon:
    | "cat-icon-1"
    | "cat-icon-2"
    | "cat-icon-3"
    | "cat-icon-4"
    | "cat-icon-5";
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

export type Partner = {
  name: string;
  logo?: string;
  href?: string;
};
