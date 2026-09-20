import { ExpertMatchTabs } from "@/components/expert-match/ExpertMatchTabs";

export default function ExpertMatchLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto max-w-[1180px] px-5 pb-20 sm:px-8">
      <ExpertMatchTabs />
      {children}
    </div>
  );
}
