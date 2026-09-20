/** Stub for Expert Match sections that are not built yet. */
export function SectionPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="pt-8 sm:pt-10">
      <h1 className="text-[28px] leading-tight font-semibold tracking-[-0.022em] text-ink sm:text-[30px]">
        {title}
      </h1>
      <p className="mt-1.5 max-w-xl text-[14px] text-ink-secondary">{description}</p>

      <div className="mt-7 rounded-lg border border-dashed border-line bg-surface px-6 py-16 text-center">
        <p className="text-[13.5px] text-ink-tertiary">
          This section is not built yet.
        </p>
      </div>
    </div>
  );
}
