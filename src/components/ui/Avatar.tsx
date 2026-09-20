import { cn } from "@/lib/cn";
import { getInitials } from "@/lib/format";

type AvatarSize = "sm" | "md" | "lg";

const SIZES: Record<AvatarSize, string> = {
  sm: "size-8 text-[11px]",
  md: "size-9 text-xs",
  lg: "size-12 text-sm",
};

export interface AvatarProps {
  name: string;
  size?: AvatarSize;
  className?: string;
}

/**
 * Initials-only avatar. Decorative: the expert's name is always rendered as
 * text alongside it, so this is hidden from assistive technology.
 */
export function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center rounded-full",
        "border border-line bg-surface-sunken font-medium tracking-wide text-ink-secondary",
        SIZES[size],
        className,
      )}
    >
      {getInitials(name)}
    </span>
  );
}
