/**
 * Interior page content — verbatim from the approved HTML in /DOCUMENTS.
 *
 * Sources:
 *   services  → LegacyByConsumer-SERVICES-EVERGREEN-MIST.html
 *   about     → LegacyByConsumer-ABOUT-PAGE-LAKE-FINAL.html
 *   industries→ LegacyByConsumer-INDUSTRIES-OFFLINE-V2-HERO.html
 *   resources → LegacyByConsumer-RESOURCES-APPROVED-OFFLINE.html
 *   contact   → LegacyByConsumer-CONTACT-US-369-APPROVED.html
 *   the rest  → LegacyByConsumer-FULL-SITE-DEVELOPER-PREVIEW-V5-FIXED-1991.html
 */

/* ------------------------------------------------------------------ */
/*  SERVICES                                                           */
/* ------------------------------------------------------------------ */

export const servicesPage = {
  hero: {
    eyebrow: "Services",
    headline: "Your Vision Needs a Blueprint.",
    lede:
      "Every business is different. We help determine what needs to be structured, planned, prepared, positioned, and implemented based on the business you are building.",
  },
  intro:
    "Choose the area that best matches what you are building. Each category opens into the specific support available for that stage of business development.",
  cards: [
    {
      step: "Build",
      title: "Business Formation & Development",
      body:
        "Establish the business foundation, structure, documentation, and development priorities.",
      href: "/contact",
    },
    {
      step: "Plan",
      title: "Business Plans, Strategy & Feasibility",
      body:
        "Develop the business blueprint, market approach, operating strategy, and implementation path.",
      href: "/contact",
    },
    {
      step: "Position",
      title: "Digital & Market Readiness",
      body:
        "Build the professional presence and practical digital foundation needed for today’s business environment.",
      href: "/contact",
    },
    {
      step: "Prepare",
      title: "Funding & Contracting Readiness",
      body:
        "Organize documentation, budgets, use-of-funds planning, capability materials, and readiness requirements.",
      href: "/funding-readiness",
    },
    {
      step: "Register",
      title: "SAM.gov & Government Contracting Readiness",
      body:
        "Prepare for federal vendor registration, capability development, NAICS identification, and contracting readiness.",
      href: "/infrastructure-readiness",
    },
    {
      step: "Develop",
      title: "Healthcare & Residential Care Development",
      body:
        "Specialized development support for selected care, senior living, and community-based service models.",
      href: "/healthcare-development",
    },
    {
      step: "Implement",
      title: "Operations & Business Infrastructure",
      body:
        "Develop the procedures, workflows, administrative systems, and implementation steps behind the business.",
      href: "/contact",
    },
  ],
  note:
    "Consumer Services, Inc. is an independent business-development company and is not affiliated with SAM.gov or the U.S. government. Registration does not guarantee contract awards.",
  cta: {
    label: "Not Sure Where to Start?",
    headline: "Start with the business.",
    body:
      "Tell us what you are building and what you are trying to accomplish. We’ll help identify the development pathway that best fits the project.",
    action: {
      label: "Begin Your Business Readiness Assessment",
      href: "/assessment",
    },
  },
};

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */

export const aboutPage = {
  hero: {
    eyebrow: "Established 1991",
    headline: "Experience. Adapted for Today.",
    lede:
      "Since 1991, Consumer Services, Inc. has helped entrepreneurs move from vision to action through thoughtful planning, practical strategy, and business implementation. Through changing times and an evolving business landscape, our commitment remains the same: helping entrepreneurs build with purpose and move toward success.",
  },
  role: {
    eyebrow: "Our Role",
    headline: "You bring the vision. We help organize the path.",
    body:
      "We work with entrepreneurs who know what they want to build but need help determining what must be structured, researched, prepared, developed, and implemented.",
  },
  how: {
    eyebrow: "How We Work",
    steps: [
      { title: "Structure", note: "Build the foundation." },
      { title: "Research", note: "Understand the requirements." },
      { title: "Prepare", note: "Get the business ready." },
      { title: "Implement", note: "Put the plan into action." },
    ],
  },
  approach: {
    eyebrow: "Our Approach",
    headline: "Practical development. Individual strategy.",
    body:
      "We don’t place every entrepreneur into the same process. The development strategy is shaped by the business, industry, stage, objectives, and requirements involved.",
  },
  story: {
    eyebrow: "Our Story",
    headline: "Established in 1991.",
    lede:
      "Consumer Services, Inc. was established in Georgia in 1991. Business has changed considerably since then. Today’s entrepreneur must navigate traditional business fundamentals alongside technology, digital communication, funding requirements, regulatory considerations and increasingly complex operating environments.",
    body: "Our focus today is helping entrepreneurs bring those pieces together.",
  },
  today: {
    eyebrow: "Who We Are Today",
    headline: "Builders. Coordinators. Problem Solvers.",
    lede:
      "We work with entrepreneurs who know what they want to build but need assistance determining how to structure, develop, prepare and implement it. We begin with the vision and build the development strategy around the business.",
    principles: [
      { title: "Structure Before Scale", note: "Build the foundation first." },
      {
        title: "Practical Before Complicated",
        note: "Develop what the business actually needs.",
      },
      {
        title: "Preparation Before Pursuit",
        note: "Understand the requirements before pursuing the opportunity.",
      },
      {
        title: "Implementation Matters",
        note: "A plan becomes valuable when it can be put into action.",
      },
    ],
  },
  collaboration: {
    eyebrow: "Collaborative Development",
    headline: "The right resources for the right project.",
    body: [
      "Some projects require expertise outside our direct scope. When appropriate, we coordinate with attorneys, accountants, real-estate professionals, technology providers, licensed professionals, and other specialized resources.",
      "Our role is to help keep the business-development process organized and moving forward.",
    ],
  },
  cta: {
    headline: "You Bring the Vision. We Help Build the Business.",
    action: { label: "Start a Conversation", href: "/contact" },
  },
};

/* ------------------------------------------------------------------ */
/*  INDUSTRIES                                                         */
/* ------------------------------------------------------------------ */

export const industriesPage = {
  /** From the full-site preview's Industries page. */
  overview: {
    label: "Industries & Business Models",
    lede: "We help develop selected businesses where structure, research, preparation, operational development or implementation assistance may be needed.",
  },
  hero: {
    eyebrow: "Industries & Business Models",
    headline: "Different Businesses Require Different Blueprints.",
    lede:
      "We help entrepreneurs understand what their industry requires, identify the pieces that need to be built, and develop a practical path toward operation and opportunity.",
  },
  items: [
    {
      title: "Infrastructure & Facility Services",
      note: "Construction support · HVAC · Mechanical · Electrical · Facility services",
      image: "/media/industry-infrastructure.jpg",
      alt: "Infrastructure and facility services",
    },
    {
      title: "Digital & Technology",
      note: "IT · Digital services · Data · Cybersecurity · Communications",
      image: "/media/industry-technology.jpg",
      alt: "Digital and technology",
    },
    {
      title: "Transportation & Logistics",
      note: "Trucking · Freight · Delivery · Logistics · Material movement",
      image: "/media/industry-transportation.jpg",
      alt: "Transportation and logistics",
    },
    {
      title: "Healthcare & Senior Living",
      note: "Residential care · Senior living · Healthcare support · Community-based services",
      image: "/media/industry-healthcare.jpg",
      alt: "Healthcare and senior living",
    },
    {
      title: "Workforce & Training",
      note: "Staffing · Workforce readiness · Occupational training · Technical assistance",
      image: "/media/industry-workforce.jpg",
      alt: "Workforce and training",
    },
    {
      title: "Professional & Business Services",
      note: "Consulting · Administrative services · Professional services · Small-business development",
      image: "/media/industry-professional.jpg",
      alt: "Professional and business services",
    },
  ],
  role: {
    eyebrow: "Our Role",
    headline: "We help develop the business.",
    body:
      "Our clients provide the underlying professional, licensed, trade, healthcare, technology, transportation, or other services. Consumer Services, Inc. helps with the business-development, preparation, and implementation work around them.",
  },
  cta: {
    headline: "Tell us what kind of business you’re building.",
    body:
      "We’ll help determine the development pathway that best fits the industry, stage, and objective.",
    action: {
      label: "Begin Your Business Readiness Assessment",
      href: "/assessment",
    },
  },
};

/* ------------------------------------------------------------------ */
/*  RESOURCES                                                          */
/* ------------------------------------------------------------------ */

export const resourcesPage = {
  hero: {
    eyebrow: "Resources & Business Guidance",
    headline: "Practical Information for Building What Comes Next.",
    lede:
      "Explore business-development guidance, planning resources, and practical information designed to help entrepreneurs better understand the road from idea to implementation.",
  },
  featured: {
    label: "Featured Resource",
    kicker: "Business Planning",
    headline: "Start With a Stronger Foundation.",
    body:
      "Key considerations before developing a business plan, feasibility strategy, or implementation roadmap.",
    image: "/media/advisory-session.jpg",
    alt: "Business planning discussion",
    action: { label: "Read More", href: "/contact" },
  },
  library: {
    headline: "Resource Library",
    body: "Browse key topics designed to support your next step.",
    items: [
      {
        title: "Business Formation & Structure",
        body: "Entity and foundational business considerations every entrepreneur should understand.",
      },
      {
        title: "SAM.gov & Government Readiness",
        body: "Understanding registration, compliance, and preparation for government opportunities.",
      },
      {
        title: "Digital Business Readiness",
        body: "Preparing the operational and digital foundation of a modern business.",
      },
      {
        title: "Healthcare & Residential Care",
        body: "General guidance for selected healthcare and residential business models.",
      },
      {
        title: "Funding & Growth Preparation",
        body: "Preparing the business before pursuing grants, funding, and growth capital.",
      },
    ],
  },
  notes: {
    headline: "Business Notes & Guidance",
    body: "Short insights, updates, checklists, and tools to help you move forward.",
    items: [
      {
        type: "Checklist",
        title: "Startup Readiness",
        body: "Essential items to review before launching your business.",
        action: "View Checklist",
      },
      {
        type: "Guide",
        title: "Feasibility Essentials",
        body: "Key questions to help you evaluate your idea and opportunity.",
        action: "Read Guide",
      },
      {
        type: "Tool",
        title: "Planning Worksheet",
        body: "Use this worksheet to organize your planning and next steps.",
        action: "Download",
      },
      {
        type: "Update",
        title: "Resource Updates",
        body: "New resources and guidance added regularly.",
        action: "Stay Informed",
      },
    ],
  },
  cta: {
    headline: "Looking for Something Specific?",
    body:
      "Tell us what you're working on. We can help identify the resources or development support that may fit your next step.",
    action: { label: "Contact Us", href: "/contact" },
  },
};

/* ------------------------------------------------------------------ */
/*  CONTACT                                                            */
/* ------------------------------------------------------------------ */

export const contactPage = {
  hero: {
    eyebrow: "Contact Consumer Services, Inc.",
    headline: "Let’s Talk About What You’re Building.",
    lede:
      "Whether you’re starting with an idea, strengthening an existing business, or preparing for your next opportunity, tell us where you are and what you’re working toward.",
  },
  reasons: {
    eyebrow: "3 Reasons to Connect With Us",
    headline:
      "You know what you want. Allow us to help provide the direction to move it forward.",
    items: [
      {
        title: "You Have an Idea",
        body: "You’re ready to turn a business concept into a structured plan.",
      },
      {
        title: "You’re Building",
        body: "Your business is underway, but you need strategy, documentation, structure, or implementation support.",
      },
      {
        title: "You’re Ready for the Next Milestone",
        body: "You’re preparing for growth, funding, government opportunities, licensing, expansion, or another important business objective.",
      },
    ],
  },
  form: {
    eyebrow: "Tell Us What You’re Working On",
    body:
      "Share a few details about your business and what you want to accomplish. We’ll help identify the direction, resources, and next steps that may fit your objective.",
    interests: [
      "Business Development",
      "Business Planning",
      "Business Formation",
      "SAM.gov & Government Readiness",
      "Healthcare & Residential Care",
      "Digital Business Development",
      "Funding & Growth Preparation",
      "Other",
    ],
    disclaimer:
      "Submitting this form does not create a consulting engagement or guarantee service availability.",
  },
  next: {
    eyebrow: "6 Ways We Help Move the Business Forward",
    headline: "Direction where it matters most.",
    body:
      "Our work is designed around the business objective, not a one-size-fits-all package.",
    items: [
      { title: "Structure", body: "Organize the business foundation." },
      { title: "Plan", body: "Develop the blueprint and strategy." },
      { title: "Prepare", body: "Get the business ready for the objective." },
      { title: "Position", body: "Strengthen market and opportunity readiness." },
      { title: "Implement", body: "Put the plan and systems into action." },
      { title: "Advance", body: "Support the next stage of growth or development." },
    ],
  },
  checkpoints: {
    eyebrow: "9 Readiness Checkpoints",
    headline: "What may need to be in place before the next opportunity.",
    items: [
      "Business Structure",
      "Business Plan",
      "Financial Readiness",
      "Digital Presence",
      "Documentation",
      "Licensing / Compliance",
      "Funding Readiness",
      "Contracting Readiness",
      "Implementation Plan",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  ASSESSMENT                                                         */
/* ------------------------------------------------------------------ */

export const assessmentPage = {
  hero: {
    eyebrow: "Business Readiness Assessment",
    headline: "Where is your business today?",
    lede:
      "You do not need to know which Consumer Services service you need. We begin with the business.",
  },
  formLabel: "Start Here",
  formHeadline: "Tell us what you’re building.",
  stages: ["Idea", "Forming", "Operating", "Reorganizing", "Expanding"],
  objectives: [
    "Launch",
    "Licensing",
    "Funding",
    "Contracting",
    "Digital Presence",
    "Operations",
    "Expansion",
    "Other",
  ],
  next: {
    headline: "What happens next?",
    body:
      "We will review the information to better understand your project and determine whether Consumer Services, Inc. may be able to assist.",
  },
};

/* ------------------------------------------------------------------ */
/*  INFRASTRUCTURE READINESS                                           */
/* ------------------------------------------------------------------ */

export const infrastructurePage = {
  hero: {
    eyebrow: "Infrastructure Readiness",
    headline: "Helping small businesses prepare to participate.",
    lede:
      "Large projects can create opportunities throughout the surrounding business ecosystem.",
  },
  where: {
    label: "Where Small Business Fits",
    headline: "Infrastructure requires more than infrastructure companies.",
    lede:
      "Large projects can create opportunities throughout the surrounding business ecosystem. Opportunities may exist for businesses providing construction and skilled trades, mechanical and facility services, transportation and logistics, technology and digital services, equipment and materials, staffing and workforce services, and administrative or project support.",
  },
  role: {
    label: "Our Role",
    headline: "Build the business before pursuing the opportunity.",
    principles: [
      { title: "Capability", note: "What can the business realistically provide?" },
      { title: "Market", note: "Who purchases those services?" },
      {
        title: "Requirements",
        note: "What structure, documentation, licenses, insurance, certifications, technology, equipment or financial capacity may be necessary?",
      },
      { title: "Readiness", note: "Is the business prepared to perform?" },
    ],
    closing:
      "From there, we help develop a practical readiness strategy. For eligible businesses pursuing federal opportunities, that preparation may also include SAM.gov registration assistance and related government-contracting readiness.",
  },
  cta: {
    headline: "Explore where your business may fit.",
    action: { label: "Begin a Readiness Assessment", href: "/assessment" },
  },
};

/* ------------------------------------------------------------------ */
/*  FUNDING READINESS                                                  */
/* ------------------------------------------------------------------ */

export const fundingPage = {
  hero: {
    eyebrow: "Funding Readiness",
    headline: "Capital starts with preparation.",
    lede: "Different objectives may require different funding pathways.",
  },
  purpose: {
    label: "Start With the Purpose",
    headline: "What does the capital need to accomplish?",
    items: ["Start", "Equip", "Acquire", "Operate", "Expand", "Deliver"],
    closing: "Different objectives may require different funding pathways.",
  },
  pathways: {
    label: "Possible Pathways",
    headline: "Funding should fit the business.",
    lede:
      "Depending on the business and eligibility, potential pathways may include commercial lending, working capital, equipment and vehicle financing, property financing, CDFI financing, eligible grants and incentives, or strategic investment and development capital.",
  },
  work: {
    label: "What We Do",
    headline: "Research. Organize. Prepare.",
    lede:
      "We help clients assess their development stage, organize business documentation, prepare supporting narratives and budgets, research potential pathways, and identify areas that may need attention before applying.",
    disclaimerTitle: "Readiness is not approval.",
    disclaimer:
      "Consumer Services, Inc. does not guarantee funding, investment, grants, contracts or financing. Eligibility and approval are determined by the applicable provider or program.",
  },
};

/* ------------------------------------------------------------------ */
/*  HEALTHCARE & RESIDENTIAL CARE DEVELOPMENT                          */
/* ------------------------------------------------------------------ */

export const healthcarePage = {
  hero: {
    eyebrow: "Healthcare & Residential Care Development",
    headline: "Building the business behind care.",
    lede:
      "Selected care businesses require development beyond ordinary business formation.",
  },
  process: {
    label: "From Concept to Operation",
    headline: "Building the business behind care.",
    lede:
      "Selected care businesses require development beyond ordinary business formation.",
    steps: [
      { title: "Model", note: "Define the service and business structure." },
      {
        title: "Requirements",
        note: "Identify applicable development and regulatory requirements.",
      },
      {
        title: "Property",
        note: "Evaluate property considerations where applicable.",
      },
      {
        title: "Documentation",
        note: "Develop the operational foundation.",
      },
      {
        title: "Prepare",
        note: "Organize the business for the applicable next stage.",
      },
      {
        title: "Implement",
        note: "Coordinate the development plan toward operation.",
      },
    ],
  },
  models: {
    label: "Selected Business Models",
    headline: "Care-focused development pathways.",
    lede:
      "Residential Care · Senior Living · Home & Community-Based Services · Healthcare Support Services · Other Selected Care Models",
    disclaimer:
      "Licensing and regulatory decisions are made solely by the applicable governmental or regulatory authority.",
  },
  cta: {
    headline: "Tell us what you are developing.",
    action: { label: "Discuss Your Project", href: "/contact" },
  },
};
