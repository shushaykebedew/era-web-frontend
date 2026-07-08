import { cn } from "@/utils/cn";
import { EyebrowProps } from "@/types/ui";

/** Small uppercase gold label used above section/page headings. */
export function Eyebrow({ children, className, align = "left" }: EyebrowProps) {
  return (
    <div className="mb-6 flex items-center justify-center gap-3">
      <span className="h-px w-8 2xl:w-12 bg-primary" aria-hidden />
      <p
        className={cn(
          "flex items-center gap-3 2xl:gap-5 text-[12px] 2xl:text-[16px] font-inter font-semibold",
          "uppercase tracking-[3.6px] 2xl:tracking-[4.8px] leading-4 2xl:leading-6 text-primary",
          align === "center" && "justify-center",
          className,
        )}
      >
        {children}
      </p>
      <span className="h-px w-8 2xl:w-12 bg-primary" aria-hidden />
    </div>
  );
}
