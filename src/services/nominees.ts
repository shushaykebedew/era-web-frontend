import { api } from "./api";
import { nominees as mockNominees } from "@/data/nominees";
import { Nominee } from "@/types";

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

function mapApiNominee(apiItem: any, index = 0): Nominee {
  const target = apiItem.target ?? {};

  const name = apiItem.name ?? target.name ?? target.title ?? "Nominee";
  const firm = apiItem.firm ?? target.firm ?? target.company?.name ?? target.developer ?? "—";
  const location = apiItem.location ?? target.location ?? target.city ?? "Ethiopia";
  const excerpt = apiItem.excerpt ?? target.excerpt ?? target.description ?? "Award Excellence Nominee";
  const description = apiItem.description ?? target.description ?? excerpt;
  const coverImage = apiItem.coverImage ?? target.coverImage ?? target.image ?? fallbackCover(index);

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
    gallery: apiItem.gallery ?? target.gallery ?? [],
    scaleSqm: apiItem.scaleSqm ?? target.scaleSqm,
    completionDate: apiItem.completionDate ?? target.completionDate,
    quote: apiItem.quote ?? target.quote,
    achievements: apiItem.achievements ?? target.achievements ?? [],
    votes: apiItem._count?.publicVotes ?? apiItem.votes ?? 0,
  };
}

let nomineesCache: Nominee[] | null = null;

export async function fetchNominees(): Promise<Nominee[]> {
  if (nomineesCache) return nomineesCache;

  try {
    let page = 1;
    const limit = 50;
    const all: any[] = [];

    while (true) {
      const res = await api.get("/nominees", { params: { page, limit } });
      if (!res.data?.success) break;

      const data = res.data.data;
      const items: any[] = Array.isArray(data) ? data : (data.items ?? data.nominees ?? []);
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
  } catch (err) {
    console.warn("Failed to fetch nominees from API, using fallback data:", err);
  }

  nomineesCache = mockNominees;
  return mockNominees;
}

export async function fetchNomineeById(id: string): Promise<Nominee | null> {
  if (nomineesCache) {
    const cached = nomineesCache.find((n) => n.id === id);
    if (cached) return cached;
  }

  try {
    const res = await api.get(`/nominees/${id}`);
    if (res.data?.success) return mapApiNominee(res.data.data, 0);
  } catch (err) {
    console.warn(`Failed to fetch nominee ${id} from API, using fallback:`, err);
  }

  return mockNominees.find((m) => m.id === id) ?? null;
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
            (e: any) => e.status === "ACTIVE" || e.status === "STARTED",
          ) ?? eventsRes.data.data[0];
        activeEventId = activeEvent.id;
      }
    } catch (err) {
      console.warn("Could not fetch active award event:", err);
    }
  }

  if (!activeEventId) activeEventId = "00000000-0000-0000-0000-000000000000";

  const res = await api.post("/public-votes", { nomineeId, awardCategoryId, awardEventId: activeEventId });
  return res.data;
}

export function clearNomineesCache() {
  nomineesCache = null;
}
