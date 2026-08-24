import type { Metadata } from "next";
import { AfterHoursLoader } from "@/components/after-hours/AfterHoursLoader";

const description =
  "A personal, optional corner of the portfolio — small interactions around photography, games, live-production signal routing, and interface experiments.";

export const metadata: Metadata = {
  title: "After Hours",
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: "/after-hours" },
};

export default function AfterHoursPage() {
  return <AfterHoursLoader />;
}
