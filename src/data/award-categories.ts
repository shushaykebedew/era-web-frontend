import type { AwardCategory } from "@/types";

/**
 * Fixture data standing in for a future CMS/API. Each section component
 * pulls from here (or, in `app/`, from a server fetch using these as
 * fallbacks) so swapping a real data source later only means changing this
 * file's export, not the consuming components.
 */
export const awardCategories: AwardCategory[] = [
  {
    slug: "urban-sanctuary",
    name: "Urban Sanctuary Award",
    group: "Residential",
    tagline: "Residential",
    description:
      "Honoring innovative multi-family residential developments that harmonize density with livability.",
    icon: "compass",
    nomineeCount: 12,
    coverImage: "/imgs/categories/award-category-1.png",
  },
  {
    slug: "modern-workspace-pinnacle",
    name: "Modern Workspace Pinnacle",
    group: "Commercial",
    tagline: "Commercial",
    description:
      "Recognizing office towers and corporate hubs that foster productivity through architectural excellence.",
    icon: "building",
    nomineeCount: 9,
    coverImage: "/imgs/categories/award-category-2.png",
  },
  {
    slug: "eco-innovator-gold",
    name: "Eco-Innovator Gold",
    group: "Sustainability",
    tagline: "Sustainability",
    description:
      "Awarded to structures demonstrating radical commitment to carbon neutrality and local materials.",
    icon: "leaf",
    nomineeCount: 8,
    coverImage: "/imgs/categories/award-category-3.png",
  },
  {
    slug: "heritage-vanguard",
    name: "Heritage Vanguard",
    group: "Culture",
    tagline: "Culture",
    description:
      "Celebrating projects that integrate Ethiopian cultural motifs into modern structural designs.",
    icon: "landmark",
    nomineeCount: 7,
    coverImage: "/imgs/categories/award-category-4.png",
  },
  {
    slug: "bespoke-living-award",
    name: "Bespoke Living Award",
    group: "Interior",
    tagline: "Interior",
    description:
      "For interior spaces that redefine luxury through tactile materials and light manipulation.",
    icon: "interior",
    nomineeCount: 10,
  },
  {
    slug: "next-horizon-studio",
    name: "Next Horizon Studio",
    group: "Emerging",
    tagline: "Emerging",
    description:
      "Spotlighting young architectural firms showing exceptional promise in Ethiopia's growing market.",
    icon: "spark",
    nomineeCount: 6,
  },
];

export const getCategoryBySlug = (slug: string) =>
  awardCategories.find((category) => category.slug === slug);
