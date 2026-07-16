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
    "cat-icon-1" | "cat-icon-2" | "cat-icon-3" | "cat-icon-4" | "cat-icon-5";
  nomineeCount: number;
  coverImage?: string;
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
  name: string;
  logo?: string;
  href?: string;
};

// API Response Types
export type ApiNomineeResponse = {
  id: string;
  name?: string;
  firm?: string;
  location?: string;
  awardCategoryId?: string;
  categoryId?: string;
  status?: string;
  excerpt?: string;
  description?: string;
  coverImage?: string;
  gallery?: string[];
  scaleSqm?: number;
  completionDate?: string;
  quote?: string;
  achievements?: { title: string; description: string }[];
  votes?: number;
  _count?: {
    publicVotes?: number;
  };
  target?: {
    name?: string;
    firm?: string;
    company?: { name?: string };
    developer?: string;
    location?: string;
    city?: string;
    excerpt?: string;
    description?: string;
    coverImage?: string;
    image?: string;
    gallery?: string[];
    scaleSqm?: number;
    completionDate?: string;
    quote?: string;
    achievements?: { title: string; description: string }[];
  };
};

export type ApiCategoryResponse = {
  id?: string;
  name?: string;
  group?: string;
  tagline?: string;
  description?: string;
  icon?: string;
  nomineeCount?: number;
  coverImage?: string;
};

export type ApiAwardEventResponse = {
  id: string;
  status: string;
};

