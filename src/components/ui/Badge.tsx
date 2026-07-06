import { cn } from "@/utils/cn";

const VARIANT_STYLES = {
  nominee: "bg-primary text-primary-foreground",
  "past-winner": "bg-muted text-foreground-muted",
  shortlisted: "border border-primary text-primary",
} as const;

type BadgeProps = {
  children: React.ReactNode;
  variant?: keyof typeof VARIANT_STYLES;
  className?: string;
};

export function Badge({
  children,
  variant = "nominee",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 2xl:px-5 2xl:py-2 text-[10px] 2xl:text-[14px]",
        "leading-3.75 2xl:leading-5 tracking-0 uppercase",
        VARIANT_STYLES[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
