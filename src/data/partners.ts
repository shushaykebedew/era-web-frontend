import type { TierId } from "@/types/partners";

export type SponsorTier = {
  id: TierId;
  label: string;
  featured: boolean;
  benefits: readonly string[];
};

export const sponsorTiers: SponsorTier[] = [
  {
    id: "bronze",
    label: "Bronze",
    featured: false,
    benefits: [
      "Brand logo on official website partner block",
      "Social media mentions in group partner posts",
      "2 Invitations to the Grand ERA night",
    ],
  },
  {
    id: "gold",
    label: "Gold",
    featured: true,
    benefits: [
      "Headline visibility on all event broadcast media",
      "Prime speaking slot during the opening ceremony",
      "Exhibition booth in the high-traffic VIP Lounge",
      "10 VIP Table access with concierge service",
    ],
  },
  {
    id: "silver",
    label: "Silver",
    featured: false,
    benefits: [
      "Dedicated promotional feature in the awards journal",
      "Logo placement on main ERA backdrop",
      "6 VIP Invitation to the Grand ERA night",
    ],
  },
];
