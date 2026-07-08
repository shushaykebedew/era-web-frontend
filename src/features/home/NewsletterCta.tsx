"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { SlideUp } from "@/components/ui/animations";
import { NewsletterCtaProps } from "@/types/marketing";

export function NewsletterCta({
  title = "Join the Gala Night",
  description = "Subscribe to receive exclusive invitations to the awards ceremony and early access to ticket sales.",
}: NewsletterCtaProps) {
  return (
    <section className="bg-[#0c0c0e] py-16 sm:py-20 lg:py-24 2xl:py-32">
      <Container size="narrow" className="text-center">
        <SlideUp>
          <h2
            className={cn(
              "font-display font-semibold text-[32px] sm:text-[40px] lg:text-[48px]",
              "2xl:text-[64px] leading-tight lg:leading-14 2xl:leading-20",
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-157.5 2xl:max-w-200 text-base 2xl:text-[24px]",
              "leading-6 2xl:leading-9 text-foreground-muted",
            )}
          >
            {description}
          </p>

          <form className="mx-auto mt-8 2xl:mt-12 flex w-full max-w-158 2xl:max-w-200 flex-col gap-4 2xl:gap-6 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email Address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Email Address"
              className={cn(
                "w-full border border-primary/40 font-inter bg-[#1F1B15] px-4 2xl:px-8 h-12.5",
                "2xl:h-18 text-base 2xl:text-[24px] text-foreground placeholder:text-[#D1C5B280]",
                "focus:border-primary focus:outline-none",
              )}
            />
            <Button
              type="submit"
              className={cn(
                "shrink-0 cursor-pointer bg-primary font-inter text-[#402D00] font-bold",
                "text-[12px] 2xl:text-[20px] leading-4 2xl:leading-6 tracking-[1.2px]",
                "2xl:tracking-[2px] 2xl:px-10 h-12.5 2xl:h-18",
              )}
            >
              Request Invite
            </Button>
          </form>
        </SlideUp>
      </Container>
    </section>
  );
}
