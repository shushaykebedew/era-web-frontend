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
    <section className="bg-background py-24">
      <Container size="narrow" className="text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-foreground-muted">{description}</p>

        <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email Address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Email Address"
            className="w-full border border-border-strong bg-background-elevated px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
          <Button type="submit" className="shrink-0">
            Request Invite
          </Button>
        </form>
      </Container>
    </section>
  );
}
