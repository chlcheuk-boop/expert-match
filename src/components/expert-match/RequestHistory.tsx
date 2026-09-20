"use client";

import * as React from "react";
import { ActiveFilterChips } from "@/components/expert-match/ActiveFilterChips";
import { EmptyState } from "@/components/expert-match/EmptyState";
import { IndustryRequestGroup } from "@/components/expert-match/IndustryRequestGroup";
import { RequestCard } from "@/components/expert-match/RequestCard";
import { RequestDetailsDrawer } from "@/components/expert-match/RequestDetailsDrawer";
import { RequestFilters } from "@/components/expert-match/RequestFilters";
import { RequestListSkeleton } from "@/components/expert-match/RequestListSkeleton";
import { RequestSearch } from "@/components/expert-match/RequestSearch";
import { filterRequests, groupByIndustry, sortByDateDesc } from "@/lib/filters";
import { pluralize } from "@/lib/format";
import { useRequests } from "@/lib/useRequests";
import { EMPTY_FILTERS } from "@/lib/types";
import type { ExpertRequest, RequestFilterState } from "@/lib/types";

/** Owns filter state, derived results, and the request drawer. */
export function RequestHistory() {
  const { requests, isLoading } = useRequests();
  const [filters, setFilters] = React.useState<RequestFilterState>(EMPTY_FILTERS);
  const [selected, setSelected] = React.useState<ExpertRequest | null>(null);

  const updateFilters = React.useCallback((patch: Partial<RequestFilterState>) => {
    setFilters((current) => ({ ...current, ...patch }));
  }, []);

  const clearFilters = React.useCallback(() => setFilters(EMPTY_FILTERS), []);

  const results = React.useMemo(
    () => filterRequests(requests, filters),
    [requests, filters],
  );

  /**
   * Grouping is the default reading order. A search or an industry filter
   * already narrows the set, so those views flatten into one ranked list.
   */
  const isFlattened = filters.query.trim().length > 0 || filters.industry !== null;
  const groups = React.useMemo(
    () => (isFlattened ? [] : groupByIndustry(results)),
    [isFlattened, results],
  );
  const flatResults = React.useMemo(
    () => (isFlattened ? sortByDateDesc(results) : []),
    [isFlattened, results],
  );

  return (
    <div>
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <RequestSearch
          value={filters.query}
          onChange={(query) => updateFilters({ query })}
          className="w-full max-w-[420px] xl:max-w-[360px] xl:flex-1"
        />
        <RequestFilters
          filters={filters}
          onChange={updateFilters}
          className="sm:gap-2 xl:ml-auto"
        />
      </div>

      <div className="mt-3 empty:mt-0">
        <ActiveFilterChips
          filters={filters}
          onChange={updateFilters}
          onClearAll={clearFilters}
        />
      </div>

      <div className="mt-6 sm:mt-7">
        {isLoading ? (
          <>
            <span className="sr-only" role="status">
              Loading requests
            </span>
            <RequestListSkeleton />
          </>
        ) : requests.length === 0 ? (
          <EmptyState
            title="No expert requests yet"
            description="When you request an expert consultation, it will appear here."
            actionLabel="Create your first request"
            onAction={() => undefined}
          />
        ) : results.length === 0 ? (
          <EmptyState
            title="No requests match these filters."
            description="Try a different search term, or widen the filters to see more of your history."
            actionLabel="Clear filters"
            actionVariant="secondary"
            onAction={clearFilters}
          />
        ) : (
          <>
            <p aria-live="polite" className="sr-only">
              {pluralize(results.length, "request")} found
            </p>

            {isFlattened ? (
              <>
                <p className="pb-3 text-[12.5px] text-ink-tertiary">
                  {pluralize(results.length, "request")}
                </p>
                <ul className="space-y-2.5">
                  {flatResults.map((request) => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onOpen={setSelected}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <div className="space-y-8">
                {groups.map((group) => (
                  <IndustryRequestGroup
                    key={group.industry}
                    industry={group.industry}
                    requests={group.requests}
                    onOpenRequest={setSelected}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <RequestDetailsDrawer
        request={selected}
        open={selected !== null}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
