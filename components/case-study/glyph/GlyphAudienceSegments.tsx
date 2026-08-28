import { User, GraduationCap, Users, TestTube2, CalendarHeart, LucideIcon } from "lucide-react";

const SEGMENTS: { icon: LucideIcon; name: string; body: string }[] = [
  { icon: User, name: "Solo indie developers", body: "Building alone, need somewhere credible for a build in progress before a store page exists." },
  { icon: GraduationCap, name: "Students & hobbyists", body: "Thesis projects and nights-and-weekends builds — engine and identity fields both assume this is common, not the exception." },
  { icon: Users, name: "Small teams & jam groups", body: "A project can be seeking testers and collaborators at once; ownership stays with one account." },
  { icon: TestTube2, name: "Testers & playtesters", body: "Sign up for a structured request, leave a rating and written feedback tied to that specific build." },
  { icon: CalendarHeart, name: "Local organizers", body: "Run recurring in-person or online meetups — the events table exists because of this role specifically." },
];

export function GlyphAudienceSegments() {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="grid grid-cols-1 gap-3.5 tab:grid-cols-2 desk:grid-cols-3">
        {SEGMENTS.map(({ icon: Icon, name, body }) => (
          <div key={name} className="flex flex-col gap-3 rounded-xl border border-line-soft px-5 py-5">
            <Icon size={17} strokeWidth={2} className="text-ink-faint" />
            <span className="text-[14.5px] font-medium tracking-[-0.01em]">{name}</span>
            <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{body}</p>
          </div>
        ))}
      </div>
      <p className="m-0 text-[13px] leading-[1.6] text-ink-faint text-pretty">
        These are audience segments drawn from the product’s own planning documents, not personas built from
        interviews — no direct user research was conducted for Glyph.
      </p>
    </div>
  );
}
