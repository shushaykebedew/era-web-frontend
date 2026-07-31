import { useQuery } from "@tanstack/react-query";
import { fetchNominees, fetchNomineeById } from "@/services/nominees";
import { fetchCategories } from "@/services/categories";
import type { Nominee, AwardCategory } from "@/types";

// ── Query keys ─────────────────────────────────────────────────────────────────
// Centralised so invalidations and cache lookups are always in sync.
export const nomineeKeys = {
  all: ["nominees"] as const,
  detail: (id: string) => ["nominees", id] as const,
};

export const categoryKeys = {
  all: ["categories"] as const,
  detail: (id: string) => ["categories", id] as const,
};

// ── useNominees ────────────────────────────────────────────────────────────────
export function useNominees() {
  return useQuery<Nominee[]>({
    queryKey: nomineeKeys.all,
    queryFn: fetchNominees,
  });
}

// ── useNomineeDetail ───────────────────────────────────────────────────────────
export function useNomineeDetail(id: string) {
  return useQuery<Nominee | null>({
    queryKey: nomineeKeys.detail(id),
    queryFn: () => fetchNomineeById(id),
    enabled: !!id,
  });
}

// ── useCategories ──────────────────────────────────────────────────────────────
export function useCategories() {
  return useQuery<AwardCategory[]>({
    queryKey: categoryKeys.all,
    queryFn: fetchCategories,
  });
}
