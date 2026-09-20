import { Button } from "@/components/ui/Button";
import { ArchiveIcon } from "@/components/ui/icons";

export interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  /** Primary for the first-run state, secondary when clearing filters. */
  actionVariant?: "primary" | "secondary";
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  actionVariant = "primary",
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-line bg-surface px-6 py-14 text-center">
      <span
        aria-hidden="true"
        className="mx-auto inline-flex size-9 items-center justify-center rounded-md border border-line bg-surface-muted text-ink-tertiary"
      >
        <ArchiveIcon className="size-4" />
      </span>

      <h2 className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h2>
      <p className="mx-auto mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-ink-secondary">
        {description}
      </p>

      <Button variant={actionVariant} onClick={onAction} className="mt-5">
        {actionLabel}
      </Button>
    </div>
  );
}
