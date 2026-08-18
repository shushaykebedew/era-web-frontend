/**
 * Unit tests for the nominees service — focusing on:
 * 1. The API response → Nominee mapping logic (status, vote counts)
 * 2. fetchNominees resilience (returns empty on network failure)
 *
 * We test the mapping by testing the full fetchNominees function with a
 * mocked axios instance so we don't need a real server.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock the api module ───────────────────────────────────────────────────────
vi.mock("@/services/api", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import { fetchNominees, fetchNomineeById } from "@/services/nominees";
import { api } from "@/services/api";

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeApiNominee(overrides: Record<string, unknown> = {}) {
  return {
    id: "nominee-uuid-1",
    name: "Test Company",
    email: "test@company.com",
    contactPerson: "Jane Doe",
    awardCategoryId: "cat-uuid-1",
    status: "APPROVED",
    reason: "Great company",
    logo: null,
    website: null,
    phone: null,
    votes: 0,
    ...overrides,
  };
}

function makePaginatedResponse(items: any[], total = items.length) {
  return {
    data: {
      success: true,
      data: items,
      pagination: {
        page: 1,
        limit: 6,
        total,
        totalPages: Math.ceil(total / 6),
      },
    },
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("nominees service — status mapping", () => {
  beforeEach(() => vi.clearAllMocks());

  it("maps 'PAST_WINNER' status to 'past-winner'", async () => {
    vi.mocked(api.get).mockResolvedValue(
      makePaginatedResponse([makeApiNominee({ status: "PAST_WINNER" })])
    );

    const result = await fetchNominees();
    expect(result.data[0]?.status).toBe("past-winner");
  });

  it("maps lowercase 'past_winner' status to 'past-winner'", async () => {
    vi.mocked(api.get).mockResolvedValue(
      makePaginatedResponse([makeApiNominee({ status: "past_winner" })])
    );

    const result = await fetchNominees();
    expect(result.data[0]?.status).toBe("past-winner");
  });

  it("maps 'SHORTLISTED' status to 'shortlisted'", async () => {
    vi.mocked(api.get).mockResolvedValue(
      makePaginatedResponse([makeApiNominee({ status: "SHORTLISTED" })])
    );

    const result = await fetchNominees();
    expect(result.data[0]?.status).toBe("shortlisted");
  });

  it("maps 'APPROVED' status to 'nominee' (default)", async () => {
    vi.mocked(api.get).mockResolvedValue(
      makePaginatedResponse([makeApiNominee({ status: "APPROVED" })])
    );

    const result = await fetchNominees();
    expect(result.data[0]?.status).toBe("nominee");
  });

  it("maps unknown status to 'nominee' (default fallback)", async () => {
    vi.mocked(api.get).mockResolvedValue(
      makePaginatedResponse([makeApiNominee({ status: "SOME_UNKNOWN_VALUE" })])
    );

    const result = await fetchNominees();
    expect(result.data[0]?.status).toBe("nominee");
  });
});

describe("nominees service — vote count mapping", () => {
  beforeEach(() => vi.clearAllMocks());

  it("uses _count.publicVotes when present", async () => {
    vi.mocked(api.get).mockResolvedValue(
      makePaginatedResponse([
        makeApiNominee({ _count: { publicVotes: 42 }, votes: 99 }),
      ])
    );

    const result = await fetchNominees();
    expect(result.data[0]?.votes).toBe(42);
  });

  it("falls back to 'votes' field when _count is absent", async () => {
    vi.mocked(api.get).mockResolvedValue(
      makePaginatedResponse([makeApiNominee({ votes: 15 })])
    );

    const result = await fetchNominees();
    expect(result.data[0]?.votes).toBe(15);
  });

  it("defaults to 0 when both _count and votes are absent", async () => {
    vi.mocked(api.get).mockResolvedValue(
      makePaginatedResponse([makeApiNominee({ votes: undefined })])
    );

    const result = await fetchNominees();
    expect(result.data[0]?.votes).toBe(0);
  });
});

describe("nominees service — field mapping", () => {
  beforeEach(() => vi.clearAllMocks());

  it("maps awardCategoryId to categoryId", async () => {
    vi.mocked(api.get).mockResolvedValue(
      makePaginatedResponse([makeApiNominee({ awardCategoryId: "cat-123" })])
    );

    const result = await fetchNominees();
    expect(result.data[0]?.categoryId).toBe("cat-123");
  });

  it("uses fallback name 'Nominee' when name is null", async () => {
    vi.mocked(api.get).mockResolvedValue(
      makePaginatedResponse([makeApiNominee({ name: null })])
    );

    const result = await fetchNominees();
    expect(result.data[0]?.name).toBe("Nominee");
  });

  it("includes logo as undefined when null", async () => {
    vi.mocked(api.get).mockResolvedValue(
      makePaginatedResponse([makeApiNominee({ logo: null })])
    );

    const result = await fetchNominees();
    expect(result.data[0]?.logo).toBeUndefined();
  });
});

describe("nominees service — error resilience", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns empty paginated response when the API call throws", async () => {
    vi.mocked(api.get).mockRejectedValue(new Error("Network Error"));

    const result = await fetchNominees();

    expect(result.data).toEqual([]);
    expect(result.pagination.total).toBe(0);
    expect(result.pagination.totalPages).toBe(0);
  });

  it("returns empty response when API returns success: false", async () => {
    vi.mocked(api.get).mockResolvedValue({
      data: { success: false, message: "Not found" },
    });

    const result = await fetchNominees();
    expect(result.data).toEqual([]);
  });

  it("returns null from fetchNomineeById when API throws", async () => {
    vi.mocked(api.get).mockRejectedValue(new Error("404"));

    const result = await fetchNomineeById("some-id");
    expect(result).toBeNull();
  });
});

describe("nominees service — pagination forwarding", () => {
  beforeEach(() => vi.clearAllMocks());

  it("forwards page and limit params to the API", async () => {
    vi.mocked(api.get).mockResolvedValue(makePaginatedResponse([]));

    await fetchNominees({ page: 3, limit: 10 });

    expect(api.get).toHaveBeenCalledWith(
      "/nominees",
      expect.objectContaining({
        params: expect.objectContaining({ page: 3, limit: 10 }),
      })
    );
  });

  it("includes status=APPROVED by default", async () => {
    vi.mocked(api.get).mockResolvedValue(makePaginatedResponse([]));

    await fetchNominees();

    expect(api.get).toHaveBeenCalledWith(
      "/nominees",
      expect.objectContaining({
        params: expect.objectContaining({ status: "APPROVED" }),
      })
    );
  });

  it("forwards categoryId as awardCategoryId param when provided", async () => {
    vi.mocked(api.get).mockResolvedValue(makePaginatedResponse([]));

    await fetchNominees({ categoryId: "cat-uuid-123" });

    expect(api.get).toHaveBeenCalledWith(
      "/nominees",
      expect.objectContaining({
        params: expect.objectContaining({ awardCategoryId: "cat-uuid-123" }),
      })
    );
  });
});
