import { UserCircle2, Gamepad2, ScrollText, TestTube2, MessageSquare, Users2, CalendarDays, Compass, LucideIcon } from "lucide-react";

const MODULES: { icon: LucideIcon; name: string; body: string }[] = [
  { icon: UserCircle2, name: "Developer Profile", body: "Identity, engines, skills, availability — the account every other record belongs to." },
  { icon: Gamepad2, name: "Projects", body: "Private by default; genre, engine, and stage tracked per project, visibility flipped deliberately." },
  { icon: ScrollText, name: "Devlogs", body: "Dated build notes attached to a project, each independently public/unlisted/private." },
  { icon: TestTube2, name: "Playtests", body: "A structured request — platforms, focus areas, capacity — with its own signup and feedback tables." },
  { icon: MessageSquare, name: "Reactions & Comments", body: "Split per target type (devlog vs. project) rather than one polymorphic table." },
  { icon: Users2, name: "Collaboration", body: "Open-role posts scoped to a project, with commitment and compensation stated upfront." },
  { icon: CalendarDays, name: "Events", body: "Local or online meetups, RSVP'd via a join table, organized by a real profile." },
  { icon: Compass, name: "Discover & Feed", body: "Public-work browsing and a devlog feed, both reading the same visibility-checked rows." },
];

export function GlyphSystemMap() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex w-full max-w-[360px] flex-col items-center gap-2 rounded-2xl border border-line-strong bg-surface px-6 py-6 text-center">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">ONE DATABASE, RLS-ENFORCED</span>
        <span className="text-[19px] font-medium tracking-[-0.02em]">Glyph</span>
        <span className="text-[15px] leading-[1.6] text-ink-faint">
          19 tables, row-level security on every one — a developer’s private work stays private at the database
          layer, not just in the UI.
        </span>
      </div>

      <div className="relative w-full max-w-[960px]">
        <div className="hidden h-6 border-l border-line-strong tab:mx-auto tab:block tab:w-px" />
        <div className="h-px w-full bg-line-strong" />
      </div>

      <div className="grid w-full max-w-[960px] grid-cols-2 gap-3.5 tab:grid-cols-4">
        {MODULES.map(({ icon: Icon, name, body }) => (
          <div key={name} className="flex flex-col gap-2.5 rounded-xl border border-line-soft px-4 py-4 tab:px-5 tab:py-5">
            <Icon size={17} strokeWidth={2} className="text-ink-faint" />
            <span className="text-[14px] font-medium tracking-[-0.01em]">{name}</span>
            <span className="text-[15px] leading-[1.55] text-ink-faint text-pretty">{body}</span>
          </div>
        ))}
      </div>

      <p className="m-0 max-w-[600px] text-center text-[15px] leading-[1.6] text-ink-faint text-pretty">
        Verified against the actual migration files and a running instance of the app — not the product-planning
        documents, which describe a slightly different table shape than what’s actually implemented.
      </p>
    </div>
  );
}
