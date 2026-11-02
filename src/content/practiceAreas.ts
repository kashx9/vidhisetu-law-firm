/**
 * PRACTICE AREAS — drives the homepage "What We Do" grid, the header dropdown,
 * the /practice-areas index and every /practice-areas/:slug detail page.
 *
 * Copy here is supplied by the legal team. Each entry carries exactly what they
 * provided: the practice name, its tagline, the descriptive paragraph, the
 * "Our services include" list, and (where given) a closing note.
 *
 * `relatedIndustries` and `icon` are presentation choices, not legal copy.
 *
 * Adding an object here creates a fully-formed practice area page. Remember to
 * add the matching link in navigation.ts if it should appear in the menu.
 */

import type { IconName } from "@/lib/icons";

export type PracticeArea = {
  slug: string;
  /** Short name, used in nav, chips, cards and breadcrumbs. */
  title: string;
  /** Full designation where the legal team gave a longer one. Detail page only. */
  titleLong?: string;
  /** The tagline. Rendered as the H1 on the detail page. */
  headline: string;
  icon: IconName;
  /** The descriptive paragraph. */
  intro: string;
  /** "Our services include" — verbatim from the legal team. */
  services: string[];
  /** Closing caveat shown under the services list, where one was given. */
  note?: string;
  /**
   * Optional. The legal team has not supplied FAQs yet; when they do, add them
   * here and the Questions section appears on the detail page automatically.
   */
  faqs?: { question: string; answer: string }[];
  /** Slugs from industries.ts, used for cross-linking. */
  relatedIndustries: string[];
  /** Shown on the homepage grid when true. */
  featured: boolean;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "corporate-advisory",
    title: "Corporate Advisory",
    headline: "Strategic Legal Counsel for Business Decisions",
    icon: "building",
    intro:
      "We provide practical corporate legal advice to help businesses structure their operations, navigate complex transactions, and make informed strategic decisions. Our approach aligns legal considerations with commercial objectives, enabling businesses to manage risk while pursuing sustainable growth.",
    services: [
      "Corporate structuring, restructuring, and business reorganisations",
      "Joint ventures, strategic alliances, and shareholder arrangements",
      "Corporate legal audits and risk assessments",
      "Advisory on directors’ duties and corporate responsibilities",
      "Mergers, acquisitions, and business transfer support",
      "Ongoing corporate legal advisory and retainers",
    ],
    relatedIndustries: ["corporates", "msmes", "startups"],
    featured: true,
  },
  {
    slug: "commercial-contracts",
    title: "Commercial Contracts",
    headline: "Clear Agreements. Stronger Business Relationships.",
    icon: "fileSignature",
    intro:
      "Well-drafted contracts establish clear expectations, allocate risk, and protect commercial interests. We assist businesses in drafting, reviewing, negotiating, and managing agreements that reflect their operational requirements and commercial priorities.",
    services: [
      "Master Service Agreements and service contracts",
      "Vendor, supplier, and procurement agreements",
      "Non-Disclosure Agreements and confidentiality arrangements",
      "Franchise, distribution, and licensing agreements",
      "Technology, SaaS, and platform agreements",
      "Partnership, collaboration, and Memoranda of Understanding",
      "Contract review, negotiation, and risk allocation",
    ],
    relatedIndustries: ["corporates", "msmes", "automobile"],
    featured: true,
  },
  {
    slug: "startup-legal-advisory",
    title: "Startup Legal Advisory",
    headline: "Build on a Strong Legal Foundation.",
    icon: "rocket",
    intro:
      "From incorporation to investment and expansion, we help startups establish the legal foundations required to grow with confidence. Our advisory combines business structuring, founder protection, intellectual property, regulatory readiness, and transaction support at every critical stage of the startup journey.",
    services: [
      "Entity selection, incorporation, and structuring",
      "Founder agreements and shareholder arrangements",
      "Investment documentation, term sheets, and funding support",
      "DPIIT recognition and startup regulatory advisory",
      "Intellectual property ownership and protection",
      "ESOP documentation and employee arrangements",
      "Legal readiness assessments and investor due diligence",
      "Startup legal retainers and ongoing advisory",
    ],
    relatedIndustries: ["startups", "food-and-beverage", "msmes"],
    featured: true,
  },
  {
    slug: "due-diligence",
    title: "Due Diligence",
    titleLong: "Due Diligence — Legal, Financial and Operational",
    headline: "Know the Risks Before You Commit.",
    icon: "search",
    intro:
      "Informed business decisions require a clear understanding of an organisation’s legal position, financial exposure, and operational preparedness. We coordinate structured due diligence reviews to identify material risks, uncover compliance gaps, and support investment, acquisition, partnership, and business expansion decisions.",
    services: [
      "Corporate records, ownership, and statutory documentation review",
      "Contractual obligations, liabilities, and dispute assessment",
      "Intellectual property ownership and asset verification",
      "Financial record review and identification of financial red flags, with qualified financial professionals where required",
      "Operational processes, key dependencies, and business risk assessment",
      "Regulatory and statutory compliance review",
      "Risk categorisation, findings reports, and corrective action plans",
      "Investor and transaction readiness support",
    ],
    note: "Financial and operational reviews are scoped according to the engagement and may involve specialist accountants, auditors, or other professionals.",
    relatedIndustries: ["corporates", "startups", "automobile"],
    featured: true,
  },
  {
    slug: "compliance-governance",
    title: "Compliance & Governance",
    headline: "Stay Compliant. Operate with Confidence.",
    icon: "clipboardCheck",
    intro:
      "We help organisations build systematic compliance frameworks that integrate regulatory obligations into everyday business operations. From identifying applicable laws to establishing internal policies and monitoring mechanisms, our focus is on reducing compliance gaps and promoting accountability.",
    services: [
      "Statutory and regulatory compliance mapping",
      "Compliance calendars and obligation tracking frameworks",
      "Corporate secretarial coordination and filing support",
      "Internal policies, codes, and procedural documentation",
      "Data protection and privacy compliance advisory",
      "POSH policy and workplace compliance support",
      "Compliance audits, gap assessments, and remediation plans",
      "Ongoing compliance monitoring and reporting frameworks",
    ],
    relatedIndustries: ["education", "food-and-beverage", "automobile"],
    featured: true,
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property",
    headline: "Protect the Ideas Behind Your Business.",
    icon: "shield",
    intro:
      "Intellectual property is a valuable business asset that supports innovation, brand differentiation, and commercial growth. We assist businesses in identifying, protecting, documenting, and managing their intellectual property rights, helping them establish clear ownership and make informed decisions about commercialisation.",
    services: [
      "IP portfolio assessment and intellectual property audits",
      "Copyright protection and documentation",
      "Patent-related legal coordination and application support",
      "IP assignment, licensing, and ownership agreements",
      "Trade secret and confidential information protection",
      "IP ownership clauses in founder, employment, and vendor agreements",
      "IP due diligence for investments and business transactions",
      "Advisory on infringement, enforcement, and dispute strategy",
    ],
    relatedIndustries: ["startups", "education", "automobile"],
    featured: true,
  },
  {
    slug: "trademark",
    title: "Trademark",
    headline: "Secure Your Brand. Protect Your Identity.",
    icon: "badgeCheck",
    intro:
      "Your brand represents the trust, reputation, and recognition you build in the marketplace. We assist businesses in securing and managing trademark rights, from preliminary searches and application filing to responding to objections and addressing infringement concerns.",
    services: [
      "Trademark availability searches and registrability assessments",
      "Trademark application preparation and filing",
      "Classification of goods and services",
      "Examination report responses and objection handling",
      "Opposition, counterstatement, and rectification proceedings",
      "Trademark renewal and portfolio management",
      "Assignment, licensing, and ownership transfers",
      "Brand infringement advisory and cease-and-desist notices",
      "International trademark filing coordination",
    ],
    relatedIndustries: ["food-and-beverage", "msmes", "startups"],
    featured: true,
  },
  {
    slug: "litigation-support",
    title: "Litigation Support",
    headline: "Prepared Strategy for Complex Legal Disputes.",
    icon: "scale",
    intro:
      "Disputes can affect business continuity, financial stability, and commercial relationships. We assist clients in evaluating disputes, preparing legal documentation, organising evidence, and developing case strategies in coordination with counsel and other professionals, as appropriate to the matter.",
    services: [
      "Case assessment and dispute strategy",
      "Legal notices, replies, and written representations",
      "Drafting and review of pleadings, applications, and affidavits",
      "Evidence compilation, document indexing, and chronology preparation",
      "Commercial, contractual, and recovery disputes",
      "Corporate and employment-related disputes",
      "Assistance in proceedings before courts, tribunals, and statutory authorities",
      "Coordination with arguing counsel and local advocates",
      "Settlement strategy and pre-litigation resolution",
    ],
    relatedIndustries: ["corporates", "msmes", "automobile"],
    featured: true,
  },
  {
    slug: "arbitration-mediation",
    title: "Arbitration & Mediation",
    headline: "Resolve Disputes. Preserve Business Value.",
    icon: "handshake",
    intro:
      "Not every commercial disagreement needs to become prolonged litigation. We advise clients on alternative dispute resolution mechanisms, helping them assess their options, prepare their cases, and pursue commercially sensible outcomes through arbitration, mediation, and negotiated settlements.",
    services: [
      "Review of arbitration clauses and dispute resolution provisions",
      "Arbitration strategy and procedural advisory",
      "Drafting statements of claim, defence, and related applications",
      "Preparation of evidence, submissions, and case documentation",
      "Mediation preparation and settlement negotiations",
      "Contractual and commercial dispute resolution",
      "Assistance with enforcement and challenge proceedings, where applicable",
      "Drafting settlement agreements and dispute closure documentation",
    ],
    relatedIndustries: ["corporates", "automobile", "msmes"],
    featured: true,
  },
  {
    slug: "employment-documentation",
    title: "Employment Documentation",
    headline: "Clear Employment Terms. Stronger Workplace Practices.",
    icon: "users",
    intro:
      "A well-defined employment framework protects organisational interests while establishing clarity and fairness in the workplace. We assist businesses in creating consistent employment documentation and HR policies aligned with their operational structure and applicable employment laws.",
    services: [
      "Appointment letters and employment agreements",
      "Consultant, freelancer, and independent contractor agreements",
      "Confidentiality, intellectual property, and data protection clauses",
      "Employee handbooks and HR policies",
      "Code of conduct and disciplinary procedures",
      "POSH policies and related documentation",
      "Probation, performance, termination, and exit documentation",
      "Full-and-final settlement documentation and employment-related notices",
      "Employment documentation reviews and labour law advisory",
    ],
    relatedIndustries: ["education", "food-and-beverage", "corporates"],
    featured: true,
  },
  {
    slug: "legal-management",
    title: "Legal Management",
    headline: "From Fragmented Documents to Structured Legal Operations.",
    icon: "workflow",
    intro:
      "Legal management is about making legal information accessible, responsibilities visible, and obligations easier to track. We help businesses move beyond reactive legal support by developing structured documentation systems, contract management processes, and repeatable legal workflows.",
    services: [
      "Centralised legal document and records management frameworks",
      "Contract lifecycle management processes",
      "Contract registers, obligation trackers, and renewal calendars",
      "Legal risk registers and escalation workflows",
      "Standardised templates, clause libraries, and legal playbooks",
      "Legal request management and internal approval processes",
      "Legal operations reviews and process optimisation",
      "Legal technology adoption and workflow implementation advisory",
      "Ongoing legal management support and retainers",
    ],
    note: "This practice area complements Vidhi Setu’s technology-enabled vision for structured legal operations and contract intelligence.",
    relatedIndustries: ["corporates", "msmes", "education"],
    featured: true,
  },
  {
    slug: "business-governance",
    title: "Business Governance",
    headline: "Build Accountability into the Way You Operate.",
    icon: "network",
    intro:
      "Strong governance establishes how decisions are made, responsibilities are allocated, and organisational risks are managed. We assist businesses in developing governance structures that promote transparency, informed decision-making, internal accountability, and long-term institutional resilience.",
    services: [
      "Governance framework design and documentation",
      "Board and management decision-making protocols",
      "Delegation of authority and approval matrices",
      "Founder, partner, and shareholder governance arrangements",
      "Internal policies, codes of conduct, and operating protocols",
      "Conflict-of-interest and related-party transaction frameworks",
      "Risk management and internal control documentation",
      "Grievance escalation and reporting mechanisms",
      "Governance reviews and institutional policy development",
    ],
    relatedIndustries: ["corporates", "education", "msmes"],
    featured: true,
  },
];

export const getPracticeArea = (slug: string) => practiceAreas.find((area) => area.slug === slug);

export const featuredPracticeAreas = () => practiceAreas.filter((area) => area.featured);
