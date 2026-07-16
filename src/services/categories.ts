import { api } from "./api";
import { awardCategories as mockCategories } from "@/data/award-categories";
import { AwardCategory, ApiCategoryResponse } from "@/types";

function normaliseName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\b(award|prize|gold|trophy|studio|pinnacle|hub|vanguard)\b/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function findMockMatch(apiItem: ApiCategoryResponse): AwardCategory | undefined {
  const byId = mockCategories.find((m) => m.id === apiItem.id);
  if (byId) return byId;

  const apiNorm = normaliseName(apiItem.name || "");
  const byExact = mockCategories.find((m) => normaliseName(m.name) === apiNorm);
  if (byExact) return byExact;

  const apiWords = new Set(apiNorm.split(" ").filter(Boolean));
  let best: AwardCategory | undefined;
  let bestScore = 0;
  for (const m of mockCategories) {
    const score = normaliseName(m.name)
      .split(" ")
      .filter((w) => apiWords.has(w)).length;
    if (score > bestScore) { bestScore = score; best = m; }
  }
  return best;
}

function mapApiCategory(apiItem: ApiCategoryResponse, localMatch?: AwardCategory): AwardCategory {
  const validIcons: AwardCategory["icon"][] = ["cat-icon-1", "cat-icon-2", "cat-icon-3", "cat-icon-4", "cat-icon-5"];
  const icon = apiItem.icon || localMatch?.icon || "cat-icon-1";
  const safeIcon = validIcons.includes(icon as AwardCategory["icon"]) ? icon as AwardCategory["icon"] : "cat-icon-1";

  return {
    id: apiItem.id || localMatch?.id || "",
    name: apiItem.name || localMatch?.name || "Award Category",
    group: (apiItem.group || localMatch?.group || "Residential") as AwardCategory["group"],
    tagline: apiItem.tagline || localMatch?.tagline || apiItem.group || "Residential",
    description: apiItem.description || localMatch?.description || "",
    icon: safeIcon,
    nomineeCount: apiItem.nomineeCount ?? localMatch?.nomineeCount ?? 0,
    coverImage: apiItem.coverImage || localMatch?.coverImage,
  };
}

let categoriesCache: AwardCategory[] | null = null;

export async function fetchCategories(): Promise<AwardCategory[]> {
  if (categoriesCache) return categoriesCache;
  try {
    const res = await api.get("/award-categories");
    if (res.data?.success) {
      const mapped = res.data.data.map((item: any) => mapApiCategory(item, findMockMatch(item)));
      categoriesCache = mapped;
      return mapped;
    }
  } catch (err) {
    console.warn("Failed to fetch categories from API, using fallback:", err);
  }
  categoriesCache = mockCategories;
  return mockCategories;
}

export async function fetchCategoryById(id: string): Promise<AwardCategory | null> {
  const all = await fetchCategories();
  const fromCache = all.find((c) => c.id === id);
  if (fromCache) return fromCache;

  try {
    const res = await api.get(`/award-categories/${id}`);
    if (res.data?.success) return mapApiCategory(res.data.data, findMockMatch(res.data.data));
  } catch (err) {
    console.warn(`Failed to fetch category ${id} from API, using fallback:`, err);
  }
  return mockCategories.find((c) => c.id === id) ?? null;
}
