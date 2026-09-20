export interface PageHeaderProps {
  title: string;
  description: string;
  /** Optional primary action rendered on the right. */
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
      <div className="max-w-xl">
        <h1 className="text-[28px] leading-tight font-semibold tracking-[-0.022em] text-ink sm:text-[30px]">
          {title}
        </h1>
        <p className="mt-1.5 text-[14px] text-ink-secondary">{description}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
