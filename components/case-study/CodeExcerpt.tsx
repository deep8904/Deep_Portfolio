export function CodeExcerpt({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-ink">
      <div className="border-b border-white/10 px-4 py-2.5">
        <span className="text-[12px] font-medium tracking-[0.05em] text-white/50">{label}</span>
      </div>
      <pre
        tabIndex={0}
        role="region"
        aria-label={`${label} — code, scrollable horizontally`}
        className="m-0 overflow-x-auto px-4 py-4 text-[12.5px] leading-[1.65] text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/40"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
