import type { Metadata } from "next";
import { CallsAndNotes } from "@/components/expert-match/CallsAndNotes";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Calls & Notes",
  description: "Your upcoming consultations and the notes from past calls.",
};

export default function CallsAndNotesPage() {
  return (
    <div className="pt-8 sm:pt-10">
      <PageHeader
        title="Calls & Notes"
        description="Prepare for upcoming consultations and revisit the notes from calls you have already taken."
      />
      <div className="mt-7 sm:mt-8">
        <CallsAndNotes />
      </div>
    </div>
  );
}
