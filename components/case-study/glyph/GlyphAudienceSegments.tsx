import { HandHeart, GraduationCap, TestTube2, Users, CalendarHeart, LucideIcon } from "lucide-react";

const SEGMENTS: { icon: LucideIcon; name: string; job: string }[] = [
  { icon: HandHeart, name: "Solo / small-team developer", job: "Give unfinished work a credible, controllable public identity." },
  { icon: GraduationCap, name: "Student / hobbyist", job: "Accumulate a portfolio of progress before a finished release." },
  { icon: CalendarHeart, name: "Playtest organizer", job: "State what needs testing, for how long, and with what capacity." },
  { icon: TestTube2, name: "Playtester", job: "Find an eligible test and give feedback that stays attached to it." },
  { icon: Users, name: "Potential collaborator", job: "Understand the project, role, scope, and commitment before joining." },
];

export function GlyphAudienceSegments() {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-2 desk:grid-cols-3">
        {SEGMENTS.map(({ icon: Icon, name, job }) => (
          <div key={name} className="flex flex-col gap-3 rounded-xl border border-line-soft px-5 py-5">
            <Icon size={17} strokeWidth={2} className="text-ink-faint" />
            <span className="text-[14.5px] font-medium tracking-[-0.01em]">{name}</span>
            <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{job}</p>
          </div>
        ))}
      </div>
      <p className="m-0 text-[13px] leading-[1.6] text-ink-faint text-pretty">
        Drawn from the product’s own brief and scope documents — not from interviews. There is no direct user
        research in the current source.
      </p>
    </div>
  );
}
