import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
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
        <p className="mb-6 mt-20 lg:mt-0 max-w-full font-inter text-primary border border-primary text-[10px] sm:text-[12px] font-semibold uppercase tracking-[2px] sm:tracking-[3.6px] leading-4 py-1 px-3 sm:px-4">
          {eyebrow}
        </p>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] w-full max-w-full lg:max-w-[806px] font-bold tracking-tight lg:tracking-[-1.44px] leading-tight lg:leading-20">
          Celebrating Excellence in
          <span className="text-primary italic pl-1">Ethiopian</span> Real
          Estate
        </h1>

        <p className="font-inter mt-6 w-full max-w-full md:max-w-[658px] text-sm sm:text-base lg:text-[18px] leading-6 text-foreground-muted">
          {description}
        </p>

        <div className="my-10 flex w-full max-w-md flex-col items-center gap-4 sm:w-auto sm:max-w-none sm:flex-row">
          <Button
            as={Link}
            href={siteConfig.voteCta.href}
            size="lg"
            className="w-full sm:w-auto sm:min-w-[156px] h-12 font-bold text-[12px]"
          >
            {siteConfig.voteCta.label}
          </Button>
          <Button
            as={Link}
            href="/nominees"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto sm:min-w-[200px] h-12 text-[12px] font-semibold"
          >
            Explore Nominees
          </Button>
        </div>
      </Container>

      <div className="mt-8 mb-5 lg:mb-0 flex justify-center opacity-50 lg:absolute lg:inset-x-0 lg:bottom-8 lg:mt-0 lg:items-end sm:bottom-12">
        <div className="flex max-h-20 flex-col items-center justify-between">
          <p className="font-inter text-[10px] leading-[15px] tracking-[1px] uppercase text-foreground">
            Discover
          </p>
          <img src="/imgs/Vertical Divider.png" alt="" className="h-12 w-0.5" />
        </div>
      </div>
    </section>
  );
}
