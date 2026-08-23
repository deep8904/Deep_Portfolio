import type { Metadata } from "next";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";

export const metadata: Metadata = {
  title: {
    default: "Deep Chadamiya — Product · Design · Dev",
    template: "%s — Deep Chadamiya",
  },
  description:
    "Deep Chadamiya is a product designer, design engineer, and front-end developer designing and building thoughtful digital experiences.",
  openGraph: {
    title: "Deep Chadamiya — Product · Design · Dev",
    description:
      "Deep Chadamiya is a product designer, design engineer, and front-end developer designing and building thoughtful digital experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
