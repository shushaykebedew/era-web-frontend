import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

// ── Data ─────────────────────────────────────────────────────────────────────
const confirmedPartners = [
  {
    name: "Ethio-Bank",
    tier: "Gold",
    image: "/imgs/partners/partner-1.png",
  },
  {
    name: "Nile Air",
    tier: "Silver",
    image: "/imgs/partners/partner-2.png",
  },
  {
    name: "Sol Luxury",
    tier: "Gold",
    image: "/imgs/partners/partner-3.png",
  },
  {
    name: "Abys Trust",
    tier: "Bronze",
    image: "/imgs/partners/partner-4.png",
  },
];

// ── Sub-component ─────────────────────────────────────────────────────────────
function PartnerCard({
  name,
  tier,
  image,
}: {
  name: string;
  tier: string;
  image: string;
}) {
  return (
    <div className="group relative overflow-hidden h-[244px] w-[286px] bg-[#16130D] border border-[#4E4637]">
      {/* White overlay merged on top of the base fill */}
      {/* <div className="pointer-events-none absolute inset-0 bg-white/10 mix-blend-overlay" /> */}

      <div className="relative flex h-full w-full flex-col items-center justify-center gap-6">
        <img src={image} alt={name} />

        <span
          className={cn(
            "text-[12px] leading-4 px-3 py-1 font-inter font-semibold uppercase",
            "tracking-[1.2px] border",
            tier === "Gold"
              ? "text-[#EBC166] border-[#EBC16633]"
              : tier === "Silver"
                ? "text-[#D1C5B2] border-[#9A8F7E33]"
                : "text-[#D1C5B299] border-[#9A8F7E1A]",
          )}
        >
          {tier}
        </span>
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export function ConfirmedPartners() {
  return (
    <section className="bg-[#1F1B15] py-24">
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <h1 className="text-[42px] font-display font-semibold leading-14 text-[#EAE1D7]">
              Confirmed Partners
            </h1>
            <p className="text-[18px] leading-7 text-[#D1C5B2] max-w-[512px] font-inter">
              Industry leaders already committed to celebrating Ethiopia's
              architectural renaissance.
            </p>
          </div>
          <p className="shrink-0 text-[12px] font-inter font-semibold uppercase tracking-[2.4px] leading-4 text-[#EBC166]">
            Excellence Through Collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 justify-items-center sm:grid-cols-4 sm:justify-items-stretch">
          {confirmedPartners.map((partner) => (
            <PartnerCard key={partner.name} {...partner} />
          ))}
        </div>
      </Container>
    </section>
  );
}
