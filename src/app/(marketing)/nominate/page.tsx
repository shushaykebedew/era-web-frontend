import { NominationForm } from "@/features/nominate/NominationForm";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function NominatePage() {
  return (
    <main className="bg-background flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl bg-[#14120e] border border-primary/20 rounded-lg p-6 sm:p-8 xl:p-10 2xl:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative gold lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-8 2xl:mb-12">
            <span className="inline-block text-[11px] 2xl:text-xs font-inter font-semibold uppercase tracking-[2.5px] text-primary/80 mb-2">
              ERA 2026 Submissions Open
            </span>
            <h1 className="text-2xl sm:text-3xl 2xl:text-5xl font-display font-bold text-foreground mb-3 tracking-wide uppercase">
              Nominate an Architectural <br className="hidden xl:block" /> &amp; Real Estate Leader
            </h1>
            <p className="text-foreground-muted font-inter text-xs sm:text-sm 2xl:text-[18px] max-w-md 2xl:max-w-2xl mx-auto leading-relaxed">
              Recommend a landmark development project, pioneering firm, or visionary leader deserving of national recognition at the 5th Ethiopian Real Estate Awards.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner className="w-8 h-8 text-primary" />
              </div>
            }
          >
            <NominationForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
