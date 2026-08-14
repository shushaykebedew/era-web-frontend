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
};

export type NomineeStatus =
  | "draft"
  | "submitted"
  | "expired"
  | "nominee"
  | "past-winner"
  | "shortlisted"
  | "approved"
  | "rejected";

export type Nominee = {
  id: string;
  name: string;
  email: string;
  contactPerson: string;
  phone?: string;
  categoryId: string;
  category?: { id: string; name: string };
  status: NomineeStatus;
  reason: string;
  website?: string;
  logo?: string;
  paymentSlip?: string;
  submittedAt?: string;
  continuationTokenExpiresAt?: string;
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
  email?: string;
  contactPerson?: string;
  phone?: string | null;
  awardCategoryId?: string;
  categoryId?: string;
  awardCategory?: { id: string; name: string };
  status?: string;
  reason?: string | null;
  website?: string | null;
  logo?: string | null;
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
  isActive?: boolean;
};

export type ApiAwardEventResponse = {
  id: string;
  status: string;
};
