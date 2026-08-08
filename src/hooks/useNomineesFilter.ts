import { useState, useMemo } from "react";
import { type Sort } from "@/types/ui";
import { type Nominee, type AwardCategory } from "@/types";

export function useNomineesFilter(
  initialNominees: Nominee[],
  initialCategory: string,
  initialTargetType: string,
  categories: AwardCategory[],
  pageSize: number = 6,
) {
  const [activeCategoryId, setActiveCategoryId] =
    useState<string>(initialCategory);
  const [activeTargetType, setActiveTargetType] =
    useState<string>(initialTargetType);
  const [sort, setSort] = useState<Sort>("Alphabetical");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);

  // Build a categoryId → targetType code map from the categories list so we
  // can derive each nominee's target type without an extra API call.
  const categoryTargetTypeMap = useMemo(() => {
    const map = new Map<string, string | null>();
    categories.forEach((c) => {
      map.set(c.id, c.targetType ?? null);
    });
    return map;
  }, [categories]);

  const filtered = useMemo(() => {
    return initialNominees.filter((n) => {
      // Category filter
      if (activeCategoryId !== "all") {
        if (n.categoryId !== activeCategoryId) return false;
      }
      // Target type filter — derived from the nominee's category
      if (activeTargetType !== "all") {
        const catTargetType = categoryTargetTypeMap.get(n.categoryId);
        if (catTargetType !== activeTargetType) return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = n.name.toLowerCase().includes(query);
        const matchesFirm = n.firm ? n.firm.toLowerCase().includes(query) : false;
        const matchesExcerpt = n.excerpt ? n.excerpt.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesFirm && !matchesExcerpt) return false;
      }
      return true;
    });
  }, [
    initialNominees,
    activeCategoryId,
    activeTargetType,
    categoryTargetTypeMap,
    searchQuery,
  ]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sort === "Most Votes") return (b.votes ?? 0) - (a.votes ?? 0);
      return a.name.localeCompare(b.name);
    });
  }, [filtered, sort]);

  const visible = useMemo(() => {
    return sorted.slice(0, page * pageSize);
  }, [sorted, page, pageSize]);
  const hasMore = visible.length < sorted.length;

  const handleCategoryChange = (id: string) => {
    setActiveCategoryId(id);
    setPage(1);
  };

  const handleTargetTypeChange = (code: string) => {
    setActiveTargetType(code);
    setPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setPage(1);
  };

  const loadMore = () => setPage((p) => p + 1);

  return {
    activeCategoryId,
    handleCategoryChange,
    activeTargetType,
    handleTargetTypeChange,
    sort,
    setSort,
    searchQuery,
    setSearchQuery: handleSearchChange,
    visible,
    sortedLength: sorted.length,
    hasMore,
    loadMore,
  };
}
