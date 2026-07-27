import { api } from "./api";
import { AwardCategory, ApiCategoryResponse } from "@/types";
import { awardCategories as staticCategories } from "@/data/award-categories";

const VALID_ICONS: AwardCategory["icon"][] = [
  "cat-icon-1",
  "cat-icon-2",
  "cat-icon-3",
  "cat-icon-4",
  "cat-icon-5",
];

const VALID_GROUPS: AwardCategory["group"][] = [
  "Residential",
  "Commercial",
  "Sustainability",
  "Culture",
  "Interior",
  "Emerging",
];

function mapApiCategory(apiItem: ApiCategoryResponse): AwardCategory {
  const rawIcon = apiItem.icon || "cat-icon-1";
  const icon = VALID_ICONS.includes(rawIcon as AwardCategory["icon"])
    ? (rawIcon as AwardCategory["icon"])
    : "cat-icon-1";

  const rawGroup = apiItem.group || "Residential";
  const group = VALID_GROUPS.includes(rawGroup as AwardCategory["group"])
    ? (rawGroup as AwardCategory["group"])
    : "Residential";

  return {
    id: apiItem.id || "",
    name: apiItem.name || "Award Category",
    group,
    tagline: apiItem.tagline || apiItem.group || "Residential",
    description: apiItem.description || "",
    icon,
    nomineeCount: apiItem.nomineeCount ?? 0,
    coverImage: apiItem.coverImage || undefined,
    targetType: apiItem.targetType ?? null,
  };
}

let categoriesCache: AwardCategory[] | null = null;

export async function fetchCategories(): Promise<AwardCategory[]> {
  if (categoriesCache) return categoriesCache;

  try {
    const res = await api.get("/award-categories");
    if (res.data?.success && Array.isArray(res.data.data)) {
      const mapped = res.data.data.map((item: ApiCategoryResponse) =>
        mapApiCategory(item),
      );
      categoriesCache = mapped;
      return mapped;
    }
  } catch (error) {
    // During build (SSG) or when the backend requires auth, the API call
    // may fail with 401. Fall back to static data so the build succeeds
    // and the page renders with placeholder content.
    console.warn(
      "Failed to fetch categories from API, falling back to static data:",
      error,
    );
  }

  // Fall back to static data (not cached so the API is retried on next call)
  return staticCategories;
}

export async function fetchCategoryById(
  id: string,
): Promise<AwardCategory | null> {
  const all = await fetchCategories();
  const fromCache = all.find((c) => c.id === id);
  if (fromCache) return fromCache;

  try {
    const res = await api.get(`/award-categories/${id}`);
    if (res.data?.success) return mapApiCategory(res.data.data);
  } catch (error) {
    console.warn(`Failed to fetch category ${id} from API:`, error);
  }

  return null;
}

export function clearCategoriesCache() {
  categoriesCache = null;
}


