import type { GalleryPhoto } from "@/types/gallery";

/**
 * Gallery photo fixtures.
 * Heights per the Figma design spec (all widths are 384 px — handled by the grid).
 * Positions 1-6 map to the 2024 edition layout:
 *   col 1 → img 1 (480 h), img 2 (256 h)
 *   col 2 → img 3 (384 h), img 4 (288 h)
 *   col 3 → img 5 (480 h), img 6 (216 h)
 */
export const galleryPhotos: GalleryPhoto[] = [
  // ── 2024 ──────────────────────────────────────────────────────────────────
  { id: 1,  src: "/imgs/gallery/Gallery Item 1.png", alt: "Stage lights at the 2024 gala ceremony",  edition: 2024, tag: "Ceremony",    height: 480 },
  { id: 2,  src: "/imgs/gallery/Gallery Item 2.png", alt: "Guests networking at the 2024 awards",    edition: 2024, tag: "Networking",  height: 256 },
  { id: 3,  src: "/imgs/gallery/Gallery Item 3.png", alt: "Winner holding the ERA trophy",           edition: 2024, tag: "Winners",     height: 384 },
  { id: 4,  src: "/imgs/gallery/Gallery Item 4.png", alt: "Award venue exterior at night",           edition: 2024, tag: "Ceremony",    height: 288 },
  { id: 5,  src: "/imgs/gallery/Gallery Item 5.png", alt: "ERA trophy on display",                   edition: 2024, tag: "Winners",     height: 480 },
  { id: 6,  src: "/imgs/gallery/Gallery Item 6.png", alt: "Gala dinner table setting",               edition: 2024, tag: "Ceremony",    height: 216 },
  // ── 2023 ──────────────────────────────────────────────────────────────────
  { id: 7,  src: "/imgs/gallery/Gallery Item 1.png", alt: "2023 ceremony stage",                     edition: 2023, tag: "Ceremony",    height: 480 },
  { id: 8,  src: "/imgs/gallery/Gallery Item 2.png", alt: "2023 winner announcement",                edition: 2023, tag: "Winners",     height: 256 },
  { id: 9,  src: "/imgs/gallery/Gallery Item 3.png", alt: "2023 networking evening",                 edition: 2023, tag: "Networking",  height: 384 },
  { id: 10, src: "/imgs/gallery/Gallery Item 4.png", alt: "2023 award ceremony highlights",          edition: 2023, tag: "Ceremony",    height: 288 },
  { id: 11, src: "/imgs/gallery/Gallery Item 5.png", alt: "2023 winners circle",                     edition: 2023, tag: "Winners",     height: 480 },
  { id: 12, src: "/imgs/gallery/Gallery Item 6.png", alt: "2023 gala dinner",                        edition: 2023, tag: "Ceremony",    height: 216 },
  // ── 2022 ──────────────────────────────────────────────────────────────────
  { id: 13, src: "/imgs/gallery/Gallery Item 1.png", alt: "2022 inaugural ceremony",                 edition: 2022, tag: "Ceremony",    height: 480 },
  { id: 14, src: "/imgs/gallery/Gallery Item 2.png", alt: "2022 award winners",                      edition: 2022, tag: "Winners",     height: 256 },
  { id: 15, src: "/imgs/gallery/Gallery Item 3.png", alt: "2022 networking evening",                 edition: 2022, tag: "Networking",  height: 384 },
  { id: 16, src: "/imgs/gallery/Gallery Item 4.png", alt: "2022 ceremony highlights",                edition: 2022, tag: "Ceremony",    height: 288 },
  { id: 17, src: "/imgs/gallery/Gallery Item 5.png", alt: "2022 trophy presentation",                edition: 2022, tag: "Winners",     height: 480 },
  { id: 18, src: "/imgs/gallery/Gallery Item 6.png", alt: "2022 gala dinner table",                  edition: 2022, tag: "Ceremony",    height: 216 },
];
