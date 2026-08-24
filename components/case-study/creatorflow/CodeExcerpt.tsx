export function CodeExcerpt({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong bg-ink">
      <div className="border-b border-white/10 px-4 py-2.5">
        <span className="text-[11px] font-medium tracking-[0.05em] text-white/50">{label}</span>
      </div>
      <pre className="m-0 overflow-x-auto px-4 py-4 text-[12.5px] leading-[1.65] text-white/85">
        <code>{code}</code>
      </pre>
    </div>
  );
}
