import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AboutPortrait } from "@/components/about/AboutPortrait";
import { Capabilities } from "@/components/about/Capabilities";
import { Journey } from "@/components/about/Journey";
import { Interests } from "@/components/about/Interests";

const description = "Software engineer, product designer, and visual storyteller based in Arizona.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "About — Deep Chadamiya", description, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-[34px] tab:pt-[46px]">
        <Container>
          <div className="grid grid-cols-1 items-start gap-[30px] desk:grid-cols-[1fr_0.86fr] desk:gap-12">
            <div className="flex flex-col items-start gap-4">
              <SectionLabel>Who Am I</SectionLabel>
              <h1 className="m-0 text-h1 font-medium tracking-[-0.03em]">
                Hey, I’m Deep
              </h1>
              <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
                I’m Deep Chadamiya, a software engineer, product designer, and visual storyteller based in Arizona. My
                background started in computer engineering and software development, but over time I became
                increasingly interested in how people actually experience the systems we build.
              </p>
              <p className="m-0 text-[15px] leading-[1.72] text-ink-secondary text-pretty">
                Today, I work across product thinking, UX, interface design, and engineering, taking ideas from early
                problem framing through working implementation. Photography and film also shape how I think about
                composition, attention, pacing, and story, while game and interactive technology continue to push me
                toward new ways of designing experiences.
              </p>
            </div>
            <AboutPortrait />
          </div>
        </Container>
      </section>

      <Capabilities />
      <Journey />
      <Interests />
    </>
  );
}
