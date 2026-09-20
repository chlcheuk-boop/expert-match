import { cn } from "@/lib/cn";

/**
 * The Expert Match mark: two interlocking chain links, the navy one reading
 * as an E and the gold one as an M.
 *
 * This is a hand-built interpretation of the brand mark. If you have the
 * original vector, drop it in and swap this SVG out — nothing else needs to
 * change, since every consumer goes through <Logo />.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 128 72"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Navy link — the E */}
      <rect
        x="7.5"
        y="9.5"
        width="63"
        height="53"
        rx="26.5"
        stroke="var(--color-brand-navy)"
        strokeWidth="13"
      />
      <path
        d="M14 36H50"
        stroke="var(--color-brand-navy)"
        strokeWidth="13"
        strokeLinecap="round"
      />

      {/* Gold link — the M */}
      <rect
        x="57.5"
        y="9.5"
        width="63"
        height="53"
        rx="26.5"
        stroke="var(--color-brand-gold)"
        strokeWidth="13"
      />
      <path
        d="M70 20L89 48L108 20"
        stroke="var(--color-brand-gold)"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Redraw the navy link's right edge so the two links interlock. */}
      <path
        d="M57.25 13.05A26.5 26.5 0 0 1 57.25 58.95"
        stroke="var(--color-brand-navy)"
        strokeWidth="13"
      />
    </svg>
  );
}

export interface LogoProps {
  /** "horizontal" sits the wordmark beside the mark; "stacked" puts it below. */
  variant?: "horizontal" | "stacked" | "mark";
  showTagline?: boolean;
  /** Controls the mark's height; the wordmark scales with the surrounding text. */
  markClassName?: string;
  wordmarkClassName?: string;
  className?: string;
}

export function Logo({
  variant = "horizontal",
  showTagline = false,
  markClassName = "h-6",
  wordmarkClassName = "text-[17px]",
  className,
}: LogoProps) {
  if (variant === "mark") {
    return <LogoMark className={cn(markClassName, "w-auto", className)} />;
  }

  const isStacked = variant === "stacked";

  return (
    <span
      className={cn(
        "inline-flex",
        isStacked ? "flex-col items-center gap-2" : "items-center gap-2.5",
        className,
      )}
    >
      <LogoMark className={cn(markClassName, "w-auto shrink-0")} />

      <span className={cn("inline-flex flex-col", isStacked && "items-center")}>
        <span
          className={cn(
            "font-semibold whitespace-nowrap tracking-[-0.018em]",
            wordmarkClassName,
          )}
        >
          <span className="text-brand-navy">Expert</span>{" "}
          <span className="text-brand-gold">Match</span>
        </span>

        {showTagline && (
          <span className="mt-1 text-[9px] font-medium tracking-[0.16em] whitespace-nowrap text-ink-secondary uppercase">
            Real Expertise. Real Progress.
          </span>
        )}
      </span>
    </span>
  );
}
