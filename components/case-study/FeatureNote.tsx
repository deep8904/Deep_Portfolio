/**
 * A numbered feature note that sits beside or below a ProductBrowserFrame —
 * never on top of it. Explains WHY, not just what's on screen.
 */
export function FeatureNote({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3.5">
      <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">{num}</span>
      <div className="flex flex-col gap-1">
        <span className="text-[14px] font-medium tracking-[-0.01em]">{title}</span>
        <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{children}</p>
      </div>
    </div>
  );
}
