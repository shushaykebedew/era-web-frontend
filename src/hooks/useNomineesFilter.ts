import { useState, useEffect, useCallback } from "react";
import { type Sort } from "@/types/ui";
import { type Nominee } from "@/types";
import { fetchNominees } from "@/services/nominees";
import { useDebounce } from "./useDebounce";

export function useNomineesFilter(
  _initialNominees: Nominee[] = [],
  initialCategory: string = "all",
  _initialTargetType: string = "all",
  _categories: any[] = [],
  pageSize: number = 6,
) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategory);
  const [sort, setSort] = useState<Sort>("Alphabetical");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 350);

  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchPage = useCallback(
    async (currentPage: number, isNewFilter: boolean) => {
      if (isNewFilter) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const res = await fetchNominees({
          page: currentPage,
          limit: pageSize,
          categoryId: activeCategoryId,
          search: debouncedSearch,
          sort,
        });

        if (isNewFilter) {
          setNominees(res.data);
        } else {
          setNominees((prev) => {
            const existingIds = new Set(prev.map((n) => n.id));
            const newUnique = res.data.filter((n) => !existingIds.has(n.id));
            return [...prev, ...newUnique];
          });
        }
        setTotal(res.pagination?.total ?? 0);
      } catch (err) {
        console.error("Failed to load nominees page:", err);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [activeCategoryId, debouncedSearch, sort, pageSize]
  );

  // When filters or debounced search change, reset to page 1 and fetch
  useEffect(() => {
    setPage(1);
    fetchPage(1, true);
  }, [activeCategoryId, debouncedSearch, sort, fetchPage]);

  // When page increments (via loadMore), fetch next page and append
  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPage(nextPage, false);
  }, [page, fetchPage]);

  const handleCategoryChange = (id: string) => {
    setActiveCategoryId(id);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
  };

  const handleSortChange = (newSort: Sort) => {
    setSort(newSort);
  };

  const hasMore = nominees.length < total;

  return {
    activeCategoryId,
    handleCategoryChange,
    activeTargetType: "all",
    handleTargetTypeChange: () => {},
    sort,
    setSort: handleSortChange,
    searchQuery,
    setSearchQuery: handleSearchChange,
    visible: nominees,
    sortedLength: total,
    totalCount: total,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
  };
}
