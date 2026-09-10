/**
 * The client's legal documents, transcribed verbatim.
 *
 * Every string below is the client's own wording. Nothing here is
 * summarised, paraphrased, reordered or "improved": the section numbers,
 * headings, bullets, dates, email address and telephone number are the
 * supplied text exactly. Formatting is the only thing this file decides —
 * which run of words is a paragraph, which is a list — so that the renderer
 * can set the documents for the web without touching what they say.
 *
 * If a document changes, it changes here and nowhere else. See
 * `components/sections/LegalDocument.tsx` for how it is set on the page.
 */

/** A link the renderer may draw inside a paragraph, matched on exact text. */
export type InlineLink = { text: string; href: string };

export type LegalBlock =
  | { kind: "p"; text: string; links?: InlineLink[] }
  | { kind: "list"; items: string[] }
  | { kind: "contact"; lines: string[] };

export type LegalSection = {
  /** The client's own section number. Never renumbered. */
  number: number;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  /** Route this document is served at — one authoritative URL per document. */
  path: string;
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  /** The copy that stands before section 1. */
  preamble: LegalBlock[];
  sections: LegalSection[];
};

const CONTACT_LINES = [
  "Consumer Services, Inc.",
  "Online at LegacyByConsumer.com",
  "Email: info@legacybyconsumer.com",
  "Telephone: 877-855-3455",
];

/* ------------------------------------------------------------------ */
/* Data Sharing Disclosure                                             */
/* ------------------------------------------------------------------ */

export const dataSharingDisclosure: LegalDocument = {
  path: "/data-sharing",
  title: "Data Sharing Disclosure",
  effectiveDate: "September 12, 2026",
  lastUpdated: "September 12, 2026",

  preamble: [
    {
      kind: "p",
      text:
        "Consumer Services, Inc. may coordinate with employees, contractors, technology providers, consultants, attorneys, accountants, licensed professionals, and other specialized resources when evaluating or supporting a business project.",
    },
    {
      kind: "p",
      text:
        "This disclosure explains when, why, and with whom information may be shared.",
    },
  ],

  sections: [
    {
      number: 1,
      heading: "Information Covered",
      blocks: [
        { kind: "p", text: "Information that may be shared includes:" },
        {
          kind: "list",
          items: [
            "Contact information",
            "Business or organization information",
            "Project descriptions and objectives",
            "Business-readiness information",
            "Documents supplied for an authorized project",
            "Service, scheduling, transaction, and communication records",
            "Other information reasonably necessary to evaluate or perform requested services",
          ],
        },
        {
          kind: "p",
          text:
            "We seek to limit disclosures to information reasonably related to the applicable purpose.",
        },
      ],
    },
    {
      number: 2,
      heading: "Who May Receive Information",
      blocks: [
        { kind: "p", text: "Information may be disclosed to:" },
        {
          kind: "list",
          items: [
            "Authorized Consumer Services employees and contractors",
            "Website, form, email, scheduling, file-storage, customer-management, payment, analytics, and cybersecurity providers",
            "Attorneys, accountants, tax professionals, insurance professionals, licensed consultants, and other specialists",
            "Government agencies or regulatory authorities when authorized by the client or required by law",
            "Other resources specifically authorized to participate in a project",
          ],
        },
      ],
    },
    {
      number: 3,
      heading: "Reasons for Sharing Information",
      blocks: [
        { kind: "p", text: "Information may be shared to:" },
        {
          kind: "list",
          items: [
            "Review and respond to an inquiry",
            "Evaluate project needs and requirements",
            "Coordinate requested services",
            "Obtain specialized professional input",
            "Prepare documents, plans, applications, or implementation materials",
            "Process authorized payments and maintain transaction records",
            "Operate, secure, and improve the website",
            "Prevent fraud, abuse, or unauthorized activity",
            "Meet contractual, regulatory, or legal obligations",
          ],
        },
      ],
    },
    {
      number: 4,
      heading: "Client Authorization",
      blocks: [
        {
          kind: "p",
          text:
            "Submitting an inquiry permits Consumer Services and its authorized service providers to process the submitted information for reviewing and responding to that inquiry.",
        },
        {
          kind: "p",
          text:
            "Submission of an inquiry does not provide unrestricted authorization to distribute information for unrelated purposes.",
        },
        {
          kind: "p",
          text:
            "When a project requires substantive information to be shared with an independent outside professional, agency, vendor, or resource, Consumer Services will obtain authorization when required.",
        },
      ],
    },
    {
      number: 5,
      heading: "No Sale of Personal Information",
      blocks: [
        {
          kind: "p",
          text:
            "Consumer Services, Inc. does not sell or rent personal information.",
        },
        {
          kind: "p",
          text:
            "We do not share personal information with third parties for their independent marketing purposes without appropriate authorization.",
        },
      ],
    },
    {
      number: 6,
      heading: "Professional Independence",
      blocks: [
        {
          kind: "p",
          text:
            "Attorneys, accountants, lenders, insurers, licensed professionals, government agencies, and other outside parties remain independent from Consumer Services unless expressly stated otherwise.",
        },
        { kind: "p", text: "Consumer Services does not control their:" },
        {
          kind: "list",
          items: [
            "Decisions or professional opinions",
            "Fees or service terms",
            "Processing times",
            "Eligibility determinations",
            "Approvals, denials, or other outcomes",
          ],
        },
      ],
    },
    {
      number: 7,
      heading: "Legal Disclosures",
      blocks: [
        {
          kind: "p",
          text: "Information may be disclosed when reasonably necessary to:",
        },
        {
          kind: "list",
          items: [
            "Comply with a subpoena, court order, law, or regulatory requirement",
            "Protect the rights, safety, property, or security of Consumer Services or another person",
            "Investigate fraud, misuse, or a security incident",
            "Establish, exercise, or defend a legal claim",
          ],
        },
      ],
    },
    {
      number: 8,
      heading: "Safeguards and Retention",
      blocks: [
        {
          kind: "p",
          text:
            "Consumer Services uses reasonable administrative, technical, and organizational measures intended to protect information.",
        },
        {
          kind: "p",
          text:
            "We expect authorized service providers to handle information consistently with their assigned responsibilities and applicable legal or contractual obligations.",
        },
        {
          kind: "p",
          text:
            "Information is retained only as long as reasonably necessary for the relevant business, contractual, accounting, regulatory, insurance, or legal purpose.",
        },
      ],
    },
    {
      number: 9,
      heading: "Your Choices",
      blocks: [
        {
          kind: "p",
          text:
            "Subject to applicable law, you may request information about how your personal information has been used or shared. You may also request access, correction, or deletion of certain information.",
        },
        {
          kind: "p",
          text:
            "We may need to verify your identity before completing a request. Consumer Services may retain information when required for legal, accounting, contractual, fraud-prevention, or recordkeeping purposes.",
        },
      ],
    },
    {
      number: 10,
      heading: "Questions and Requests",
      blocks: [
        {
          kind: "p",
          text:
            "Questions about data sharing or requests concerning personal information may be directed to:",
        },
        { kind: "contact", lines: CONTACT_LINES },
        {
          kind: "p",
          text:
            "Additional information is available in our Privacy Policy and Terms of Use.",
          links: [
            { text: "Privacy Policy", href: "/privacy-policy" },
            { text: "Terms of Use", href: "/terms-of-use" },
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Terms of Use                                                        */
/* ------------------------------------------------------------------ */

export const termsOfUse: LegalDocument = {
  path: "/terms-of-use",
  title: "Terms of Use",
  effectiveDate: "September 12, 2026",
  lastUpdated: "September 12, 2026",

  preamble: [
    {
      kind: "p",
      text:
        "These Terms of Use govern your access to and use of LegacyByConsumer.com and related webpages operated by Consumer Services, Inc. (“Consumer Services,” “we,” “our,” or “us”).",
    },
    {
      kind: "p",
      text:
        "By accessing or using this website, you agree to these Terms. If you do not agree, please discontinue your use of the website.",
    },
  ],

  sections: [
    {
      number: 1,
      heading: "Website Purpose",
      blocks: [
        {
          kind: "p",
          text:
            "This website provides general information about Consumer Services, Inc., its business-development services, industries served, readiness resources, and methods for contacting the company.",
        },
        {
          kind: "p",
          text:
            "Website information is provided for general educational and informational purposes. It is not a substitute for advice from an attorney, accountant, tax professional, financial adviser, lender, insurance professional, licensing authority, or other appropriately qualified professional.",
        },
      ],
    },
    {
      number: 2,
      heading: "No Consulting Relationship Created",
      blocks: [
        {
          kind: "p",
          text:
            "Accessing the website, submitting a form, completing a Business Readiness Assessment, requesting information, or communicating with Consumer Services does not automatically:",
        },
        {
          kind: "list",
          items: [
            "Create a consultant-client relationship",
            "Create a confidential, fiduciary, legal, or professional relationship",
            "Guarantee acceptance as a client",
            "Guarantee service availability",
            "Authorize Consumer Services to act on your behalf",
            "Create an obligation for Consumer Services to provide services",
          ],
        },
        {
          kind: "p",
          text:
            "A formal engagement begins only after the applicable parties approve and execute a written service agreement and satisfy any stated payment and onboarding requirements.",
        },
      ],
    },
    {
      number: 3,
      heading: "No Guarantee of Results",
      blocks: [
        {
          kind: "p",
          text:
            "Consumer Services provides business-development, organizational, readiness, research, documentation, and implementation support.",
        },
        { kind: "p", text: "Consumer Services does not guarantee:" },
        {
          kind: "list",
          items: [
            "Business formation, launch, profitability, revenue, or growth",
            "Financing, grants, investments, or loan approval",
            "Government contracts, certifications, registrations, or awards",
            "Licensing, accreditation, permits, inspections, or regulatory approval",
            "Vendorization, reimbursement rates, referrals, admissions, or occupancy",
            "Acceptance by any agency, lender, funder, investor, or third party",
            "Completion within a particular timeframe unless expressly stated in a written agreement",
          ],
        },
        {
          kind: "p",
          text:
            "Decisions are made independently by applicable agencies, regulators, lenders, funders, contracting authorities, and other third parties.",
        },
      ],
    },
    {
      number: 4,
      heading: "Accuracy and Changes",
      blocks: [
        {
          kind: "p",
          text:
            "Consumer Services strives to provide useful and accurate information. However, laws, regulations, programs, fees, deadlines, funding opportunities, and agency requirements may change without notice.",
        },
        {
          kind: "p",
          text:
            "Website content may not reflect the most recent requirements applicable to every location, industry, business, or circumstance. Users are responsible for verifying critical information with the appropriate authority or qualified professional before acting or making decisions.",
        },
        {
          kind: "p",
          text:
            "Consumer Services may update, correct, remove, or revise website content at any time.",
        },
      ],
    },
    {
      number: 5,
      heading: "Assessments and Website Submissions",
      blocks: [
        {
          kind: "p",
          text:
            "Information submitted through the website must be truthful, accurate, lawful, and provided by an individual authorized to disclose it.",
        },
        {
          kind: "p",
          text:
            "The Business Readiness Assessment is a preliminary informational tool. It is not:",
        },
        {
          kind: "list",
          items: [
            "A formal eligibility determination",
            "A professional opinion",
            "A funding or lending decision",
            "A licensing or regulatory decision",
            "A guarantee that Consumer Services will accept a project",
            "A guarantee that a project can be completed",
          ],
        },
        {
          kind: "p",
          text:
            "Do not submit information that you are not legally authorized to provide.",
        },
      ],
    },
    {
      number: 6,
      heading: "Services, Fees, and Payments",
      blocks: [
        {
          kind: "p",
          text:
            "Descriptions of services on the website are general and may not include every requirement, limitation, deliverable, fee, or expense.",
        },
        {
          kind: "p",
          text:
            "The scope of services, price, payment schedule, responsibilities, delivery expectations, cancellation provisions, and refund terms for a paid engagement will be governed by the applicable written proposal, invoice, service agreement, or engagement document.",
        },
        {
          kind: "p",
          text:
            "Unless otherwise stated in writing, third-party filing fees, government charges, professional fees, software expenses, and vendor costs are separate from Consumer Services’ consulting fees.",
        },
      ],
    },
    {
      number: 7,
      heading: "Intellectual Property",
      blocks: [
        {
          kind: "p",
          text:
            "The website and its original content—including its text, branding, graphics, design elements, service descriptions, assessments, frameworks, downloads, templates, and educational materials—are owned by or licensed to Consumer Services, Inc. and protected by applicable intellectual-property laws.",
        },
        {
          kind: "p",
          text:
            "You may view or print reasonable portions of the website for personal, noncommercial evaluation of our services.",
        },
        { kind: "p", text: "Without prior written authorization, you may not:" },
        {
          kind: "list",
          items: [
            "Copy or republish substantial website content",
            "Sell, license, or commercially exploit website materials",
            "Remove copyright, trademark, or ownership notices",
            "Reproduce proprietary assessments, frameworks, templates, or processes",
            "Use Consumer Services’ name, logo, or branding misleadingly",
            "Represent Consumer Services’ materials as your own",
          ],
        },
      ],
    },
    {
      number: 8,
      heading: "Acceptable Use",
      blocks: [
        { kind: "p", text: "You agree not to:" },
        {
          kind: "list",
          items: [
            "Use the website for unlawful, fraudulent, or harmful purposes",
            "Attempt unauthorized access to the website or connected systems",
            "Introduce malware, malicious code, or disruptive technology",
            "Interfere with website operation or security",
            "Scrape, harvest, or systematically extract website information without authorization",
            "Submit false, deceptive, infringing, or unlawful material",
            "Impersonate another person or misrepresent your authority",
          ],
        },
      ],
    },
    {
      number: 9,
      heading: "Third-Party Services and Links",
      blocks: [
        {
          kind: "p",
          text:
            "The website may reference or connect to third-party platforms, government agencies, vendors, payment providers, scheduling systems, or professional resources.",
        },
        {
          kind: "p",
          text:
            "Consumer Services does not control these third parties and does not endorse every statement, product, service, policy, or security practice merely because it is mentioned or linked.",
        },
        {
          kind: "p",
          text:
            "Use of a third-party service is governed by that third party’s own terms and policies.",
        },
      ],
    },
    {
      number: 10,
      heading: "Disclaimer of Warranties",
      blocks: [
        {
          kind: "p",
          text:
            "To the fullest extent permitted by law, the website and its general content are provided on an “as is” and “as available” basis.",
        },
        {
          kind: "p",
          text:
            "Consumer Services disclaims warranties concerning uninterrupted availability, error-free operation, completeness, accuracy, merchantability, fitness for a particular purpose, and noninfringement, except where a warranty cannot lawfully be excluded.",
        },
      ],
    },
    {
      number: 11,
      heading: "Limitation of Liability",
      blocks: [
        {
          kind: "p",
          text:
            "To the fullest extent permitted by law, Consumer Services, Inc. and its officers, employees, contractors, and authorized representatives will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from:",
        },
        {
          kind: "list",
          items: [
            "Use of or inability to use the website",
            "Reliance on general website information",
            "Third-party websites or services",
            "Unauthorized access outside Consumer Services’ reasonable control",
          ],
        },
        {
          kind: "p",
          text:
            "Nothing in these Terms limits or excludes liability that cannot legally be limited or excluded.",
        },
      ],
    },
    {
      number: 12,
      heading: "Indemnification",
      blocks: [
        {
          kind: "p",
          text:
            "To the extent permitted by law, you agree to indemnify and hold Consumer Services, Inc. harmless from claims, losses, liabilities, or expenses arising from:",
        },
        {
          kind: "list",
          items: [
            "Your unlawful misuse of the website",
            "Your violation of these Terms",
            "Your infringement of another person’s rights",
            "Information you submitted without proper authorization",
          ],
        },
      ],
    },
    {
      number: 13,
      heading: "Privacy",
      blocks: [
        {
          kind: "p",
          text:
            "Use of personal information submitted through the website is governed by the Consumer Services, Inc. Privacy Policy and Data Sharing Disclosure.",
          links: [
            { text: "Privacy Policy", href: "/privacy-policy" },
            { text: "Data Sharing Disclosure", href: "/data-sharing" },
          ],
        },
      ],
    },
    {
      number: 14,
      heading: "Governing Law",
      blocks: [
        {
          kind: "p",
          text:
            "These Terms are governed by the laws of the State of Georgia, without regard to conflict-of-law principles, except where another law must apply.",
        },
        {
          kind: "p",
          text:
            "Any dispute involving these Terms or the website will be handled in a court of competent jurisdiction in Georgia unless applicable law requires otherwise or the parties agree to another resolution method in writing.",
        },
      ],
    },
    {
      number: 15,
      heading: "Severability",
      blocks: [
        {
          kind: "p",
          text:
            "If any provision of these Terms is determined to be invalid or unenforceable, the remaining provisions will continue in effect.",
        },
      ],
    },
    {
      number: 16,
      heading: "Changes to These Terms",
      blocks: [
        {
          kind: "p",
          text:
            "Consumer Services may revise these Terms as its website, services, or legal obligations change. Revised Terms will be posted on this page with an updated effective date.",
        },
        {
          kind: "p",
          text:
            "Continued use of the website after an update constitutes acceptance of the revised Terms to the extent permitted by law.",
        },
      ],
    },
    {
      number: 17,
      heading: "Contact Us",
      blocks: [
        {
          kind: "p",
          text: "Questions regarding these Terms may be directed to:",
        },
        { kind: "contact", lines: CONTACT_LINES },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Privacy Policy                                                      */
/* ------------------------------------------------------------------ */

export const privacyPolicy: LegalDocument = {
  path: "/privacy-policy",
  title: "Privacy Policy",
  effectiveDate: "September 12, 2026",
  lastUpdated: "September 12, 2026",

  preamble: [
    {
      kind: "p",
      text:
        "Consumer Services, Inc. (“Consumer Services,” “we,” “our,” or “us”) respects your privacy. This Privacy Policy explains how we collect, use, retain, protect, and disclose information received through LegacyByConsumer.com and other webpages operated by Consumer Services, Inc.",
    },
  ],

  sections: [
    {
      number: 1,
      heading: "Information We Collect",
      blocks: [
        {
          kind: "p",
          text: "We may collect information you voluntarily provide when you:",
        },
        {
          kind: "list",
          items: [
            "Complete a Business Readiness Assessment",
            "Submit a contact or inquiry form",
            "Request information about our services",
            "Schedule a consultation",
            "Communicate with us by telephone or email",
            "Enter into a consulting or service relationship",
          ],
        },
        { kind: "p", text: "The information may include:" },
        {
          kind: "list",
          items: [
            "Your name",
            "Email address",
            "Telephone number",
            "Business or organization name",
            "Business stage, industry, or operating status",
            "Description of your business, project, or objective",
            "Requested services",
            "Anticipated timeline",
            "Business challenges and readiness information",
            "Documents or information submitted during an engagement",
            "Billing and transaction information when services are purchased",
          ],
        },
        {
          kind: "p",
          text:
            "Please do not submit Social Security numbers, banking credentials, passwords, medical records, or other highly sensitive information through a general website form unless Consumer Services provides a secure and specifically authorized method.",
        },
      ],
    },
    {
      number: 2,
      heading: "Information Collected Automatically",
      blocks: [
        {
          kind: "p",
          text:
            "When you visit the website, limited technical information may be collected automatically, including:",
        },
        {
          kind: "list",
          items: [
            "Internet Protocol address",
            "Browser and device type",
            "Operating system",
            "Pages visited",
            "Date and time of access",
            "Referring website",
            "Website interaction, security, and performance information",
          ],
        },
        {
          kind: "p",
          text:
            "We may use cookies or similar technologies for essential website operation, security, analytics, performance, and user experience.",
        },
      ],
    },
    {
      number: 3,
      heading: "How We Use Information",
      blocks: [
        {
          kind: "p",
          text: "Consumer Services may use collected information to:",
        },
        {
          kind: "list",
          items: [
            "Review and respond to inquiries",
            "Assess a prospective client’s business needs",
            "Determine whether our services may be appropriate",
            "Schedule consultations",
            "Communicate about requested services",
            "Prepare proposals, agreements, plans, reports, or deliverables",
            "Provide and improve our services",
            "Manage client relationships and internal records",
            "Process authorized payments",
            "Operate and secure the website",
            "Prevent fraud, abuse, or unauthorized activity",
            "Meet legal, regulatory, accounting, insurance, and contractual obligations",
          ],
        },
        {
          kind: "p",
          text:
            "Submitting information does not guarantee service availability, acceptance as a client, funding, licensing, certification, approval, or any particular result.",
        },
      ],
    },
    {
      number: 4,
      heading: "How Information May Be Shared",
      blocks: [
        {
          kind: "p",
          text: "We may share information when reasonably necessary with:",
        },
        {
          kind: "list",
          items: [
            "Website hosting, form processing, email, scheduling, customer-management, analytics, payment, and cybersecurity providers",
            "Employees, contractors, and authorized team members who require the information to perform assigned responsibilities",
            "Attorneys, accountants, licensed professionals, consultants, or specialized resources involved in an authorized project",
            "Government agencies, regulators, courts, or law-enforcement authorities when disclosure is required by law",
            "A successor organization in connection with a lawful merger, reorganization, sale, or transfer of business assets",
          ],
        },
        {
          kind: "p",
          text:
            "When a project requires substantive information to be shared with an outside professional, we will obtain appropriate authorization when required.",
        },
        {
          kind: "p",
          text:
            "Consumer Services, Inc. does not sell or rent personal information.",
        },
      ],
    },
    {
      number: 5,
      heading: "Payments",
      blocks: [
        {
          kind: "p",
          text:
            "Payments may be processed through an independent payment provider. Consumer Services does not intend to store complete payment-card numbers or card-security codes on this website.",
        },
        {
          kind: "p",
          text:
            "Payment providers process information according to their own terms, privacy policies, and security practices.",
        },
      ],
    },
    {
      number: 6,
      heading: "Data Retention",
      blocks: [
        {
          kind: "p",
          text:
            "We retain information only for as long as reasonably necessary to:",
        },
        {
          kind: "list",
          items: [
            "Respond to an inquiry",
            "Evaluate or provide requested services",
            "Maintain appropriate client and business records",
            "Fulfill contractual obligations",
            "Meet tax, insurance, accounting, legal, and regulatory requirements",
            "Resolve disputes and enforce agreements",
          ],
        },
        {
          kind: "p",
          text:
            "Retention periods may vary according to the type of information and the reason it was collected.",
        },
      ],
    },
    {
      number: 7,
      heading: "Data Security",
      blocks: [
        {
          kind: "p",
          text:
            "We use reasonable administrative, technical, and organizational safeguards intended to protect information against unauthorized access, loss, misuse, alteration, or disclosure.",
        },
        {
          kind: "p",
          text:
            "No website, email system, electronic transmission, or storage method can be guaranteed to be completely secure. Users should exercise care when transmitting confidential information electronically.",
        },
      ],
    },
    {
      number: 8,
      heading: "Your Choices and Privacy Rights",
      blocks: [
        {
          kind: "p",
          text:
            "Subject to applicable law, you may request that Consumer Services:",
        },
        {
          kind: "list",
          items: [
            "Confirm whether we maintain your personal information",
            "Provide access to certain personal information",
            "Correct inaccurate information",
            "Delete information that we are not legally or contractually required to retain",
            "Explain how information has been used or disclosed",
            "Stop nonessential promotional communications",
          ],
        },
        {
          kind: "p",
          text:
            "We may need to verify your identity before completing a request. Certain information may be retained when required for legal, accounting, contractual, fraud-prevention, or recordkeeping purposes.",
        },
        {
          kind: "p",
          text:
            "Consumer Services will not unlawfully discriminate against an individual for exercising an applicable privacy right.",
        },
        {
          kind: "p",
          text: "Privacy requests may be submitted to info@legacybyconsumer.com.",
          links: [
            {
              text: "info@legacybyconsumer.com",
              href: "mailto:info@legacybyconsumer.com",
            },
          ],
        },
      ],
    },
    {
      number: 9,
      heading: "Email and Telephone Communications",
      blocks: [
        {
          kind: "p",
          text:
            "When you provide contact information in connection with an inquiry, Consumer Services may use it to respond and communicate about the services you requested.",
        },
        {
          kind: "p",
          text:
            "Submission of a general inquiry does not constitute consent to unrelated automated marketing text messages. Any automated promotional messaging program will require a separate consent process where legally required.",
        },
      ],
    },
    {
      number: 10,
      heading: "Children’s Privacy",
      blocks: [
        {
          kind: "p",
          text:
            "This website is intended for adults seeking business-related information and services. It is not directed to children under 13, and we do not knowingly collect personal information from children through the website.",
        },
      ],
    },
    {
      number: 11,
      heading: "Third-Party Websites",
      blocks: [
        {
          kind: "p",
          text:
            "The website may include links to third-party websites, applications, or services. Consumer Services does not control and is not responsible for the privacy, security, content, or practices of those third parties.",
        },
        {
          kind: "p",
          text:
            "Users should review the applicable third-party policies before providing information.",
        },
      ],
    },
    {
      number: 12,
      heading: "Changes to This Privacy Policy",
      blocks: [
        {
          kind: "p",
          text:
            "We may revise this Privacy Policy as our website, services, technology, or legal obligations change. The updated policy will be posted on this page with a revised “Last Updated” date.",
        },
      ],
    },
    {
      number: 13,
      heading: "Contact Us",
      blocks: [
        {
          kind: "p",
          text:
            "Questions, requests, or concerns regarding this Privacy Policy may be directed to:",
        },
        { kind: "contact", lines: CONTACT_LINES },
      ],
    },
  ],
};
