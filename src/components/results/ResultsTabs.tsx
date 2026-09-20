import { SectionTabs } from "@/components/ui/SectionTabs";

const TABS = [
  { label: "Past Requests", href: "/results/requests" },
  { label: "Contacted Experts", href: "/results/experts" },
];

export function ResultsTabs() {
  return <SectionTabs tabs={TABS} ariaLabel="Results sections" />;
}
