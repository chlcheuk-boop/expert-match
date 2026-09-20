import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative block overflow-hidden rounded-xs bg-surface-sunken",
        "after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r",
        "after:from-transparent after:via-white/60 after:to-transparent",
        "after:animate-[shimmer_1.6s_infinite]",
        className,
      )}
    />
  );
}
