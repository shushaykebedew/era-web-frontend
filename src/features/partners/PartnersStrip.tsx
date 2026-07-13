import type { Partner } from "@/types";
import { cn } from "@/utils/cn";
import {
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from "@/components/ui/animations";

export function PartnersStrip({ partners }: { partners: Partner[] }) {
  return (
    <section className="bg-[#16130D] py-16">
      <div className="w-full mx-auto  min-w-0 px-8 lg:px-10 xl:px-12 2xl:px-16 max-w-7xl 2xl:max-w-screen-2xl">
        {/* <div className="w-full mx-auto  min-w-0 px-8 lg:px-10 xl:px-12 2xl:px-16"> */}
        <FadeIn>
          <p
            className={cn(
              "mb-10 2xl:mb-16 text-center text-xs 2xl:text-[16px] text-foreground-muted",
              "font-semibold uppercase tracking-[0.3em] 2xl:tracking-[0.4em] font-inter",
            )}
          >
            Distinguished Partners
          </p>
        </FadeIn>
        <StaggerContainer
          className={cn(
            "flex bg-[#141311] flex-wrap items-center justify-center py-8 2xl:py-12 px-4",
            "gap-x-8 sm:gap-x-14 2xl:gap-x-20 gap-y-8 sm:gap-y-12 2xl:gap-y-16",
          )}
        >
          {partners.map((partner) => (
            <StaggerItem key={partner.name}>
              <span
                className={cn(
                  "font-display text-[20px] sm:text-[28px] xl:text-[32px] 2xl:text-[40px] uppercase",
                  "tracking-tight xl:tracking-[-1.6px] transition-colors hover:text-foreground",
                  "text-[#EAE1D7CC] leading-tight sm:leading-10 2xl:leading-12",
                )}
              >
                {partner.name}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
