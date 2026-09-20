import type { Metadata } from "next";
import { CommunityExpertCard } from "@/components/results/CommunityExpertCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { COMMUNITY_REQUESTS } from "@/data/community";
import { buildExpertRoster, groupByLevel } from "@/lib/experts";
import { pluralize } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contacted Experts",
  description: "Experts other Expert Match members have consulted.",
};

export default function ResultsExpertsPage() {
  const groups = groupByLevel(buildExpertRoster(COMMUNITY_REQUESTS));

  return (
    <div className="pt-8 sm:pt-10">
      <PageHeader
        title="Contacted Experts"
        description="The experts behind the shared consultations, grouped by seniority."
      />

      <div className="mt-7 space-y-8 sm:mt-8">
        {groups.map((group) => (
          <section key={group.level} aria-labelledby={`level-${group.level}`}>
            <div className="flex items-center gap-3 pb-3">
              <h2
                id={`level-${group.level}`}
                className="text-[13px] font-semibold tracking-[-0.005em] text-ink"
              >
                {group.level}
              </h2>
              <span className="text-[12.5px] text-ink-tertiary">
                {pluralize(group.entries.length, "expert")}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-line" />
            </div>

            <ul className="space-y-2.5">
              {group.entries.map((entry) => (
                <CommunityExpertCard key={entry.expert.id} entry={entry} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
