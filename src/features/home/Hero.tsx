import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

type HeroProps = {
  eyebrow?: string;
  title?: string;
  highlightedWord?: string;
  description?: string;
};

export function Hero({
  eyebrow = "The 5th Annual Ceremony",
  description = "Honoring the architects, developers, and visionaries shaping the future of the Ethiopian landscape through sustainable innovation and aesthetic mastery.",
}: HeroProps) {
  return (
    <section className="relative flex min-w-0 flex-1 flex-col justify-center overflow-hidden">
      <Container
        size="wide"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <p
          className={cn(
            "mb-6 2xl:mb-10 mt-20 lg:mt-0 max-w-full",
            "font-inter text-primary border border-primary",
            "text-[10px] sm:text-[12px] 2xl:text-[16px] font-semibold uppercase",
            "tracking-[2px] sm:tracking-[3.6px] 2xl:tracking-[4.8px]",
            "leading-4 2xl:leading-6 py-1 px-3 sm:px-4 2xl:px-6",
          )}
        >
          {eyebrow}
        </p>

        <h1
          className={cn(
            "font-display text-3xl sm:text-5xl md:text-6xl lg:text-[72px] 2xl:text-[96px]",
            "w-full max-w-full lg:max-w-201.5 2xl:max-w-5xl",
            "font-bold tracking-tight lg:tracking-[-1.44px]",
            "leading-tight lg:leading-20 2xl:leading-28",
          )}
        >
          Celebrating Excellence in <br className="md:hidden" />
          <span className="text-primary italic pl-1">Ethiopian</span> Real
          Estate
        </h1>

        <p
          className={cn(
            "px-6 md:px-0 font-inter mt-6 w-full max-w-lg md:max-w-164.5 2xl:max-w-200",
            "text-sm sm:text-base lg:text-[18px] 2xl:text-[24px]",
            "leading-6 2xl:leading-9 text-foreground-muted",
          )}
        >
          {description}
        </p>

        <div
          className={cn(
            "my-10 2xl:my-16 flex w-full max-w-md 2xl:max-w-3xl flex-col items-center",
            "gap-4 2xl:gap-6 sm:w-auto sm:max-w-none sm:flex-row",
          )}
        >
          <Button
            as={Link}
            href={siteConfig.voteCta.href}
            size="lg"
            className="w-full sm:w-auto sm:min-w-39 2xl:min-w-60 h-12 2xl:h-18 font-bold text-[12px] 2xl:text-[20px]"
          >
            {siteConfig.voteCta.label}
          </Button>
          <Button
            as={Link}
            href="/nominees"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto sm:min-w-50 2xl:min-w-[320px] h-12 2xl:h-18 text-[12px] 2xl:text-[20px] font-semibold"
          >
            Explore Nominees
          </Button>
        </div>
      </Container>

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
          <img
            src="/imgs/Vertical Divider.png"
            alt=""
            className="h-12 w-0.5 2xl:h-16 2xl:w-1"
          />
        </div>
      </div>
    </section>
  );
}
