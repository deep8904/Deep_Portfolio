import { Ticket, Wallet, Lock, MapPin, Layers, KeyRound, Fingerprint, type LucideIcon } from "lucide-react";

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Ticket, title: "Blockchain-based tickets", body: "Every ticket is generated and verified on-chain, with no centralized database of user identities behind it." },
  { icon: Wallet, title: "Wallet-native payments", body: "Attendees buy directly with cryptocurrency through crypto wallet integration, no custodial payment layer in between." },
  { icon: Lock, title: "One ticket, one wallet", body: "Each ticket is uniquely tied to a wallet address, enforcing one-ticket-per-wallet and blocking duplication or reuse." },
  { icon: MapPin, title: "Location-aware validation", body: "Tickets only activate near the actual event venue, so a valid ticket can't be used from somewhere else." },
  { icon: Layers, title: "Multiple ticket tiers", body: "Organizers can define several tiers with different access levels for the same event." },
  { icon: KeyRound, title: "Invite-only allowlists", body: "Private events are gated by blockchain-based allowlists instead of a shared link or code." },
  { icon: Fingerprint, title: "On-chain verification records", body: "Ticket usage is tracked on-chain for auditability, without exposing attendees' personal data." },
];

export function FeatureGrid() {
  return (
    <div className="grid gap-4 tab:grid-cols-2 desk:grid-cols-3">
      {FEATURES.map(({ icon: Icon, title, body }) => (
        <div key={title} className="flex flex-col gap-2.5 rounded-xl border border-line-soft px-4 py-4 tab:px-5 tab:py-5">
          <Icon size={17} strokeWidth={2} className="text-ink-faint" />
          <span className="text-[14px] font-medium tracking-[-0.01em]">{title}</span>
          <span className="text-[13.5px] leading-[1.55] text-ink-faint text-pretty">{body}</span>
        </div>
      ))}
    </div>
  );
}
