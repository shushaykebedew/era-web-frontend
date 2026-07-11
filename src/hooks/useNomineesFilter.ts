import { useState } from "react";
import { type Sort } from "@/types/ui";
import { type Nominee } from "@/types";

export function useNomineesFilter(
  initialNominees: Nominee[],
  initialCategory: string,
  pageSize: number = 6
) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategory);
  const [sort, setSort] = useState<Sort>("Alphabetical");
  const [page, setPage] = useState(1);

  const filtered = initialNominees.filter((n) => {
    if (activeCategoryId !== "all") {
      return n.categoryId === activeCategoryId;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "Most Votes") return (b.votes ?? 0) - (a.votes ?? 0);
    return a.name.localeCompare(b.name);
  });

  const visible = sorted.slice(0, page * pageSize);
  const hasMore = visible.length < sorted.length;

  const handleCategoryChange = (id: string) => {
    setActiveCategoryId(id);
    setPage(1);
  };

  const loadMore = () => setPage((p) => p + 1);

  return {
    activeCategoryId,
    handleCategoryChange,
    sort,
    setSort,
    visible,
    sortedLength: sorted.length,
    hasMore,
    loadMore,
  };
}
