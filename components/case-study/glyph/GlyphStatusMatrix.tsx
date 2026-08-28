import { CheckCircle2, GitBranch, CircleDashed, Clock, LucideIcon } from "lucide-react";
import clsx from "clsx";

type Tier = "verified" | "implemented" | "partial" | "planned";

const TIER_CONFIG: Record<Tier, { label: string; icon: LucideIcon; className: string }> = {
  verified: { label: "Verified in Local Build", icon: CheckCircle2, className: "border-line-strong text-ink-secondary" },
  implemented: { label: "Implemented in Current Source", icon: GitBranch, className: "border-line-strong text-ink-secondary" },
  partial: { label: "Partial", icon: CircleDashed, className: "border-dashed border-line-strong text-ink-secondary" },
  planned: { label: "Product Direction", icon: Clock, className: "border-dashed border-line-soft text-ink-faint" },
};

const ROWS: { name: string; tier: Tier; note: string }[] = [
  {
    name: "Auth, developer profiles, onboarding",
    tier: "verified",
    note: "Signed in and captured screenshots against a real (temporary) Supabase project seeded with fictional demo accounts.",
  },
  {
    name: "Projects — private by default, visibility control",
    tier: "verified",
    note: "Confirmed a private project stays owner-only while a public one appears in Discover, against real RLS policies.",
  },
  {
    name: "Devlogs, reactions, comments, follow feed",
    tier: "verified",
    note: "Found and fixed a real PostgREST embed-ambiguity bug in the feed query during this pass — documented below.",
  },
  {
    name: "Structured playtests — requests, signups, feedback",
    tier: "verified",
    note: "Created a real playtest request, signed up a second demo account, and left rated feedback end-to-end.",
  },
  {
    name: "Collaboration board, local/online events",
    tier: "verified",
    note: "Both render real seeded rows through their own RLS-gated read policies, not a stubbed list.",
  },
  {
    name: "Discover & public-work browsing",
    tier: "verified",
    note: "Shows an honest empty state when Supabase isn't configured, and real public projects once it is — same code path either way.",
  },
  {
    name: "GitHub OAuth sign-in",
    tier: "implemented",
    note: "Present in the auth route and UI; this pass verified email/password sign-in only, not the OAuth round-trip.",
  },
  {
    name: "Notifications table",
    tier: "partial",
    note: "Schema and RLS exist; no dedicated notifications UI route was found in the current source.",
  },
  {
    name: "Public deployment of the current build",
    tier: "planned",
    note: "The only public GitHub history for this repo name is an earlier, unrelated waitlist-page lineage — the substantial build documented here exists only in local source today.",
  },
];

export function GlyphStatusMatrix() {
  return (
    <div className="flex flex-col gap-3.5">
      {ROWS.map((row) => {
        const cfg = TIER_CONFIG[row.tier];
        return (
          <div key={row.name} className="flex flex-col gap-2 rounded-xl border border-line-soft px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <span className="text-[13.5px] font-medium tracking-[-0.01em]">{row.name}</span>
              <span
                className={clsx(
                  "inline-flex h-[24px] shrink-0 items-center gap-[6px] rounded-md border px-2.5 text-[11.5px] font-medium tracking-[0.02em]",
                  cfg.className
                )}
              >
                <cfg.icon size={11} strokeWidth={2.25} />
                {cfg.label}
              </span>
            </div>
            <p className="m-0 text-[14px] leading-[1.6] text-ink-faint text-pretty">{row.note}</p>
          </div>
        );
      })}
    </div>
  );
}
