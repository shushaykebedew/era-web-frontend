import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function GalleryCta() {
  return (
    <section className="border-t border-primary/20 bg-background-muted py-16 sm:py-20 lg:py-24 text-center">
      <Container size="narrow">
        <h2 className="font-display text-[28px] sm:text-[36px] lg:text-[48px] leading-tight lg:leading-14 font-semibold">
          Be Part of the Excellence
        </h2>
        <p className="mx-auto mt-5 w-full max-w-full lg:max-w-[554px] text-base sm:text-[18px] leading-7 text-foreground-muted font-inter">
          Join the most influential gathering of real estate and architectural
          minds in East Africa.
        </p>
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            as={Link}
            href="/nominees"
            variant="outline"
            size="sm"
            className="normal-case text-[12px] w-full sm:w-auto sm:flex-1 tracking-[1.2px] leading-4 border-primary h-12.5 px-8 font-inter font-semibold"
          >
            Nominate for 2025
          </Button>
          <Link
            href="mailto:hello@example.com"
            className="normal-case text-[12px] tracking-[1.2px] flex w-full justify-center sm:w-auto sm:flex-1 items-center h-12.5 px-4 sm:px-8 font-inter font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
          >
            Contact the Secretariat
          </Link>
        </div>
      </Container>
    </section>
  );
}
