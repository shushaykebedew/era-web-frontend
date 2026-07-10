"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { PartnersTierCardsProps } from "@/types/partners";
import { StaggerContainer, StaggerItem } from "@/components/ui/animations";

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

export function PartnersTierCards({ onSelectTier }: PartnersTierCardsProps) {
  return (
    <section className="bg-background pt-8 sm:pt-12 pb-16 sm:pb-20">
      <Container size="wide">
        <StaggerContainer className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
          {TIERS.map((tier, index) => (
            <StaggerItem
              key={tier.id}
              className={cn(
                "w-full h-full",
                tier.featured && "order-first xl:order-0",
              )}
            >
              <div
                className={cn(
                  "relative flex h-full w-full max-w-98 xl:max-w-md 2xl:max-w-150",
                  "mx-auto lg:mx-0 xl:min-h-128 2xl:min-h-150",
                  "flex-col border p-6 sm:p-8 2xl:p-10 transition-all duration-300",
                  tier.featured
                    ? "border-primary xl:-translate-y-6 z-10 shadow-[0px_25px_50px_-12px_#00000040] bg-[linear-gradient(0deg,#16130D,#16130D),radial-gradient(165.23%_125.62%_at_0%_0%,rgba(230,197,106,0.15)_0%,rgba(230,197,106,0)_50%)]"
                    : "border-border-strong bg-[#110E08]",
                )}
              >
                {/* Premier Partner badge */}
                {tier.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={cn(
                        "bg-primary px-4 py-2 text-[12px] 2xl:text-base leading-4 font-inter",
                        "font-bold uppercase tracking-[2.4px] text-[#16130D] whitespace-nowrap",
                      )}
                    >
                      Premier Partner
                    </span>
                  </div>
                )}

                <p
                  className={cn(
                    "mb-2 text-[12px] 2xl:text-base font-inter font-semibold",
                    "uppercase tracking-[1.2px] leading-4",
                    tier.featured ? "text-primary" : "text-[#9A8F7E] ",
                  )}
                >
                  Tier 0{index + 1}
                </p>

                <h2
                  className={cn(
                    "mb-5 font-display text-[32px] 2xl:text-[40px] font-bold leading-10 2xl:leading-12",
                    tier.featured ? "text-primary" : "text-foreground",
                  )}
                >
                  {tier.label}
                </h2>

                <p className="h-px w-full bg-[#4E4637] mb-8"></p>

                <ul className="mb-10 flex flex-1 flex-col gap-4">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      {tier.featured ? (
                        <img
                          src="/icons/star.svg"
                          className="mt-1 h-3.5 w-3.5 2xl:h-4 2xl:w-4 shrink-0 text-primary"
                        />
                      ) : (
                        <img
                          src="/icons/check-mark.svg"
                          className="mt-1 h-3.5 w-3.5 2xl:h-4 2xl:w-4 shrink-0 text-primary"
                        />
                      )}

                      <span
                        className={cn(
                          "text-base 2xl:text-[20px] font-inter",
                          tier.featured
                            ? "text-foreground font-medium leading-5"
                            : "text-foreground-muted leading-6",
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
                    "w-full tracking-[1.2px] font-inter text-[12px] 2xl:text-base leading-4",
                    tier.featured
                      ? "font-bold h-14 2xl:h-16"
                      : "font-semibold h-12.5 2xl:h-14",
                  )}
                  onClick={() => onSelectTier(tier.id)}
                >
                  {tier.featured ? `Select ${tier.label} Tier` : "Enquire Now"}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
