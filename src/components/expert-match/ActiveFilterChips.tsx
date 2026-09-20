"use client";

import { FilterChips } from "@/components/ui/FilterChips";
import type { FilterChip } from "@/components/ui/FilterChips";
import type { RequestFilterState } from "@/lib/types";

export interface ActiveFilterChipsProps {
  filters: RequestFilterState;
  onChange: (patch: Partial<RequestFilterState>) => void;
  onClearAll: () => void;
}

export function ActiveFilterChips({
  filters,
  onChange,
  onClearAll,
}: ActiveFilterChipsProps) {
  const chips: FilterChip[] = [];

  if (filters.industry) {
    chips.push({
      id: "industry",
      field: "Industry",
      value: filters.industry,
      onRemove: () => onChange({ industry: null }),
    });
  }
  if (filters.status) {
    chips.push({
      id: "status",
      field: "Status",
      value: filters.status,
      onRemove: () => onChange({ status: null }),
    });
  }
  if (filters.level) {
    chips.push({
      id: "level",
      field: "Expert level",
      value: filters.level,
      onRemove: () => onChange({ level: null }),
    });
  }
  if (filters.dateRange !== "Any time") {
    chips.push({
      id: "dateRange",
      field: "Date",
      value: filters.dateRange,
      onRemove: () => onChange({ dateRange: "Any time" }),
    });
  }

  return <FilterChips chips={chips} onClearAll={onClearAll} />;
}
