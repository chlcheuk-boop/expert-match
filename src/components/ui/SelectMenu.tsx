"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { ChevronDownIcon, CheckIcon } from "@/components/ui/icons";

export interface SelectMenuProps<T extends string> {
  /** Field name, shown on the trigger while nothing is selected. */
  label: string;
  value: T | null;
  options: readonly T[];
  onChange: (value: T | null) => void;
  /**
   * When provided, a leading option that clears the selection — e.g. "All".
   * Omit for fields whose neutral state is a real option.
   */
  allLabel?: string;
  /** Treat this option value as the neutral state for styling purposes. */
  neutralValue?: T;
  className?: string;
}

/**
 * Accessible single-select dropdown built on a button + listbox pattern.
 * Used instead of a native `<select>` so selected state, alignment, and type
 * scale match the rest of the interface.
 */
export function SelectMenu<T extends string>({
  label,
  value,
  options,
  onChange,
  allLabel,
  neutralValue,
  className,
}: SelectMenuProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const listboxId = React.useId();

  const entries = React.useMemo(
    () => [
      ...(allLabel ? [{ label: allLabel, value: null as T | null }] : []),
      ...options.map((option) => ({ label: option, value: option as T | null })),
    ],
    [allLabel, options],
  );

  const selectedIndex = Math.max(
    entries.findIndex((entry) => entry.value === value),
    0,
  );

  const isNeutral = value === null || (neutralValue !== undefined && value === neutralValue);
  // The neutral state shows the field name, so the row reads as a set of filters.
  const displayLabel = isNeutral ? label : value;

  React.useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  React.useEffect(() => {
    if (open) {
      setActiveIndex(selectedIndex);
      // The list is already committed to the DOM here, so focus it directly
      // rather than waiting on a frame that a background tab may not schedule.
      listRef.current?.focus();
    }
  }, [open, selectedIndex]);

  function close(refocus = true) {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  }

  function commit(index: number) {
    onChange(entries[index].value);
    close();
  }

  function onListKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, entries.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(entries.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        commit(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        close();
        break;
      case "Tab":
        close(false);
        break;
    }
  }

  function onTriggerKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
    }
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "inline-flex h-9 w-full items-center justify-between gap-2 rounded-md border px-3",
          "text-[13px] transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          isNeutral
            ? "border-line bg-surface text-ink-secondary hover:border-line-strong hover:text-ink"
            : "border-accent-line bg-accent-soft font-medium text-accent hover:border-accent/30",
          open && "border-line-strong",
        )}
      >
        <span className="truncate">
          {/* In the neutral state the visible text is already the field name. */}
          {!isNeutral && <span className="sr-only">{label}: </span>}
          {displayLabel}
        </span>
        <ChevronDownIcon
          className={cn(
            "size-3.5 shrink-0 transition-transform duration-150",
            isNeutral ? "text-ink-tertiary" : "text-accent",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${listboxId}-${activeIndex}`}
          onKeyDown={onListKeyDown}
          className={cn(
            "animate-pop-in absolute left-0 top-[calc(100%+4px)] z-40 max-h-[22rem] min-w-full overflow-auto",
            "rounded-md border border-line bg-surface p-1 shadow-raised focus:outline-none",
          )}
        >
          {entries.map((entry, index) => {
            const isSelected = entry.value === value;
            return (
              <li
                key={entry.label}
                id={`${listboxId}-${index}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => commit(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-xs px-2.5 py-[7px]",
                  "text-[13px] whitespace-nowrap transition-colors duration-100",
                  index === activeIndex ? "bg-surface-sunken text-ink" : "text-ink-secondary",
                  isSelected && "font-medium text-ink",
                )}
              >
                {entry.label}
                {isSelected && <CheckIcon className="size-3.5 shrink-0 text-accent" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
