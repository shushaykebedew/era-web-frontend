import { NominationForm } from "@/features/nominate/NominationForm";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function NominatePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-24 sm:py-32 px-4">
      <div className="w-full max-w-2xl bg-[#14120e] border border-primary/20 rounded-lg p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative gold lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-3 tracking-wide uppercase">
              Submit Nomination
            </h1>
            <p className="text-foreground-muted font-inter text-sm sm:text-base max-w-md mx-auto">
              Propose a real estate company or visionary for the ERA 2026 Awards. Please fill in the details below.
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
