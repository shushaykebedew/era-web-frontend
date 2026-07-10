"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { type TierId } from "@/types/partners";
import { cn } from "@/utils/cn";
import { TierSelect } from "./TierSelect";
import { SponsorshipFormProps } from "@/types/partners";
import { SlideUp } from "@/components/ui/animations";

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
      className={cn(
        "text-[10px] 2xl:text-base font-inter font-semibold uppercase",
        "tracking-[1.5px] 2xl:tracking-[2px] text-foreground-muted",
      )}
    >
      {children}
    </label>
  );
}

const fieldBase =
  "border-b border-[#4E4637] bg-transparent py-3 2xl:py-5 text-base 2xl:text-[20px] text-foreground outline-none placeholder:text-[#9A8F7E] focus:border-primary placeholder:uppercase";

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
      className={cn(
        "bg-[#110E08] border border-[#EBC16633] my-10 sm:my-20 2xl:my-28",
        "w-[calc(100%-2rem)] max-w-4xl 2xl:max-w-5xl mx-auto py-12 sm:py-20 lg:py-24 2xl:py-32",
      )}
    >
      <Container size="narrow">
        <SlideUp>
          <div className="text-left sm:text-center">
            <h2
              className={cn(
                "font-display text-[28px] sm:text-[32px] text-foreground xl:text-[48px]",
                "2xl:text-[64px] font-semibold leading-tight xl:leading-14 2xl:leading-20",
              )}
            >
              Request Sponsorship Package
            </h2>
            <p
              className={cn(
                "mx-auto mt-4 max-w-121 2xl:max-w-160 text-base 2xl:text-[24px]",
                "leading-6 2xl:leading-9 text-foreground-muted font-inter",
              )}
            >
              Complete the form below to receive our detailed partnership
              brochure and schedule a private consultation with our directors.
            </p>
          </div>
        </SlideUp>

        {submitted ? (
          <SlideUp delay={0.2}>
            <div className="mt-12 border border-primary bg-background-elevated p-10 text-center">
              <p className="font-display text-2xl font-bold text-primary">
                Request Received
              </p>
              <p className="mt-3 text-sm text-foreground-muted">
                Our team will be in touch within 48 hours.
              </p>
            </div>
          </SlideUp>
        ) : (
          <SlideUp delay={0.2}>
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
                  className={cn(
                    "w-full sm:w-auto px-8 sm:px-12 2xl:px-16 bg-primary h-12 2xl:h-16",
                    "tracking-[2px] sm:tracking-[3.6px] 2xl:tracking-[4.8px]",
                    "leading-4 font-bold font-inter text-[12px] 2xl:text-[16px]",
                  )}
                >
                  Send Request
                </Button>
              </div>
            </form>
          </SlideUp>
        )}
      </Container>
    </section>
  );
}
