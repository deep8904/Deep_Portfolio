import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SITE_URL } from "@/lib/site";
import { SITE } from "@/lib/data";

const TITLE = "Deep Chadamiya — Product · Design · Dev";
const DESCRIPTION =
  "Deep Chadamiya is a product designer, design engineer, and frontend developer designing and building thoughtful digital experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Deep Chadamiya",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Deep Chadamiya",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#edebe8",
  viewportFit: "cover",
};

function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Deep Chadamiya",
    alternateName: "Deepkumar Chadamiya",
    jobTitle: "Product Designer, Design Engineer, Front-End Developer",
    url: SITE_URL,
    email: `mailto:${SITE.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tempe",
      addressRegion: "AZ",
      addressCountry: "US",
    },
    sameAs: [SITE.linkedin, SITE.github, SITE.instagram, SITE.twitter, SITE.youtube],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Deep Chadamiya",
    url: SITE_URL,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <PersonJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
