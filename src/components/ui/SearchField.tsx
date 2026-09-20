"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";

export interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  /** Accessible label; visually hidden. */
  label: string;
  className?: string;
}

export function SearchField({
  value,
  onChange,
  placeholder,
  label,
  className,
}: SearchFieldProps) {
  const inputId = useId();

  return (
    <div className={cn("relative", className)}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>

      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-tertiary" />

      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="
          h-9 w-full rounded-md border border-line bg-surface pr-9 pl-9 text-[13.5px]
          text-ink shadow-subtle transition-colors duration-150
          placeholder:text-ink-tertiary hover:border-line-strong
          focus:border-accent-line focus:outline-2 focus:outline-offset-2 focus:outline-accent
          [&::-webkit-search-cancel-button]:hidden
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={`Clear ${label.toLowerCase()}`}
          className="
            absolute top-1/2 right-2 inline-flex size-6 -translate-y-1/2 items-center justify-center
            rounded-xs text-ink-tertiary transition-colors duration-150
            hover:bg-surface-sunken hover:text-ink
          "
        >
          <CloseIcon className="size-3.5" />
        </button>
      )}
    </div>
  );
}
