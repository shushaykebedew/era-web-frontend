import { useState, useMemo } from "react";
import { type Sort } from "@/types/ui";
import { type Nominee } from "@/types";

export function useNomineesFilter(
  initialNominees: Nominee[],
  initialCategory: string,
  _initialTargetType: string, // kept for signature compatibility but unused
  categories: any[],
  pageSize: number = 6,
) {
  const [activeCategoryId, setActiveCategoryId] =
    useState<string>(initialCategory);
  const [sort, setSort] = useState<Sort>("Alphabetical");
  const [searchQuery, setSearchQuery] = useState<string>( "");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return initialNominees.filter((n) => {
      // Category filter
      if (activeCategoryId !== "all") {
        if (n.categoryId !== activeCategoryId) return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = n.name.toLowerCase().includes(query);
        const matchesContact = n.contactPerson ? n.contactPerson.toLowerCase().includes(query) : false;
        const matchesReason = n.reason ? n.reason.toLowerCase().includes(query) : false;
        if (!matchesName && !matchesContact && !matchesReason) return false;
      }
      return true;
    });
  }, [
    initialNominees,
    activeCategoryId,
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

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setPage(1);
  };

  const loadMore = () => setPage((p) => p + 1);

  return {
    activeCategoryId,
    handleCategoryChange,
    activeTargetType: "all",
    handleTargetTypeChange: () => {},
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
