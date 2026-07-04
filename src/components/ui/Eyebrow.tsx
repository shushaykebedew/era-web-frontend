import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
};

/** Small uppercase gold label used above section/page headings. */
export function Eyebrow({ children, className, align = "left" }: EyebrowProps) {
  return (
    <div className="mb-6 flex items-center justify-center gap-3">
      <span className="h-px w-8 bg-primary" aria-hidden />
      <p
        className={cn(
          "flex items-center gap-3 text-[12px] font-inter font-semibold uppercase tracking-[3.6px] leading-4 text-primary",
          align === "center" && "justify-center",
          className,
        )}
      >
        {children}
      </p>
      <span className="h-px w-8 bg-primary" aria-hidden />
    </div>
  );
}
