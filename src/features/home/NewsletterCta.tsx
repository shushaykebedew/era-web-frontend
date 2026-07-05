import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

type NewsletterCtaProps = {
  title?: string;
  description?: string;
};

export function NewsletterCta({
  title = "Join the Gala Night",
  description = "Subscribe to receive exclusive invitations to the awards ceremony and early access to ticket sales.",
}: NewsletterCtaProps) {
  return (
    <section className="bg-[#0c0c0e] py-16 sm:py-20 lg:py-24">
      <Container size="narrow" className="text-center">
        <h2 className="font-display font-semibold text-[32px] sm:text-[40px] lg:text-[48px] leading-tight lg:leading-14">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-[630px] text-base leading-6 text-foreground-muted">
          {description}
        </p>

        <form className="mx-auto mt-8 flex w-full max-w-[632px] flex-col gap-4 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email Address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Email Address"
            className="w-full border border-primary/40 font-inter bg-[#1F1B15] px-4 h-[50px] text-base text-foreground placeholder:text-[#D1C5B280] focus:border-primary focus:outline-none"
          />
          <Button
            type="submit"
            className="shrink-0 cursor-pointer bg-primary font-inter text-[#402D00] font-bold text-[12px] leading-4 tracking-[1.2px]"
          >
            Request Invite
          </Button>
        </form>
      </Container>
    </section>
  );
}
