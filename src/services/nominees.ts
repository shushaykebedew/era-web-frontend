import { api } from "./api";
import { Nominee, ApiNomineeResponse, ApiAwardEventResponse } from "@/types";

function mapApiNominee(apiItem: ApiNomineeResponse): Nominee {
  const name = apiItem.name ?? "Nominee";
  const reason = apiItem.reason ?? "Award Excellence Nominee";
  const logo = apiItem.logo || undefined;

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
    email: apiItem.email ?? "",
    contactPerson: apiItem.contactPerson ?? "",
    phone: apiItem.phone ?? undefined,
    categoryId: apiItem.awardCategoryId ?? apiItem.categoryId ?? "",
    category: apiItem.awardCategory,
    status,
    reason,
    website: apiItem.website ?? undefined,
    logo,
    votes: apiItem._count?.publicVotes ?? apiItem.votes ?? 0,
  };
}

export async function fetchNominees(): Promise<Nominee[]> {
  try {
    const limit = 100;
    const all: ApiNomineeResponse[] = [];

    // Fetch first page to get total count
    const firstRes = await api.get("/nominees", { params: { page: 1, limit } });
    if (!firstRes.data?.success) return [];

    const firstData = firstRes.data.data;
    const firstItems: ApiNomineeResponse[] = Array.isArray(firstData)
      ? firstData
      : (firstData.items ?? firstData.nominees ?? []);
    all.push(...firstItems);

    const pagination = firstRes.data.pagination ?? firstRes.data.meta;
    const total = pagination?.total ?? firstRes.data.total ?? firstItems.length;

    // If there are more items, fetch remaining pages in parallel
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
      return all.map((item) => mapApiNominee(item));
    }
  } catch (error) {
    console.warn(
      "Failed to fetch nominees from API:",
      error,
    );
  }

  return [];
}

export async function fetchNomineeById(id: string): Promise<Nominee | null> {
  try {
    const res = await api.get(`/nominees/${id}`);
    if (res.data?.success) return mapApiNominee(res.data.data);
  } catch (error) {
    console.warn(`Failed to fetch nominee ${id} from API:`, error);
  }

  return null;
}

export async function createNominee(data: {
  awardCategoryId: string;
  name: string;
  email: string;
  contactPerson: string;
  phone?: string;
  reason: string;
  website?: string;
  logo?: File | null;
}): Promise<any> {
  const fd = new FormData();
  fd.append("awardCategoryId", data.awardCategoryId);
  fd.append("name", data.name);
  fd.append("email", data.email);
  fd.append("contactPerson", data.contactPerson);
  if (data.phone) fd.append("phone", data.phone);
  fd.append("reason", data.reason);
  if (data.website) fd.append("website", data.website);
  if (data.logo) fd.append("logo", data.logo);

  const res = await api.post("/nominees", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
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

export async function fetchMyVotes(): Promise<any[]> {
  try {
    const res = await api.get("/public-votes/mine");
    if (res.data?.success) return res.data.data;
  } catch (error) {
    console.warn("Failed to fetch user votes:", error);
  }
  return [];
}

/**
 * @deprecated Cache invalidation is now handled by TanStack Query.
 */
export function clearNomineesCache() {
  // no-op
}
