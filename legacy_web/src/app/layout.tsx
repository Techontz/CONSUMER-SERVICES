import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces, Mulish } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RouteTransition } from "@/components/layout/RouteTransition";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { JsonLd, organizationJsonLd, origin, websiteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

/* Three families, self-hosted at build time by next/font.
 *
 * Archivo Black is the display voice: a heavy squared grotesque with a flat
 * apex on the A, which is what lets it hold together at the wide letterspaced
 * capitals the design reference builds every section opener from.
 *
 * Mulish carries running text — humanist, large x-height, warm without being
 * soft, which is the character the reference sets its body copy in.
 *
 * Fraunces is kept for the homepage hero alone. That frame follows the other
 * reference, where the headline is an editorial serif with an italic accent
 * line, and no grotesque reproduces that. */
const archivo = Archivo({
  subsets: ["latin"],
  // The variable cut, for its width axis. The reference's display lettering
  // sits between Archivo Black (too wide) and Anton (too narrow); the wdth
  // axis is the only way to land between them, and this face is the identity
  // of the whole site, so it is worth its weight.
  axes: ["wdth"],
  variable: "--font-display-face",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  // Only these three are used anywhere — Archivo Black carries every heavy
  // setting, so the bold and extra-bold cuts were dead weight competing with
  // the hero poster for bandwidth.
  // 500 was used twice and 600 carries every emphasis that matters, so the
  // medium cut was dropped to give the display face its bandwidth back.
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  // Static roman and italic at one weight rather than the variable face. The
  // hero is the only place this is used — two static cuts are less than half
  // the bytes of the variable font, and those bytes were arriving on the same
  // connection as the poster the hero is waiting for.
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif-face",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: `${site.legalName} — ${site.tagline}`,
    template: `%s — ${site.legalName}`,
  },
  description:
    "Since 1991, Consumer Services, Inc. has helped businesses, professionals and organizations plan, prepare, strengthen and move forward.",
  applicationName: site.brandName,
  authors: [{ name: site.legalName, url: origin }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: origin },
  icons: {
    icon: [{ url: "/media/seal.png", type: "image/png" }],
    apple: [{ url: "/media/seal.png" }],
  },
  openGraph: {
    type: "website",
    siteName: site.legalName,
    locale: "en_US",
    url: origin,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#083430",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${mulish.variable} ${fraunces.variable}`}
    >
      <body className="min-h-dvh antialiased">
        {/* One solid evergreen band across the whole site, with a hairline
            at its foot marking where it ends and the page begins. */}
        <SiteHeader />
        {children}
        <SiteFooter />
        <RevealObserver />
        <RouteTransition />
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      </body>
    </html>
  );
}
