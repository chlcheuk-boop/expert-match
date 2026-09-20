"use client";

import { useId } from "react";
import { ExpertCard } from "@/components/expert-match/ExpertCard";
import { pluralize } from "@/lib/format";
import type { ExpertRosterEntry } from "@/lib/experts";
import type { ExpertLevel } from "@/lib/types";

export interface ExpertLevelGroupProps {
  level: ExpertLevel;
  entries: ExpertRosterEntry[];
  onOpenExpert: (entry: ExpertRosterEntry) => void;
}

export function ExpertLevelGroup({
  level,
  entries,
  onOpenExpert,
}: ExpertLevelGroupProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <div className="flex items-center gap-3 pb-3">
        <h2 id={headingId} className="text-[13px] font-semibold tracking-[-0.005em] text-ink">
          {level}
        </h2>
        <span className="text-[12.5px] text-ink-tertiary">
          {pluralize(entries.length, "expert")}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>

      <ul className="space-y-2.5">
        {entries.map((entry) => (
          <ExpertCard key={entry.expert.id} entry={entry} onOpen={onOpenExpert} />
        ))}
      </ul>
    </section>
  );
}
