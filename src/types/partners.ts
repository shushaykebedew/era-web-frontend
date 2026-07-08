/** The three sponsorship tier IDs used throughout the partners section. */
export type TierId = "bronze" | "gold" | "silver";

export type PartnersTierCardsProps = {
  onSelectTier: (id: TierId) => void;
};

export type SponsorshipFormProps = {
  /** Pre-select a tier when the user clicks a tier card CTA */
  selectedTier?: TierId | "";
};

export type TierSelectProps = {
  value: TierId | "";
  onChange: (value: TierId) => void;
  name?: string;
  required?: boolean;
};
