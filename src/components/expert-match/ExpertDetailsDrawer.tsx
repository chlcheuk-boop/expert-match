"use client";

import { useId } from "react";
import { RequestStatusBadge } from "@/components/expert-match/RequestStatusBadge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { Tag } from "@/components/ui/Tag";
import { CloseIcon } from "@/components/ui/icons";
import { formatDateShort, formatRate, pluralize } from "@/lib/format";
import type { ExpertRosterEntry } from "@/lib/experts";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="label-eyebrow text-ink-tertiary">{title}</h3>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

export interface ExpertDetailsDrawerProps {
  entry: ExpertRosterEntry | null;
  open: boolean;
  onClose: () => void;
}

export function ExpertDetailsDrawer({ entry, open, onClose }: ExpertDetailsDrawerProps) {
  const titleId = useId();

  if (!entry) return null;

  const { expert } = entry;

  return (
    <Sheet open={open} onClose={onClose} labelledBy={titleId}>
      <header className="border-b border-line px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3.5">
            <Avatar name={expert.name} size="lg" />
            <div className="min-w-0">
              <p className="label-eyebrow text-ink-tertiary">{expert.level}</p>
              <h2
                id={titleId}
                className="mt-2 text-[19px] leading-snug font-semibold tracking-[-0.016em] text-ink"
              >
                {expert.name}
              </h2>
              <p className="mt-1 text-[13.5px] text-ink-secondary">
                {expert.title}
                <span aria-hidden="true" className="px-1 text-ink-tertiary">
                  ·
                </span>
                {expert.company}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close expert profile"
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
        <Section title="Experience">
          <p className="text-[13.5px] leading-relaxed text-ink">{expert.background}</p>
        </Section>

        <Section title="Engagement">
          <dl className="divide-y divide-line rounded-md border border-line">
            <div className="flex items-center justify-between gap-4 px-3.5 py-2.5">
              <dt className="text-[13px] text-ink-secondary">Rate</dt>
              <dd className="text-[13px] tabular-nums text-ink">
                {formatRate(expert.hourlyRate)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 px-3.5 py-2.5">
              <dt className="text-[13px] text-ink-secondary">Consultations</dt>
              <dd className="text-[13px] text-ink">
                {pluralize(entry.consultationCount, "consultation")}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 px-3.5 py-2.5">
              <dt className="text-[13px] text-ink-secondary">Most recent</dt>
              <dd className="text-[13px] text-ink">
                <time dateTime={entry.lastEngagedDate}>
                  {formatDateShort(entry.lastEngagedDate)}
                </time>
              </dd>
            </div>
          </dl>
        </Section>

        <Section title="Industries">
          <ul className="flex flex-wrap gap-1.5">
            {entry.industries.map((industry) => (
              <li key={industry}>
                <Tag>{industry}</Tag>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Your Consultations">
          <ul className="space-y-2">
            {entry.requests.map((request) => (
              <li
                key={request.id}
                className="rounded-md border border-line bg-surface-muted p-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[13.5px] leading-snug font-medium text-ink">
                    {request.title}
                  </p>
                  <RequestStatusBadge status={request.status} />
                </div>
                <p className="mt-1.5 text-[12.5px] text-ink-tertiary">
                  <time dateTime={request.date}>{formatDateShort(request.date)}</time>
                  {request.durationMinutes && (
                    <>
                      <span aria-hidden="true" className="px-1">
                        ·
                      </span>
                      {request.durationMinutes} min
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      <footer className="border-t border-line px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="primary" className="sm:flex-1">
            Book a consultation
          </Button>
          <Button variant="secondary" className="sm:flex-1">
            Find similar experts
          </Button>
        </div>
      </footer>
    </Sheet>
  );
}
