import { Gamepad2, Eye, LucideIcon } from "lucide-react";

const AUDIENCES: { icon: LucideIcon; name: string; distance: string; body: string }[] = [
  {
    icon: Gamepad2,
    name: "Operators",
    distance: "18–24in, or one-handed on a phone",
    body: "The person actually running the show — laptop at the console or a phone backstage. Task-focused, trained on the tool, back in it repeatedly across a multi-day event.",
  },
  {
    icon: Eye,
    name: "Everyone else in the venue",
    distance: "5–15ft, glancing, never touching it",
    body: "Performers, AV crew, presenters, attendees — reading a TV or a confidence monitor from across a room. Reached by a no-login link, not an account.",
  },
];

export function AudienceSplit() {
  return (
    <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-2">
      {AUDIENCES.map(({ icon: Icon, name, distance, body }) => (
        <div key={name} className="flex flex-col gap-3 rounded-xl border border-line-strong px-5 py-5">
          <Icon size={18} strokeWidth={2} className="text-ink-faint" />
          <span className="text-[15px] font-medium tracking-[-0.01em]">{name}</span>
          <span className="text-[12px] font-semibold tracking-[0.08em] text-ink-num">{distance}</span>
          <p className="m-0 text-[14.5px] leading-[1.6] text-ink-faint text-pretty">{body}</p>
        </div>
      ))}
    </div>
  );
}
