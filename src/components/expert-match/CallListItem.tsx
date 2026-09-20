"use client";

import { useId } from "react";
import { RequestStatusBadge } from "@/components/expert-match/RequestStatusBadge";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { formatDateCell, formatDuration, formatRate } from "@/lib/format";
import type { Call } from "@/lib/calls";

export interface CallListItemProps {
  call: Call;
  expanded: boolean;
  onToggle: () => void;
  /** Set by the list so the calendar can scroll a call into view. */
  anchorRef?: (element: HTMLLIElement | null) => void;
}

/**
 * A call collapses to one scannable line and expands in place: preparation
 * notes for an upcoming call, what was captured for a past one.
 */
export function CallListItem({
  call,
  expanded,
  onToggle,
  anchorRef,
}: CallListItemProps) {
  const panelId = useId();
  const { request } = call;
  const { expert } = request;
  const cell = formatDateCell(call.date);

  return (
    <li ref={anchorRef}>
      <article
        className={cn(
          "rounded-lg border bg-surface transition-colors duration-150",
          expanded ? "border-line-strong shadow-subtle" : "border-line hover:border-line-strong",
        )}
      >
        <h3>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={onToggle}
            className="
              flex w-full items-start gap-3.5 rounded-lg p-4 text-left
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
            "
          >
            <span
              aria-hidden="true"
              className="flex w-10 shrink-0 flex-col items-center rounded-sm border border-line bg-surface-muted py-1.5"
            >
              <span className="text-[9.5px] leading-none font-medium tracking-[0.06em] text-ink-tertiary">
                {cell.month}
              </span>
              <span className="mt-1 text-[15px] leading-none font-semibold text-ink">
                {cell.day}
              </span>
            </span>

            <Avatar name={expert.name} size="sm" className="mt-0.5" />

            <span className="min-w-0 flex-1">
              <span className="block text-[14.5px] leading-snug font-semibold tracking-[-0.01em] text-ink">
                {request.title}
              </span>
              <span className="mt-1 block text-[12.5px] text-ink-secondary">
                {expert.name}
                <span aria-hidden="true" className="px-1 text-ink-tertiary">
                  ·
                </span>
                {expert.title}
                <span aria-hidden="true" className="px-1 text-ink-tertiary">
                  ·
                </span>
                {expert.company}
              </span>
            </span>

            <span className="hidden shrink-0 items-center gap-3 sm:flex">
              <span className="text-[12.5px] text-ink-tertiary">
                {formatDuration(call.durationMinutes)}
              </span>
              <RequestStatusBadge status={request.status} />
            </span>

            <ChevronDownIcon
              className={cn(
                "mt-1 size-3.5 shrink-0 text-ink-tertiary transition-transform duration-150",
                expanded && "rotate-180",
              )}
            />
          </button>
        </h3>

        {expanded && (
          <div id={panelId} className="border-t border-line px-4 py-4">
            <div className="sm:hidden">
              <div className="mb-4 flex items-center gap-3">
                <RequestStatusBadge status={request.status} />
                <span className="text-[12.5px] text-ink-tertiary">
                  {formatDuration(call.durationMinutes)}
                </span>
              </div>
            </div>

            {call.isUpcoming ? (
              <div className="space-y-5">
                <section>
                  <h4 className="label-eyebrow text-ink-tertiary">
                    Who you&rsquo;re talking to
                  </h4>
                  <div className="mt-2.5 rounded-md border border-line bg-surface-muted p-4">
                    <p className="text-[12px] text-ink-tertiary">{expert.level}</p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink">
                      {expert.background}
                    </p>
                    <p className="mt-3 text-[13px] text-ink">
                      <span className="tabular-nums">{formatRate(expert.hourlyRate)}</span>
                      <span aria-hidden="true" className="px-2 text-ink-tertiary">
                        ·
                      </span>
                      <span className="text-ink-secondary">
                        {formatDuration(call.durationMinutes)} booked
                      </span>
                    </p>
                  </div>
                </section>

                {request.suggestedQuestions && request.suggestedQuestions.length > 0 && (
                  <section>
                    <h4 className="label-eyebrow text-ink-tertiary">Suggested questions</h4>
                    <ol className="mt-2.5 space-y-2">
                      {request.suggestedQuestions.map((question, index) => (
                        <li key={question} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[3px] inline-flex size-[18px] shrink-0 items-center justify-center rounded-full border border-line text-[10.5px] font-medium text-ink-tertiary"
                          >
                            {index + 1}
                          </span>
                          <span className="text-[13.5px] leading-relaxed text-ink">
                            {question}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}
              </div>
            ) : (
              <div className="space-y-5">
                <section>
                  <h4 className="label-eyebrow text-ink-tertiary">Your notes</h4>
                  {request.notes ? (
                    <p className="mt-2.5 rounded-md border border-line bg-surface-muted p-4 text-[13.5px] leading-relaxed text-ink">
                      {request.notes}
                    </p>
                  ) : (
                    <p className="mt-2.5 rounded-md border border-dashed border-line px-4 py-5 text-center text-[13px] text-ink-tertiary">
                      No notes were captured for this call.
                    </p>
                  )}
                </section>

                {request.tags.length > 0 && (
                  <section>
                    <h4 className="label-eyebrow text-ink-tertiary">Topics covered</h4>
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {request.tags.map((tag) => (
                        <li key={tag}>
                          <Tag>{tag}</Tag>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}
          </div>
        )}
      </article>
    </li>
  );
}
