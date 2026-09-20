import { cn } from "@/lib/cn";
import type { RequestStatus } from "@/lib/types";

/**
 * Status is always spelled out in text — colour is a secondary cue only, and
 * the tones stay low-saturation so the list does not read as a dashboard.
 */
const TONES: Record<RequestStatus, string> = {
  Completed:
    "border-status-success-line bg-status-success-bg text-status-success-fg",
  Scheduled: "border-status-info-line bg-status-info-bg text-status-info-fg",
  Matching:
    "border-status-neutral-line bg-status-neutral-bg text-status-neutral-fg",
  Requested:
    "border-status-neutral-line bg-status-neutral-bg text-status-neutral-fg",
  Cancelled: "border-status-muted-line bg-status-muted-bg text-status-muted-fg",
};

const DOTS: Record<RequestStatus, string> = {
  Completed: "bg-status-success-fg",
  Scheduled: "bg-status-info-fg",
  Matching: "bg-status-neutral-fg",
  Requested: "bg-transparent ring-1 ring-inset ring-status-neutral-fg",
  Cancelled: "bg-status-muted-fg",
};

export interface RequestStatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

export function RequestStatusBadge({ status, className }: RequestStatusBadgeProps) {
  return (
    <span
      className={cn(
        "label-eyebrow inline-flex items-center gap-1.5 rounded-xs border px-1.5 py-[4px]",
        TONES[status],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-[5px] shrink-0 rounded-full", DOTS[status])}
      />
      {status}
    </span>
  );
}
