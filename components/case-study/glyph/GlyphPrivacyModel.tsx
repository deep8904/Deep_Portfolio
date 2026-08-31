import { UserCheck, UserX, EyeOff, Globe2, LucideIcon } from "lucide-react";

const ROWS: { icon: LucideIcon; who: string; result: string }[] = [
  { icon: UserCheck, who: "Owner", result: "Full read and edit access to their private project." },
  { icon: UserX, who: "Other signed-in developer", result: "No access — the route behaves exactly as it does for a stranger." },
  { icon: EyeOff, who: "Anonymous visitor", result: "A non-disclosing 404. The response does not confirm the project exists." },
  { icon: Globe2, who: "Anyone, for a public project", result: "Readable through Discover, the profile, and the direct URL." },
];

export function GlyphPrivacyModel() {
  return (
    <div className="flex flex-col gap-3.5">
      {ROWS.map((r) => (
        <div key={r.who} className="flex items-start gap-4 rounded-xl border border-line-soft px-5 py-4">
          <r.icon size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-ink-faint" />
          <div className="flex flex-col gap-1">
            <span className="text-[14px] font-medium tracking-[-0.01em]">{r.who}</span>
            <span className="text-[14px] leading-[1.55] text-ink-faint text-pretty">{r.result}</span>
          </div>
        </div>
      ))}
      <p className="m-0 mt-1 text-[13px] leading-[1.6] text-ink-faint text-pretty">
        Verified directly: signed in as the owner and as a second account against the same private project URL,
        plus an anonymous request to that URL. Live RLS negative-testing against the full policy set is still an
        active-development item, not claimed as exhaustively proven.
      </p>
    </div>
  );
}
