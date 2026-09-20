import type { Metadata } from "next";
import { ExpertDirectory } from "@/components/expert-match/ExpertDirectory";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Experts",
  description: "Experts you have consulted through Expert Match.",
};

export default function ExpertsPage() {
  return (
    <div className="pt-8 sm:pt-10">
      <PageHeader
        title="Your Experts"
        description="Everyone you have consulted through Expert Match, grouped by seniority."
      />
      <div className="mt-7 sm:mt-8">
        <ExpertDirectory />
      </div>
    </div>
  );
}
