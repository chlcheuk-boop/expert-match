import { SectionTabs } from "@/components/ui/SectionTabs";

const TABS = [
  { label: "Requests", href: "/expert-match/requests" },
  { label: "Experts", href: "/expert-match/experts" },
  { label: "Calls & Notes", href: "/expert-match/calls-and-notes" },
];

export function ExpertMatchTabs() {
  return <SectionTabs tabs={TABS} ariaLabel="Expert Match sections" />;
}
