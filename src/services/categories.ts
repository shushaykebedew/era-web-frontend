import { api } from "./api";
import { awardCategories as mockCategories } from "@/data/award-categories";
import { AwardCategory, ApiCategoryResponse } from "@/types";

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
  } catch (err) {
    console.warn("Failed to fetch categories from API, using fallback:", err);
  }
  categoriesCache = mockCategories;
  return mockCategories;
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
  } catch (err) {
    console.warn(
      `Failed to fetch category ${id} from API, using fallback:`,
      err,
    );
  }
  return mockCategories.find((c) => c.id === id) ?? null;
}

export function clearCategoriesCache() {
  categoriesCache = null;
}
