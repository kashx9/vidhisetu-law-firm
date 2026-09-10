/**
 * INDUSTRIES — drives the homepage "Industry Expertise" grid, the header
 * dropdown, /industries and every /industries/:slug page.
 *
 * Each industry page answers three questions: what legal needs this sector has,
 * what typically goes wrong, and which VidhiSetu services apply.
 */

import type { IconName } from "@/lib/icons";

export type Industry = {
  slug: string;
  title: string;
  icon: IconName;
  summary: string;
  intro: string;
  /** "Typical legal needs" for the sector. */
  needs: string[];
  /** "Where things go wrong" — the recurring risks. */
  risks: string[];
  /** Practice area slugs from practiceAreas.ts. */
  relevantPracticeAreas: string[];
};

export const industries: Industry[] = [
  {
    slug: "startups",
    title: "Startups & Emerging Businesses",
    icon: "rocket",
    summary: "Incorporation, founder equity, fundraising and the discipline investors expect.",
    intro:
      "Early-stage companies move quickly and document slowly. We help founders build a legal foundation that supports the next round rather than becoming the reason it is delayed.",
    needs: [
      "Incorporation and a defensible cap table",
      "Founder equity, vesting and role documentation",
      "IP assignment from founders, employees and contractors",
      "Investment documentation across SAFEs, notes and priced rounds",
      "ESOP design and grant administration",
      "Customer, vendor and platform contracts that scale",
    ],
    risks: [
      "Equity split agreed verbally and never documented",
      "Product IP sitting with a contractor or a founder personally",
      "Term sheet signed before its downstream consequences were understood",
      "Diligence gaps discovered at the worst possible moment",
    ],
    relevantPracticeAreas: [
      "startup-investment",
      "intellectual-property",
      "contracts",
      "corporate-commercial",
    ],
  },
  {
    slug: "msmes-corporates",
    title: "MSMEs & Corporates",
    icon: "building",
    summary:
      "Governance, contracts, employment and compliance for established operating businesses.",
    intro:
      "Established businesses accumulate legal debt: templates that were never revisited, informal arrangements that hardened into practice, records that live in three places. We help clear it and keep it clear.",
    needs: [
      "Corporate governance and secretarial discipline",
      "Vendor, customer and distribution contract frameworks",
      "Employment documentation and workplace policies",
      "Statutory and sector compliance management",
      "Recovery and commercial dispute handling",
      "Business transfer, restructuring and succession planning",
    ],
    risks: [
      "Long-running supplier relationships with no current signed contract",
      "Compliance obligations tracked by one person in a spreadsheet",
      "Receivables ageing past the point of practical recovery",
      "Group structures that grew without a plan",
    ],
    relevantPracticeAreas: [
      "corporate-commercial",
      "contracts",
      "compliance-regulatory",
      "litigation-arbitration",
    ],
  },
  {
    slug: "education",
    title: "Educational Institutions",
    icon: "graduationCap",
    summary: "Trust and society structures, regulatory approvals, staff and student frameworks.",
    intro:
      "Educational institutions operate under layered regulation and heightened public scrutiny. Legal work here is as much about governance and process as it is about documentation.",
    needs: [
      "Trust, society and section 8 company structuring",
      "Regulatory approvals, affiliations and recognitions",
      "Staff appointment terms and service rules",
      "Student admission policy, fee terms and grievance mechanisms",
      "POSH, child protection and campus safety frameworks",
      "Infrastructure, vendor and technology contracts",
    ],
    risks: [
      "Governing body decisions taken without proper record",
      "Fee and refund terms that do not survive challenge",
      "Approval conditions treated as one-time rather than continuing",
      "Data protection obligations around minors overlooked",
    ],
    relevantPracticeAreas: [
      "compliance-regulatory",
      "employment-labour",
      "corporate-commercial",
      "contracts",
    ],
  },
  {
    slug: "food-and-beverage",
    title: "F&B Businesses",
    icon: "utensils",
    summary: "Licensing, brand protection, franchising and outlet-level compliance.",
    intro:
      "F&B businesses live between two pressures: brand value that must be protected, and a licensing burden that multiplies with every outlet. Both need to be managed deliberately.",
    needs: [
      "FSSAI, local and municipal licensing across locations",
      "Trademark protection for brand, sub-brands and trade dress",
      "Franchise, cloud kitchen and outlet agreements",
      "Supplier, aggregator and delivery platform contracts",
      "Lease and revenue-share arrangements",
      "Staff documentation and shift-based employment terms",
    ],
    risks: [
      "Expansion outpacing licence renewals",
      "Franchisees operating outside brand standards with no contractual lever",
      "Aggregator terms accepted without negotiation",
      "Menu and recipe IP left unprotected",
    ],
    relevantPracticeAreas: [
      "compliance-regulatory",
      "intellectual-property",
      "contracts",
      "employment-labour",
    ],
  },
  {
    slug: "saas-technology",
    title: "SaaS & Technology",
    icon: "cpu",
    summary: "Product contracts, IP ownership, data protection and enterprise procurement.",
    intro:
      "Technology businesses sell promises about availability, security and data. Those promises live in contracts, and enterprise buyers read them closely. We make sure yours are ones you can keep.",
    needs: [
      "SaaS terms, MSAs, DPAs and service level commitments",
      "IP ownership chain across employees, contractors and open source",
      "Data protection compliance and cross-border transfer mechanics",
      "Enterprise procurement, security questionnaire and RFP support",
      "Reseller, partner and integration agreements",
      "Investment and diligence readiness",
    ],
    risks: [
      "Uncapped liability accepted to close an enterprise deal",
      "SLA credits promised without operational capacity to meet them",
      "Open source licence obligations never reviewed",
      "Personal data flowing offshore with no transfer basis",
    ],
    relevantPracticeAreas: [
      "contracts",
      "intellectual-property",
      "compliance-regulatory",
      "startup-investment",
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    icon: "shoppingCart",
    summary: "Platform terms, consumer law, marketplace contracts and seller frameworks.",
    intro:
      "E-commerce sits at the intersection of consumer protection, platform liability and payments regulation — an area where enforcement has become noticeably more active.",
    needs: [
      "Website terms, privacy policy and returns framework",
      "Consumer Protection (E-Commerce) Rules compliance",
      "Marketplace, seller and logistics agreements",
      "Payment gateway and escrow arrangements",
      "Brand protection and counterfeit enforcement",
      "Advertising, influencer and promotional compliance",
    ],
    risks: [
      "Return and refund terms that fail consumer law tests",
      "Dark-pattern exposure in checkout and subscription flows",
      "Counterfeit listings with no takedown mechanism in place",
      "Influencer disclosure obligations left unmanaged",
    ],
    relevantPracticeAreas: [
      "compliance-regulatory",
      "contracts",
      "intellectual-property",
      "litigation-arbitration",
    ],
  },
  {
    slug: "healthcare-medtech",
    title: "Healthcare & MedTech",
    icon: "heartPulse",
    summary: "Clinical establishment licensing, device regulation, patient data and consent.",
    intro:
      "Healthcare businesses carry regulatory and reputational risk simultaneously. Documentation, consent and data handling need to be right before anything is questioned.",
    needs: [
      "Clinical establishment registration and facility licensing",
      "Medical device classification, registration and import compliance",
      "Patient consent, records and health data protection frameworks",
      "Telemedicine practice compliance",
      "Doctor engagement, empanelment and referral arrangements",
      "Clinical trial and research documentation",
    ],
    risks: [
      "Consent forms that do not match what is actually done",
      "Health data shared with technology vendors on standard terms",
      "Device classification assumed rather than confirmed",
      "Referral arrangements that raise ethical and legal questions",
    ],
    relevantPracticeAreas: [
      "compliance-regulatory",
      "contracts",
      "corporate-commercial",
      "intellectual-property",
    ],
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    icon: "landmark",
    summary: "Title diligence, development structures, RERA compliance and leasing.",
    intro:
      "Real estate transactions turn on documents that are decades old and obligations that run for decades more. Diligence here is not optional, and shortcuts surface later.",
    needs: [
      "Title search, verification and diligence reporting",
      "Sale, development, joint development and TDR arrangements",
      "RERA registration and continuing compliance",
      "Commercial and retail leasing, licensing and fit-out terms",
      "Society, association and redevelopment matters",
      "Property disputes, possession and specific performance",
    ],
    risks: [
      "Chain of title with an unexplained gap",
      "Development agreements silent on delay consequences",
      "RERA disclosures that drift from project reality",
      "Lease terms lacking a workable exit",
    ],
    relevantPracticeAreas: [
      "legal-due-diligence",
      "contracts",
      "litigation-arbitration",
      "compliance-regulatory",
    ],
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    icon: "hotel",
    summary: "Property agreements, multi-licence operations, guest liability and staffing.",
    intro:
      "Hospitality combines property, licensing, employment and consumer-facing risk in a single operation. Each needs its own discipline, and they interact.",
    needs: [
      "Hotel management, operating and franchise agreements",
      "Lease, revenue-share and property arrangements",
      "Excise, fire, tourism and municipal licensing",
      "Guest terms, liability limitation and cancellation policy",
      "Event, banquet and vendor contracts",
      "Shift-based employment and contractor documentation",
    ],
    risks: [
      "Operator agreements with weak performance and exit terms",
      "Licences renewed reactively rather than on a calendar",
      "Guest liability exposure not reflected in insurance",
      "Contract staffing arrangements creating principal-employer exposure",
    ],
    relevantPracticeAreas: [
      "contracts",
      "compliance-regulatory",
      "employment-labour",
      "corporate-commercial",
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((industry) => industry.slug === slug);
