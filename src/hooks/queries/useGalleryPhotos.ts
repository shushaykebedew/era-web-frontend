import { useQuery } from "@tanstack/react-query";
import { fetchGalleryPhotos } from "@/services/gallery";
import { galleryPhotos as staticPhotos } from "@/data/gallery";
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
    // Static photos as placeholder so the grid never flashes empty
    placeholderData: staticPhotos.filter(
      (p) =>
        p.edition === edition &&
        (filter === "All Moments" || p.tag === filter),
    ),
    // Gallery images change infrequently — keep them fresh for 5 minutes.
    staleTime: 5 * 60 * 1000,
  });
}
