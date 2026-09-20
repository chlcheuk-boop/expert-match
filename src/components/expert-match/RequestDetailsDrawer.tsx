"use client";

import { useId } from "react";
import { ExpertSummary } from "@/components/expert-match/ExpertSummary";
import { RequestStatusBadge } from "@/components/expert-match/RequestStatusBadge";
import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { Tag } from "@/components/ui/Tag";
import { CloseIcon } from "@/components/ui/icons";
import {
  formatDateLong,
  formatDurationLong,
  formatRate,
} from "@/lib/format";
import type { ExpertRequest } from "@/lib/types";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h3 className="label-eyebrow text-ink-tertiary">{title}</h3>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

function DetailRow({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-3.5 py-2.5">
      <dt className="text-[13px] text-ink-secondary">{term}</dt>
      <dd className="text-right text-[13px] text-ink">{children}</dd>
    </div>
  );
}

export interface RequestDetailsDrawerProps {
  request: ExpertRequest | null;
  open: boolean;
  onClose: () => void;
}

export function RequestDetailsDrawer({
  request,
  open,
  onClose,
}: RequestDetailsDrawerProps) {
  const titleId = useId();

  if (!request) return null;

  const { expert } = request;

  return (
    <Sheet open={open} onClose={onClose} labelledBy={titleId}>
      <header className="border-b border-line px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="label-eyebrow text-ink-tertiary">{request.industry}</p>
              <RequestStatusBadge status={request.status} />
            </div>

            <h2
              id={titleId}
              className="mt-3 text-[19px] leading-snug font-semibold tracking-[-0.016em] text-ink"
            >
              {request.title}
            </h2>

            <p className="mt-1.5 text-[12.5px] text-ink-tertiary">
              <time dateTime={request.date}>{formatDateLong(request.date)}</time>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close request details"
            className="
              -mr-1.5 inline-flex size-8 shrink-0 items-center justify-center rounded-sm
              text-ink-tertiary transition-colors duration-150
              hover:bg-surface-sunken hover:text-ink
            "
          >
            <CloseIcon className="size-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
        <Section title="Your Request">
          <p className="text-[13.5px] leading-relaxed text-ink">{request.fullRequest}</p>
        </Section>

        <Section title="Expert">
          <div className="rounded-md border border-line bg-surface-muted p-4">
            <ExpertSummary expert={expert} variant="drawer" />
          </div>
        </Section>

        <Section title="Consultation">
          <dl className="divide-y divide-line rounded-md border border-line">
            <DetailRow term="Rate">
              <span className="tabular-nums">{formatRate(expert.hourlyRate)}</span>
            </DetailRow>
            <DetailRow term="Duration">
              {request.durationMinutes
                ? formatDurationLong(request.durationMinutes)
                : "Not yet scheduled"}
            </DetailRow>
            <DetailRow term="Date">
              <time dateTime={request.date}>{formatDateLong(request.date)}</time>
            </DetailRow>
            <DetailRow term="Status">
              <RequestStatusBadge status={request.status} />
            </DetailRow>
          </dl>
        </Section>

        {request.tags.length > 0 && (
          <Section title="Topics">
            <ul className="flex flex-wrap gap-1.5">
              {request.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="Your Notes">
          {request.notes ? (
            <p className="rounded-md border border-line bg-surface-muted p-4 text-[13.5px] leading-relaxed text-ink">
              {request.notes}
            </p>
          ) : (
            <p className="rounded-md border border-dashed border-line px-4 py-5 text-center text-[13px] text-ink-tertiary">
              No notes yet. Notes you take during or after the consultation will appear
              here.
            </p>
          )}
        </Section>
      </div>

      <footer className="border-t border-line px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="primary" className="sm:flex-1">
            Book again
          </Button>
          <Button variant="secondary" className="sm:flex-1">
            Find similar experts
          </Button>
        </div>

        <div className="mt-2.5 text-center">
          <Button variant="ghost" size="sm">
            View expert profile
          </Button>
        </div>
      </footer>
    </Sheet>
  );
}
