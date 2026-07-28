export type Edition = 2026 | 2025 | 2024;

export type GalleryFilter =
  | "All Moments"
  | "Winners"
  | "Ceremony"
  | "Networking";

export type GalleryPhoto = {
  id: number;
  src: string;
  alt: string;
  edition: Edition;
  tag: Exclude<GalleryFilter, "All Moments">;
};
