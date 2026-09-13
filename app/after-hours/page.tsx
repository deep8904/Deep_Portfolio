import type { Metadata } from "next";
import { AfterHoursComingSoon } from "@/components/after-hours/AfterHoursComingSoon";

const description =
  "A personal, optional corner of the portfolio: small interactions around photography, games, live-production signal routing, and interface experiments. Not public yet.";

export const metadata: Metadata = {
  title: "After Hours",
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: "/after-hours" },
};

// After Hours isn't ready to publish yet. The real experience
// (AfterHoursLoader -> AfterHoursExperience and its modes) stays in the
// codebase untouched. Swap the import above back to AfterHoursLoader when
// it's ready to go live.
export default function AfterHoursPage() {
  return <AfterHoursComingSoon />;
}
