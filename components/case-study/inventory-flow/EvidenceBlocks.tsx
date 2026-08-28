import { ExternalLink, Check, X } from "lucide-react";
import { EvidenceFigure } from "./EvidenceFigures";
import { RejectedSketch } from "./StaticPanels";
import {
  AUDIT_ROWS,
  EVIDENCE_TRACE,
  GUARDRAILS,
  SCENARIOS,
  REJECTED_CONCEPTS,
  WHAT_DID_NOT_CHANGE,
  KNOWN_RISKS,
  NEXT_TEST_TASKS,
  NEXT_TEST_METRICS,
  EVIDENCE_SCOPE,
} from "./data";

export function EvidenceScopeBlock() {
  return (
    <div className="grid grid-cols-1 gap-4 tab:grid-cols-2">
      <div className="rounded-xl border border-line-strong bg-surface p-5">
        <span className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.1em] text-ink-num">
          <Check size={13} strokeWidth={2.5} className="text-[#5b7a33]" /> EVIDENCE BASE
        </span>
        <ul className="m-0 mt-2.5 flex flex-col gap-1.5 pl-1 text-[13.5px] leading-[1.6] text-ink-secondary">
          {EVIDENCE_SCOPE.have.map((h) => (
            <li key={h} className="list-none">
              {h}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-dashed border-line-strong p-5">
        <span className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.1em] text-ink-num">
          <X size={13} strokeWidth={2.5} className="text-ink-faint" /> NOT YET COMPLETED
        </span>
        <ul className="m-0 mt-2.5 flex flex-col gap-1.5 pl-1 text-[13.5px] leading-[1.6] text-ink-secondary">
          {EVIDENCE_SCOPE.dontHave.map((h) => (
            <li key={h} className="list-none">
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function AuditTable() {
  return (
    <div className="flex flex-col gap-4">
      {AUDIT_ROWS.map((row) => (
        <div key={row.area} className="rounded-xl border border-line-strong bg-surface p-5 tab:p-6">
          <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-ink">{row.area}</span>
          <dl className="mt-3 grid grid-cols-1 gap-3 tab:grid-cols-2">
            {[
              ["Observation", row.observation],
              ["Friction", row.friction],
              ["Consequence", row.consequence],
              ["Opportunity", row.opportunity],
            ].map(([label, body]) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="text-[11px] font-semibold tracking-[0.1em] text-ink-num">{label.toUpperCase()}</dt>
                <dd className="m-0 text-[13.5px] leading-[1.6] text-ink-secondary text-pretty">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

export function EvidenceTraceTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-line-strong">
      <div className="grid grid-cols-1 gap-x-6 border-b border-line-strong bg-surface px-5 py-3 tab:grid-cols-[1fr_1fr_1fr]">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">EVIDENCE</span>
        <span className="hidden text-[12px] font-semibold tracking-[0.1em] text-ink-num tab:block">PRINCIPLE</span>
        <span className="hidden text-[12px] font-semibold tracking-[0.1em] text-ink-num tab:block">CONCEPT RESPONSE</span>
      </div>
      {EVIDENCE_TRACE.map((row) => (
        <div
          key={row.evidence}
          className="grid grid-cols-1 gap-3 border-t border-line-soft px-5 py-4 first:border-t-0 tab:grid-cols-[1fr_1fr_1fr] tab:gap-6 tab:py-5"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num tab:hidden">EVIDENCE</span>
            <span className="text-[14px] leading-[1.6] text-ink-secondary text-pretty">{row.evidence}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num tab:hidden">PRINCIPLE</span>
            <span className="text-[14px] leading-[1.6] text-ink-secondary text-pretty">{row.principle}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num tab:hidden">RESPONSE</span>
            <span className="text-[14px] leading-[1.6] text-ink text-pretty">{row.response}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function GuardrailsList() {
  return (
    <div className="grid grid-cols-1 gap-4 tab:grid-cols-2 desk:grid-cols-3">
      {GUARDRAILS.map((g) => (
        <div key={g.title} className="rounded-xl border border-line-strong bg-surface p-5">
          <span className="text-[13.5px] font-medium tracking-[-0.01em] text-ink">{g.title}</span>
          <p className="m-0 mt-1.5 text-[13.5px] leading-[1.6] text-ink-secondary text-pretty">{g.body}</p>
        </div>
      ))}
    </div>
  );
}

export function ScenarioCards() {
  return (
    <div className="grid grid-cols-1 gap-5 tab:grid-cols-3">
      {SCENARIOS.map((s) => (
        <div key={s.title} className="flex flex-col gap-3 rounded-xl border border-line-strong bg-surface p-5">
          <span className="inline-flex h-6 w-fit items-center rounded-md bg-connect px-2.5 text-[11px] font-medium tracking-[0.04em] text-ink-secondary">
            {s.tag.toUpperCase()}
          </span>
          <span className="text-[15px] font-medium tracking-[-0.01em] text-ink">{s.title}</span>
          <p className="m-0 text-[13px] leading-[1.6] text-ink-secondary text-pretty">{s.body}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {s.steps.map((step, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-accent-cream">{step}</span>
                {i < s.steps.length - 1 && <span className="text-ink-faint">→</span>}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function RejectedConcepts() {
  const sketches: Array<"extra-row" | "compartments" | "fullscreen" | "auto" | "toolbar"> = [
    "extra-row",
    "compartments",
    "fullscreen",
    "auto",
    "toolbar",
  ];
  return (
    <div className="grid grid-cols-1 gap-4 tab:grid-cols-2">
      {REJECTED_CONCEPTS.map((c, i) => (
        <div key={c.title} className="flex flex-col gap-3 rounded-xl border border-dashed border-line-strong p-5">
          <div className="h-16 w-full overflow-hidden rounded-lg bg-image-bg">
            <div className="flex h-full w-full items-center justify-center p-2">
              <RejectedSketch kind={sketches[i]} />
            </div>
          </div>
          <div>
            <span className="text-[13.5px] font-medium tracking-[-0.01em] text-ink line-through decoration-ink-faint/60">{c.title}</span>
            <p className="m-0 mt-1 text-[12.5px] leading-[1.55] text-ink-faint text-pretty">{c.body}</p>
          </div>
          <p className="m-0 text-[13px] leading-[1.6] text-ink-secondary text-pretty">
            <span className="font-medium text-ink">Rejected because — </span>
            {c.reason}
          </p>
        </div>
      ))}
    </div>
  );
}

export function WhatDidNotChangeList() {
  return (
    <ul className="m-0 grid grid-cols-1 gap-2.5 tab:grid-cols-2">
      {WHAT_DID_NOT_CHANGE.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[14px] leading-[1.6] text-ink-secondary text-pretty">
          <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ReviewAndNextTest() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">HEURISTIC REVIEW — KNOWN RISKS</span>
        {KNOWN_RISKS.map((r) => (
          <div key={r.title} className="border-l-2 border-line-strong pl-4">
            <span className="text-[13.5px] font-medium tracking-[-0.01em] text-ink">{r.title}</span>
            <p className="m-0 mt-1 text-[13.5px] leading-[1.6] text-ink-secondary text-pretty">{r.body}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 tab:grid-cols-2">
        <div className="rounded-xl border border-line-strong bg-surface p-5">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">NEXT TEST — TASKS</span>
          <p className="m-0 mt-2 text-[13px] leading-[1.6] text-ink-secondary text-pretty">5–7 players, mixed experience levels:</p>
          <ul className="m-0 mt-2 flex flex-col gap-1.5 pl-4 text-[13px] leading-[1.6] text-ink-secondary">
            {NEXT_TEST_TASKS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-line-strong bg-surface p-5">
          <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">WHAT WE&rsquo;D MEASURE</span>
          <ul className="m-0 mt-2 flex flex-col gap-1.5 pl-4 text-[13px] leading-[1.6] text-ink-secondary">
            {NEXT_TEST_METRICS.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

type RefBlock = { label: string; body: string };
type ReferenceStudy = {
  name: string;
  meta: string;
  href: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  blocks: [RefBlock, RefBlock, RefBlock, RefBlock];
};

const REFERENCE_STUDIES: ReferenceStudy[] = [
  {
    name: "Jay Han",
    meta: "Minecraft Inventory · student UX project",
    href: "https://jayhan.me/minecraft-inventory",
    image: "/work/inventory-flow/reference/jay-han/smart-select-active.png",
    imageAlt: "Jay Han's Smart Select mockup with several inventory stacks highlighted blue for a combined move",
    imageCaption: "Smart Select — several stacks highlighted together before a combined move.",
    blocks: [
      { label: "What he explored", body: "Smart Select (multi-stack selection) and Compartments — persistent, color-coded, later player-customizable storage zones with tooltips." },
      {
        label: "What testing exposed",
        body: "“Did not belong in Minecraft due to it being different to what it originally was,” and a second read that it “might be too complicated for an average player.”",
      },
      { label: "What I carried forward", body: "Multi-stack manipulation — selecting and moving several stacks as one action." },
      { label: "What I did differently", body: "Optional, contextual tools instead of a persistent compartment structure a player has to set up and maintain." },
    ],
  },
  {
    name: "Barbara Franco",
    meta: "Minecraft Inventory UI/UX Redesign · design challenge",
    href: "https://www.barbarafranco.design/post/minecraft-inventory-ui-ux-redesign-a-modern-approach",
    image: "/work/inventory-flow/reference/barbara-franco/final-concept.png",
    imageAlt: "Barbara Franco's final crafting redesign with green ready state and red missing state over a Minecraft gameplay background",
    imageCaption: "Her final crafting screen — ready/missing states, quantity control, explicit Craft action.",
    blocks: [
      { label: "What she protected", body: "The 2×2 crafting grid and Minecraft's overall visual familiarity." },
      { label: "What she improved", body: "Crafting hierarchy and feedback — ready/missing states, ingredient display, output clarity." },
      { label: "What I carried forward", body: "Preserve the core mental model — same grid, same Recipe Book, clearer feedback around them." },
      { label: "What I did differently", body: "Don't imply Recipe Book functionality is missing when vanilla Java Edition already supports search, tabs, and a craftable filter." },
    ],
  },
];

export function ReferenceStudyCards() {
  return (
    <div className="flex flex-col gap-8">
      {REFERENCE_STUDIES.map((s) => (
        <div key={s.name} className="flex flex-col gap-5">
          <EvidenceFigure
            src={s.image}
            alt={s.imageAlt}
            caption={s.imageCaption}
            tag="REFERENCE STUDY"
            tagKind="reference"
            credit={`${s.name} — ${s.meta}`}
            href={s.href}
          />
          <div className="grid grid-cols-1 gap-4 tab:grid-cols-4">
            {s.blocks.map((b) => (
              <div key={b.label}>
                <span className="text-[11px] font-semibold tracking-[0.1em] text-ink-num">{b.label.toUpperCase()}</span>
                <p className="m-0 mt-1 text-[13px] leading-[1.6] text-ink-secondary text-pretty">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

type CommunitySignal = { label: string; body: string; href: string };

const COMMUNITY_SIGNALS: CommunitySignal[] = [
  {
    label: "SECONDARY RESEARCH · Minecraft Feedback",
    body: "Multiple community threads request an inventory/chest auto-sort action and easier shulker-box content checks — recurring topics, not a single outlier post.",
    href: "https://feedback.minecraft.net/hc/en-us/community/posts/360032471532-Inventory-Clean-Up-Sorting",
  },
  {
    label: "SECONDARY RESEARCH · Minecraft Wiki",
    body: "The current Recipe Book (Java Edition) documents search, category tabs, a Show Craftable filter, and a red highlight on recipes missing materials — the accurate baseline this concept builds from.",
    href: "https://minecraft.wiki/w/Recipe_book",
  },
  {
    label: "QUALITATIVE FEEDBACK · Inventory-management mods",
    body: "Mods like Inventory Tweaks and Inventory Management add a dedicated sort trigger and buttons that stack/transfer only what's needed to fill existing stacks — an established convention this concept's Sort/Stack actions echo rather than invent.",
    href: "https://inventory-tweaks.readthedocs.io/",
  },
  {
    label: "OFFICIAL · Mojang, Bundles",
    body: "Mojang's own answer to mixed-item storage density is the Bundle — a single slot holding a stack's worth of mixed items — not additional inventory slots.",
    href: "https://minecraft.wiki/w/Bundle",
  },
];

export function CommunitySignalsList() {
  return (
    <div className="flex flex-col gap-3.5">
      {COMMUNITY_SIGNALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col gap-1.5 rounded-xl border border-line-strong bg-surface p-4 transition-colors duration-150 hover:border-ink-faint tab:flex-row tab:items-start tab:justify-between tab:gap-6 tab:p-5"
        >
          <span className="shrink-0 text-[11px] font-semibold tracking-[0.08em] text-ink-num tab:w-[230px]">{s.label}</span>
          <span className="flex-1 text-[13.5px] leading-[1.6] text-ink-secondary text-pretty">{s.body}</span>
          <ExternalLink size={13} strokeWidth={2} className="mt-0.5 shrink-0 text-ink-faint transition-colors duration-150 group-hover:text-ink-secondary" />
        </a>
      ))}
    </div>
  );
}
