import { api } from "./api";
import { Nominee, ApiNomineeResponse, ApiAwardEventResponse } from "@/types";
import { nominees as staticNominees } from "@/data/nominees";

const FALLBACK_COVERS = [
  "/imgs/nominees/nominee-1.png",
  "/imgs/nominees/nominee-2.png",
  "/imgs/nominees/nominee-3.png",
  "/imgs/nominees/nominee-4.png",
  "/imgs/nominees/nominee-5.png",
  "/imgs/nominees/nominee-6.png",
  "/imgs/nominees/nominee-7.png",
  "/imgs/nominees/nominee-8.png",
  "/imgs/nominees/nominee-9.png",
];

function fallbackCover(index: number): string {
  return FALLBACK_COVERS[index % FALLBACK_COVERS.length];
}

function mapApiNominee(apiItem: ApiNomineeResponse, index = 0): Nominee {
  const name = apiItem.name ?? "Nominee";
  const firm = apiItem.firm ?? "—";
  const location = apiItem.location ?? "Ethiopia";
  const excerpt =
    apiItem.excerpt ?? apiItem.description ?? "Award Excellence Nominee";
  const description = apiItem.description ?? excerpt;
  const coverImage = apiItem.coverImage ?? fallbackCover(index);

  const rawStatus = (apiItem.status ?? "").toLowerCase();
  const status: Nominee["status"] =
    rawStatus === "past_winner" || rawStatus === "past-winner"
      ? "past-winner"
      : rawStatus === "shortlisted"
        ? "shortlisted"
        : "nominee";

  return {
    id: apiItem.id,
    name,
    firm,
    location,
    categoryId: apiItem.awardCategoryId ?? apiItem.categoryId ?? "",
    status,
    excerpt,
    description,
    coverImage,
    gallery: apiItem.gallery ?? [],
    scaleSqm: apiItem.scaleSqm ?? undefined,
    completionDate: apiItem.completionDate ?? undefined,
    quote: apiItem.quote ?? undefined,
    achievements: apiItem.achievements ?? [],
    votes: apiItem._count?.publicVotes ?? apiItem.votes ?? 0,
  };
}

let nomineesCache: Nominee[] | null = null;

export async function fetchNominees(): Promise<Nominee[]> {
  if (nomineesCache) return nomineesCache;

  try {
    const limit = 100;
    const all: ApiNomineeResponse[] = [];

    // Fetch first page to get total count
    const firstRes = await api.get("/nominees", { params: { page: 1, limit } });
    if (!firstRes.data?.success) return staticNominees; // Return fallback if API fails early

    const firstData = firstRes.data.data;
    const firstItems: ApiNomineeResponse[] = Array.isArray(firstData)
      ? firstData
      : (firstData.items ?? firstData.nominees ?? []);
    all.push(...firstItems);

    const pagination = firstRes.data.pagination ?? firstRes.data.meta;
    const total = pagination?.total ?? firstRes.data.total ?? firstItems.length;

    // If there are more items, fetch them in parallel
    if (all.length < total && firstItems.length > 0) {
      const totalPages = Math.ceil(total / limit);
      const promises = [];
      for (let p = 2; p <= totalPages; p++) {
        promises.push(api.get("/nominees", { params: { page: p, limit } }));
      }
      
      const results = await Promise.all(promises);
      for (const res of results) {
        if (res.data?.success) {
          const data = res.data.data;
          const items = Array.isArray(data)
            ? data
            : (data.items ?? data.nominees ?? []);
          all.push(...items);
        }
      }
    }

    if (all.length > 0) {
      nomineesCache = all.map((item, i) => mapApiNominee(item, i));
      return nomineesCache;
    }
  } catch (error) {
    // During build (SSG) or when the backend requires auth, the API call
    // may fail with 401. Fall back to static data so the build succeeds
    // and the page renders with placeholder content.
    console.warn(
      "Failed to fetch nominees from API, falling back to static data:",
      error,
    );
  }

  // Fall back to static data (not cached so the API is retried on next call)
  return staticNominees;
}

export async function fetchNomineeById(id: string): Promise<Nominee | null> {
  if (nomineesCache) {
    const cached = nomineesCache.find((n) => n.id === id);
    if (cached) return cached;
  }

  try {
    const res = await api.get(`/nominees/${id}`);
    if (res.data?.success) return mapApiNominee(res.data.data, 0);
  } catch (error) {
    console.warn(`Failed to fetch nominee ${id} from API:`, error);
  }

  return null;
}

export async function castPublicVote(
  nomineeId: string,
  awardCategoryId: string,
  awardEventId?: string,
): Promise<any> {
  let activeEventId = awardEventId;

  if (!activeEventId) {
    try {
      const eventsRes = await api.get("/award-events");
      if (eventsRes.data?.success && eventsRes.data.data.length > 0) {
        const activeEvent =
          eventsRes.data.data.find(
            (e: ApiAwardEventResponse) =>
              e.status === "ACTIVE" || e.status === "STARTED",
          ) ?? eventsRes.data.data[0];
        activeEventId = activeEvent.id;
      }
    } catch (err) {
      console.warn("Could not fetch active award event:", err);
    }
  }

  if (!activeEventId) activeEventId = "00000000-0000-0000-0000-000000000000";

  const res = await api.post("/public-votes", {
    nomineeId,
    awardCategoryId,
    awardEventId: activeEventId,
  });

  // Bust the module-level cache so the next call to fetchNominees() returns
  // fresh data from the backend with the updated vote count.
  nomineesCache = null;

  return res.data;
}

export function clearNomineesCache() {
  nomineesCache = null;
}
