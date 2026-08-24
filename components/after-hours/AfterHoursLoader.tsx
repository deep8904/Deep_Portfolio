"use client";

import dynamic from "next/dynamic";

const AfterHoursExperience = dynamic(
  () => import("@/components/after-hours/AfterHoursExperience").then((m) => m.AfterHoursExperience),
  { ssr: false }
);

export function AfterHoursLoader() {
  return <AfterHoursExperience />;
}
