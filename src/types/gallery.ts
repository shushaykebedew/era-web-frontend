export const EDITIONS = [2024, 2023, 2022] as const;
export type Edition = (typeof EDITIONS)[number];

export const FILTERS = ["All Moments", "Winners", "Ceremony", "Networking"] as const;
export type GalleryFilter = (typeof FILTERS)[number];

export type GalleryPhoto = {
  id: number;
  src: string;
  alt: string;
  edition: Edition;
  tag: Exclude<GalleryFilter, "All Moments">;
  /** Exact pixel height matching the Figma spec */
  height: number;
};
