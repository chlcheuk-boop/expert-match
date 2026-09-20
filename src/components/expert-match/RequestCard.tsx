"use client";

import { ExpertSummary } from "@/components/expert-match/ExpertSummary";
import { RequestStatusBadge } from "@/components/expert-match/RequestStatusBadge";
import { Tag } from "@/components/ui/Tag";
import { ArrowRightIcon } from "@/components/ui/icons";
import { formatDateShort, formatDuration } from "@/lib/format";
import type { ExpertRequest } from "@/lib/types";

export interface RequestCardProps {
  request: ExpertRequest;
  onOpen: (request: ExpertRequest) => void;
}

/**
 * A compact, structured request row. The title carries the only interactive
 * control; its ::after overlay makes the whole card clickable without nesting
 * controls or inventing ARIA roles.
 */
export function RequestCard({ request, onOpen }: RequestCardProps) {
  const { expert } = request;

  return (
    <li>
      <article
        className="
          group relative rounded-lg border border-line bg-surface p-4 transition-all duration-150
          hover:border-line-strong hover:bg-surface hover:shadow-subtle sm:p-5
          has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2
          has-[:focus-visible]:outline-accent
        "
      >
        <div className="flex items-start justify-between gap-3">
          <p className="label-eyebrow pt-[3px] text-ink-tertiary">{request.industry}</p>
          <RequestStatusBadge status={request.status} />
        </div>

        <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-7">
          <div className="min-w-0">
            <h3 className="text-[16.5px] leading-snug font-semibold tracking-[-0.012em] text-ink">
              <button
                type="button"
                onClick={() => onOpen(request)}
                aria-label={`View request: ${request.title}`}
                className="
                  text-left transition-colors duration-150 group-hover:text-accent
                  after:absolute after:inset-0 after:rounded-lg after:content-['']
                  focus:outline-none
                "
              >
                {request.title}
              </button>
            </h3>

            <p className="line-clamp-2-safe mt-1.5 text-[13.5px] leading-relaxed text-ink-secondary">
              {request.description}
            </p>

            {request.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {request.tags.slice(0, 4).map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col border-t border-line pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7">
            <ExpertSummary expert={expert} />

            <div className="mt-4 flex items-end justify-between gap-3 lg:mt-auto lg:pt-4">
              <p className="text-[12.5px] text-ink-tertiary">
                <time dateTime={request.date}>{formatDateShort(request.date)}</time>
                {request.durationMinutes && (
                  <>
                    <span aria-hidden="true" className="px-1">
                      ·
                    </span>
                    {formatDuration(request.durationMinutes)}
                  </>
                )}
              </p>

              <span
                aria-hidden="true"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-secondary transition-colors duration-150 group-hover:text-accent"
              >
                View request
                <ArrowRightIcon className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}
