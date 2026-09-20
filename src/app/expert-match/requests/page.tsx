import type { Metadata } from "next";
import { RequestHistory } from "@/components/expert-match/RequestHistory";
import { RequestHistoryHeader } from "@/components/expert-match/RequestHistoryHeader";

export const metadata: Metadata = {
  title: "Past Requests",
  description:
    "Review your previous expert requests, consultations, and conversations.",
};

export default function RequestsPage() {
  return (
    <div className="pt-8 sm:pt-10">
      <RequestHistoryHeader />
      <div className="mt-7 sm:mt-8">
        <RequestHistory />
      </div>
    </div>
  );
}
