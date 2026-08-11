import type { Nominee, AwardCategory } from "./index";

export type NomineeCardProps = {
  nominee: Nominee;
  variant?: "featured" | "grid";
  className?: string;
};
export type NomineeDetailShellProps = {
  nominee: Nominee;
  category?: AwardCategory;
  prevId?: string;
  nextId?: string;
};
export type NomineeSidebarProps = {
  nominee: Nominee;
  category?: AwardCategory;
  onVoteClick?: () => void;
};
export type StatusRow = {
  label: string;
  value: string;
  variant: "gold" | "solid" | "badge";
};
export type VoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  nominee: Nominee | null;
  /** Called when a vote is successfully submitted. */
  onVoteSuccess?: () => void;
};
export type VoteStep = "confirm" | "success";
