"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // One QueryClient per browser session — useState ensures it's not recreated
  // on every render while still being isolated per server request during SSR.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 2 minutes; re-fetched in background after that.
            staleTime: 2 * 60 * 1000,
            // Keep unused data in cache for 5 minutes before garbage-collecting.
            gcTime: 5 * 60 * 1000,
            // Retry once on failure (avoids hammering a flaky API).
            retry: 1,
            // Re-fetch when the user switches back to the tab.
            refetchOnWindowFocus: true,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
