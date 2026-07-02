import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function GalleryCta() {
  return (
    <section className="border-t border-[#EBC16633] bg-[#16130d] py-24 text-center mx-12">
      <Container size="narrow">
        <h2 className="font-display text-[48px] leading-14 font-semibold">
          Be Part of the Excellence
        </h2>
        <p className="mx-auto mt-5 max-w-[554px] text-[18px] leading-7 text-[#D1C5B2] font-inter">
          Join the most influential gathering of real estate and architectural
          minds in East Africa.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            as={Link}
            href="/nominees"
            variant="outline"
            size="sm"
            className="normal-case text-[12px] tracking-[1.2px] leading-4 border-[#EBC166] h-12.5 px-8 font-inter  font-semibold"
          >
            Nominate for 2025
          </Button>
          <Link
            href="mailto:hello@example.com"
            className="normal-case text-[12px] tracking-[1.2px] flex items-center  h-12.5 px-8 font-inter font-semibold  text-[#EBC166] underline underline-offset-2 hover:text-primary"
          >
            Contact the Secretariat
          </Link>
        </div>
      </Container>
    </section>
  );
}
