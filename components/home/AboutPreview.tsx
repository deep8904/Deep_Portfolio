import Image from "next/image";
import { Section } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const LOGOS = [
  { src: "/images/logos/asu-preview.png", alt: "Arizona State University", h: 22, w: 57 },
  { src: "/images/logos/tibicle-preview.png", alt: "Tibicle", h: 23, w: 74 },
  { src: "/images/logos/endless-preview.png", alt: "Endless", h: 16, w: 122 },
];

export function AboutPreview() {
  return (
    <Section>
      <Reveal>
        <div className="grid grid-cols-1 items-start gap-8 desk:grid-cols-[minmax(0,58%)_minmax(0,34%)] desk:justify-between desk:gap-14">
          <div className="flex flex-col items-start gap-5">
            <SectionLabel>Who Am I</SectionLabel>
            <p className="m-0 max-w-[66ch] text-p1 text-ink-secondary text-pretty">
              I’m Deep Chadamiya, a software engineer, product designer, and visual storyteller. I enjoy turning
              complex ideas into clear digital experiences, combining systems thinking, UX, interface design, and
              engineering to take products from early concept to working implementation. Outside product work,
              photography and film shape how I think about composition, attention, pacing, and story. I’m especially
              drawn to projects where technology and creativity come together to solve real problems in a thoughtful,
              practical way.
            </p>
            <div className="mt-8">
              <span className="text-label text-ink-faint">Experience across</span>
              <div className="mt-5 flex flex-wrap items-center gap-[30px]">
                {LOGOS.map((logo) => (
                  <Image
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    height={logo.h}
                    width={logo.w}
                    className="opacity-[0.62] transition-opacity duration-[240ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:opacity-100"
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="group relative w-full max-w-[440px] overflow-hidden rounded-[14px] bg-image-bg desk:max-w-[400px]"
            style={{ aspectRatio: "1023/1120" }}
          >
            <Image
              src="/images/about/preview-portrait.png"
              alt="Portrait of Deep Chadamiya"
              fill
              sizes="(min-width: 1200px) 400px, (min-width: 810px) 440px, 90vw"
              data-img
              className="object-cover transition-transform duration-[480ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.018]"
            />
            <Image
              src="/images/about/signature.png"
              alt="Deep Chadamiya signature"
              width={1103}
              height={257}
              className="pointer-events-none absolute bottom-[18px] right-5 w-[44%] opacity-95 brightness-0 invert"
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
