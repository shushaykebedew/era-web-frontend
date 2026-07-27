import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ServerButton as Button } from "@/components/ui/ServerButton";
import { AwardCategoriesSection } from "@/features/home/AwardCategoriesSection";
import { featuredWinner } from "@/data/award-categories";
import { fetchCategories } from "@/services/categories";
import type { AwardCategory } from "@/types";
import { cn } from "@/utils/cn";
import { FadeIn, SlideUp } from "@/components/ui/animations";

function CategoriesHero() {
  return (
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
                "font-display text-[40px] sm:text-[56px] lg:text-[72px] 2xl:text-[96px] font-bold ",
                "leading-tight lg:leading-20 2xl:leading-28 tracking-tight lg:tracking-[-1.44px]",
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
              "mx-auto mt-5 w-full max-w-full lg:max-w-166.25 2xl:max-w-200 font-inter",
              "text-base sm:text-[18px] 2xl:text-[24px] text-foreground-muted leading-7 2xl:leading-9 ",
            )}
          >
            Celebrating the visionaries who redefine Ethiopia's skyline through
            innovation, sustainability, and cultural preservation.
          </p>
        </SlideUp>
      </Container>
    </section>
  );
}

function VisualExcellenceSection() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24 2xl:py-32 border-t border-primary/20 w-full overflow-hidden">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="flex min-w-0 flex-col gap-12 overflow-hidden lg:flex-row lg:justify-between lg:gap-8">
          {/* Left — text */}
          <div className="flex min-w-0 flex-col justify-center w-full lg:w-1/2 max-w-full lg:max-w-md 2xl:max-w-175">
            <SlideUp>
              <p
                className={cn(
                  "mb-4 2xl:mb-6 text-[12px] 2xl:text-[16px] font-inter font-semibold uppercase",
                  "leading-4 2xl:leading-6 tracking-[1.2px] 2xl:tracking-[1.6px] text-primary",
                )}
              >
                Visual Excellence
              </p>
              <h2
                className={cn(
                  "font-display text-[36px] sm:text-[48px] 2xl:text-[64px] font-semibold",
                  "leading-tight lg:leading-14 2xl:leading-20 text-foreground",
                )}
              >
                A Legacy of Form and Function
              </h2>
            </SlideUp>

            <SlideUp delay={0.1}>
              <p className="mt-6 text-base sm:text-[18px] 2xl:text-[24px] leading-7 2xl:leading-9 text-foreground-muted font-inter">
                The ERA awards recognize more than just buildings; we honor the
                dialogue between a structure and its environment. Our categories
                reflect the diverse needs of a rapidly urbanizing nation.
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
                    "font-inter leading-4 2xl:leading-6 text-primary border-primary",
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
            className={cn(
              "relative w-full min-h-60 sm:min-h-90 aspect-4/3 lg:aspect-auto",
              "lg:min-h-90 2xl:min-h-120 lg:w-1/2 overflow-hidden",
            )}
          >
            <img
              src={featuredWinner.image}
              alt={featuredWinner.label}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Caption badge */}
            <div
              className={cn(
                "absolute bottom-4 left-4 max-w-[calc(100%-32px)] sm:max-w-none",
                "sm:bottom-5 sm:left-12 2xl:bottom-8 2xl:left-16",
                "bg-[#16130D99] px-3 py-1.5 sm:py-0 sm:h-8 2xl:h-12 2xl:px-5",
                "border-l-2 2xl:border-l-4 border-primary backdrop-blur-md flex items-center",
              )}
            >
              <span
                className={cn(
                  "text-[10px] sm:text-[12px] 2xl:text-[16px] font-inter font-semibold",
                  "tracking-[1.2px] 2xl:tracking-[1.6px] text-foreground",
                  "leading-4 sm:leading-4 2xl:leading-6 whitespace-normal sm:whitespace-nowrap",
                )}
              >
                {featuredWinner.label}
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function CategoriesEmptyState() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24 2xl:py-32">
      <Container size="wide">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div
            className={cn(
              "mb-6 flex h-16 w-16 2xl:h-20 2xl:w-20 items-center justify-center",
              "border border-border-strong bg-background-subtle rounded-full",
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground-muted 2xl:w-8 2xl:h-8"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>
          <h2
            className={cn(
              "font-display text-xl sm:text-2xl 2xl:text-3xl font-semibold",
              "text-foreground tracking-tight mb-3",
            )}
          >
            Coming Soon
          </h2>
          <p
            className={cn(
              "max-w-sm sm:max-w-md 2xl:max-w-lg font-inter text-foreground-muted",
              "text-sm sm:text-base 2xl:text-[18px] leading-6 2xl:leading-8 ",
            )}
          >
            Award categories will be announced soon.
            <br />
            Check back later to see the full list of categories.
          </p>
        </div>
      </Container>
    </section>
  );
}

export async function CategoriesPageContent() {
  let categories: AwardCategory[];
  try {
    categories = await fetchCategories();
  } catch {
    categories = [];
  }

  return (
    <>
      <CategoriesHero />
      {categories.length > 0 ? (
        <AwardCategoriesSection categories={categories} variant="full" />
      ) : (
        <CategoriesEmptyState />
      )}
      <VisualExcellenceSection />
    </>
  );
}
