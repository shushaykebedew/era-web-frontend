export type Edition = 2025 | 2024 | 2023;

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
