import type { Nominee } from "@/types";
import { cn } from "@/utils/cn";

export function DetailTab({ nominee }: { nominee: Nominee }) {
  return (
    <div className="flex min-w-0 flex-col gap-12 sm:gap-16 2xl:gap-24 py-12 sm:py-16 2xl:py-24 border-t border-primary/10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,448px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,478fr)_minmax(0,688fr)]">
        
        {/* Left — Submission Details */}
        <div>
          <p
            className={cn(
              "mb-6 2xl:mb-8 text-[11px] 2xl:text-[14px] font-inter leading-4 2xl:leading-6",
              "tracking-[3.3px] 2xl:tracking-[4.2px] uppercase text-primary",
            )}
          >
            Nominee Details
          </p>
          <ul className="flex min-w-0 flex-col gap-6 2xl:gap-8 font-inter text-sm sm:text-base">
            <li className="flex flex-col gap-1">
              <span className="text-foreground-muted text-xs uppercase tracking-wider">Contact Person</span>
              <span className="text-foreground font-semibold">{nominee.contactPerson}</span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="text-foreground-muted text-xs uppercase tracking-wider">Email Address</span>
              <span className="text-foreground">{nominee.email}</span>
            </li>
            {nominee.phone && (
              <li className="flex flex-col gap-1">
                <span className="text-foreground-muted text-xs uppercase tracking-wider">Phone Number</span>
                <span className="text-foreground">{nominee.phone}</span>
              </li>
            )}
            {nominee.website && (
              <li className="flex flex-col gap-1">
                <span className="text-foreground-muted text-xs uppercase tracking-wider">Website</span>
                <span className="text-primary hover:underline">
                  <a href={nominee.website} target="_blank" rel="noopener noreferrer">
                    {nominee.website}
                  </a>
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Right — Reason for Nomination */}
        <div className="flex min-w-0 flex-col gap-6">
          <p
            className={cn(
              "text-[11px] 2xl:text-[14px] font-inter leading-4 2xl:leading-6",
              "tracking-[3.3px] 2xl:tracking-[4.2px] uppercase text-primary",
            )}
          >
            Reason for Nomination
          </p>
          <p className="text-base sm:text-lg 2xl:text-[24px] leading-7 2xl:leading-9 text-foreground-muted/90 font-inter whitespace-pre-line">
            {nominee.reason}
          </p>
        </div>

      </div>
    </div>
  );
}
