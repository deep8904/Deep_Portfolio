import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE, SOCIAL_LINKS } from "@/lib/data";

const description = "Get in touch with Deep Chadamiya, product designer and software engineer based in Tempe, AZ.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact · Deep Chadamiya", description, url: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="pt-[34px] pb-[78px] tab:pt-[46px] tab:pb-[118px]">
      <Container>
        <div className="flex flex-col items-start gap-4">
          <SectionLabel>Contact</SectionLabel>
          <h1 className="m-0 max-w-[16ch] text-h1 font-medium tracking-[-0.03em] text-balance">Let’s talk about what you’re building.</h1>
          <p className="m-0 max-w-[60ch] text-[15px] leading-[1.72] text-ink-secondary text-pretty">
            Whether it’s a role, a project, or just a question, send a note and it’ll land straight in my inbox.
          </p>
        </div>

        <div className="mt-11 grid grid-cols-1 items-start gap-[42px] desk:grid-cols-[1fr_0.62fr] desk:gap-16 tab:mt-14">
          <ContactForm />

          <div className="flex flex-col gap-9 border-t border-line-soft pt-9 desk:border-t-0 desk:border-l desk:pt-0 desk:pl-16">
            <div className="flex flex-col gap-3">
              <span className="inline-flex w-fit items-center gap-[7px] text-[12.5px] text-ink-tertiary">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-ink" />
                Open to opportunities
              </span>
              <span className="text-[13px] text-ink-faint">{SITE.locationLong}</span>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">DIRECT</span>
              <a
                href={`mailto:${SITE.email}`}
                className="group -my-1 inline-flex w-fit items-center gap-1.5 py-1 text-[15px] font-medium text-ink transition-colors duration-200 hover:text-ink-secondary"
              >
                {SITE.email}
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="text-ink-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={`tel:${SITE.phone}`}
                className="-my-1 inline-flex w-fit items-center py-1 text-[15px] font-medium text-ink transition-colors duration-200 hover:text-ink-secondary"
              >
                {SITE.phoneDisplay}
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[12px] font-semibold tracking-[0.1em] text-ink-num">ELSEWHERE</span>
              <div className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="group -my-1 inline-flex w-fit items-center gap-1.5 py-1 text-[14.5px] text-ink-secondary transition-colors duration-200 hover:text-ink"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={13}
                      strokeWidth={2}
                      className="text-ink-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
