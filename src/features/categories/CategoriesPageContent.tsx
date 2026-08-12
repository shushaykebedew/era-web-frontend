import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ServerButton as Button } from "@/components/ui/ServerButton";
import { AwardCategoriesSection } from "@/features/home/AwardCategoriesSection";
import { fetchCategories } from "@/services/categories";
import type { AwardCategory } from "@/types";
import { cn } from "@/utils/cn";
import { FadeIn, SlideUp } from "@/components/ui/animations";

function CategoriesHero() {
  return (
    <div className="py-10 mt-10 text-center bg-background">
      <h1 className="font-display font-bold text-foreground tracking-tight text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl leading-tight">
        Award Categories
      </h1>
    </div>
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
                  "mb-4 2xl:mb-6 text-[12px] 2xl:text-base font-inter font-semibold uppercase",
                  "leading-4 2xl:leading-6 tracking-[1.2px] 2xl:tracking-[1.6px] text-primary",
                )}
              >
                Visual Excellence
              </p>
              <h2
                className={cn(
                  "font-display text-[36px] sm:text-[48px] 2xl:text-[52px] font-semibold",
                  "leading-tight lg:leading-14 2xl:leading-20 text-foreground",
                )}
              >
                A Legacy of Form and Function
              </h2>
            </SlideUp>

            <SlideUp delay={0.1}>
              <p className="mt-6 text-base sm:text-[18px] 2xl:text-[20px] leading-7  text-foreground-muted font-inter">
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
                    "text-[12px] 2xl:text-[16px] font-semibold tracking-[1.2px] 2xl:tracking-[2px]",
                    "font-inter leading-4 2xl:leading-6 text-primary border-primary",
                    "hover:border-primary/80 hover:text-primary/90",
                  )}
                >
                  Explore the Gallery
                </Button>
              </div>
            </SlideUp>
          </div>

          {/* Right — Architectural blueprint design illustration */}
          <FadeIn
            delay={0.3}
            className={cn(
              "relative w-full min-h-60 sm:min-h-90 aspect-4/3 lg:aspect-auto",
              "lg:min-h-90 2xl:min-h-120 lg:w-1/2 overflow-hidden border border-primary/20",
              "bg-[#13110c] flex items-center justify-center p-8",
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,162,75,0.08)_0%,transparent_70%)] pointer-events-none" />
            <svg
              className="w-full h-full max-w-md max-h-80 text-primary/30"
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid Lines */}
              <path
                d="M 0,50 L 400,50 M 0,100 L 400,100 M 0,150 L 400,150 M 0,200 L 400,200 M 0,250 L 400,250"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
              <path
                d="M 50,0 L 50,300 M 100,0 L 100,300 M 150,0 L 150,300 M 200,0 L 200,300 M 250,0 L 250,300 M 300,0 L 300,300 M 350,0 L 350,300"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />

              {/* Isometric Architectural Forms */}
              <path
                d="M 200,80 L 290,130 L 290,230 L 200,180 Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M 200,80 L 110,130 L 110,230 L 200,180 Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M 200,80 L 290,130 L 200,180 L 110,130 Z"
                stroke="currentColor"
                strokeWidth="1"
                fill="rgba(201,162,75,0.03)"
              />

              {/* Golden Accents */}
              <path
                d="M 200,110 L 260,145 L 260,215 L 200,180 Z"
                stroke="#C9A24B"
                strokeWidth="1"
                strokeOpacity="0.6"
              />
              <path
                d="M 200,110 L 140,145 L 140,215 L 200,180 Z"
                stroke="#C9A24B"
                strokeWidth="1"
                strokeOpacity="0.6"
              />

              {/* Abstract Blueprint details */}
              <circle cx="200" cy="180" r="4" fill="#C9A24B" />
              <circle cx="200" cy="80" r="3" fill="currentColor" />
              <circle cx="110" cy="130" r="3" fill="currentColor" />
              <circle cx="290" cy="130" r="3" fill="currentColor" />

              {/* Precision Dimensions */}
              <path
                d="M 110,245 L 290,245"
                stroke="#C9A24B"
                strokeWidth="0.75"
              />
              <path
                d="M 110,240 L 110,250 M 290,240 L 290,250"
                stroke="#C9A24B"
                strokeWidth="0.75"
              />
              <text
                x="200"
                y="260"
                fill="#C9A24B"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="middle"
                letterSpacing="2"
              >
                SCALE: 1:100
              </text>
            </svg>
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
              "text-sm sm:text-base 2xl:text-[24px] leading-6 2xl:leading-8 ",
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
