"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PaymentSlipUpload } from "@/features/nominate/PaymentSlipUpload";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

function ContinueNominationContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  return <PaymentSlipUpload token={token} />;
}

export default function ContinueNominationPage() {
  return (
    <main className="bg-background flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl bg-[#14120e] border border-primary/20 rounded-lg p-6 sm:p-8 xl:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative gold lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner className="w-8 h-8 text-primary" />
              </div>
            }
          >
            <ContinueNominationContent />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
