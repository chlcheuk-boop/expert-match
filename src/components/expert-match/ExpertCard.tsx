"use client";

import { Avatar } from "@/components/ui/Avatar";
import { ArrowRightIcon } from "@/components/ui/icons";
import { formatDateShort, formatRateAmount, pluralize } from "@/lib/format";
import type { ExpertRosterEntry } from "@/lib/experts";

export interface ExpertCardProps {
  entry: ExpertRosterEntry;
  onOpen: (entry: ExpertRosterEntry) => void;
}

/**
 * Roster row: the person on the left, their credentials on the right. Name and
 * seniority lead; the rate sits with the company line so it reads as a detail
 * rather than a price tag.
 */
export function ExpertCard({ entry, onOpen }: ExpertCardProps) {
  const { expert } = entry;

  return (
    <li>
      <article
        className="
          group relative rounded-lg border border-line bg-surface p-4 transition-all duration-150
          hover:border-line-strong hover:shadow-subtle sm:p-5
          has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2
          has-[:focus-visible]:outline-accent
        "
      >
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
          <Avatar name={expert.name} size="lg" />

          <div className="min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
              <h3 className="text-[16.5px] leading-snug font-semibold tracking-[-0.012em] text-ink">
                <button
                  type="button"
                  onClick={() => onOpen(entry)}
                  aria-label={`View profile: ${expert.name}`}
                  className="
                    text-left transition-colors duration-150 group-hover:text-accent
                    after:absolute after:inset-0 after:rounded-lg after:content-['']
                    focus:outline-none
                  "
                >
                  {expert.name}
                </button>
              </h3>

              <p className="text-[12.5px] whitespace-nowrap text-ink-tertiary">
                {pluralize(entry.consultationCount, "consultation")}
                <span aria-hidden="true" className="px-1">
                  ·
                </span>
                <time dateTime={entry.lastEngagedDate}>
                  {formatDateShort(entry.lastEngagedDate)}
                </time>
              </p>
            </div>

            <p className="label-eyebrow mt-1.5 text-ink-tertiary">{expert.level}</p>

            <p className="line-clamp-2-safe mt-2.5 text-[13.5px] leading-relaxed text-ink-secondary">
              {expert.background}
            </p>
          </div>
        </div>

        <div className="mt-3.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 border-t border-line pt-3.5">
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

          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-secondary transition-colors duration-150 group-hover:text-accent"
          >
            View profile
            <ArrowRightIcon className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </li>
  );
}
