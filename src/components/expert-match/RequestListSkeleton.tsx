import { Skeleton } from "@/components/ui/Skeleton";

/** Placeholder rows that match the request card rhythm. */
export function RequestListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div aria-hidden="true" className="space-y-2.5">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="rounded-lg border border-line bg-surface p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-5 w-20 rounded-sm" />
          </div>

          <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-7">
            <div>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="mt-2.5 h-3 w-full" />
              <Skeleton className="mt-1.5 h-3 w-4/5" />
              <div className="mt-3.5 flex gap-1.5">
                <Skeleton className="h-5 w-24 rounded-sm" />
                <Skeleton className="h-5 w-20 rounded-sm" />
                <Skeleton className="h-5 w-16 rounded-sm" />
              </div>
            </div>

            <div className="flex gap-3 border-t border-line pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7">
              <Skeleton className="size-9 rounded-full!" />
              <div className="flex-1">
                <Skeleton className="h-3.5 w-28" />
                <Skeleton className="mt-2 h-3 w-40" />
                <Skeleton className="mt-3 h-3 w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
