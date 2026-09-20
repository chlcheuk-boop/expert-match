import { EXPERT_LEVELS } from "@/lib/types";
import type {
  Expert,
  ExpertLevel,
  ExpertRequest,
  Industry,
} from "@/lib/types";

/** An expert plus everything the user's own history says about them. */
export interface ExpertRosterEntry {
  expert: Expert;
  /** Every request this expert has been matched to. */
  requests: ExpertRequest[];
  consultationCount: number;
  /** Most recent request date, past or upcoming. */
  lastEngagedDate: string;
  industries: Industry[];
  hasUpcoming: boolean;
}

export interface ExpertFilterState {
  query: string;
  industry: Industry | null;
  level: ExpertLevel | null;
}

export const EMPTY_EXPERT_FILTERS: ExpertFilterState = {
  query: "",
  industry: null,
  level: null,
};

/**
 * The roster is derived from request history rather than stored separately, so
 * there is one source of truth for who the user has actually worked with.
 */
export function buildExpertRoster(requests: ExpertRequest[]): ExpertRosterEntry[] {
  const byExpert = new Map<string, ExpertRequest[]>();

  for (const request of requests) {
    const existing = byExpert.get(request.expert.id);
    if (existing) existing.push(request);
    else byExpert.set(request.expert.id, [request]);
  }

  return [...byExpert.values()].map((expertRequests) => {
    const sorted = [...expertRequests].sort((a, b) => b.date.localeCompare(a.date));
    const industries = [...new Set(sorted.map((request) => request.industry))];

    return {
      expert: sorted[0].expert,
      requests: sorted,
      consultationCount: sorted.length,
      lastEngagedDate: sorted[0].date,
      industries,
      hasUpcoming: sorted.some((request) => request.status === "Scheduled"),
    };
  });
}

function matchesQuery(entry: ExpertRosterEntry, query: string): boolean {
  const { expert } = entry;
  const haystack = [
    expert.name,
    expert.title,
    expert.company,
    expert.level,
    expert.background,
    ...entry.industries,
    ...entry.requests.map((request) => request.title),
  ]
    .join(" ")
    .toLowerCase();

  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function filterExperts(
  roster: ExpertRosterEntry[],
  filters: ExpertFilterState,
): ExpertRosterEntry[] {
  const query = filters.query.trim();

  return roster.filter((entry) => {
    if (filters.level && entry.expert.level !== filters.level) return false;
    if (filters.industry && !entry.industries.includes(filters.industry)) return false;
    if (query && !matchesQuery(entry, query)) return false;
    return true;
  });
}

export interface ExpertLevelGroup {
  level: ExpertLevel;
  entries: ExpertRosterEntry[];
}

/** Groups by seniority, ordered most senior first. */
export function groupByLevel(roster: ExpertRosterEntry[]): ExpertLevelGroup[] {
  const buckets = new Map<ExpertLevel, ExpertRosterEntry[]>();

  for (const entry of roster) {
    const existing = buckets.get(entry.expert.level);
    if (existing) existing.push(entry);
    else buckets.set(entry.expert.level, [entry]);
  }

  return EXPERT_LEVELS.filter((level) => buckets.has(level)).map((level) => ({
    level,
    entries: sortRoster(buckets.get(level) ?? []),
  }));
}

/** Most recently engaged first. */
export function sortRoster(roster: ExpertRosterEntry[]): ExpertRosterEntry[] {
  return [...roster].sort((a, b) => b.lastEngagedDate.localeCompare(a.lastEngagedDate));
}

export function hasAnyExpertFilter(filters: ExpertFilterState): boolean {
  return (
    filters.query.trim().length > 0 ||
    filters.industry !== null ||
    filters.level !== null
  );
}

export type { Expert };
