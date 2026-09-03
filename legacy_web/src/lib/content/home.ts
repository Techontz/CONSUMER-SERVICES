/**
 * Homepage content — verbatim from
 * DOCUMENTS/LegacyByConsumer-FULL-SITE-DEVELOPER-PREVIEW-V5-FIXED-1991.html
 */

export const homeHero = {
  eyebrow: "Consumer Services, Inc.",
  /** Rendered as four staggered mask-revealed lines */
  /**
   * Line breaks, not copy. The same four words in the same order — only the
   * grouping changed, so "Experience Insight" sets as one line on a desktop
   * and the headline reads in three movements rather than four.
   */
  headlineLines: ["Experience Insight", "Legacy", "Solutions That Last"],
  lede:
    "Since 1991, Consumer Services, Inc. has helped businesses, professionals and organizations plan, prepare, strengthen and move forward.",
  primaryCta: { label: "Explore Consumer Services", href: "/services" },
  secondaryCta: { label: "Start a Conversation", href: "/contact" },
};

export const homeIntro = {
  kicker: "Business Development & Implementation",
  headline: ["You Bring the Vision.", "We Help Build the Business."],
  /**
   * Two paragraphs that used to make the same case twice. The first ran
   * "develop the blueprint / identify what is required / organize the
   * pieces / create implementation strategies"; the second answered with
   * "understand the vision / build the development path / work alongside
   * you as the pieces come together". Four verbs, then the same four verbs.
   *
   * Kept: what we do, and how we work. Cut: the second telling.
   */
  body: [
    "You know what you want to create. We identify what it will require, organize the pieces, and set out a practical path toward operation.",
    "Our role is hands-on. We work alongside you as those pieces come together, not from a distance once the plan is written.",
  ],
  link: { label: "See How We Help", href: "/services" },
};

/**
 * The credibility band under the hero. Four claims, no elaboration — it is
 * a statement of standing, not a section, and it earns its place by being
 * the shortest thing on the page.
 */
export const credibility = [
  "Established in Georgia in 1991",
  "Business Development",
  "Operational Readiness",
  "Multi-Industry Experience",
];

export const digitalStory = {
  kicker: "Digital & Market Readiness",
  headline: "Small business has gone digital.",
  body: [
    "A professional digital presence, organized information, effective communication, and accessible business systems have become part of operating a credible business.",
    "We help entrepreneurs work out what theirs actually needs, and coordinate solutions that serve the wider plan rather than sit beside it.",
  ],
  flowLabel: "Digital readiness progression",
  flow: [
    { label: "Business" },
    { label: "Presence" },
    { label: "Communication" },
    { label: "Organization" },
    { label: "Opportunity" },
  ],
};

/**
 * How We Help — one section where there were two.
 *
 * "How We Help" listed Build · Plan · Prepare · Position · Implement against
 * five service groupings. "A Practical Development Process" then listed
 * Discover · Structure · Develop · Prepare · Implement against five stages.
 * Two five-step frameworks, one after the other, describing the same
 * sequence in different words — the kind of thing that makes a reader
 * wonder which one is the real one.
 *
 * This keeps the stronger half of each: the five verbs and the service
 * groupings from the first, the headline and the framing sentence from the
 * second. Nothing is lost except the second telling.
 *
 * The notes are re-cut for the same reason. "Prepare → Prepare for the
 * objective" and "Position → Build a credible business presence" each
 * echoed a verb already standing beside them in 32px capitals, and
 * "Develop the blueprint" collided with the Businesses headline further
 * down the page. Each now says something the verb does not already say.
 */
export const pathways = {
  label: "How We Help",
  headline: "A practical development process.",
  standfirst:
    "Built around what you are creating and what is required to move it toward operation.",
  micro:
    "Business Plans · Feasibility · Funding Readiness · SAM.gov Registration · Contracting Readiness · Business Development",
  link: { label: "Explore Services", href: "/services" },
  items: [
    {
      verb: "Build",
      title: "Business Development & Structure",
      note: "Establish the foundation.",
    },
    {
      verb: "Plan",
      title: "Strategy, Research & Feasibility",
      note: "Test the idea before committing to it.",
    },
    {
      verb: "Prepare",
      title: "Funding & Opportunity Readiness",
      note: "Organize what a funder will ask to see.",
    },
    {
      verb: "Position",
      title: "Digital & Market Readiness",
      note: "Make the business credible in its market.",
    },
    {
      verb: "Implement",
      title: "Business Launch & Operations",
      note: "Put the approved plan into action.",
    },
  ],
};

export const sectorStory = {
  label: "Businesses We Help Develop",
  headline: "Different businesses require different blueprints.",
  /**
   * Was: "...where structure, preparation, implementation, or operational
   * development may be needed." Four abstractions in one clause, three of
   * which the page has already used. The point of the sentence is the range
   * of clients, so that is what it says now.
   */
  body:
    "We work with entrepreneurs and organizations across a range of business models, each with its own requirements and its own route to operation.",
  link: { label: "Explore Industries", href: "/industries" },
  items: [
    {
      title: "Infrastructure & Skilled Trades",
      note: "Construction support · Mechanical · HVAC · Facility services",
    },
    {
      title: "Technology & Digital Services",
      note: "IT · Digital services · Technology-enabled businesses",
    },
    {
      title: "Transportation & Logistics",
      note: "Trucking · Freight · Delivery · Logistics support",
    },
    {
      title: "Healthcare & Residential Care",
      note: "Senior living · Residential care · Healthcare support",
    },
    {
      title: "Workforce & Business Services",
      note: "Staffing · Training · Professional services",
    },
    {
      title: "Nonprofit & Community Organizations",
      note: "Organizational development · Community initiatives",
    },
  ],
};

/**
 * The three readiness stories used to sit on the homepage as unrelated
 * blocks with Digital & Market Readiness first, which made a business-
 * development firm read as a digital agency before the visitor had met it.
 * They are one framework now, in the order the work actually happens, and
 * this is its opener.
 */
export const readinessFramework = {
  label: "Specialized Readiness",
  headline: "Readiness is specific.",
  standfirst:
    "What a business must have in place depends on what it is reaching for. These are the three we are asked for most.",
};

export const opportunityStory = {
  kicker: "Infrastructure & Opportunity Readiness",
  headline: "Big projects can create opportunities for small business.",
  body: [
    "Infrastructure development can require contractors, suppliers, transportation, technology, staffing, facility services, and other supporting businesses.",
    "We help entrepreneurs find where their services fit, and what has to be in place before they pursue that work.",
  ],
  link: {
    label: "Explore Infrastructure Readiness",
    href: "/infrastructure-readiness",
  },
  chips: [
    "Trades",
    "Logistics",
    "Technology",
    "Facilities",
    "Workforce",
    "Project Support",
  ],
};

export const fundingStory = {
  kicker: "Funding Readiness",
  headline: "Funding begins before the application.",
  body: [
    "The right funding pathway depends on the business, its stage, financial position, intended use of capital, and the requirements of the funding source.",
    "We help clients organize and prepare before they pursue appropriate funding opportunities.",
  ],
  link: { label: "Explore Funding Readiness", href: "/funding-readiness" },
  chips: [
    "Working Capital",
    "Equipment",
    "Property",
    "Commercial Lending",
    "CDFIs",
    "Eligible Grants & Incentives",
  ],
  disclaimer:
    "Funding eligibility and approval are determined by the applicable lender, funder, investor, or program.",
};

/**
 * The company-history band. Every string below is the client's approved
 * copy, used exactly as supplied — eyebrow, headline, both paragraphs and
 * the button label. Nothing here is edited, shortened or improved.
 */
export const heritage = {
  kicker: "Consumer Services, Inc. · Established 1991",
  year: "1991",
  headline: "Experience that shapes how we build today.",
  body: [
    "Consumer Services, Inc. combines longstanding business experience with practical, implementation-focused support. We help entrepreneurs and organizations clarify their vision, establish the right structure, prepare for opportunity, and move forward with an actionable development path.",
    "We understand that different businesses require different blueprints. Our approach is tailored to the client, the industry, the objective, and what is realistically required for implementation.",
  ],
  link: { label: "Our Story", href: "/about" },
};

export const closing = {
  kicker: "Start Here",
  headline: "What are you building?",
  body:
    "You bring the vision. Let’s begin with understanding what it will take to bring it to life.",
  primaryCta: {
    label: "Begin Your Business Readiness Assessment",
    href: "/assessment",
  },
  secondaryCta: { label: "Start a Conversation", href: "/contact" },
};
