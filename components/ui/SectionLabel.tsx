export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center rounded-lg bg-surface px-[13px] text-[12.5px] font-medium text-ink-secondary">
      {children}
    </span>
  );
}
