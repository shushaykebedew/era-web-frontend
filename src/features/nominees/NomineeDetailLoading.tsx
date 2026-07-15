import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils/cn";

export function NomineeDetailLoading() {
  return (
    <div className="bg-background min-h-screen w-full overflow-x-hidden -mt-16 sm:-mt-20 2xl:-mt-28">
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex px-3 sm:px-6 lg:px-10 2xl:px-16",
          "h-16 sm:h-20 2xl:h-28 items-center justify-between gap-2",
          "border-b border-primary/20 bg-[#16130DCC] backdrop-blur-[10px]",
        )}
      >
        <Skeleton className="h-6 w-24 sm:w-32" />
        <div className="flex gap-4 sm:gap-6">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
        </div>
        <Skeleton className="hidden sm:block h-8 sm:h-10 w-32 sm:w-40" />
      </div>

      <div className="pt-16 sm:pt-20 px-4 sm:px-6 lg:px-10">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,478fr)_minmax(0,688fr)] lg:gap-10">
          <div className="flex flex-col gap-6 py-10 lg:py-16">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
            <div className="flex flex-col gap-2 mt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex flex-col gap-3 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-4 w-24 shrink-0" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10 shrink-0" />
            </div>
          </div>

          <div className="py-10 lg:py-16">
            <Skeleton
              className={cn(
                "w-full aspect-4/5 sm:aspect-3/4",
                "lg:aspect-auto lg:max-h-215 lg:h-[min(860px,75vh)]",
              )}
            />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="mx-auto w-full max-w-screen-2xl flex flex-col gap-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-3/4 max-w-lg" />
        </div>
      </div>
    </div>
  );
}
