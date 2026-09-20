"use client";

import { useId } from "react";
import { RequestCard } from "@/components/expert-match/RequestCard";
import { pluralize } from "@/lib/format";
import type { ExpertRequest, Industry } from "@/lib/types";

export interface IndustryRequestGroupProps {
  industry: Industry;
  requests: ExpertRequest[];
  onOpenRequest: (request: ExpertRequest) => void;
}

export function IndustryRequestGroup({
  industry,
  requests,
  onOpenRequest,
}: IndustryRequestGroupProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <div className="flex items-center gap-3 pb-3">
        <h2
          id={headingId}
          className="text-[13px] font-semibold tracking-[-0.005em] text-ink"
        >
          {industry}
        </h2>
        <span className="text-[12.5px] text-ink-tertiary">
          {pluralize(requests.length, "request")}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>

      <ul className="space-y-2.5">
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} onOpen={onOpenRequest} />
        ))}
      </ul>
    </section>
  );
}
