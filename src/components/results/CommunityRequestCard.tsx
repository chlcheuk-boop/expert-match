import { ExpertSummary } from "@/components/expert-match/ExpertSummary";
import { Tag } from "@/components/ui/Tag";
import { formatDateShort, formatDuration } from "@/lib/format";
import type { CommunityRequest } from "@/data/community";

export interface CommunityRequestCardProps {
  request: CommunityRequest;
}

/**
 * A shared example: the question someone asked, who answered it, and what came
 * of it. Read-only — these are not the viewer's own requests.
 */
export function CommunityRequestCard({ request }: CommunityRequestCardProps) {
  return (
    <li>
      <article className="rounded-lg border border-line bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <p className="label-eyebrow pt-[3px] text-ink-tertiary">{request.industry}</p>
          <p className="text-[12.5px] text-ink-tertiary">Asked by {request.requester}</p>
        </div>

        <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-7">
          <div className="min-w-0">
            <h3 className="text-[16.5px] leading-snug font-semibold tracking-[-0.012em] text-ink">
              {request.title}
            </h3>

            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-secondary">
              {request.description}
            </p>

            {request.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {request.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            )}

            <section className="mt-4 border-l-2 border-accent-line pl-3.5">
              <h4 className="label-eyebrow text-ink-tertiary">What came of it</h4>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink">
                {request.outcome}
              </p>
            </section>
          </div>

          <div className="flex flex-col border-t border-line pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7">
            <ExpertSummary expert={request.expert} />

            <p className="mt-4 text-[12.5px] text-ink-tertiary lg:mt-auto lg:pt-4">
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
          </div>
        </div>
      </article>
    </li>
  );
}
