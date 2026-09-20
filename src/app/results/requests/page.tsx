import type { Metadata } from "next";
import { CommunityRequestCard } from "@/components/results/CommunityRequestCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { COMMUNITY_REQUESTS } from "@/data/community";
import { pluralize } from "@/lib/format";

export const metadata: Metadata = {
  title: "Past Requests",
  description:
    "A selection of consultations other Expert Match members have shared.",
};

export default function ResultsRequestsPage() {
  const requests = COMMUNITY_REQUESTS;

  return (
    <div className="pt-8 sm:pt-10">
      <PageHeader
        title="Past Requests"
        description="A small selection of consultations other members have agreed to share — the question they brought, who answered it, and what came of it."
      />

      <div className="mt-7 sm:mt-8">
        <p className="pb-3 text-[12.5px] text-ink-tertiary">
          {pluralize(requests.length, "shared example")}
          <span aria-hidden="true" className="px-1">
            ·
          </span>
          Requesters are anonymised
        </p>

        <ul className="space-y-2.5">
          {requests.map((request) => (
            <CommunityRequestCard key={request.id} request={request} />
          ))}
        </ul>
      </div>
    </div>
  );
}
