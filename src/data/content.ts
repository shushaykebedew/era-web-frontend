import type { TimelineMilestone, ValuePillar, Partner } from "@/types";

export const roadmapMilestones: TimelineMilestone[] = [
  {
    period: "January - March",
    title: "Nomination",
    description:
      "Firms and individuals submit their most ambitious projects for consideration across 12 categories.",
    icon: "draft",
  },
  {
    period: "April - May",
    title: "Jury Scoring",
    description:
      "An international panel of architects and urban planners evaluate entries based on sustainability, aesthetics, and impact.",
    icon: "gavel",
  },
  {
    period: "June - July",
    title: "Public Voting",
    description:
      "The people's choice. Over 50,000 citizens weigh in on their favorite landmark developments.",
    icon: "vote",
  },
  {
    period: "September 12",
    title: "Gala Night",
    description:
      "The grandest stage. A black-tie ceremony at the Hilton Addis hosting the industry elite.",
    icon: "gala",
  },
  {
    period: "Post-Event",
    title: "Winners Circle",
    description:
      "Recognition that lasts a lifetime. Winning projects are featured in our international year-book.",
    icon: "trophy",
  },
];

export const valuePillars: ValuePillar[] = [
  {
    title: "Integrity",
    description:
      "Our voting process is audited by third-party experts to ensure absolute transparency and meritocracy.",
  },
  {
    title: "Legacy",
    description:
      "We don't just award buildings; we celebrate the lasting impact on the community and urban fabric.",
  },
  {
    title: "Innovation",
    description:
      "Prioritizing smart-city technologies and ecological footprints in every scoring metric.",
  },
];

export const partners: Partner[] = [
  { name: "Ethio-Bank" },
  { name: "Nile Air" },
  { name: "Sol Luxury" },
  { name: "Abys Trust" },
  { name: "Verve Arch" },
];
