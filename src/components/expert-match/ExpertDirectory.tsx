"use client";

import * as React from "react";
import { EmptyState } from "@/components/expert-match/EmptyState";
import { ExpertCard } from "@/components/expert-match/ExpertCard";
import { ExpertDetailsDrawer } from "@/components/expert-match/ExpertDetailsDrawer";
import { ExpertFilters } from "@/components/expert-match/ExpertFilters";
import { ExpertLevelGroup } from "@/components/expert-match/ExpertLevelGroup";
import { RequestListSkeleton } from "@/components/expert-match/RequestListSkeleton";
import { FilterChips } from "@/components/ui/FilterChips";
import { SearchField } from "@/components/ui/SearchField";
import {
  EMPTY_EXPERT_FILTERS,
  buildExpertRoster,
  filterExperts,
  groupByLevel,
  sortRoster,
} from "@/lib/experts";
import type { ExpertFilterState, ExpertRosterEntry } from "@/lib/experts";
import type { FilterChip } from "@/components/ui/FilterChips";
import { pluralize } from "@/lib/format";
import { useRequests } from "@/lib/useRequests";

/** Every expert the user has been matched with, grouped by seniority. */
export function ExpertDirectory() {
  const { requests, isLoading } = useRequests();
  const [filters, setFilters] = React.useState<ExpertFilterState>(EMPTY_EXPERT_FILTERS);
  const [selected, setSelected] = React.useState<ExpertRosterEntry | null>(null);

  const updateFilters = React.useCallback((patch: Partial<ExpertFilterState>) => {
    setFilters((current) => ({ ...current, ...patch }));
  }, []);

  const clearFilters = React.useCallback(() => setFilters(EMPTY_EXPERT_FILTERS), []);

  const roster = React.useMemo(() => buildExpertRoster(requests), [requests]);
  const results = React.useMemo(
    () => filterExperts(roster, filters),
    [roster, filters],
  );

  // A level filter already narrows to one group, so that view flattens.
  const isFlattened = filters.query.trim().length > 0 || filters.level !== null;
  const groups = React.useMemo(
    () => (isFlattened ? [] : groupByLevel(results)),
    [isFlattened, results],
  );
  const flatResults = React.useMemo(
    () => (isFlattened ? sortRoster(results) : []),
    [isFlattened, results],
  );

  const chips: FilterChip[] = [];
  if (filters.industry) {
    chips.push({
      id: "industry",
      field: "Industry",
      value: filters.industry,
      onRemove: () => updateFilters({ industry: null }),
    });
  }
  if (filters.level) {
    chips.push({
      id: "level",
      field: "Expert level",
      value: filters.level,
      onRemove: () => updateFilters({ level: null }),
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <SearchField
          value={filters.query}
          onChange={(query) => updateFilters({ query })}
          label="Search experts"
          placeholder="Search by name, company, or expertise..."
          className="w-full max-w-[420px] xl:max-w-[360px] xl:flex-1"
        />
        <ExpertFilters
          filters={filters}
          onChange={updateFilters}
          className="sm:gap-2 xl:ml-auto"
        />
      </div>

      <div className="mt-3 empty:mt-0">
        <FilterChips chips={chips} onClearAll={clearFilters} />
      </div>

      <div className="mt-6 sm:mt-7">
        {isLoading ? (
          <>
            <span className="sr-only" role="status">
              Loading experts
            </span>
            <RequestListSkeleton rows={3} />
          </>
        ) : roster.length === 0 ? (
          <EmptyState
            title="No experts yet"
            description="Experts you are matched with will be collected here after your first request."
            actionLabel="Create your first request"
            onAction={() => undefined}
          />
        ) : results.length === 0 ? (
          <EmptyState
            title="No experts match these filters."
            description="Try a different search term, or widen the filters to see everyone you have worked with."
            actionLabel="Clear filters"
            actionVariant="secondary"
            onAction={clearFilters}
          />
        ) : (
          <>
            <p aria-live="polite" className="sr-only">
              {pluralize(results.length, "expert")} found
            </p>

            {isFlattened ? (
              <>
                <p className="pb-3 text-[12.5px] text-ink-tertiary">
                  {pluralize(results.length, "expert")}
                </p>
                <ul className="space-y-2.5">
                  {flatResults.map((entry) => (
                    <ExpertCard
                      key={entry.expert.id}
                      entry={entry}
                      onOpen={setSelected}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <div className="space-y-8">
                {groups.map((group) => (
                  <ExpertLevelGroup
                    key={group.level}
                    level={group.level}
                    entries={group.entries}
                    onOpenExpert={setSelected}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <ExpertDetailsDrawer
        entry={selected}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
