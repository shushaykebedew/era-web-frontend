import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";
import {
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/animations";
import { partnersService } from "@/services/partners";
import type { Partner } from "@/types";

const TIER_COLOR: Record<string, string> = {
  GOLD: "text-primary border-primary/20",
  SILVER: "text-foreground-muted border-[#9A8F7E33]",
  BRONZE: "text-foreground-muted/60 border-[#9A8F7E1A]",
};

const TIER_LABEL: Record<string, string> = {
  GOLD: "Gold",
  SILVER: "Silver",
  BRONZE: "Bronze",
};

function PartnerCard({ name, tier, logo }: Partner) {
  const tierKey = (tier ?? "").toUpperCase();
  return (
    <div
      className={cn(
        "group relative overflow-hidden md:w-full aspect-286/244 bg-[#131313]",
        "w-full sm:max-w-71.5 mx-auto lg:max-w-none border border-[#4E4637]",
      )}
    >
      <div
        className={cn(
          "relative flex h-full w-full flex-col items-center justify-center",
          "gap-6 transition-transform duration-300 group-hover:scale-105",
        )}
      >
        <div className="relative h-24 w-48">
          {logo ? (
            <Image
              src={logo}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 1536px) 160px, 208px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-display text-xl font-bold text-foreground/60 uppercase tracking-widest">
                {name.slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        {tier && (
          <span
            className={cn(
              "text-[12px] 2xl:text-[16px] leading-4 2xl:leading-6 font-semibold",
              "px-3 2xl:px-4 py-1 2xl:py-1.5 font-inter uppercase",
              "tracking-[1.2px] 2xl:tracking-[1.6px] border",
              TIER_COLOR[tierKey] ?? "text-foreground-muted/60 border-[#9A8F7E1A]",
            )}
          >
            {TIER_LABEL[tierKey] ?? tier}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Main export — server component: fetches partners at render time ────────────
export async function ConfirmedPartners() {
  let partners: Partner[] = [];

  try {
    partners = await partnersService.list();
  } catch {
    // Silently fail — display empty state
  }

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#1F1B15] py-16 sm:py-20 lg:py-24 2xl:py-32">
      <Container size="wide">
        <SlideUp>
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-2">
              <h2
                className={cn(
                  "text-[28px] sm:text-[36px] lg:text-[42px] 2xl:text-[56px] font-display",
                  "font-semibold leading-tight lg:leading-14 2xl:leading-18 text-foreground",
                )}
              >
                Our Partners
              </h2>
              <p
                className={cn(
                  "text-base sm:text-[18px] 2xl:text-[24px] leading-7 2xl:leading-9",
                  "text-foreground-muted max-w-lg 2xl:max-w-180 font-inter",
                )}
              >
                Industry leaders already committed to celebrating
                Ethiopia&apos;s architectural renaissance.
              </p>
            </div>
            <p
              className={cn(
                "text-[12px] 2xl:text-base font-inter font-semibold uppercase",
                " tracking-[2.4px] leading-4 text-primary sm:shrink-0",
              )}
            >
              Excellence Through Collaboration
            </p>
          </div>
        </SlideUp>

        <StaggerContainer
          className={cn(
            "grid grid-cols-1 gap-4 sm:gap-8 2xl:gap-12 justify-items-center",
            "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          )}
        >
          {partners.map((partner) => (
            <StaggerItem key={partner.id ?? partner.name} className="w-full">
              <PartnerCard {...partner} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
