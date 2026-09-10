/**
 * STARTUP LEGAL JOURNEY — the nine stages from incorporation to ongoing advisory.
 * Used on the homepage featured section and the /startup-legal page.
 */

export type JourneyStage = {
  step: string;
  title: string;
  summary: string;
  /** Shown on the /startup-legal page as the concrete scope for that stage. */
  includes: string[];
};

export const startupJourney: JourneyStage[] = [
  {
    step: "01",
    title: "Incorporation",
    summary: "Getting the entity, jurisdiction and founding records right the first time.",
    includes: [
      "Entity and jurisdiction selection",
      "Incorporation filings",
      "Statutory registers and first board records",
    ],
  },
  {
    step: "02",
    title: "Business Structuring",
    summary: "Structuring for how you intend to raise, operate and eventually exit.",
    includes: [
      "Holding and subsidiary structure",
      "Revenue and contracting flows",
      "Cross-border structuring considerations",
    ],
  },
  {
    step: "03",
    title: "Founder & Co-founder Documentation",
    summary: "Equity, vesting, roles and what happens if someone leaves.",
    includes: [
      "Founders' agreement",
      "Vesting and cliff mechanics",
      "Leaver provisions and buy-back rights",
    ],
  },
  {
    step: "04",
    title: "Contracts",
    summary: "The customer, vendor and employment paper that carries the business.",
    includes: [
      "Customer and vendor templates",
      "Employment and consultant agreements",
      "Platform and partnership terms",
    ],
  },
  {
    step: "05",
    title: "Intellectual Property",
    summary: "Owning what you built, and being able to prove it.",
    includes: [
      "Trademark clearance and filing",
      "IP assignment chain",
      "Open source and third-party licence review",
    ],
  },
  {
    step: "06",
    title: "Compliance",
    summary: "The obligations that attach as soon as you hire, sell or collect data.",
    includes: [
      "Applicability mapping",
      "Compliance calendar",
      "Data protection and privacy framework",
    ],
  },
  {
    step: "07",
    title: "Fundraising",
    summary: "Term sheet through to closing, with the downstream consequences explained.",
    includes: [
      "Term sheet review and negotiation",
      "SAFE, note and priced-round documentation",
      "Closing, filings and cap table update",
    ],
  },
  {
    step: "08",
    title: "Due Diligence",
    summary: "Finding your own problems before an investor finds them for you.",
    includes: [
      "Reverse diligence review",
      "Data room preparation",
      "Remediation of identified gaps",
    ],
  },
  {
    step: "09",
    title: "Ongoing Legal Advisory",
    summary: "Continuing counsel as the company scales past its first structure.",
    includes: [
      "Monthly advisory retainer",
      "Contract review as volume grows",
      "Board and governance support",
    ],
  },
];
