"use client";

import { SelectMenu } from "@/components/ui/SelectMenu";
import { cn } from "@/lib/cn";
import { EXPERT_LEVELS, INDUSTRIES } from "@/lib/types";
import type { ExpertLevel, Industry } from "@/lib/types";
import type { ExpertFilterState } from "@/lib/experts";

export interface ExpertFiltersProps {
  filters: ExpertFilterState;
  onChange: (patch: Partial<ExpertFilterState>) => void;
  className?: string;
}

export function ExpertFilters({ filters, onChange, className }: ExpertFiltersProps) {
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
      <SelectMenu<ExpertLevel>
        label="Expert Level"
        value={filters.level}
        options={EXPERT_LEVELS}
        onChange={(level) => onChange({ level })}
        allLabel="All levels"
        className="sm:w-[190px]"
      />
    </div>
  );
}
