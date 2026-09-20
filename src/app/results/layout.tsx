import { ResultsTabs } from "@/components/results/ResultsTabs";

export default function ResultsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto max-w-[1180px] px-5 pb-20 sm:px-8">
      <ResultsTabs />
      {children}
    </div>
  );
}
