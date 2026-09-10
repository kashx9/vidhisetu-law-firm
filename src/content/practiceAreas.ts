/**
 * PRACTICE AREAS — drives the homepage "What We Do" grid, the header dropdown,
 * the /practice-areas index and every /practice-areas/:slug detail page.
 *
 * Adding an object here creates a fully-formed practice area page. Remember to
 * add the matching link in navigation.ts if it should appear in the menu.
 */

import type { IconName } from "@/lib/icons";

export type PracticeArea = {
  slug: string;
  /** Short label for chips, strips and cards. */
  title: string;
  /** Full title used as the page H1. */
  headline: string;
  icon: IconName;
  /** One line — used on the homepage grid and the index page. */
  summary: string;
  /** Two or three sentences — used as the page intro. */
  intro: string;
  /** "What this covers" — the concrete scope of work. */
  services: string[];
  /** "Typical situations" — the trigger moments a client recognises. */
  situations: string[];
  /** "What you receive" — tangible outputs. */
  deliverables: string[];
  faqs: { question: string; answer: string }[];
  /** Slugs from industries.ts, used for cross-linking. */
  relatedIndustries: string[];
  /** Shown on the homepage grid when true. All eight currently are. */
  featured: boolean;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "corporate-commercial",
    title: "Corporate & Commercial",
    headline: "Corporate & Commercial Advisory",
    icon: "building",
    summary: "Business structuring, governance, transactions and ongoing corporate legal support.",
    intro:
      "Every commercial decision has a legal shape. We advise founders, boards and management on how a business is structured, how it is governed and how it transacts — so that growth, investment and exit options stay open rather than being closed off by early decisions.",
    services: [
      "Entity selection, incorporation and group structuring",
      "Shareholder and joint venture arrangements",
      "Board processes, resolutions and corporate governance frameworks",
      "Business transfers, slump sales and asset acquisitions",
      "Commercial transactions and inter-company arrangements",
      "Secretarial and ongoing corporate compliance advisory",
    ],
    situations: [
      "You are setting up a holding company or restructuring group entities",
      "Two or more parties are coming together and need the terms written down",
      "An investor, lender or acquirer has asked for your corporate records",
      "Governance has become informal and needs to be put on a proper footing",
    ],
    deliverables: [
      "Structuring note with options, tax-adjacent flags and a recommendation",
      "Constitutional documents and shareholder arrangements",
      "Board and shareholder resolution templates",
      "Governance calendar for recurring corporate obligations",
    ],
    faqs: [
      {
        question: "We are a small company. Do we really need formal governance?",
        answer:
          "Formality is proportionate. A five-person company does not need a listed-company framework, but it does need clean minutes, a clear signing authority and shareholder terms that survive a disagreement. That is usually a short exercise, and it is far cheaper than reconstructing records during a due diligence.",
      },
      {
        question: "Can you work alongside our existing company secretary or auditor?",
        answer:
          "Yes. We routinely work alongside CS and CA teams and divide scope explicitly at the outset so nothing is duplicated or, more importantly, missed.",
      },
    ],
    relatedIndustries: ["msmes-corporates", "startups", "saas-technology"],
    featured: true,
  },
  {
    slug: "contracts",
    title: "Contracts",
    headline: "Contract Drafting & Negotiation",
    icon: "fileSignature",
    summary: "Drafting, reviewing, negotiating and strengthening commercial agreements.",
    intro:
      "A contract is where commercial intent either survives or quietly disappears. We draft and negotiate agreements that hold up commercially and legally — clear on obligations, honest about risk allocation, and workable for the people who have to perform them.",
    services: [
      "Master service agreements, SOWs and vendor contracts",
      "Distribution, reseller, channel and agency agreements",
      "Licensing, SaaS and technology agreements",
      "Non-disclosure, non-compete and non-solicitation arrangements",
      "Contract negotiation support and counter-drafting",
      "Contract playbooks, fallback positions and template libraries",
    ],
    situations: [
      "A counterparty has sent their paper and you need it reviewed before signing",
      "Your standard template has not been revisited in years",
      "The same clause is renegotiated in every deal and slows your sales cycle",
      "A commercial relationship has gone wrong and the contract is unclear",
    ],
    deliverables: [
      "Marked-up draft with a plain-English summary of what changed and why",
      "Risk memo identifying the clauses worth fighting for",
      "Negotiation playbook with preferred, acceptable and walk-away positions",
      "Standardised template set your team can issue without legal review",
    ],
    faqs: [
      {
        question: "Can you review a contract quickly if we are close to signing?",
        answer:
          "Yes. For time-sensitive reviews we work to an agreed turnaround and lead with the three or four issues that actually change your risk, rather than a full mark-up you do not have time to read.",
      },
      {
        question: "Will you build templates our team can use without calling you each time?",
        answer:
          "That is usually the objective. A good template set plus a short playbook lets your commercial team close routine deals independently and escalate only the genuine exceptions.",
      },
    ],
    relatedIndustries: ["saas-technology", "ecommerce", "msmes-corporates"],
    featured: true,
  },
  {
    slug: "startup-investment",
    title: "Startup & Investment",
    headline: "Startup & Investment Advisory",
    icon: "rocket",
    summary:
      "Incorporation, founder arrangements, investment documentation, fundraising readiness and transaction support.",
    intro:
      "Startups rarely fail for legal reasons, but weak legal foundations make good outcomes harder and bad outcomes worse. We work with founders from incorporation through to funding rounds — building the structure, the paperwork and the discipline that investors expect to find.",
    services: [
      "Incorporation, founder equity and vesting arrangements",
      "Founders' agreements and co-founder exit mechanics",
      "ESOP pool design and grant documentation",
      "SAFE, CCPS, convertible note and priced-round documentation",
      "Term sheet review, negotiation and closing support",
      "Investor due diligence readiness and data room preparation",
    ],
    situations: [
      "You are incorporating and want the cap table right from day one",
      "A co-founder is joining, leaving or changing commitment level",
      "A term sheet has landed and you need it read properly, not skimmed",
      "An investor has issued a diligence checklist and gaps are surfacing",
    ],
    deliverables: [
      "Clean incorporation set with founder and vesting documents",
      "Term sheet review note translating each clause into commercial consequence",
      "Complete round documentation through to closing and filings",
      "Diligence-ready document index with a remediation list",
    ],
    faqs: [
      {
        question: "We have not raised yet. Is it too early to involve a lawyer?",
        answer:
          "The cheapest legal work in a startup's life is the work done before the first round. Vesting, IP assignment and a clean cap table cost very little to set up and are expensive to fix once an investor is at the table.",
      },
      {
        question: "Do you review term sheets on a fixed fee?",
        answer:
          "Yes. Term sheet review is a defined scope and we quote it as a fixed fee so you know the cost before you engage.",
      },
    ],
    relatedIndustries: ["startups", "saas-technology", "healthcare-medtech"],
    featured: true,
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property",
    headline: "Intellectual Property",
    icon: "shield",
    summary:
      "Trademark strategy, protection, licensing, assignments, enforcement and IP diligence.",
    intro:
      "For most modern businesses the brand and the product are the balance sheet. We help clients identify what intellectual property they actually own, secure it properly, license it on sensible terms and enforce it when it is taken.",
    services: [
      "Trademark search, filing, prosecution and portfolio management",
      "Opposition, rectification and enforcement proceedings",
      "Copyright, design and trade secret protection strategy",
      "IP assignment from founders, employees and contractors",
      "Licensing, franchising and technology transfer agreements",
      "IP due diligence for investment and acquisition",
    ],
    situations: [
      "You are launching a brand and want to clear the name before you spend on it",
      "Someone is using a mark confusingly similar to yours",
      "Your product was partly built by contractors and IP ownership is unclear",
      "An investor has asked you to prove you own what you claim to own",
    ],
    deliverables: [
      "Clearance search report with a risk rating on the proposed mark",
      "Filing strategy across the classes that matter to your business",
      "Executed assignment chain closing every IP ownership gap",
      "Enforcement plan with commercial and litigation options costed",
    ],
    faqs: [
      {
        question: "How long does an Indian trademark registration take?",
        answer:
          "Filing is immediate and gives you a priority date and the ability to use the TM symbol. Registration itself commonly takes 12 to 24 months depending on examination and whether the mark is opposed.",
      },
      {
        question: "Our developers were freelancers. Do we own the code?",
        answer:
          "Not automatically. Absent a written assignment, authorship often stays with the contractor. This is one of the most common findings in diligence and it is straightforward to correct early, awkward to correct later.",
      },
    ],
    relatedIndustries: ["saas-technology", "food-and-beverage", "ecommerce"],
    featured: true,
  },
  {
    slug: "compliance-regulatory",
    title: "Compliance & Regulatory",
    headline: "Compliance & Regulatory",
    icon: "clipboardCheck",
    summary: "Regulatory mapping, compliance frameworks, policies, audits and ongoing advisory.",
    intro:
      "Compliance failures rarely arrive as a single dramatic event. They accumulate quietly until a licence, a funding round or an inspection brings them into view. We map what actually applies to your business, build a framework you can maintain, and keep it current as regulation moves.",
    services: [
      "Regulatory applicability mapping for your sector and footprint",
      "Compliance calendars, registers and ownership matrices",
      "Data protection and privacy programmes, including DPDP Act readiness",
      "Sector licensing, registrations and renewals",
      "Internal policies, SOPs and employee-facing compliance documentation",
      "Compliance audits, gap assessments and remediation plans",
    ],
    situations: [
      "You are not certain which regulations actually apply to you",
      "A licence renewal or inspection is approaching",
      "You collect personal data and have no privacy framework in place",
      "An investor or enterprise customer has sent a compliance questionnaire",
    ],
    deliverables: [
      "Applicability matrix mapping each obligation to a named internal owner",
      "Annual compliance calendar with filing dates and dependencies",
      "Policy set drafted for your operations, not generic boilerplate",
      "Gap assessment with a prioritised, time-bound remediation plan",
    ],
    faqs: [
      {
        question: "What does DPDP Act readiness involve in practice?",
        answer:
          "It starts with knowing what personal data you hold, why, and who you share it with. From there it is notice and consent mechanics, a grievance route, processor contracts and a breach response plan. The scale of the exercise depends entirely on your data footprint.",
      },
      {
        question: "Can you take ownership of our compliance calendar?",
        answer:
          "Yes, most commonly under a retainer. We maintain the calendar, flag upcoming obligations and advise as regulation changes, while your team retains operational execution.",
      },
    ],
    relatedIndustries: ["healthcare-medtech", "education", "food-and-beverage"],
    featured: true,
  },
  {
    slug: "employment-labour",
    title: "Employment & Labour",
    headline: "Employment & Labour",
    icon: "users",
    summary:
      "Employment documentation, workplace policies, POSH, contractor arrangements and employment risk management.",
    intro:
      "Employment disputes are expensive, public and avoidable. We help businesses hire, structure and, where necessary, separate from people in a way that is legally sound and does not damage the organisation on the way out.",
    services: [
      "Employment agreements, offer letters and appointment terms",
      "Employee handbooks and workplace policy frameworks",
      "POSH policy, Internal Committee constitution and training",
      "Consultant, contractor and gig-worker arrangements",
      "Restructuring, separation, settlement and exit documentation",
      "Labour law registrations, returns and inspection support",
    ],
    situations: [
      "Your offer letter has been in use since incorporation and has never been reviewed",
      "You have crossed the headcount threshold for statutory POSH obligations",
      "You engage contractors who look, in practice, like employees",
      "A separation is turning contentious and needs to be handled carefully",
    ],
    deliverables: [
      "Employment document set aligned to your actual working arrangements",
      "Handbook and policy suite ready for circulation",
      "POSH framework including IC constitution, policy and training material",
      "Separation strategy with documentation and a risk assessment",
    ],
    faqs: [
      {
        question: "When does POSH compliance become mandatory?",
        answer:
          "An Internal Committee is required once you have ten or more employees at a workplace. The obligation covers policy, committee constitution, awareness training and an annual return — and it applies regardless of the gender composition of your team.",
      },
      {
        question: "Are our contractors actually contractors?",
        answer:
          "It depends on substance, not the label on the agreement. Control over hours, integration into the team, exclusivity and tools all matter. Misclassification creates retrospective statutory exposure, so it is worth testing before someone else does.",
      },
    ],
    relatedIndustries: ["msmes-corporates", "saas-technology", "hospitality"],
    featured: true,
  },
  {
    slug: "litigation-arbitration",
    title: "Litigation & Arbitration",
    headline: "Litigation & Arbitration",
    icon: "scale",
    summary:
      "Commercial disputes, contractual disputes, arbitration, recovery and related proceedings.",
    intro:
      "We approach disputes commercially. Before anything is filed we assess what the matter is realistically worth, what it will cost in money and management attention, and whether a negotiated outcome serves you better than a judgment three years from now.",
    services: [
      "Commercial and contractual dispute strategy",
      "Domestic arbitration, from notice through to award and enforcement",
      "Recovery proceedings, including summary suits and insolvency notices",
      "Pre-litigation notices, demands and settlement negotiation",
      "Injunctions, interim relief and urgent applications",
      "Enforcement and execution of decrees and awards",
    ],
    situations: [
      "A customer or vendor has stopped paying and stopped responding",
      "You have received a legal notice and need a considered response",
      "A contract has been breached and you need to know your realistic options",
      "An arbitration clause has been invoked against you",
    ],
    deliverables: [
      "Case assessment covering merits, timeline, realistic recovery and cost",
      "Pre-litigation notice and a structured settlement approach",
      "Full conduct of proceedings with scheduled reporting",
      "Enforcement strategy once you hold a decree or award",
    ],
    faqs: [
      {
        question: "Should we settle or fight?",
        answer:
          "That is a commercial question that deserves a commercial answer. We put realistic numbers against both paths — recovery probability, time, cost and management distraction — and give you a recommendation rather than leaving the choice unframed.",
      },
      {
        question: "How long does a commercial dispute take in India?",
        answer:
          "Arbitration typically runs twelve to twenty-four months to award. Court timelines vary widely by forum and subject matter. We give you an honest range at the assessment stage, including the enforcement phase, which is often underestimated.",
      },
    ],
    relatedIndustries: ["msmes-corporates", "real-estate", "ecommerce"],
    featured: true,
  },
  {
    slug: "legal-due-diligence",
    title: "Legal Due Diligence",
    headline: "Legal Due Diligence",
    icon: "search",
    summary:
      "Legal health checks, transaction due diligence, red-flag identification and risk assessment.",
    intro:
      "Diligence is not a formality. It is the moment a business finds out what it actually owns, what it has agreed to and what it has missed. We run diligence for buyers and investors, and we run it in reverse for companies preparing to be examined.",
    services: [
      "Buy-side and investor-side legal due diligence",
      "Vendor and reverse diligence ahead of a fundraise or sale",
      "Periodic legal health checks for operating businesses",
      "Title, licensing and contract chain verification",
      "Red-flag reporting with materiality assessment",
      "Post-diligence remediation and condition-precedent closure",
    ],
    situations: [
      "You are investing in or acquiring a business",
      "You expect to raise and want to find your own problems first",
      "Your records have grown organically and nobody is certain what exists",
      "A diligence report has raised findings you need help closing",
    ],
    deliverables: [
      "Red-flag report ranked by materiality, not by document order",
      "Full diligence report with issue-by-issue analysis",
      "Remediation plan mapped to conditions precedent and subsequent",
      "Clean, indexed data room ready for counterparty review",
    ],
    faqs: [
      {
        question: "What is a legal health check?",
        answer:
          "A scaled-down diligence run on your own business — corporate records, contracts, IP, employment and compliance — that surfaces issues while they are still cheap to fix and while you control the timeline.",
      },
      {
        question: "How long does diligence take?",
        answer:
          "For a small to mid-size company, typically two to four weeks from a populated data room. The variable is almost never our speed; it is how quickly documents surface.",
      },
    ],
    relatedIndustries: ["msmes-corporates", "startups", "real-estate"],
    featured: true,
  },
];

export const getPracticeArea = (slug: string) => practiceAreas.find((area) => area.slug === slug);

export const featuredPracticeAreas = () => practiceAreas.filter((area) => area.featured);
