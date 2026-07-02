"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TIERS, type TierId } from "./PartnersTierCards";
// import { TierSelect } from "./TierSelect";
import { cn } from "@/lib/cn";
import { TierSelect } from "./TierSelect";

type SponsorshipFormProps = {
  /** Pre-select a tier when the user clicks a tier card CTA */
  selectedTier?: TierId | "";
};

// ── Reusable field components ─────────────────────────────────────────────────
function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[10px] font-inter font-semibold uppercase tracking-[1.5px] text-foreground-muted"
    >
      {children}
    </label>
  );
}

const fieldBase =
  "border-b border-[#4E4637] bg-transparent py-3 text-base text-foreground outline-none placeholder:text-[#9A8F7E] focus:border-primary  placeholder:uppercase";

// ── Main export ──────────────────────────────────────────────────────────────
export function SponsorshipForm({ selectedTier = "" }: SponsorshipFormProps) {
  const [tier, setTier] = useState<TierId | "">(selectedTier);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="sponsorship-form"
      className="bg-[#110E08] border border-[#EBC16633] my-20 max-w-[896px] mx-auto py-24"
    >
      <Container size="narrow">
        <div className="text-center">
          <h2 className="font-display text-[48px] font-semibold leading-14">
            Request Sponsorship Package
          </h2>
          <p className="mx-auto mt-4 max-w-[484px] text-base leading-6 text-[#D1C5B2] font-inter">
            Complete the form below to receive our detailed partnership brochure
            and schedule a private consultation with our directors.
          </p>
        </div>

        {submitted ? (
          <div className="mt-12 border border-primary bg-background-elevated p-10 text-center">
            <p className="font-display text-2xl font-bold text-primary">
              Request Received
            </p>
            <p className="mt-3 text-sm text-foreground-muted">
              Our team will be in touch within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">
            {/* Row 1 — Company + Email */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <input
                  name="company"
                  type="text"
                  placeholder="Company Name"
                  required
                  className={fieldBase}
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  name="email"
                  type="email"
                  placeholder="Business Email"
                  required
                  className={fieldBase}
                />
              </div>
            </div>

            {/* Row 2 — Tier select */}
            <div className="flex flex-col gap-2">
              <FieldLabel htmlFor="tier">Interest Level</FieldLabel>
              <TierSelect value={tier} onChange={setTier} required />
            </div>

            {/* Row 3 — Strategic vision */}
            <div className="flex flex-col gap-2 mt-4">
              <textarea
                id="vision"
                name="vision"
                placeholder="Strategic Vision"
                rows={3}
                className={`resize-none ${fieldBase}`}
              />
            </div>

            <div className="mt-4 flex justify-center">
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="px-12 tracking-[3.6px] leading-4 bg-[#EBC166] h-12 font-bold font-inter text-[12px]"
              >
                Send Request
              </Button>
            </div>
          </form>
        )}
      </Container>
    </section>
  );
}
