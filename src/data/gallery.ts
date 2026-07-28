import type { GalleryPhoto } from "@/types/gallery";

export const EDITIONS = [2026, 2025, 2024] as const;
export const FILTERS = [
  "All Moments",
  "Winners",
  "Ceremony",
  "Networking",
] as const;

/**
 * Gallery photo fixtures.
 * Heights per the Figma design spec (all widths are 384 px — handled by the grid).
 */
export const galleryPhotos: GalleryPhoto[] = [
  // ── 2026 ──────────────────────────────────────────────────────────────────
  // (No posts yet for 2026 as the event has not taken place yet)

  // ── 2025 ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    src: "/imgs/gallery/image 1.jpg",
    alt: "Stage lights at the 2025 ERA ceremony",
    edition: 2025,
    tag: "Winners",
  },
  {
    id: 2,
    src: "/imgs/gallery/image 2.jpg",
    alt: "Guests networking at the 2025 awards",
    edition: 2025,
    tag: "Networking",
  },
  {
    id: 3,
    src: "/imgs/gallery/image 3.jpg",
    alt: "Winner holding the ERA trophy",
    edition: 2025,
    tag: "Ceremony",
  },
  {
    id: 4,
    src: "/imgs/gallery/image 4.jpg",
    alt: "Award venue exterior at night",
    edition: 2025,
    tag: "Ceremony",
  },
  {
    id: 5,
    src: "/imgs/gallery/image 5.jpg",
    alt: "ERA trophy on display",
    edition: 2025,
    tag: "Winners",
  },
  {
    id: 6,
    src: "/imgs/gallery/image 6.jpg",
    alt: "ERA dinner table setting",
    edition: 2025,
    tag: "Ceremony",
  },

  // ── 2024 ──────────────────────────────────────────────────────────────────
  {
    id: 7,
    src: "/imgs/gallery/image 7.jpg",
    alt: "2024 ceremony stage",
    edition: 2024,
    tag: "Ceremony",
  },
  {
    id: 8,
    src: "/imgs/gallery/image 8.jpg",
    alt: "2024 winner announcement",
    edition: 2024,
    tag: "Winners",
  },
  {
    id: 9,
    src: "/imgs/gallery/image 9.jpg",
    alt: "2024 networking evening",
    edition: 2024,
    tag: "Networking",
  },
  {
    id: 10,
    src: "/imgs/gallery/image 10.jpg",
    alt: "2024 award ceremony highlights",
    edition: 2024,
    tag: "Ceremony",
  },
  {
    id: 11,
    src: "/imgs/gallery/image 1.jpg",
    alt: "2024 winners circle",
    edition: 2024,
    tag: "Ceremony",
  },
  {
    id: 12,
    src: "/imgs/gallery/image 2.jpg",
    alt: "2024 ERA dinner",
    edition: 2024,
    tag: "Ceremony",
  },
];
