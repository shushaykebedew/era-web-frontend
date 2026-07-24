import { api } from "./api";
import { Nominee, ApiNomineeResponse, ApiAwardEventResponse } from "@/types";

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

  let page = 1;
  const limit = 50;
  const all: ApiNomineeResponse[] = [];

  while (true) {
    const res = await api.get("/nominees", { params: { page, limit } });
    if (!res.data?.success) break;

    const data = res.data.data;
    const items: ApiNomineeResponse[] = Array.isArray(data)
      ? data
      : (data.items ?? data.nominees ?? []);
    all.push(...items);

    const pagination = res.data.pagination ?? res.data.meta;
    const total = pagination?.total ?? res.data.total ?? items.length;
    if (all.length >= total || items.length < limit) break;
    page++;
  }

  if (all.length > 0) {
    nomineesCache = all.map((item, i) => mapApiNominee(item, i));
    return nomineesCache;
  }

  throw new Error("Failed to fetch nominees from API");
}

export async function fetchNomineeById(id: string): Promise<Nominee | null> {
  if (nomineesCache) {
    const cached = nomineesCache.find((n) => n.id === id);
    if (cached) return cached;
  }

  const res = await api.get(`/nominees/${id}`);
  if (res.data?.success) return mapApiNominee(res.data.data, 0);

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
  return res.data;
}

export function clearNomineesCache() {
  nomineesCache = null;
}
