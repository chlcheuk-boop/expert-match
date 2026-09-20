import { INDUSTRIES } from "@/lib/types";
import type {
  DateRange,
  ExpertRequest,
  Industry,
  RequestFilterState,
} from "@/lib/types";

const DATE_RANGE_DAYS: Record<Exclude<DateRange, "Any time">, number> = {
  "Past 30 days": 30,
  "Past 3 months": 91,
  "Past 6 months": 183,
  "Past year": 365,
};

/**
 * A date range is an open-ended window that starts N days ago, so an upcoming
 * scheduled consultation stays visible rather than disappearing from a recent
 * view.
 */
function isWithinRange(iso: string, range: DateRange, now: Date): boolean {
  if (range === "Any time") return true;

  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - DATE_RANGE_DAYS[range]);

  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day) >= cutoff;
}

function matchesQuery(request: ExpertRequest, query: string): boolean {
  const haystack = [
    request.title,
    request.description,
    request.fullRequest,
    request.industry,
    request.expert.name,
    request.expert.company,
    request.expert.title,
    request.expert.level,
    ...request.tags,
  ]
    .join(" ")
    .toLowerCase();

  // Every whitespace-separated term must appear somewhere.
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function filterRequests(
  requests: ExpertRequest[],
  filters: RequestFilterState,
  now: Date = new Date(),
): ExpertRequest[] {
  const query = filters.query.trim();

  return requests.filter((request) => {
    if (filters.industry && request.industry !== filters.industry) return false;
    if (filters.status && request.status !== filters.status) return false;
    if (filters.level && request.expert.level !== filters.level) return false;
    if (!isWithinRange(request.date, filters.dateRange, now)) return false;
    if (query && !matchesQuery(request, query)) return false;
    return true;
  });
}

export function sortByDateDesc(requests: ExpertRequest[]): ExpertRequest[] {
  return [...requests].sort((a, b) => b.date.localeCompare(a.date));
}

export interface IndustryGroup {
  industry: Industry;
  requests: ExpertRequest[];
}

/** Groups requests by industry, ordered by the canonical industry list. */
export function groupByIndustry(requests: ExpertRequest[]): IndustryGroup[] {
  const buckets = new Map<Industry, ExpertRequest[]>();

  for (const request of requests) {
    const existing = buckets.get(request.industry);
    if (existing) existing.push(request);
    else buckets.set(request.industry, [request]);
  }

  return INDUSTRIES.filter((industry) => buckets.has(industry)).map((industry) => ({
    industry,
    requests: sortByDateDesc(buckets.get(industry) ?? []),
  }));
}

export function countActiveFilters(filters: RequestFilterState): number {
  let count = 0;
  if (filters.industry) count += 1;
  if (filters.status) count += 1;
  if (filters.level) count += 1;
  if (filters.dateRange !== "Any time") count += 1;
  return count;
}

export function hasAnyFilter(filters: RequestFilterState): boolean {
  return countActiveFilters(filters) > 0 || filters.query.trim().length > 0;
}
