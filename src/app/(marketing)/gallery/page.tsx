import type { Metadata } from "next";
import { GalleryHero } from "@/features/gallery/GalleryHero";
import { GalleryGrid } from "@/features/gallery/GalleryGrid";
import { GalleryCta } from "@/features/gallery/GalleryCta";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A curated narrative of architectural excellence and cinematic moments from the Ethiopian Real Estate Awards.",
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryGrid />
      <GalleryCta />
    </>
  );
}
