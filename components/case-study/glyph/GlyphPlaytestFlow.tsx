const BUILT = ["Developer", "Project", "Structured request"];
const NEXT = ["Discovery", "Signup", "Acceptance", "Private build access", "Structured feedback", "Owner review"];

export function GlyphPlaytestFlow() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">BUILT NOW</span>
        <div className="flex flex-wrap items-center gap-3">
          {BUILT.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span className="rounded-lg border border-line-strong px-4 py-2.5 text-[14px] font-medium">{step}</span>
              {i < BUILT.length - 1 && <span className="text-ink-faint">→</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-faint">NEXT LAYER</span>
        <div className="flex flex-wrap items-center gap-3">
          {NEXT.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span className="rounded-lg border border-dashed border-line-soft px-4 py-2.5 text-[14px] font-medium text-ink-faint">
                {step}
              </span>
              {i < NEXT.length - 1 && <span className="text-ink-faint">→</span>}
            </div>
          ))}
        </div>
      </div>
      <p className="m-0 text-[13px] leading-[1.6] text-ink-faint text-pretty">
        Request creation, platform/time/capacity/focus fields, and a private build-link table are implemented in
        current source. Tester discovery, signup, acceptance, private build access, and feedback submission are the
        next layer — not yet routes in the current-local product.
      </p>
    </div>
  );
}
