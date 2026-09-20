import type { ExpertRequest } from "@/lib/types";

/** A consultation that is either booked or already happened. */
export interface Call {
  id: string;
  request: ExpertRequest;
  /** ISO calendar date, e.g. "2026-09-29". */
  date: string;
  durationMinutes: number;
  isUpcoming: boolean;
}

/**
 * Calls come from the request history: a scheduled request is an upcoming
 * call, a completed one is a past call. Cancelled requests never happened.
 */
export function buildCalls(requests: ExpertRequest[]): Call[] {
  return requests
    .filter(
      (request) =>
        (request.status === "Scheduled" || request.status === "Completed") &&
        request.durationMinutes !== undefined,
    )
    .map((request) => ({
      id: request.id,
      request,
      date: request.date,
      durationMinutes: request.durationMinutes as number,
      isUpcoming: request.status === "Scheduled",
    }));
}

/** Soonest first — the next call is the one that matters most. */
export function upcomingCalls(calls: Call[]): Call[] {
  return calls
    .filter((call) => call.isUpcoming)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Most recent first. */
export function pastCalls(calls: Call[]): Call[] {
  return calls
    .filter((call) => !call.isUpcoming)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function callsByDate(calls: Call[]): Map<string, Call[]> {
  const map = new Map<string, Call[]>();

  for (const call of calls) {
    const existing = map.get(call.date);
    if (existing) existing.push(call);
    else map.set(call.date, [call]);
  }

  return map;
}

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Sunday-first initials, matching a standard month view. */
export const WEEKDAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

export interface CalendarDay {
  /** ISO date string for this cell. */
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
}

export function toISODate(year: number, month: number, day: number): string {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

/**
 * Six weeks of cells, so the grid height never jumps between months.
 * `month` is zero-based.
 */
export function buildMonthGrid(year: number, month: number): CalendarDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const leading = firstOfMonth.getDay();
  const cells: CalendarDay[] = [];

  for (let index = 0; index < 42; index += 1) {
    const cellDate = new Date(year, month, index - leading + 1);
    cells.push({
      date: toISODate(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate()),
      dayOfMonth: cellDate.getDate(),
      isCurrentMonth: cellDate.getMonth() === month,
    });
  }

  return cells;
}

export function addMonths(year: number, month: number, delta: number) {
  const shifted = new Date(year, month + delta, 1);
  return { year: shifted.getFullYear(), month: shifted.getMonth() };
}
