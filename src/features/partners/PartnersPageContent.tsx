import { Container } from "@/components/ui/Container";
import { PartnersPageClient } from "@/features/partners/PartnersPageClient";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/utils/cn";

export function PartnersPageContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-background pb-12 pt-28 text-center sm:pb-16 sm:pt-36 lg:pt-40 2xl:pt-48">
        <Container size="wide">
          <Eyebrow align="center" className="">
            Excellence in Architecture
          </Eyebrow>

          <h1
            className={cn(
              "mx-auto w-full max-w-[728px] 2xl:max-w-[896px]",
              "font-display text-3xl sm:text-4xl lg:text-[48px] xl:text-[72px] 2xl:text-[96px]",
              "font-bold leading-tight lg:leading-13 xl:leading-20 2xl:leading-28",
              "tracking-tight lg:tracking-[-1.44px] text-[#EAE1D7]",
            )}
          >
            Partner with Ethiopia&apos;s Architectural Legacy
          </h1>
          <p
            className={cn(
              "mx-auto mt-6 mb-12 max-w-[620px] 2xl:max-w-[800px]",
              "text-base sm:mb-20 sm:text-[18px] 2xl:text-[24px]",
              "leading-7 2xl:leading-9 text-[#D1C5B2] font-inter",
            )}
          >
            The Ethiopia Real Estate Awards represent the pinnacle of industry
            achievement. Align your brand with the visionaries shaping the
            skyline of tomorrow.
          </p>
        </Container>
      </section>

      {/* ── Interactive sections (client) ── */}
      <PartnersPageClient />
    </>
  );
}
