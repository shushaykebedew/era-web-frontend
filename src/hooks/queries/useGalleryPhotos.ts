import { useQuery } from "@tanstack/react-query";
import { fetchGalleryPhotos } from "@/services/gallery";
import type { Edition, GalleryFilter, GalleryPhoto } from "@/types/gallery";

export const galleryKeys = {
  list: (edition: Edition, filter: GalleryFilter) =>
    ["gallery", edition, filter] as const,
};

export function useGalleryPhotos(edition: Edition, filter: GalleryFilter) {
  return useQuery<GalleryPhoto[]>({
    queryKey: galleryKeys.list(edition, filter),
    queryFn: () =>
      fetchGalleryPhotos({
        edition: Number(edition),
        tag: filter !== "All Moments" ? filter : undefined,
      }),
    // Gallery images change infrequently — keep them fresh for 5 minutes.
    staleTime: 5 * 60 * 1000,
  });
}
