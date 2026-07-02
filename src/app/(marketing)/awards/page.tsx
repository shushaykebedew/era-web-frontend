import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { AwardCategoriesSection } from "@/components/sections/AwardCategoriesSection";
import { awardCategories } from "@/data/award-categories";

export const metadata: Metadata = {
  title: "Award Categories",
  description: "Explore every Ethiopia Real Estate Awards category.",
};

export default function AwardsPage() {
  return (
    <>
      {/* ── Page hero ── */}
      <section className="bg-background pb-12 pt-40 text-center">
        <Container size="narrow">
          <Eyebrow align="center" className="mb-6">
            Excellence in Architecture
          </Eyebrow>
          <div className="flex flex-col justify-center items-center gap-5">
            <h1 className="font-display text-[72px] leading-20 font-bold tracking-[-1.44px]">
              Award Categories
            </h1>
            <p className="h-px w-[96px] bg-[#EBC16666]"></p>
          </div>
          <p className="mx-auto mt-5 max-w-[665px] text-[18px] text-[#D1C5B2] leading-7 font-inter">
            Celebrating the visionaries who redefine Ethiopia&apos;s skyline
            through innovation, sustainability, and cultural preservation.
          </p>
        </Container>
      </section>

      {/* ── Categories grid ── */}
      <AwardCategoriesSection categories={awardCategories} variant="full" />

      {/* ── Visual Excellence split section ── */}
      <section className="bg-background py-24 border-t border-[#EBC16633] mx-22">
        <div className="flex flex-col gap-0 overflow-hidden lg:flex-row lg:justify-between">
          {/* Left — text */}
          <div className="flex flex-col justify-center lg:w-1/2 max-w-md">
            <p className="mb-4 text-[12px] font-inter font-semibold uppercase leading-4 tracking-[1.2px] text-[#EBC166]">
              Visual Excellence
            </p>
            <h2 className="font-display text-[48px]  font-semibold leading-14 text-[#EAE1D7]">
              A Legacy of Form and Function
            </h2>
            <p className="mt-6 text-[18px] leading-7 text-[#D1C5B2] font-inter">
              The ERA awards recognize more than just buildings; we honor the
              dialogue between a structure and its environment. Our categories
              reflect the diverse needs of a rapidly urbanizing nation.
            </p>
            <div className="mt-10">
              <Button
                as={Link}
                href="/gallery"
                variant="outline"
                size="sm"
                className="text-[12px] font-semibold tracking-[1.2px] font-inter leading-4 text-[#EBC166] border-[#EBC166] h-[42px] px-6"
              >
                Explore the Gallery
              </Button>
            </div>
          </div>

          {/* Right — featured image */}
          <div className="relative min-h-[360px] lg:w-1/2">
            <img
              src="/imgs/image-1.png"
              alt="Featured Winner 2023: Unity Sky Tower"
              className="h-full w-full object-cover"
            />
            {/* Caption badge */}
            <div className="absolute bottom-5 left-12 whitespace-nowrap bg-[#16130D99] px-3 h-8 border-l-2 border-[#EBC166] backdrop-blur-[12px]">
              <span className="text-[12px] font-inter font-semibold tracking-[1.2px] text-[#EAE1D7] leading-4">
                Featured Winner 2023: Unity Sky Tower
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
