export type Edition = 2026 | 2025 | number;

export type GalleryFilter =
  | "All Moments"
  | "Winners"
  | "Ceremony"
  | "Networking"
  | string;

export type GalleryPhoto = {
  id: string | number;
  src: string;
  alt: string;
  edition: Edition;
  tag: string;
};

