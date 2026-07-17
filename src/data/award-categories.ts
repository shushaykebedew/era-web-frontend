import type { AwardCategory } from "@/types";

export const awardCategories: AwardCategory[] = [
  {
    id: "urban-sanctuary",
    name: "Urban Sanctuary Award",
    group: "Residential",
    tagline: "Residential",
    description:
      "Honoring innovative multi-family residential developments that harmonize density with livability.",
    icon: "cat-icon-1",
    nomineeCount: 12,
    coverImage: "/imgs/categories/award-category-1.png",
  },
  {
    id: "modern-workspace-pinnacle",
    name: "Modern Workspace Pinnacle",
    group: "Commercial",
    tagline: "Commercial",
    description:
      "Recognizing office towers and corporate hubs that foster productivity through architectural excellence.",
    icon: "cat-icon-2",
    nomineeCount: 9,
    coverImage: "/imgs/categories/award-category-2.png",
  },
  {
    id: "eco-innovator-gold",
    name: "Eco-Innovator Gold",
    group: "Sustainability",
    tagline: "Sustainability",
    description:
      "Awarded to structures demonstrating radical commitment to carbon neutrality and local materials.",
    icon: "cat-icon-3",
    nomineeCount: 8,
    coverImage: "/imgs/categories/award-category-3.png",
  },
  {
    id: "heritage-vanguard",
    name: "Heritage Vanguard",
    group: "Culture",
    tagline: "Culture",
    description:
      "Celebrating projects that integrate Ethiopian cultural motifs into modern structural designs.",
    icon: "cat-icon-4",
    nomineeCount: 7,
    coverImage: "/imgs/categories/award-category-4.png",
  },
  {
    id: "bespoke-living-award",
    name: "Bespoke Living Award",
    group: "Interior",
    tagline: "Interior",
    description:
      "For interior spaces that redefine luxury through tactile materials and light manipulation.",
    icon: "cat-icon-5",
    nomineeCount: 10,
  },
  {
    id: "next-horizon-studio",
    name: "Next Horizon Studio",
    group: "Emerging",
    tagline: "Emerging",
    description:
      "Spotlighting young architectural firms showing exceptional promise in Ethiopia's growing market.",
    icon: "cat-icon-1",
    nomineeCount: 6,
  },
];

export const featuredWinner = {
  label: "Featured Winner 2023: Unity Sky Tower",
  image: "/imgs/image-1.png",
};

export const getCategoryById = (id: string) =>
  awardCategories.find((category) => category.id === id);
