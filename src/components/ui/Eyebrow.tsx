import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
};

/** Small uppercase gold label used above section/page headings. */
export function Eyebrow({ children, className, align = "left" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[12px] font-inter font-semibold uppercase tracking-[3.6px] leading-4 text-primary",
        align === "center" && "justify-center",
        className,
      )}
    >
      {/* <span className="h-px w-6 bg-primary" aria-hidden /> */}
      {children}
    </p>
  );
}
