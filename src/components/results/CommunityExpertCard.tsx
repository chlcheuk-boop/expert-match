import { Avatar } from "@/components/ui/Avatar";
import { formatRateAmount, pluralize } from "@/lib/format";
import type { ExpertRosterEntry } from "@/lib/experts";

export interface CommunityExpertCardProps {
  entry: ExpertRosterEntry;
}

/**
 * Same roster layout as the user's own experts — person on the left,
 * credentials on the right — but read-only and without personal history.
 */
export function CommunityExpertCard({ entry }: CommunityExpertCardProps) {
  const { expert } = entry;

  return (
    <li>
      <article className="rounded-lg border border-line bg-surface p-4 sm:p-5">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
          <Avatar name={expert.name} size="lg" />

          <div className="min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
              <h3 className="text-[16.5px] leading-snug font-semibold tracking-[-0.012em] text-ink">
                {expert.name}
              </h3>
              <p className="text-[12.5px] whitespace-nowrap text-ink-tertiary">
                {pluralize(entry.consultationCount, "shared consultation")}
              </p>
            </div>

            <p className="label-eyebrow mt-1.5 text-ink-tertiary">{expert.level}</p>

            <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-secondary">
              {expert.background}
            </p>
          </div>
        </div>

        <div className="mt-3.5 border-t border-line pt-3.5">
          <p className="text-[13px] text-ink">
            <span className="font-medium tabular-nums">
              {formatRateAmount(expert.hourlyRate)}
            </span>
            <span className="text-ink-secondary"> / hour</span>
            <span aria-hidden="true" className="px-2 text-ink-tertiary">
              ·
            </span>
            <span className="text-[12.5px] text-ink-secondary">
              {expert.title} · {expert.company}
            </span>
          </p>
        </div>
      </article>
    </li>
  );
}
