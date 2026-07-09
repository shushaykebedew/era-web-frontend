import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ServerButton as Button } from "@/components/ui/ServerButton";
import { AwardCategoriesSection } from "@/features/awards/AwardCategoriesSection";
import { awardCategories } from "@/data/award-categories";
import { cn } from "@/utils/cn";
import { FadeIn, SlideUp } from "@/components/ui/animations";

export function CategoriesPageContent() {
  return (
    <>
      {/* ── Page hero ── */}
      <section className="bg-background px-0 pb-10 2xl:pb-16 pt-28 text-center sm:pb-12 sm:pt-36 lg:pt-40 2xl:pt-48">
        <Container size="wide">
          <FadeIn>
            <Eyebrow align="center" className="">
              Excellence in Architecture
            </Eyebrow>
          </FadeIn>

          <SlideUp delay={0.1}>
            <div className="flex flex-col justify-center items-center gap-5">
              <h1
                className={cn(
                  "font-display text-[40px] sm:text-[56px] lg:text-[72px] 2xl:text-[96px]",
                  "leading-tight lg:leading-20 2xl:leading-28",
                  "font-bold tracking-tight lg:tracking-[-1.44px]",
                )}
              >
                Award Categories
              </h1>
              <p className="h-px w-16 sm:w-24 2xl:w-32 bg-[#EBC16666]"></p>
            </div>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p
              className={cn(
                "mx-auto mt-5 w-full max-w-full lg:max-w-166.25 2xl:max-w-200",
                "text-base sm:text-[18px] 2xl:text-[24px] text-[#D1C5B2]",
                "leading-7 2xl:leading-9 font-inter",
              )}
            >
              Celebrating the visionaries who redefine Ethiopia&apos;s skyline
              through innovation, sustainability, and cultural preservation.
            </p>
          </SlideUp>
        </Container>
      </section>

      {/* ── Categories grid ── */}
      <AwardCategoriesSection categories={awardCategories} variant="full" />

      {/* ── Visual Excellence split section ── */}
      <section className="bg-background py-16 sm:py-20 lg:py-24 2xl:py-32 border-t border-[#EBC16633] w-full overflow-hidden">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="flex min-w-0 flex-col gap-12 overflow-hidden lg:flex-row lg:justify-between lg:gap-8">
            {/* Left — text */}
            <div className="flex min-w-0 flex-col justify-center w-full lg:w-1/2 max-w-full lg:max-w-md 2xl:max-w-175">
              <SlideUp>
                <p className="mb-4 2xl:mb-6 text-[12px] 2xl:text-[16px] font-inter font-semibold uppercase leading-4 2xl:leading-6 tracking-[1.2px] 2xl:tracking-[1.6px] text-[#EBC166]">
                  Visual Excellence
                </p>
                <h2 className="font-display text-[36px] sm:text-[48px] 2xl:text-[64px] font-semibold leading-tight lg:leading-14 2xl:leading-20 text-[#EAE1D7]">
                  A Legacy of Form and Function
                </h2>
              </SlideUp>

              <SlideUp delay={0.1}>
                <p className="mt-6 text-base sm:text-[18px] 2xl:text-[24px] leading-7 2xl:leading-9 text-[#D1C5B2] font-inter">
                  The ERA awards recognize more than just buildings; we honor
                  the dialogue between a structure and its environment. Our
                  categories reflect the diverse needs of a rapidly urbanizing
                  nation.
                </p>
              </SlideUp>

              <SlideUp delay={0.2}>
                <div className="mt-10">
                  <Button
                    as={Link}
                    href="/gallery"
                    variant="outline"
                    size="sm"
                    className={cn(
                      "w-full sm:w-auto h-10 sm:h-10.5 2xl:h-15 px-4 sm:px-6 2xl:px-10",
                      "text-[12px] 2xl:text-[20px] font-semibold tracking-[1.2px] 2xl:tracking-[2px]",
                      "font-inter leading-4 2xl:leading-6 text-[#EBC166] border-[#EBC166]",
                      "hover:border-primary/80 hover:text-primary/90",
                    )}
                  >
                    Explore the Gallery
                  </Button>
                </div>
              </SlideUp>
            </div>

            {/* Right — featured image */}
            <FadeIn
              delay={0.3}
              className="relative w-full min-h-60 sm:min-h-90 aspect-4/3 lg:aspect-auto lg:min-h-90 2xl:min-h-120 lg:w-1/2 overflow-hidden"
            >
              <img
                src="/imgs/image-1.png"
                alt="Featured Winner 2023: Unity Sky Tower"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Caption badge */}
              <div
                className={cn(
                  "absolute bottom-4 left-4 max-w-[calc(100%-32px)] sm:max-w-none",
                  "sm:bottom-5 sm:left-12 2xl:bottom-8 2xl:left-16",
                  "bg-[#16130D99] px-3 py-1.5 sm:py-0 sm:h-8 2xl:h-12 2xl:px-5",
                  "border-l-2 2xl:border-l-4 border-[#EBC166] backdrop-blur-md flex items-center",
                )}
              >
                <span
                  className={cn(
                    "text-[10px] sm:text-[12px] 2xl:text-[16px] font-inter font-semibold",
                    "tracking-[1.2px] 2xl:tracking-[1.6px] text-[#EAE1D7]",
                    "leading-4 sm:leading-4 2xl:leading-6 whitespace-normal sm:whitespace-nowrap",
                  )}
                >
                  Featured Winner 2023: Unity Sky Tower
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
