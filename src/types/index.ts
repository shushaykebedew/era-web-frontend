export type AwardTargetType = {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  isActive?: boolean;
};

export const AWARD_TARGET_TYPES: AwardTargetType[] = [
  { id: "project", name: "Project", code: "PROJECT" },
  { id: "company", name: "Company", code: "COMPANY" },
  { id: "person", name: "Person", code: "PERSON" },
  { id: "product", name: "Product", code: "PRODUCT" },
  { id: "profile", name: "Profile", code: "PROFILE" },
  { id: "property", name: "Property", code: "PROPERTY" },
];

export type AwardCategory = {
  id: string;
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
  targetType?: string | null;
};

export type NomineeStatus = "nominee" | "past-winner" | "shortlisted";

export type Nominee = {
  id: string;
  name: string;
  firm: string;
  location: string;
  categoryId: string;
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
  id?: string;
  name: string;
  logo?: string | null;
  href?: string;
  website?: string | null;
  description?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  status?: string;
  tier?: string;
};

// API Response Types
export type ApiNomineeResponse = {
  id: string;
  name?: string;
  firm?: string | null;
  location?: string | null;
  awardCategoryId?: string;
  categoryId?: string;
  status?: string;
  excerpt?: string | null;
  description?: string | null;
  coverImage?: string | null;
  gallery?: string[] | null;
  scaleSqm?: number | null;
  completionDate?: string | null;
  quote?: string | null;
  achievements?: { title: string; description: string }[] | null;
  votes?: number;
  _count?: {
    publicVotes?: number;
  };
};

export type ApiCategoryResponse = {
  id?: string;
  name?: string;
  group?: string;
  tagline?: string;
  description?: string | null;
  icon?: string;
  nomineeCount?: number;
  coverImage?: string | null;
  targetType?: string | null;
};

export type ApiAwardEventResponse = {
  id: string;
  status: string;
};
