import type { Nominee } from "@/types";

export const nominees: Nominee[] = [
  {
    slug: "lideta-residency",
    name: "Lideta Residency",
    firm: "The Zema Collective",
    location: "Addis Ababa, Ethiopia",
    categorySlug: "urban-sanctuary",
    status: "nominee",
    excerpt:
      "A synthesis of traditional Ethiopian spatial hierarchies and ultra-modernist sustainability.",
    description:
      "A synthesis of traditional Ethiopian spatial hierarchies and ultra-modernist sustainability. The Lideta Residency stands as a testament to the future of vertical living in East Africa.",
    scaleSqm: 4500,
    completionDate: "2024-03-01",
    quote:
      "An architecture that listens to the wind of the highlands while speaking the language of tomorrow.",
    achievements: [
      {
        title: "Platinum LEED Certification",
        description: "International standard for green buildings.",
      },
      {
        title: "Locally Sourced Volcanic Stone",
        description: "Reducing carbon footprint via indigenous materials.",
      },
      {
        title: "'Meskot' Inspired Cooling",
        description: "Passive ventilation based on traditional motifs.",
      },
    ],
    votes: 2412,
    coverImage: "/imgs/nominees/nominee-1.png",
  },
  {
    slug: "the-obsidian-tower",
    name: "The Obsidian Tower",
    firm: "Zoma Architects",
    location: "Bole District",
    categorySlug: "urban-sanctuary",
    status: "nominee",
    excerpt: "A monolithic exploration of volcanic rock and light.",
    description:
      "A monolithic exploration of volcanic rock and light, nestled in the outskirts of the capital.",
    votes: 1894,
    coverImage: "/imgs/nominees/nominee-2.png",
  },
  {
    slug: "verdant-heights",
    name: "Verdant Heights",
    firm: "Elsa Design Co.",
    location: "Old Airport",
    categorySlug: "urban-sanctuary",
    status: "nominee",
    excerpt: "Blending vernacular timber craftsmanship with contemporary cantilevered steel.",
    description:
      "Blending vernacular timber craftsmanship with contemporary cantilevered steel structures.",
    votes: 1320,
    coverImage: "/imgs/nominees/nominee-3.png",
  },
  {
    slug: "eco-spine-plaza",
    name: "Eco-Spine Plaza",
    firm: "Habesha Urbanists",
    location: "Kazanchis",
    categorySlug: "eco-innovator-gold",
    status: "nominee",
    excerpt: "A vertical garden complex redefining sustainable urban density.",
    description: "A vertical garden complex redefining sustainable urban density.",
    votes: 3105,
  },
  {
    slug: "zema-architecture-studio",
    name: "Zema Architecture Studio",
    firm: "The Obsidian House",
    location: "Addis Ababa",
    categorySlug: "urban-sanctuary",
    status: "nominee",
    excerpt:
      "A monolithic exploration of volcanic rock and light, nestled in the outskirts of the capital.",
    description:
      "A monolithic exploration of volcanic rock and light, nestled in the outskirts of the capital.",
  },
  {
    slug: "yohannes-and-partners",
    name: "Yohannes & Partners",
    firm: "Entoto Heights Villa",
    location: "Entoto",
    categorySlug: "urban-sanctuary",
    status: "nominee",
    excerpt:
      "Blending vernacular timber craftsmanship with contemporary cantilevered steel structures.",
    description:
      "Blending vernacular timber craftsmanship with contemporary cantilevered steel structures.",
  },
  {
    slug: "abyssinia-design-hub",
    name: "Abyssinia Design Hub",
    firm: "The Mosaic Loft",
    location: "Addis Ababa",
    categorySlug: "bespoke-living-award",
    status: "past-winner",
    excerpt: "An adaptive reuse project transforming a warehouse into an urban residential masterpiece.",
    description:
      "An adaptive reuse project transforming a warehouse into an urban residential masterpiece.",
  },
];

export const getNomineeBySlug = (slug: string) =>
  nominees.find((nominee) => nominee.slug === slug);

export const getNomineesByCategory = (categorySlug: string) =>
  nominees.filter((nominee) => nominee.categorySlug === categorySlug);

export const getFeaturedNominees = (limit = 3) => nominees.slice(0, limit);
