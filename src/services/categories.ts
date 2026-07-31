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

export async function fetchCategories(): Promise<AwardCategory[]> {
  try {
    const res = await api.get("/award-categories");
    if (res.data?.success && Array.isArray(res.data.data)) {
      return res.data.data
        .filter((item: ApiCategoryResponse) => item.isActive !== false)
        .map((item: ApiCategoryResponse) => mapApiCategory(item));
    }
  } catch (error) {
    // During build (SSG) or when the backend is unreachable, fall back to
    // static data so the page still renders.
    console.warn(
      "Failed to fetch categories from API, falling back to static data:",
      error,
    );
    return staticCategories;
  }

  return [];
}

export async function fetchCategoryById(
  id: string,
): Promise<AwardCategory | null> {
  // Try fetching all categories first (TanStack Query will have them cached)
  const all = await fetchCategories();
  const found = all.find((c) => c.id === id);
  if (found) return found;

  try {
    const res = await api.get(`/award-categories/${id}`);
    if (res.data?.success) return mapApiCategory(res.data.data);
  } catch (error) {
    console.warn(`Failed to fetch category ${id} from API:`, error);
  }

  return null;
}

/**
 * @deprecated Cache invalidation is now handled by TanStack Query.
 * Kept as a no-op so existing call-sites compile during migration.
 */
export function clearCategoriesCache() {
  // no-op — TanStack Query manages the cache
}

