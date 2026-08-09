import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { ServerButton as Button } from "@/components/ui/ServerButton";
import { ScrollIndicatorLine } from "@/components/ui/ScrollIndicatorLine";
import { cn } from "@/utils/cn";
import { StaggerContainer, SlideUp, FadeIn } from "@/components/ui/animations";
import { HeroProps } from "@/types/marketing";
import { Sparkle } from "lucide-react";

export function Hero({
  eyebrow = "The 5th Annual Ceremony",
  description = "Honoring the architects, developers, and visionaries shaping the future of the Ethiopian landscape through sustainable innovation and aesthetic mastery.",
}: HeroProps) {
  return (
    <section className="relative flex min-w-0 flex-1 flex-col justify-center overflow-hidden">
      {/* Decorative background layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-primary/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <Container
        size="wide"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <StaggerContainer className="flex flex-col items-center">
          <SlideUp>
            <p
              className={cn(
                "mb-6 2xl:mb-10 mt-20 lg:mt-0 max-w-full py-1 px-3 sm:px-4 2xl:px-6",
                "font-inter text-primary border border-primary leading-4 2xl:leading-6",
                "text-[10px] sm:text-[12px] 2xl:text-[16px] font-semibold uppercase",
                "tracking-[2px] sm:tracking-[3.6px] 2xl:tracking-[4.8px]",
                "inline-flex items-center gap-2 rounded-full bg-primary/5",
              )}
            >
              <Sparkle className="h-3 w-3 2xl:h-4 2xl:w-4 shrink-0" />
              {eyebrow}
            </p>
          </SlideUp>

          <SlideUp delay={0.1}>
            <h1
              className={cn(
                "font-display text-[26px] sm:text-4xl md:text-6xl lg:text-[70px] 2xl:text-[80px]",
                "w-full max-w-full lg:max-w-201.5 2xl:max-w-275",
                "font-bold tracking-tight lg:tracking-[-1.44px]",
                "leading-tight lg:leading-20 2xl:leading-28",
              )}
            >
              Celebrating Excellence in <br className="lg:hidden" />
              <span className="text-primary italic pl-1">Ethiopian</span> Real
              Estate
            </h1>
          </SlideUp>

          <SlideUp delay={0.2}>
            <p
              className={cn(
                "px-6 md:px-0 font-inter mt-6 w-full max-w-lg md:max-w-164.5 2xl:max-w-200",
                "text-sm sm:text-base lg:text-[18px] 2xl:text-[24px]",
                "leading-6 2xl:leading-9 text-foreground-muted",
              )}
            >
              {description}
            </p>
          </SlideUp>

          <SlideUp delay={0.3} className="w-full">
            <div
              className={cn(
                "my-10 2xl:my-16 flex w-full max-w-md 2xl:max-w-3xl flex-col items-center mx-auto",
                "gap-4 2xl:gap-6 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center",
              )}
            >
              <Button
                as={Link}
                href={siteConfig.voteCta.href}
                size="lg"
                className={cn(
                  "w-full sm:w-auto sm:min-w-39 2xl:min-w-60 h-12 2xl:h-18",
                  "font-bold text-[12px] 2xl:text-[20px]",
                  "shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow duration-300",
                )}
              >
                {siteConfig.voteCta.label}
              </Button>
              <Button
                as={Link}
                href="/nominees"
                variant="outline"
                size="lg"
                className={cn(
                  "w-full sm:w-auto sm:min-w-50 2xl:min-w-[320px] h-12 2xl:h-18",
                  "text-[12px] 2xl:text-[20px] font-semibold hover:text-primary hover:border-primary transition-colors duration-300",
                )}
              >
                Explore Nominees
              </Button>
            </div>
          </SlideUp>
        </StaggerContainer>
      </Container>

      <FadeIn delay={0.6}>
        <div
          className={cn(
            "mt-8 2xl:mt-12 mb-5 lg:mb-0 flex justify-center opacity-50",
            "lg:absolute lg:inset-x-0 lg:bottom-8 2xl:bottom-12",
            "lg:mt-0 lg:items-end sm:bottom-12",
          )}
        >
          <div className="flex max-h-20 flex-col items-center justify-between">
            <p
              className={cn(
                "font-inter text-[10px] 2xl:text-[14px] leading-3.75 2xl:leading-5",
                "tracking-[1px] 2xl:tracking-[1.5px] uppercase text-foreground",
              )}
            >
              Discover
            </p>
            <ScrollIndicatorLine />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}