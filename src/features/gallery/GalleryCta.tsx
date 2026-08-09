import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ServerButton as Button } from "@/components/ui/ServerButton";
import { cn } from "@/utils/cn";
import { SlideUp } from "@/components/ui/animations";
import { siteConfig } from "@/data/site";

export function GalleryCta() {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-primary/20 bg-background-muted",
        "py-16 text-center sm:py-20 lg:py-24 2xl:py-32",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
      />

      <Container size="narrow" className="relative">
        <SlideUp>
          <h2
            className={cn(
              "font-display text-[28px] font-semibold sm:text-[36px] lg:text-[48px] 2xl:text-[64px]",
              "leading-tight lg:leading-14 2xl:leading-20",
            )}
          >
            Be Part of the Excellence
          </h2>

          <p
            className={cn(
              "mx-auto mt-5 w-full max-w-full lg:max-w-138.5 2xl:max-w-180",
              "font-inter text-base leading-7 text-foreground-muted sm:text-[18px] 2xl:text-[24px] 2xl:leading-9",
            )}
          >
            Join the most influential gathering of real estate and architectural
            minds in East Africa.
          </p>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              as={Link}
              href={siteConfig.nominateCta.href}
              variant="outline"
              size="sm"
              className={cn(
                "h-12.5 w-53 font-inter font-semibold normal-case 2xl:h-16 2xl:w-64",
                "text-[12px] leading-4 tracking-[1.2px] 2xl:text-[16px] 2xl:leading-6 2xl:tracking-[1.6px]",
                "border-primary hover:border-primary/80 hover:text-primary",
                "transition-colors",
              )}
            >
              {siteConfig.nominateCta.label}
            </Button>

            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className={cn(
                "flex h-12.5 w-full items-center justify-center px-4 font-inter font-semibold text-primary",
                "normal-case text-[12px] tracking-[1.2px] sm:w-auto sm:px-8",
                "2xl:h-16 2xl:px-12 2xl:text-[16px] 2xl:tracking-[1.6px]",
                "underline underline-offset-2 hover:text-primary/80 transition-colors",
              )}
            >
              Contact the Secretariat
            </a>
          </div>
        </SlideUp>
      </Container>
    </section>
  );
}