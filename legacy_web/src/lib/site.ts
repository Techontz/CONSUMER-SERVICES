/**
 * Canonical company facts and site-wide configuration.
 *
 * Every value here is taken verbatim from the client-approved HTML in
 * /DOCUMENTS. Nothing in this file may be invented, embellished or
 * extrapolated — it is the factual record for the whole site.
 */

export const site = {
  /** Legal entity */
  legalName: "Consumer Services, Inc.",
  /** Brand / domain identity */
  brandName: "LegacyByConsumer",
  tagline: "Strategic Business Solutions Since 1991",
  sealMotto: "Strategic. Solutions. Lasting Impact.",
  established: "1991",
  establishedIn: "Georgia",

  /** Three-line brand statement used in the footer */
  creed: [
    "Preparing businesses.",
    "Strengthening communities.",
    "Building legacies.",
  ],

  url: "https://www.LegacybyConsumer.com",
  domainLabel: "LegacyByConsumer.com",

  email: "info@legacybyconsumer.com",
  phone: "877-855-3455",
  phoneHref: "tel:+18778553455",

  // A range, not a year: the footer carries the founding date as well as
  // the current one, which is the whole point of a line that opens with 1991.
  copyrightRange: "1991 - 2026",
} as const;

export type NavChild = {
  label: string;
  href: string;
  blurb?: string;
  /**
   * The photograph the mega-menu shows while this item is live. Every one is
   * an image the site already ships and licenses; the menu introduces no new
   * asset, it just stops being a wall of text.
   */
  image?: string;
  alt?: string;
};

export type NavItem = {
  label: string;
  href: string;
  /** Rendered as a mega-menu panel when present */
  children?: NavChild[];
  /** Short standfirst shown at the head of the mega-menu panel */
  panelTitle?: string;
  panelBlurb?: string;
};

/**
 * Primary navigation — the five approved items plus the Contact call to
 * action, which the approved header renders separately from the list.
 * Mega-menu children are existing pages only; no destination here is
 * invented.
 */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    panelTitle: "Your vision needs a blueprint.",
    panelBlurb:
      "Choose the area that best matches what you are building. Each category opens into the specific support available for that stage of business development.",
    children: [
      {
        label: "All Services",
        href: "/services",
        blurb: "The seven development pathways.",
        image: "/media/industry-professional.jpg",
        alt: "Professionals working through a business plan together",
      },
      {
        label: "Funding Readiness",
        href: "/funding-readiness",
        blurb: "Capital starts with preparation.",
        image: "/media/advisory-session.jpg",
        alt: "Advisers reviewing financial documents across a table",
      },
      {
        label: "Infrastructure Readiness",
        href: "/infrastructure-readiness",
        blurb: "Prepare to participate in large projects.",
        image: "/media/industry-infrastructure.jpg",
        alt: "Engineers reviewing drawings on a project site",
      },
      {
        label: "Healthcare & Residential Care",
        href: "/healthcare-development",
        blurb: "Building the business behind care.",
        image: "/media/industry-healthcare.jpg",
        alt: "A professional healthcare environment",
      },
      {
        label: "Business Readiness Assessment",
        href: "/assessment",
        blurb: "Where is your business today?",
        image: "/media/funding-review-poster.webp",
        alt: "Financing paperwork being worked through at a table",
      },
    ],
  },
  { label: "About", href: "/about" },
  {
    label: "Industries",
    href: "/industries",
    panelTitle: "Different businesses require different blueprints.",
    panelBlurb:
      "We help entrepreneurs understand what their industry requires, identify the pieces that need to be built, and develop a practical path toward operation and opportunity.",
  },
  { label: "Resources", href: "/resources" },
];

/** Footer navigation — mirrors the approved footer link set. */
export const footerNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
  { label: "Contact Us", href: "/contact" },
];

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Data Sharing", href: "/data-sharing" },
];
