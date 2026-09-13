import type { Metadata } from "next";
import Image from "next/image";
import { Wallet, ScanLine, MapPin, ShieldCheck } from "lucide-react";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { CaseStudyDecision } from "@/components/case-study/CaseStudyDecision";
import { CaseStudyNavigation } from "@/components/case-study/CaseStudyNavigation";
import { ChapterNav } from "@/components/case-study/ChapterNav";
import { FlowDiagram, type FlowStep } from "@/components/case-study/FlowDiagram";
import { FeatureGrid } from "@/components/case-study/ticketify/FeatureGrid";

const description =
  "Ticketify: a decentralized event-ticketing app built at a hackathon. Wallet-tied tickets, location-aware validation, and on-chain verification, with no centralized store of user identities. Awarded first place for Most Secure Project.";

export const metadata: Metadata = {
  title: "Ticketify",
  description,
  alternates: { canonical: "/work/ticketify" },
  openGraph: { title: "Ticketify · Deep Chadamiya", description, url: "/work/ticketify" },
};

const CHAPTERS = [
  { id: "what", label: "What We Built" },
  { id: "how", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "why", label: "Why It Matters" },
  { id: "outcome", label: "Outcome" },
];

const HOW_IT_WORKS: FlowStep[] = [
  { icon: Wallet, label: "Connect a wallet", body: "An attendee connects a crypto wallet and pays for a ticket directly, no account or custodial payment step in between." },
  { icon: ScanLine, label: "Mint the ticket on-chain", body: "The ticket is generated on the blockchain and tied uniquely to that wallet address, enforcing one ticket per wallet from the start." },
  { icon: MapPin, label: "Validate at the venue", body: "The ticket only activates once it's near the actual event location, so it can't be verified or reused from anywhere else." },
  { icon: ShieldCheck, label: "Record entry on-chain", body: "Usage is written to an on-chain verification record, so entry can be audited later without exposing anyone's personal data." },
];

export default function TicketifyCaseStudy() {
  return (
    <>
      <CaseStudyHero
        eyebrow="HACKATHON PROJECT"
        title="Ticketify"
        statement="A decentralized web app that rethinks how event tickets are created, sold, and verified using blockchain technology: no centralized store of user data, and stronger fraud prevention and access control for organizers and attendees alike."
        meta={[
          { label: "ROLE", value: "Full-stack & smart contract development" },
          { label: "STATUS", value: "Hackathon project, built Mar 2022, 1st place for Most Secure Project" },
        ]}
      >
        <div className="mt-9 flex justify-center tab:mt-11">
          <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-line-strong shadow-[0_30px_70px_-24px_rgba(20,16,12,0.35)]">
            <Image
              src="/work/selected/ticketify-icon.jpg"
              alt="The Ticketify app icon on an iPhone home screen, next to Calendar, Mail, and Notes"
              width={4000}
              height={2668}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
        <p className="mt-3 text-center text-[12.5px] text-ink-faint">The Ticketify app icon, an iOS mockup, not a live App Store listing.</p>
      </CaseStudyHero>

      <ChapterNav chapters={CHAPTERS} />

      <CaseStudySection
        id="what"
        num="01"
        eyebrow="What We Built"
        title="Tickets that belong to a wallet, not a database."
        intro="Ticketify lets organizers host public or invite-only events on the blockchain, while attendees buy tickets with cryptocurrency. Each ticket is uniquely tied to a wallet address, which makes resale abuse, duplication, and unauthorized reuse extremely difficult, without a central store of user identities behind any of it."
      />

      <CaseStudySection
        id="how"
        num="02"
        eyebrow="How It Works"
        title="From wallet to verified entry."
        intro="The same four steps run under every ticket, whether the event is public or invite-only."
      >
        <FlowDiagram steps={HOW_IT_WORKS} />
      </CaseStudySection>

      <CaseStudySection
        id="features"
        num="03"
        eyebrow="Features"
        title="Seven decisions, all pointed at the same problem."
        intro="Every feature below exists to close a specific gap in how traditional ticketing platforms handle identity, access, and fraud."
      >
        <FeatureGrid />
      </CaseStudySection>

      <CaseStudySection
        id="why"
        num="04"
        eyebrow="Why It Matters"
        title="Centralized ticketing was the actual vulnerability."
        intro="Traditional ticketing platforms rely heavily on centralized systems that store sensitive user data and stay prone to fraud and ticket misuse. Ticketify demonstrates how a decentralized architecture can improve privacy, transparency, and security while still delivering a practical, usable experience, not just a proof of concept."
      />

      <CaseStudySection
        id="outcome"
        num="05"
        eyebrow="Outcome"
        title="First place, Most Secure Project."
        contentClassName="flex flex-col gap-6"
      >
        <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
          Ticketify was awarded first place for Most Secure Project at the hackathon, recognized for its security
          design, privacy-first architecture, and real-world applicability. Built together with{" "}
          <a
            href="https://www.linkedin.com/in/nishchit/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
          >
            Nishchit Malasana
          </a>
          , it reflects an interest in building secure, scalable systems and using emerging technology to solve real
          problems, not just as concepts, but as working products.
        </p>
        <CaseStudyDecision label="Skills applied">
          Blockchain application development, and Web3 security and privacy design.
        </CaseStudyDecision>
      </CaseStudySection>

      <CaseStudyNavigation nextSlug="loose-thread" nextTitle="AI Content Machine + Loose Thread" />
    </>
  );
}
