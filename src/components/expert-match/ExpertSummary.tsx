import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/cn";
import { formatRateAmount } from "@/lib/format";
import type { Expert } from "@/lib/types";

export interface ExpertSummaryProps {
  expert: Expert;
  /** "card" is the compact list presentation; "drawer" is the detail view. */
  variant?: "card" | "drawer";
  className?: string;
}

/**
 * The expert's credibility — name, role, company, seniority — leads. The rate
 * is present and easy to find, but deliberately quieter than the person.
 */
export function ExpertSummary({
  expert,
  variant = "card",
  className,
}: ExpertSummaryProps) {
  const isDrawer = variant === "drawer";

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <Avatar name={expert.name} size={isDrawer ? "lg" : "md"} />

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-semibold tracking-[-0.01em] text-ink",
            isDrawer ? "text-[16px]" : "text-[14px]",
          )}
        >
          {expert.name}
        </p>

        <p
          className={cn(
            "mt-0.5 text-ink-secondary",
            isDrawer ? "text-[13.5px]" : "text-[12.5px] leading-snug",
          )}
        >
          {expert.title}
          <span aria-hidden="true" className="px-1 text-ink-tertiary">
            ·
          </span>
          {expert.company}
        </p>

        <div className={cn(isDrawer ? "mt-3 flex flex-wrap items-baseline gap-x-3" : "mt-2.5")}>
          <p className="text-[12px] text-ink-tertiary">{expert.level}</p>
          <p className={cn("text-[13px] text-ink", isDrawer ? "mt-0" : "mt-0.5")}>
            <span className="font-medium tabular-nums">
              {formatRateAmount(expert.hourlyRate)}
            </span>
            <span className="text-ink-secondary"> / hour</span>
          </p>
        </div>

        {isDrawer && expert.background && (
          <p className="mt-3 text-[13px] leading-relaxed text-ink-secondary">
            {expert.background}
          </p>
        )}
      </div>
    </div>
  );
}
