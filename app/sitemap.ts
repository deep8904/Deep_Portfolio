import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { WORK_PROJECTS, SELECTED_PROJECTS, WORK_STUBS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/visuals`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/resume`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
  ];

  for (const project of WORK_PROJECTS) {
    routes.push({ url: `${SITE_URL}/work/${project.slug}`, changeFrequency: "monthly", priority: 0.8 });
  }

  for (const project of SELECTED_PROJECTS) {
    routes.push({ url: `${SITE_URL}/work/${project.slug}`, changeFrequency: "monthly", priority: 0.6 });
  }

  for (const slug of Object.keys(WORK_STUBS)) {
    routes.push({ url: `${SITE_URL}/work/${slug}`, changeFrequency: "monthly", priority: 0.5 });
  }

  return routes;
}
