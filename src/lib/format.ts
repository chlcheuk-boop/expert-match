const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * ISO dates are parsed by hand rather than with `new Date(iso)` so that a
 * calendar date never shifts across a timezone boundary.
 */
function parts(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

/** "Sep 12, 2026" */
export function formatDateShort(iso: string): string {
  const { year, month, day } = parts(iso);
  return `${MONTHS_SHORT[month - 1]} ${day}, ${year}`;
}

/** "September 12, 2026" */
export function formatDateLong(iso: string): string {
  const { year, month, day } = parts(iso);
  return `${MONTHS_LONG[month - 1]} ${day}, ${year}`;
}

/** "$1,600 / hour" */
export function formatRate(hourlyRate: number): string {
  return `$${hourlyRate.toLocaleString("en-US")} / hour`;
}

/** "60 min" */
export function formatDuration(minutes: number): string {
  return `${minutes} min`;
}

/** "60-minute call" */
export function formatDurationLong(minutes: number): string {
  return `${minutes}-minute call`;
}

/** "TG" — used for the avatar fallback. */
export function getInitials(name: string): string {
  const words = name
    .replace(/^(Dr|Mr|Ms|Mrs)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

/** "$1,600" — the amount without the rate unit, so the unit can be de-emphasised. */
export function formatRateAmount(hourlyRate: number): string {
  return `$${hourlyRate.toLocaleString("en-US")}`;
}

/** { month: "SEP", day: "29" } for the small date block on a call row. */
export function formatDateCell(iso: string): { month: string; day: string } {
  const [, month, day] = iso.split("-").map(Number);
  return { month: MONTHS_SHORT[month - 1].toUpperCase(), day: String(day) };
}
