"use client";

import * as React from "react";
import { CallCalendar } from "@/components/expert-match/CallCalendar";
import { CallListItem } from "@/components/expert-match/CallListItem";
import { EmptyState } from "@/components/expert-match/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  buildCalls,
  callsByDate as groupCallsByDate,
  pastCalls,
  toISODate,
  upcomingCalls,
} from "@/lib/calls";
import type { Call } from "@/lib/calls";
import { pluralize } from "@/lib/format";
import { useRequests } from "@/lib/useRequests";

function CallSection({
  title,
  calls,
  expandedId,
  onToggle,
  registerAnchor,
  emptyCopy,
}: {
  title: string;
  calls: Call[];
  expandedId: string | null;
  onToggle: (id: string) => void;
  registerAnchor: (id: string, element: HTMLLIElement | null) => void;
  emptyCopy: string;
}) {
  const headingId = `calls-${title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section aria-labelledby={headingId}>
      <div className="flex items-center gap-3 pb-3">
        <h2 id={headingId} className="text-[13px] font-semibold tracking-[-0.005em] text-ink">
          {title}
        </h2>
        <span className="text-[12.5px] text-ink-tertiary">
          {pluralize(calls.length, "call")}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>

      {calls.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line px-4 py-6 text-center text-[13px] text-ink-tertiary">
          {emptyCopy}
        </p>
      ) : (
        <ul className="space-y-2.5">
          {calls.map((call) => (
            <CallListItem
              key={call.id}
              call={call}
              expanded={expandedId === call.id}
              onToggle={() => onToggle(call.id)}
              anchorRef={(element) => registerAnchor(call.id, element)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

/** Calls on the left, month view on the right; the two stay in sync. */
export function CallsAndNotes() {
  const { requests, isLoading } = useRequests();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const anchors = React.useRef(new Map<string, HTMLLIElement>());

  const registerAnchor = React.useCallback(
    (id: string, element: HTMLLIElement | null) => {
      if (element) anchors.current.set(id, element);
      else anchors.current.delete(id);
    },
    [],
  );

  const calls = React.useMemo(() => buildCalls(requests), [requests]);
  const upcoming = React.useMemo(() => upcomingCalls(calls), [calls]);
  const past = React.useMemo(() => pastCalls(calls), [calls]);
  const byDate = React.useMemo(() => groupCallsByDate(calls), [calls]);

  // Resolved on the client only, so server and client never disagree on "today".
  const today = React.useMemo(() => {
    const now = new Date();
    return toISODate(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  function toggleCall(id: string) {
    setExpandedId((current) => (current === id ? null : id));
  }

  function selectDate(date: string | null) {
    setSelectedDate(date);

    const dayCalls = date ? (byDate.get(date) ?? []) : [];
    const first = dayCalls[0];
    setExpandedId(first ? first.id : null);

    if (first) {
      // The row may be far down the list; bring it into view once it expands.
      requestAnimationFrame(() => {
        anchors.current.get(first.id)?.scrollIntoView({
          block: "nearest",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
      });
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
        <div className="space-y-2.5">
          <span className="sr-only" role="status">
            Loading calls
          </span>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-lg border border-line bg-surface p-4">
              <div className="flex items-center gap-3.5">
                <Skeleton className="h-10 w-10 rounded-sm!" />
                <Skeleton className="size-8 rounded-full!" />
                <div className="flex-1">
                  <Skeleton className="h-3.5 w-1/2" />
                  <Skeleton className="mt-2 h-3 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Skeleton className="h-[320px] rounded-lg!" />
      </div>
    );
  }

  if (calls.length === 0) {
    return (
      <EmptyState
        title="No calls yet"
        description="Once a consultation is scheduled, it will appear here with your notes and preparation."
        actionLabel="Create your first request"
        onAction={() => undefined}
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-8">
      <div className="space-y-8">
        <CallSection
          title="Upcoming"
          calls={upcoming}
          expandedId={expandedId}
          onToggle={toggleCall}
          registerAnchor={registerAnchor}
          emptyCopy="Nothing booked right now."
        />
        <CallSection
          title="Past calls"
          calls={past}
          expandedId={expandedId}
          onToggle={toggleCall}
          registerAnchor={registerAnchor}
          emptyCopy="No completed calls yet."
        />
      </div>

      {/* On narrow screens the month view leads; on desktop it sits alongside. */}
      <div className="order-first lg:order-none lg:sticky lg:top-[76px]">
        <CallCalendar
          callsByDate={byDate}
          today={today}
          selectedDate={selectedDate}
          onSelectDate={selectDate}
        />
      </div>
    </div>
  );
}
