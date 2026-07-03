import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PartnersPageClient } from "@/components/sections/partners/PartnersPageClient";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with Ethiopia's Architectural Legacy. Explore sponsorship tiers and confirmed partners.",
};

export default function PartnersPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-background pb-16 pt-40 text-center">
        <Container size="narrow">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-primary" aria-hidden />
            <Eyebrow align="center" className="">
              Excellence in Architecture
            </Eyebrow>
            <span className="h-px w-8 bg-primary" aria-hidden />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[48px] xl:text-[72px] font-bold leading-tight lg:leading-13 xl:leading-20 tracking-tight lg:tracking-[-1.44px] text-[#EAE1D7] max-w-[728px]">
            Partner with Ethiopia&apos;s Architectural Legacy
          </h1>
          <p className="mx-auto mt-6 mb-20 max-w-[620px] text-[18px] leading-7.5 text-[#D1C5B2] font-inter">
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
