"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import {
  MONTH_NAMES,
  WEEKDAY_INITIALS,
  addMonths,
  buildMonthGrid,
} from "@/lib/calls";
import type { Call } from "@/lib/calls";
import { formatDateLong } from "@/lib/format";

export interface CallCalendarProps {
  callsByDate: Map<string, Call[]>;
  /** ISO date treated as today. */
  today: string;
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}

/** Month view. Days carrying a call are marked and clickable. */
export function CallCalendar({
  callsByDate,
  today,
  selectedDate,
  onSelectDate,
}: CallCalendarProps) {
  const [view, setView] = React.useState(() => {
    const [year, month] = today.split("-").map(Number);
    return { year, month: month - 1 };
  });

  const cells = React.useMemo(
    () => buildMonthGrid(view.year, view.month),
    [view.year, view.month],
  );

  const monthLabel = `${MONTH_NAMES[view.month]} ${view.year}`;

  function step(delta: number) {
    setView((current) => addMonths(current.year, current.month, delta));
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 aria-live="polite" className="text-[13.5px] font-semibold tracking-[-0.005em] text-ink">
          {monthLabel}
        </h2>

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous month"
            className="inline-flex size-7 items-center justify-center rounded-sm text-ink-tertiary transition-colors duration-150 hover:bg-surface-sunken hover:text-ink"
          >
            <ChevronLeftIcon className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next month"
            className="inline-flex size-7 items-center justify-center rounded-sm text-ink-tertiary transition-colors duration-150 hover:bg-surface-sunken hover:text-ink"
          >
            <ChevronRightIcon className="size-3.5" />
          </button>
        </div>
      </div>

      <div aria-hidden="true" className="mt-3 grid grid-cols-7 gap-1">
        {WEEKDAY_INITIALS.map((initial, index) => (
          <span
            key={`${initial}-${index}`}
            className="flex h-6 items-center justify-center text-[11px] font-medium text-ink-tertiary"
          >
            {initial}
          </span>
        ))}
      </div>

      <div className="mt-0.5 grid grid-cols-7 gap-1">
        {cells.map((cell) => {
          const calls = callsByDate.get(cell.date) ?? [];
          const hasCalls = calls.length > 0;
          const isToday = cell.date === today;
          const isSelected = cell.date === selectedDate;
          const hasUpcoming = calls.some((call) => call.isUpcoming);

          const label = hasCalls
            ? `${formatDateLong(cell.date)} — ${calls.length === 1 ? calls[0].request.expert.name : `${calls.length} calls`}`
            : formatDateLong(cell.date);

          return (
            <button
              key={cell.date}
              type="button"
              disabled={!hasCalls}
              aria-pressed={hasCalls ? isSelected : undefined}
              aria-label={label}
              onClick={() => onSelectDate(isSelected ? null : cell.date)}
              className={cn(
                "relative flex aspect-square flex-col items-center justify-center rounded-sm",
                "text-[12px] transition-colors duration-150",
                !cell.isCurrentMonth && "text-ink-tertiary/50",
                cell.isCurrentMonth && !hasCalls && "text-ink-secondary",
                hasCalls && !isSelected && "font-medium text-ink hover:bg-surface-sunken",
                hasCalls && "cursor-pointer",
                isSelected && "bg-accent font-medium text-white",
                isToday && !isSelected && "ring-1 ring-inset ring-line-strong",
                !hasCalls && "cursor-default",
              )}
            >
              {cell.dayOfMonth}
              {hasCalls && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute bottom-[5px] size-1 rounded-full",
                    isSelected
                      ? "bg-white"
                      : hasUpcoming
                        ? "bg-gold"
                        : "bg-ink-tertiary",
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-line pt-3 text-[11.5px] text-ink-secondary">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
          Upcoming
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-ink-tertiary" />
          Completed
        </span>
      </div>
    </div>
  );
}
