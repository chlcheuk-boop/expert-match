"use client";

import { CloseIcon } from "@/components/ui/icons";

export interface FilterChip {
  id: string;
  /** Field name, used only for the accessible label. */
  field: string;
  value: string;
  onRemove: () => void;
}

export interface FilterChipsProps {
  chips: FilterChip[];
  onClearAll: () => void;
}

/** Compact, removable summary of the active filters. */
export function FilterChips({ chips, onClearAll }: FilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <ul aria-label="Active filters" className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <li key={chip.id}>
          <span
            className="
              inline-flex items-center gap-1 rounded-xs border border-line bg-surface
              py-[3px] pr-1 pl-2 text-[12.5px] text-ink-secondary shadow-subtle
            "
          >
            {chip.value}
            <button
              type="button"
              onClick={chip.onRemove}
              aria-label={`Remove ${chip.field.toLowerCase()} filter: ${chip.value}`}
              className="
                inline-flex size-[18px] items-center justify-center rounded-[3px]
                text-ink-tertiary transition-colors duration-150
                hover:bg-surface-sunken hover:text-ink
              "
            >
              <CloseIcon className="size-3" />
            </button>
          </span>
        </li>
      ))}

      <li>
        <button
          type="button"
          onClick={onClearAll}
          className="
            rounded-xs px-1.5 py-1 text-[12.5px] text-ink-secondary underline-offset-4
            transition-colors duration-150 hover:text-ink hover:underline
          "
        >
          Clear all
        </button>
      </li>
    </ul>
  );
}
