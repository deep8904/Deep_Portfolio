import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyDecision } from "@/components/case-study/CaseStudyDecision";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { PhaseDivider } from "@/components/case-study/PhaseDivider";
import { ChapterNav } from "@/components/case-study/ChapterNav";
import { InventoryFlowPrototype } from "@/components/case-study/inventory-flow/InventoryFlowPrototype";
import { HeroConceptPreview, HeroCraftingPreview, VanillaBaselineRecreation } from "@/components/case-study/inventory-flow/StaticPanels";
import { StateGallery } from "@/components/case-study/inventory-flow/StateGallery";
import {
  EvidenceScopeBlock,
  AuditTable,
  EvidenceTraceTable,
  GuardrailsList,
  ScenarioCards,
  RejectedConcepts,
  WhatDidNotChangeList,
  ReviewAndNextTest,
  ReferenceStudyCards,
  CommunitySignalsList,
} from "@/components/case-study/inventory-flow/EvidenceBlocks";

const description =
  "An unofficial Minecraft inventory & crafting UX concept. Independent study — keeps the grid, hotbar, and 2×2 crafting model unchanged, and focuses on the repeated work of selecting, moving, sorting, and reading crafting state.";

export const metadata: Metadata = {
  title: "Inventory Flow",
  description,
  alternates: { canonical: "/work/inventory-flow" },
  openGraph: { title: "Inventory Flow — Deep Chadamiya", description, url: "/work/inventory-flow" },
};

const CHAPTERS = [
  { id: "baseline", label: "Current Experience" },
  { id: "research", label: "Design Studies" },
  { id: "synthesis", label: "Synthesis" },
  { id: "guardrails", label: "Guardrails" },
  { id: "system", label: "The System" },
  { id: "prototype", label: "Try It" },
  { id: "states", label: "States" },
  { id: "reflection", label: "Reflection" },
];

export default function InventoryFlowCaseStudy() {
  return (
    <>
      {/* HERO — big project title, thesis, then the original Inventory Flow
          UI itself (Chest mode large, Personal Inventory/Crafting small) so
          the reader sees the actual design before reading a paragraph. No
          external photography — the interface is the hero. */}
      <section className="pt-[34px] tab:pt-[46px]">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-4">
              <SectionLabel>Independent Minecraft UX Concept</SectionLabel>
              <h1 className="m-0 text-[52px] font-semibold leading-[0.98] tracking-[-0.035em] tab:text-[84px] desk:text-[104px]">
                Inventory Flow
              </h1>
              <p className="m-0 max-w-[620px] text-[17px] leading-[1.65] text-ink-secondary text-pretty tab:text-[19px]">
                Reducing inventory admin without redesigning Minecraft out of Minecraft.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line-soft pt-6 tab:mt-10 tab:grid-cols-4 tab:pt-7">
              {[
                { label: "ROLE", value: "Game UX/UI concept design" },
                { label: "PLATFORM", value: "Java Edition · Desktop" },
                { label: "SCOPE", value: "Independent concept study" },
                { label: "STATUS", value: "Unofficial · not Mojang-affiliated" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">{item.label}</span>
                  <span className="text-[14px] leading-[1.4] text-ink-secondary">{item.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <div className="pt-9 tab:pt-12">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-3 tab:grid-cols-[1.6fr_1fr]">
              <HeroConceptPreview />
              <HeroCraftingPreview />
            </div>
            <p className="m-0 mt-3 text-[12px] text-ink-faint">
              Chest mode (left) and Personal Inventory / Crafting mode (right) — the original Inventory Flow UI,
              built for this case study. Not an official Minecraft product. Not approved by or associated with
              Mojang or Microsoft.
            </p>
          </Reveal>
        </Container>
      </div>

      <ChapterNav chapters={CHAPTERS} />

      <CaseStudySection
        eyebrow="Evidence & Scope"
        title="What this case study is built on."
        intro="Stated once, up front, so the rest of the page can move without repeating itself."
      >
        <EvidenceScopeBlock />
      </CaseStudySection>

      <CaseStudySection
        id="baseline"
        eyebrow="Current Experience"
        title="What vanilla Minecraft already handles well — and where it doesn't."
        intro="The panel below is a recreation of vanilla structure, not a screenshot — built from this case study's own Minecraft UI system, cross-checked against Minecraft's documented slot counts and layout. Shift+click and shift+double-click already exist; the Recipe Book already has search, category tabs, and a craftable filter. The audit below is scoped to what's genuinely still friction."
        contentClassName="flex flex-col gap-8"
      >
        <VanillaBaselineRecreation />
        <AuditTable />
      </CaseStudySection>

      <PhaseDivider label="Research" />

      <CaseStudySection
        id="research"
        eyebrow="Two Design Studies"
        title="Reading two other designers' takes on the same system."
        intro="Research evidence, not source material — their layouts, colors, and component compositions aren't reused anywhere in this concept."
      >
        <ReferenceStudyCards />
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Community & Official Signals"
        title="What players ask for, and what Mojang has already shipped."
        intro="Forum activity is a directional signal, not survey data. Mojang's own shipped features and public design writeups are read as evidence of real product constraints, not a process this study claims to have followed."
      >
        <CommunitySignalsList />
      </CaseStudySection>

      <CaseStudySection
        id="synthesis"
        eyebrow="Research Synthesis"
        title="From evidence to a concept response."
      >
        <EvidenceTraceTable />
      </CaseStudySection>

      <PhaseDivider label="Define" />

      <CaseStudySection
        id="guardrails"
        eyebrow="Design Guardrails"
        title="What this concept won't touch."
      >
        <GuardrailsList />
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Task Scenarios & Explorations"
        title="Three situations — and what got tried and set aside."
        intro="No primary user research was run for this project, so the scenarios below are design scenarios, not claims about real players' behavior."
        contentClassName="flex flex-col gap-10"
      >
        <ScenarioCards />
        <RejectedConcepts />
      </CaseStudySection>

      <PhaseDivider label="Design" />

      <CaseStudySection
        id="system"
        eyebrow="Inventory Flow System"
        title="One familiar inventory. Three faster workflows."
        intro="Smart Select for moving several stacks as one action, Quick Organize for one-shot sorting and matching, and Crafting Clarity for reading owned-vs-required at a glance — layered onto the existing grid, never replacing it."
        contentClassName="flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 gap-4 tab:grid-cols-3">
          <div className="rounded-xl border border-line-strong bg-surface p-5">
            <span className="text-[13.5px] font-medium text-ink">01 · Smart Select</span>
            <p className="m-0 mt-1.5 text-[13.5px] leading-[1.6] text-ink-secondary text-pretty">
              Select several different stacks, see combined quantity, then Move, Drop, or Cancel as one action.
            </p>
          </div>
          <div className="rounded-xl border border-line-strong bg-surface p-5">
            <span className="text-[13.5px] font-medium text-ink">02 · Quick Organize</span>
            <p className="m-0 mt-1.5 text-[13.5px] leading-[1.6] text-ink-secondary text-pretty">
              Sort, Stack, Deposit Matching, Take Matching — compact and secondary to the inventory, with Hotbar Protection on by default.
            </p>
          </div>
          <div className="rounded-xl border border-line-strong bg-surface p-5">
            <span className="text-[13.5px] font-medium text-ink">03 · Crafting Clarity</span>
            <p className="m-0 mt-1.5 text-[13.5px] leading-[1.6] text-ink-secondary text-pretty">
              The same 2×2 grid and Recipe Book, with owned-vs-required stated as numbers next to the grid.
            </p>
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="prototype"
        eyebrow="Interactive Prototype — Try It"
        title="Click through the system itself."
        intro="Deterministic demo data, no network, no persistence. Switch between Chest and Personal Inventory to see each context's tools — Smart Select and matching live in the chest; crafting lives in the personal inventory. Reset Demo returns everything to its starting state."
      >
        <InventoryFlowPrototype />
      </CaseStudySection>

      <CaseStudySection id="states" eyebrow="Details / States" title="The states that carry the interaction.">
        <StateGallery />
      </CaseStudySection>

      <CaseStudySection eyebrow="What I Did Not Change" title="The list that keeps this Minecraft.">
        <WhatDidNotChangeList />
      </CaseStudySection>

      <PhaseDivider label="Validate" />

      <CaseStudySection
        eyebrow="Review & Next Test"
        title="A heuristic review, and a concrete plan for a real one."
        intro="No primary usability testing has been run on this concept — what follows is a design critique and a future test plan, not results that don't exist."
      >
        <ReviewAndNextTest />
      </CaseStudySection>

      <CaseStudySection
        id="reflection"
        eyebrow="Reflection"
        title="Preserving familiarity was the harder design problem."
        contentClassName="flex flex-col gap-4"
      >
        <CaseStudyDecision label="On familiarity">
          Adding a new tool is easy to justify. Proving a new tool doesn&rsquo;t quietly change what a system feels
          like — the exact risk Jay Han&rsquo;s own testing surfaced — took more restraint than the tools themselves
          did.
        </CaseStudyDecision>
        <CaseStudyDecision label="On capacity">
          Reducing friction doesn&rsquo;t require adding space. Every guardrail here exists because it&rsquo;s easier
          to solve &ldquo;this feels like work&rdquo; by giving the player more room than by making the room they
          already have easier to use.
        </CaseStudyDecision>
        <CaseStudyDecision label="On scope">
          Advanced tools had to work as something a player can fully ignore, or this concept would repeat the exact
          complexity concern raised against Jay Han&rsquo;s compartments.
        </CaseStudyDecision>
      </CaseStudySection>

      <CaseStudyNavigation nextSlug="glyph" nextTitle="Glyph" />
    </>
  );
}
