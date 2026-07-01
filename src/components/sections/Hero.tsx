import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

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
    <section className="relative flex flex-1 flex-col justify-center overflow-hidden">
      {/* <div
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background"
        aria-hidden
      /> */}

      <Container
        size="wide"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <Eyebrow
          align="center"
          className="mb-6 font-inter font-semibold text-[12px] border border-[#EBC16666] py-1 px-4"
        >
          {eyebrow}
        </Eyebrow>

        <h1 className="font-display text-[72px] max-w-[806px] font-bold tracking-[1.2px] leading-20 w-full">
          Celebrating Excellence in
          <span className="text-primary italic">Ethiopian</span> Real Estate
        </h1>

        <p className="font-inter mt-6 max-w-[658px] text-[18px] text-foreground-muted">
          {description}
        </p>

        <div className="my-10 flex flex-col gap-4 sm:flex-row">
          <Button
            as={Link}
            href={siteConfig.voteCta.href}
            size="lg"
            className="w-[156px] h-12 font-bold text-[12px]"
          >
            {siteConfig.voteCta.label}
          </Button>
          <Button
            as={Link}
            href="/nominees"
            variant="outline"
            size="lg"
            className="w-[223px] h-[50px] text-[12px] font-semibold"
          >
            Explore Nominees
          </Button>
        </div>
      </Container>

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-end justify-center sm:bottom-12 opacity-50">
        <div className="flex max-h-20 flex-col items-center justify-between">
          <p className="uppercase text-[10px] font-inter text-[#EAE1D7] leading-[15px] tracking-[1px]">
            Discover
          </p>
          <img src="/imgs/Vertical Divider.png" alt="" className="w-0.5 h-12" />
        </div>
      </div>
    </section>
  );
}
