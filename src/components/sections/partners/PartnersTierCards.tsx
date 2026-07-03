"use client";

import { Check, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

// ── Data ─────────────────────────────────────────────────────────────────────
export const TIERS = [
  {
    id: "bronze" as const,
    label: "Bronze",
    featured: false,
    benefits: [
      "Brand logo on official website partner block",
      "Social media mentions in group partner posts",
      "2 Invitations to the Grand Gala night",
    ],
  },
  {
    id: "gold" as const,
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
    id: "silver" as const,
    label: "Silver",
    featured: false,
    benefits: [
      "Dedicated promotional feature in the awards journal",
      "Logo placement on main gala backdrop",
      "6 VIP Invitation to the Grand Gala night",
    ],
  },
] as const;

export type TierId = (typeof TIERS)[number]["id"];

type PartnersTierCardsProps = {
  onSelectTier: (id: TierId) => void;
};

export function PartnersTierCards({ onSelectTier }: PartnersTierCardsProps) {
  return (
    <section className="bg-background pt-12 pb-20">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:items-start">
          {TIERS.map((tier, index) => (
            <div
              key={tier.id}
              className={cn(
                "relative flex h-[512px] flex-col border p-8 transition-all duration-300",
                tier.featured
                  ? "border-[#EBC166] bg-[#16130D] sm:-translate-y-6 z-10 shadow-2xl shadow-black/40"
                  : "border-border-strong bg-[#110E08]",
              )}
            >
              {/* Premier Partner badge */}
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#EBC166] px-4 py-2 text-[12px] leading-4 font-inter font-bold uppercase tracking-[2.4px] text-[#16130D]">
                    Premier Partner
                  </span>
                </div>
              )}

              <p
                className={cn(
                  "mb-2 text-[12px] font-inter font-semibold uppercase tracking-[1.2px] leading-4",
                  tier.featured ? "text-[#EBC166]" : "text-[#9A8F7E] ",
                )}
              >
                Tier 0{index + 1}
              </p>

              <h2
                className={cn(
                  "mb-5 font-display text-[32px] font-bold leading-10 ",
                  tier.featured ? "text-[#EBC166]" : "text-[#EAE1D7]",
                )}
              >
                {tier.label}
              </h2>

              <p className="h-px w-full bg-[#4E4637] mb-8"></p>

              <ul className="mb-10 flex flex-1 flex-col gap-4 overflow-y-auto">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    {tier.featured ? (
                      <img src="/icons/star.svg" />
                    ) : (
                      <img
                        src="/icons/check-mark.svg"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#EBC166]"
                      />
                    )}

                    <span
                      className={cn(
                        "text-base font-inter ",
                        tier.featured
                          ? "text-[#EAE1D7] font-medium leading-5"
                          : "text-[#D1C5B2] leading-6",
                      )}
                    >
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.featured ? "primary" : "outline"}
                size="sm"
                className={cn(
                  "w-full tracking-[1.2px] font-inter text-[12px] leading-4",
                  tier.featured ? "font-bold h-14" : "font-semibold h-12.5",
                )}
                onClick={() => onSelectTier(tier.id)}
              >
                {tier.featured ? `Select ${tier.label} Tier` : "Enquire Now"}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
