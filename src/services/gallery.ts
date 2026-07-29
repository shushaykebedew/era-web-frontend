import { api } from "./api";
import { galleryPhotos as staticPhotos } from "@/data/gallery";
import type { GalleryPhoto } from "@/types/gallery";

export async function fetchGalleryPhotos(params?: {
  edition?: number;
  tag?: string;
}): Promise<GalleryPhoto[]> {
  try {
    const res = await api.get("/gallery", { params: { limit: 100, ...params } });

    if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data.map((item: any) => ({
        id: item.id,
        src: item.secureUrl,
        alt: item.alt || item.filename || "ERA Gallery Photo",
        edition: item.edition,
        tag: item.tag || "Winners",
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch gallery photos from API, using static fallback:", error);
  }

  // Static fallback filtering
  return staticPhotos.filter((photo) => {
    if (params?.edition && photo.edition !== params.edition) return false;
    if (
      params?.tag &&
      params.tag !== "All Moments" &&
      photo.tag !== params.tag
    )
      return false;
    return true;
  });
}
