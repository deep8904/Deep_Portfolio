import { CaseStudyStatus, CaseStudyStatusKind } from "@/components/case-study/CaseStudyStatus";

type Column = { kind: CaseStudyStatusKind; heading: string; items: string[] };

const COLUMNS: Column[] = [
  {
    kind: "working",
    heading: "Working",
    items: [
      "Waitlist landing page — live, screenshot-verified",
      "Auth — GitHub / Google OAuth, magic link, and 6-digit OTP",
      "Onboarding — a 4-step developer-profile wizard",
      "Public developer profile page",
    ],
  },
  {
    kind: "planned",
    heading: "Planned",
    items: [
      "Project pages",
      "Devlogs",
      "Structured playtesting requests & feedback",
      "Events / RSVP",
      "Collaboration board",
      "Community feed",
      "Avatar upload, full-text search",
    ],
  },
];

export function GlyphStatusMatrix() {
  return (
    <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-2">
      {COLUMNS.map((col) => (
        <div key={col.heading} className="flex flex-col gap-4 rounded-xl border border-line-soft px-5 py-5 tab:px-5">
          <CaseStudyStatus kind={col.kind} label={col.heading} />
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {col.items.map((item) => (
              <li key={item} className="text-[15px] leading-[1.55] text-ink-faint text-pretty">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
