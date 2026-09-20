import { cn } from "@/lib/cn";

export interface TagProps {
  children: React.ReactNode;
  className?: string;
}

/** Small, quiet topic tag. */
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs border border-line bg-surface-muted",
        "px-1.5 py-[3px] text-[11.5px] leading-none text-ink-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
