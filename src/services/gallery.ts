import { api } from "./api";
import type { GalleryPhoto } from "@/types/gallery";

// Helper to generate optimized Cloudinary URL
function getOptimizedImageUrl(url: string): string {
  if (!url) return url;
  return url;
}

export async function fetchGalleryPhotos(params?: {
  edition?: number;
  tag?: string;
}): Promise<GalleryPhoto[]> {
  try {
    const res = await api.get("/gallery", { params: { limit: 100, ...params } });

    if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
      return res.data.data.map((item: any) => ({
        id: item.id,
        src: getOptimizedImageUrl(item.secureUrl),
        alt: item.alt || item.filename || "ERA Gallery Photo",
        edition: item.edition,
        tag: item.tag || "Winners",
      }));
    }
  } catch (error) {
    console.warn("Failed to fetch gallery photos from API:", error);
  }

  return [];
}
