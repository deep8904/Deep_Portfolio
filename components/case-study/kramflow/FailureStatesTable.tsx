const CASES = [
  {
    title: "Finished session, stale countdown",
    expected: "When a session finishes, its displays show a clean “Session Finished” state.",
    failure: "Green Room and AV kept showing a countdown next to “Session Finished” — contradictory, not just stale.",
    response: "The countdown wasn't literally the last real number — when the live item becomes null, the timer hook fell back to an unrelated manual-timer default that happened to look like a countdown.",
    feedback: "The countdown block is now suppressed entirely once a session is finished, on both displays.",
    why: "A number that looks live but isn't is worse than no number — it reads as a functioning system giving wrong information, not a broken one giving none.",
  },
  {
    title: "Hold screen covering its own toggle",
    expected: "An operator can release a Hold from the same control that activated it.",
    failure: "The full-screen Hold takeover rendered above everything, including the Presenter page's own control bar — the only way to turn Hold off.",
    response: "A z-index ordering bug: Hold at a higher layer than the control that toggles it.",
    feedback: "The Presenter control bar now sits above the Hold overlay specifically, so a real click still reaches it while Hold is active.",
    why: "A safety feature that can't be turned off isn't safe — it's a new failure mode wearing the shape of one.",
  },
  {
    title: "TV content clipped at short/landscape viewports",
    expected: "Display content stays fully visible and scrollable on any real TV or tablet aspect ratio.",
    failure: "Content overlapped and clipped at short, wide viewports — a queue-position label sat on top of the countdown.",
    response: "Two independent root causes in the same screen: a flexbox container computing negative free space once content overflowed, and a CSS Grid cell whose implicit row sizing overflowed its parent independently of the flexbox fix.",
    feedback: "Both were fixed separately; overflow is now reachable by scroll instead of silently clipped.",
    why: "One plausible-looking fix (the flexbox change) didn't actually solve it — the second root cause needed its own pass, which is the normal shape of a real bug, not a clean one-line patch.",
  },
];

export function FailureStatesTable() {
  return (
    <div className="flex flex-col gap-6">
      {CASES.map((c) => (
        <div key={c.title} className="overflow-hidden rounded-xl border border-line-strong">
          <div className="border-b border-line-strong bg-surface-raised px-5 py-3">
            <span className="text-[13.5px] font-medium tracking-[-0.01em]">{c.title}</span>
          </div>
          <div className="flex flex-col gap-4 px-5 py-5">
            <div className="grid grid-cols-1 gap-4 tab:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num">EXPECTED</span>
                <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{c.expected}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num">FAILURE</span>
                <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{c.failure}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-line-soft pt-4">
              <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num">SYSTEM RESPONSE / ROOT CAUSE</span>
              <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{c.response}</p>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-line-soft pt-4">
              <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num">OPERATOR-FACING FIX</span>
              <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{c.feedback}</p>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-line-soft pt-4">
              <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num">WHY IT MATTERS</span>
              <p className="m-0 text-[14px] leading-[1.6] text-ink-secondary text-pretty">{c.why}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
