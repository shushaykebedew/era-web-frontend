export type Edition = 2024 | 2023 | 2022;

export type GalleryFilter =
  "All Moments" | "Winners" | "Ceremony" | "Networking";

export type GalleryPhoto = {
  id: number;
  src: string;
  alt: string;
  edition: Edition;
  tag: Exclude<GalleryFilter, "All Moments">;
  /** Exact pixel height matching the Figma spec */
  height: number;
};
