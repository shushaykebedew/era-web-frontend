import { Container } from "@/components/ui/Container";
import { PartnersPageClient } from "@/features/partners/PartnersPageClient";
import { ConfirmedPartners } from "@/features/partners/ConfirmedPartners";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/utils/cn";
import { FadeIn, SlideUp } from "@/components/ui/animations";

export function PartnersPageContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-background pb-12 pt-28 text-center sm:pb-16 sm:pt-36 lg:pt-40 2xl:pt-48">
        <Container size="wide">
          <FadeIn>
            <Eyebrow align="center" className="">
              Excellence in Architecture
            </Eyebrow>
          </FadeIn>

          <SlideUp delay={0.1}>
            <h1
              className={cn(
                "mx-auto w-full max-w-182 2xl:max-w-4xl text-foreground font-display",
                "font-bold text-3xl sm:text-4xl lg:text-[48px] xl:text-[72px] 2xl:text-[96px]",
                "tracking-tight lg:tracking-[-1.44px] leading-tight lg:leading-13 xl:leading-20 2xl:leading-28",
                "",
              )}
            >
              Partner with Ethiopia&apos;s Architectural Legacy
            </h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p
              className={cn(
                "mx-auto mt-6 mb-12 max-w-155 2xl:max-w-200 text-foreground-muted font-inter",
                "text-base sm:mb-20 sm:text-[18px] 2xl:text-[24px] leading-7 2xl:leading-9 ",
              )}
            >
              The Ethiopia Real Estate Awards represent the pinnacle of industry
              achievement. Align your brand with the visionaries shaping the
              skyline of tomorrow.
            </p>
          </SlideUp>
        </Container>
      </section>

      {/* ── Interactive sections (client) ── */}
      <PartnersPageClient confirmedPartnersSlot={<ConfirmedPartners />} />
    </>
  );
}
