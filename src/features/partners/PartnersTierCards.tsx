"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { PartnersTierCardsProps } from "@/types/partners";
import { StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { sponsorTiers } from "@/data/partners";
import { Check, Star } from "lucide-react";

// Keep TIERS exported so TierSelect can import it without changing its import path
export const TIERS = sponsorTiers;

export function PartnersTierCards({ onSelectTier }: PartnersTierCardsProps) {
  return (
    <section className="bg-background pt-8 sm:pt-12 pb-16 sm:pb-20">
      <Container size="wide">
        <StaggerContainer className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-2 xl:grid-cols-3">
          {TIERS.map((tier, index) => (
            <StaggerItem
              key={tier.id}
              className={cn(
                "w-full h-full",
                tier.featured && "order-first xl:order-0",
              )}
            >
              {/* Outer wrapper — holds sizing + the medallion badge, left un-clipped */}
              <div
                className={cn(
                  "relative flex h-full w-full max-w-98 xl:max-w-md 2xl:max-w-150",
                  "mx-auto lg:mx-0 xl:min-h-128 2xl:min-h-150",
                  tier.featured && "xl:-translate-y-6 z-10",
                )}
              >
                {/* Medallion badge for the featured tier */}
                {tier.featured && (
                  <div className="absolute -top-5 left-1/2 z-20 -translate-x-1/2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary shadow-[0px_8px_20px_-6px_rgba(230,197,106,0.6)] ring-4 ring-[#16130D]">
                      <Star
                        className="h-4.5 w-4.5 text-[#16130D]"
                        fill="#16130D"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                )}

                {/* Card body — clipped, so the ghost numeral respects the border */}
                <div
                  className={cn(
                    "relative flex h-full w-full flex-col overflow-hidden",
                    "border p-6 sm:p-8 2xl:p-10 transition-all duration-300",
                    tier.featured
                      ? "border-primary shadow-[0px_25px_50px_-12px_#00000040] bg-[linear-gradient(0deg,#16130D,#16130D),radial-gradient(165.23%_125.62%_at_0%_0%,rgba(230,197,106,0.15)_0%,rgba(230,197,106,0)_50%)]"
                      : "border-border-strong bg-[#110E08]",
                  )}
                >
                  {/* Ghost numeral watermark — the card's signature element */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-6 -right-3 select-none font-display text-[130px] sm:text-[150px] 2xl:text-[170px] font-medium leading-none text-primary/[0.07]"
                  >
                    0{index + 1}
                  </span>

                  {/* Featured caption, sits above the badge overlap */}
                  {tier.featured && (
                    <p className="relative z-10 mb-4 text-center font-inter text-[11px] font-medium uppercase tracking-[2.4px] text-primary/90">
                      Premier Partner
                    </p>
                  )}

                  <div className="relative z-10 flex h-full flex-col">
                    {/* Eyebrow */}
                    <p
                      className={cn(
                        "mb-2 font-display text-sm italic tracking-[0.5px]",
                        tier.featured ? "text-primary/70" : "text-[#9A8F7E]",
                      )}
                    >
                      Tier
                    </p>

                    {/* Title */}
                    <h2
                      className={cn(
                        "mb-5 font-display text-[32px] 2xl:text-[40px] font-medium leading-10 2xl:leading-12 tracking-tight",
                        tier.featured ? "text-primary" : "text-foreground",
                      )}
                    >
                      {tier.label}
                    </h2>

                    {/* Divider */}
                    <div className="relative mb-8 h-px w-full">
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,#4E4637_15%,#4E4637_85%,transparent)]" />
                      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-primary/50" />
                    </div>

                    {/* Benefits */}
                    <ul className="mb-10 flex flex-1 flex-col gap-4">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <span
                            className={cn(
                              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                              tier.featured
                                ? "border-primary/40 text-primary"
                                : "border-foreground-muted/30 text-foreground-muted",
                            )}
                          >
                            <Check className="h-3 w-3" strokeWidth={2.5} />
                          </span>

                          <span
                            className={cn(
                              "font-inter text-base 2xl:text-[20px] font-normal",
                              tier.featured
                                ? "text-foreground leading-5"
                                : "text-foreground-muted leading-6",
                            )}
                          >
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      variant={tier.featured ? "primary" : "outline"}
                      size="sm"
                      className={cn(
                        "w-full font-inter text-[12px] font-medium tracking-[1.2px] 2xl:text-base leading-4",
                        "h-12.5 2xl:h-14",
                      )}
                      onClick={() => onSelectTier(tier.id)}
                    >
                      {tier.featured
                        ? `Select ${tier.label} Tier`
                        : "Enquire Now"}
                    </Button>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
