import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function GalleryCta() {
  return (
    <section className="border-t border-border-strong bg-background py-24 text-center">
      <Container size="narrow">
        <h2 className="font-display text-4xl font-bold sm:text-5xl">
          Be Part of the Excellence
        </h2>
        <p className="mx-auto mt-5 max-w-sm text-base leading-7 text-foreground-muted">
          Join the most influential gathering of real estate and architectural
          minds in East Africa.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            as={Link}
            href="/nominees"
            variant="outline"
            size="sm"
            className="text-[11px] tracking-[1px]"
          >
            Nominate for 2025
          </Button>
          <Link
            href="mailto:hello@example.com"
            className="text-[11px] font-inter font-semibold uppercase tracking-[1px] text-foreground-muted underline-offset-4 hover:text-primary hover:underline"
          >
            Contact the Secretariat
          </Link>
        </div>
      </Container>
    </section>
  );
}
