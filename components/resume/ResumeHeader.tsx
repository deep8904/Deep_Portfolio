import { MapPin, Mail, Phone, ExternalLink, Download } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Cta } from "@/components/ui/Cta";
import { SITE } from "@/lib/data";

const contactLinkClass = "inline-flex items-center gap-1.5 text-[13.5px] text-ink-tertiary";

export function ResumeHeader() {
  return (
    <div className="flex max-w-[720px] flex-col items-start gap-3.5">
      <SectionLabel>Resume</SectionLabel>
      <h1 className="m-0 text-h1 font-medium tracking-[-0.03em]">
        Deepkumar Chadamiya
      </h1>
      <p className="m-0 text-[15.5px] text-ink-secondary">
        Product Designer · Design Engineer · Front-End Developer
      </p>

      <div className="mt-0.5 flex flex-wrap items-center gap-4">
        <span className={contactLinkClass}>
          <MapPin size={14} strokeWidth={1.8} className="flex-none" />
          Tempe, AZ
        </span>
        <a href={`mailto:${SITE.email}`} className={contactLinkClass}>
          <Mail size={14} strokeWidth={1.8} className="flex-none" />
          {SITE.email}
        </a>
        <a href={`tel:${SITE.phone}`} className={contactLinkClass}>
          <Phone size={14} strokeWidth={1.8} className="flex-none" />
          {SITE.phoneDisplay}
        </a>
        <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Deep Chadamiya on LinkedIn (opens in a new tab)" className={contactLinkClass}>
          <ExternalLink size={14} strokeWidth={1.8} className="flex-none" />
          LinkedIn
        </a>
        <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="Deep Chadamiya on GitHub (opens in a new tab)" className={contactLinkClass}>
          <ExternalLink size={14} strokeWidth={1.8} className="flex-none" />
          GitHub
        </a>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-4">
        <Cta href="/resume/Deep-Chadamiya-Resume.pdf" download="Deep-Chadamiya-Resume.pdf" className="group">
          Download Resume{" "}
          <span className="inline-flex transition-transform duration-[240ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-y-0.5">
            <Download size={14} strokeWidth={1.8} />
          </span>
        </Cta>
        <span className="inline-flex items-center gap-2 text-[13px] text-ink-tertiary">
          <span className="h-1.5 w-1.5 rounded-full bg-ink" />
          Open to opportunities
        </span>
      </div>
    </div>
  );
}
