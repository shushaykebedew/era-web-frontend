import { Container } from "@/components/ui/Container";
import { PartnersPageClient } from "@/features/partners/PartnersPageClient";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function PartnersPageContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-background pb-12 pt-28 text-center sm:pb-16 sm:pt-36 lg:pt-40">
        <Container size="wide">
          <Eyebrow align="center" className="">
            Excellence in Architecture
          </Eyebrow>

          <h1 className="mx-auto w-full max-w-[728px] font-display text-3xl sm:text-4xl lg:text-[48px] xl:text-[72px] font-bold leading-tight lg:leading-13 xl:leading-20 tracking-tight lg:tracking-[-1.44px] text-[#EAE1D7]">
            Partner with Ethiopia&apos;s Architectural Legacy
          </h1>
          <p className="mx-auto mt-6 mb-12 max-w-[620px] text-base sm:mb-20 sm:text-[18px] leading-7 text-[#D1C5B2] font-inter">
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
