import { HandHeart, Users, HeartHandshake, Eye, LucideIcon } from "lucide-react";

const SEGMENTS: { icon: LucideIcon; name: string; body: string }[] = [
  { icon: HandHeart, name: "Prospective adopters", body: "Want to see which horses are currently available and read a real history before reaching out." },
  { icon: Users, name: "Donors & supporters", body: "Want to understand what a gift actually funds before deciding how much to give." },
  { icon: HeartHandshake, name: "Volunteers", body: "Want a clear next step — what's needed, what it involves, how to sign up." },
  { icon: Eye, name: "General visitors", body: "Arrive with a broad interest in the organization and need the site to orient them quickly." },
];

export function CareAudienceSegments() {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-2 desk:grid-cols-4">
        {SEGMENTS.map(({ icon: Icon, name, body }) => (
          <div key={name} className="flex flex-col gap-3 rounded-xl border border-line-soft px-5 py-5">
            <Icon size={17} strokeWidth={2} className="text-ink-faint" />
            <span className="text-[14.5px] font-medium tracking-[-0.01em]">{name}</span>
            <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{body}</p>
          </div>
        ))}
      </div>
      <p className="m-0 text-[13px] leading-[1.6] text-ink-faint text-pretty">
        These are audience segments drawn from the survey and the site’s own stated purpose — not personas built
        from individual interviews.
      </p>
    </div>
  );
}
