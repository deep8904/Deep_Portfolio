import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VisualsExperience } from "@/components/visuals/VisualsExperience";

const description = "Photography exploring light, composition, people, places, and moments.";

export const metadata: Metadata = {
  title: "Visuals",
  description,
  alternates: { canonical: "/visuals" },
  openGraph: { title: "Visuals — Deep Chadamiya", description, url: "/visuals" },
};

export default function VisualsPage() {
  return (
    <>
      <section className="pt-[34px] tab:pt-[46px]">
        <Container>
          <div className="flex max-w-[680px] flex-col items-start gap-4">
            <SectionLabel>Visuals</SectionLabel>
            <h1 className="m-0 text-h1 font-medium tracking-[-0.03em]">
              Stories through light and moments.
            </h1>
            <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
              Photography is another way I explore light, composition, people, places, and the small moments that
              make a scene worth remembering.
            </p>
            <span className="text-[11px] font-medium tracking-[0.09em] text-ink-faint">
              PHOTOGRAPHY · PEOPLE · PLACES · MOMENTS
            </span>
          </div>
        </Container>
      </section>

      <Section>
        <VisualsExperience />
      </Section>
    </>
  );
}
