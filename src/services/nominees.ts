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

export interface FetchNomineesParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
  sort?: string;
  status?: string;
}

export interface PaginatedNomineesResponse {
  data: Nominee[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function fetchNominees(
  params?: FetchNomineesParams
): Promise<PaginatedNomineesResponse> {
  try {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 6;
    const queryParams: Record<string, any> = {
      page,
      limit,
      status: params?.status || "APPROVED",
    };

    if (params?.categoryId && params.categoryId !== "all") {
      queryParams.awardCategoryId = params.categoryId;
    }
    if (params?.search?.trim()) {
      queryParams.search = params.search.trim();
    }
    if (params?.sort) {
      queryParams.sort = params.sort;
    }

    const res = await api.get("/nominees", { params: queryParams });
    if (!res.data?.success) {
      return {
        data: [],
        pagination: { page, limit, total: 0, totalPages: 0 },
      };
    }

    const rawData = res.data.data;
    const rawItems: ApiNomineeResponse[] = Array.isArray(rawData)
      ? rawData
      : (rawData?.items ?? rawData?.nominees ?? []);
    const items = rawItems.map((item) => mapApiNominee(item));

    const paginationMeta = res.data.pagination ?? res.data.meta;
    const total = paginationMeta?.total ?? res.data.total ?? items.length;
    const totalPages = paginationMeta?.totalPages ?? (Math.ceil(total / limit) || 1);

    return {
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  } catch (error) {
    console.warn("Failed to fetch nominees from API:", error);
    return {
      data: [],
      pagination: { page: 1, limit: 6, total: 0, totalPages: 0 },
    };
  }
}

/** Convenience helper returning just the array of nominees */
export async function fetchNomineesList(
  params?: FetchNomineesParams
): Promise<Nominee[]> {
  const result = await fetchNominees(params);
  return result.data;
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

export async function validateNominationToken(token: string): Promise<Nominee | null> {
  const res = await api.get(`/nominees/continue/${token}`);
  if (res.data?.success) {
    return mapApiNominee(res.data.data);
  }
  return null;
}

export async function submitPaymentSlip(token: string, file: File): Promise<any> {
  const fd = new FormData();
  fd.append("paymentSlip", file);

  const res = await api.post(`/nominees/continue/${token}/payment`, fd, {
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

  if (!activeEventId) {
    throw new Error("No active award event is currently available for voting.");
  }

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
