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
        "border-t border-primary/20 bg-background-muted",
        "py-16 sm:py-20 lg:py-24 2xl:py-32 text-center",
      )}
    >
      <Container size="narrow">
        <SlideUp>
          <h2
            className={cn(
              "font-display text-[28px] sm:text-[36px] lg:text-[48px] 2xl:text-[64px]",
              "leading-tight lg:leading-14 2xl:leading-20 font-semibold",
            )}
          >
            Be Part of the Excellence
          </h2>
          <p
            className={cn(
              "mx-auto mt-5 w-full max-w-full lg:max-w-138.5 2xl:max-w-180",
              "text-base sm:text-[18px] 2xl:text-[24px]",
              "leading-7 2xl:leading-9 text-foreground-muted font-inter",
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
                "normal-case text-[12px] 2xl:text-[16px] w-53 2xl:w-64",
                "tracking-[1.2px] 2xl:tracking-[1.6px] leading-4 2xl:leading-6",
                "border-primary h-12.5 2xl:h-16 font-inter font-semibold",
                "hover:border-primary/80 hover:text-primary",
              )}
            >
              {siteConfig.nominateCta.label}
            </Button>
            <Link
              href={siteConfig.contactEmail}
              className={cn(
                "normal-case text-[12px] 2xl:text-[16px] tracking-[1.2px] 2xl:tracking-[1.6px]",
                "flex w-full justify-center sm:w-auto items-center",
                "h-12.5 2xl:h-16 px-4 sm:px-8 2xl:px-12",
                "font-inter font-semibold text-primary",
                "underline underline-offset-2 hover:text-primary/80",
              )}
            >
              Contact the Secretariat
            </Link>
          </div>
        </SlideUp>
      </Container>
    </section>
  );
}
