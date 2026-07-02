import type { Metadata } from "next";
import { GalleryHero } from "@/components/sections/gallery/GalleryHero";
import { GalleryGrid } from "@/components/sections/gallery/GalleryGrid";
import { GalleryCta } from "@/components/sections/gallery/GalleryCta";

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
