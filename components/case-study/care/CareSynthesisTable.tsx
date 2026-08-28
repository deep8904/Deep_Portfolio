const ROWS = [
  {
    evidence: "14 / 39 requested clearer donation impact",
    problem: "Visitors weren't confident about what their support actually funds.",
    priority: "Make impact legible at the point of giving, not buried in a paragraph.",
    response: "The redesigned Donate flow states exactly what each giving option covers (Care Fund, Sponsor a Horse, Sponsor a Clinic) in one line next to the action itself.",
  },
  {
    evidence: "12 / 39 requested an events calendar",
    problem: "There was no way to see what was actually happening, or when.",
    priority: "Give events a real, structured page instead of one static paragraph.",
    response: "Stories & Events now has a dedicated Events & Clinics view with season, location, fee, and what-to-bring laid out as scannable fields.",
  },
  {
    evidence: "11 / 39 requested adoption stories with photos",
    problem: "The organization's actual impact — horses helped — wasn't visible anywhere.",
    priority: "Surface real horse stories and outcomes as a first-class part of the site.",
    response: "Our Horses now lists all current residents with photos and status, plus Adopted and In Memory tabs; Home features a horse's story directly.",
  },
  {
    evidence: "11 / 39 requested clearer volunteer sign-up",
    problem: "Volunteering and donating were mixed into one undifferentiated contact form.",
    priority: "Separate volunteer, visit, and adoption paths into distinct, labeled steps.",
    response: "Get Involved splits Volunteer, Plan a Visit, and Adoption & Rehoming into distinct sections, each with its own inquiry action.",
  },
  {
    evidence: "9 / 39 requested an FAQ",
    problem: "Common questions (visiting, sponsorship, what's needed) weren't answered anywhere.",
    priority: "Answer practical questions at the point where they naturally come up.",
    response: "Organization details, visiting policy, and giving specifics are now stated directly on About and Get Involved rather than left to a form.",
  },
];

export function CareSynthesisTable() {
  return (
    <div className="flex flex-col gap-4">
      {ROWS.map((row) => (
        <div key={row.evidence} className="rounded-xl border border-line-strong px-5 py-5">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">{row.evidence}</span>
          <div className="mt-3 grid grid-cols-1 gap-3 tab:grid-cols-3 tab:gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold tracking-[0.08em] text-ink-faint">UX PROBLEM</span>
              <span className="text-[14px] leading-[1.55] text-ink-secondary text-pretty">{row.problem}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold tracking-[0.08em] text-ink-faint">DESIGN PRIORITY</span>
              <span className="text-[14px] leading-[1.55] text-ink-secondary text-pretty">{row.priority}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold tracking-[0.08em] text-ink-faint">REDESIGN RESPONSE</span>
              <span className="text-[14px] leading-[1.55] text-ink text-pretty">{row.response}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
