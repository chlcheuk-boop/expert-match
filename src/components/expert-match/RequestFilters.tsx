"use client";

import { SelectMenu } from "@/components/ui/SelectMenu";
import { cn } from "@/lib/cn";
import {
  DATE_RANGES,
  EXPERT_LEVELS,
  INDUSTRIES,
  REQUEST_STATUSES,
} from "@/lib/types";
import type {
  DateRange,
  ExpertLevel,
  Industry,
  RequestFilterState,
  RequestStatus,
} from "@/lib/types";

export interface RequestFiltersProps {
  filters: RequestFilterState;
  onChange: (patch: Partial<RequestFilterState>) => void;
  className?: string;
}

export function RequestFilters({ filters, onChange, className }: RequestFiltersProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center",
        className,
      )}
    >
      <SelectMenu<Industry>
        label="Industry"
        value={filters.industry}
        options={INDUSTRIES}
        onChange={(industry) => onChange({ industry })}
        allLabel="All industries"
        className="sm:w-[170px]"
      />
      <SelectMenu<RequestStatus>
        label="Status"
        value={filters.status}
        options={REQUEST_STATUSES}
        onChange={(status) => onChange({ status })}
        allLabel="All"
        className="sm:w-[132px]"
      />
      <SelectMenu<ExpertLevel>
        label="Expert Level"
        value={filters.level}
        options={EXPERT_LEVELS}
        onChange={(level) => onChange({ level })}
        allLabel="All levels"
        className="sm:w-[190px]"
      />
      <SelectMenu<DateRange>
        label="Date"
        value={filters.dateRange}
        options={DATE_RANGES}
        onChange={(dateRange) => onChange({ dateRange: dateRange ?? "Any time" })}
        neutralValue="Any time"
        className="sm:w-[142px]"
      />
    </div>
  );
}
