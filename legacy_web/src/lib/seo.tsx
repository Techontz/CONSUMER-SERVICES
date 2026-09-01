import type { Metadata } from "next";
import { site } from "./site";

/** Absolute production origin — never a development URL. */
export const origin = site.url;

export function pageMeta({
  title,
  description,
  path,
  image = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = new URL(path, origin).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.legalName,
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Organization + WebSite structured data. Every claim below appears in
 * the approved source material.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${origin}/#organization`,
  name: site.legalName,
  alternateName: site.brandName,
  url: origin,
  logo: `${origin}/media/mark-512.png`,
  image: `${origin}/media/mark-512.png`,
  slogan: site.tagline,
  foundingDate: site.established,
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressRegion: "GA",
      addressCountry: "US",
    },
  },
  email: site.email,
  telephone: `+1-${site.phone}`,
  description:
    "Since 1991, Consumer Services, Inc. has helped businesses, professionals and organizations plan, prepare, strengthen and move forward.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+1-${site.phone}`,
    email: site.email,
    contactType: "customer service",
    availableLanguage: "English",
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${origin}/#website`,
  url: origin,
  name: site.brandName,
  publisher: { "@id": `${origin}/#organization` },
};

/** Renders a JSON-LD block. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
