/**
 * INDUSTRIES — drives the homepage "Industry Expertise" grid, the header
 * dropdown, /industries and every /industries/:slug page.
 *
 * Copy supplied by the legal team. `intro`, `needs`, `risks` and the title and
 * description of every entry in `services` are verbatim — edit with care.
 * `summary` (the one-line card label), `icon` and the `slug` each service links
 * to are presentation choices, not legal copy.
 *
 * Each industry page answers three questions: what legal needs this sector has,
 * what typically goes wrong, and which VidhiSetu services apply.
 */

import type { IconName } from "@/lib/icons";

export type Industry = {
  slug: string;
  /** Short name, used in nav, cards, breadcrumbs and the grid. */
  title: string;
  /** Full designation where the legal team gave a longer one. Detail page only. */
  titleLong?: string;
  icon: IconName;
  /** One line for the grid card and the meta description. */
  summary: string;
  /** The descriptive paragraph. Rendered as the hero lead. */
  intro: string;
  /** "Typical legal needs" for the sector. */
  needs: string[];
  /** "Where things go wrong" — the recurring risks. */
  risks: string[];
  /**
   * "Relevant services" as the legal team named and described them for this
   * sector. `slug` points at the practice area the card links to, where there
   * is a clear match — several of these names span two practice areas.
   */
  services: { title: string; description: string; slug?: string }[];
};

export const industries: Industry[] = [
  {
    slug: "startups",
    title: "Startups & Emerging Businesses",
    icon: "rocket",
    summary:
      "Structures, agreements and safeguards for founders building, funding and scaling a venture.",
    intro:
      "Early-stage businesses move quickly, but their legal foundations often struggle to keep pace. We help founders establish the structures, agreements, and safeguards needed to build, fund, and scale their ventures without avoidable legal complications.",
    needs: [
      "Incorporation, ownership structuring, and a clearly documented cap table",
      "Founder agreements, equity allocation, vesting, and role documentation",
      "Intellectual property ownership and assignment from founders, employees, and contractors",
      "Investment documentation for funding rounds, convertible instruments, and equity financing",
      "ESOP frameworks and employee incentive documentation",
      "Customer, vendor, technology, and platform agreements",
      "Regulatory compliance, startup recognition, and fundraising readiness",
    ],
    risks: [
      "Equity arrangements agreed verbally and never formally documented",
      "Product IP remaining with individual founders or external developers",
      "Investment terms accepted without understanding their long-term implications",
      "Inadequate contractual protection in customer and vendor relationships",
      "Compliance gaps and documentation deficiencies discovered during investor due diligence",
    ],
    services: [
      {
        title: "Startup Legal Advisory",
        description:
          "Entity structuring, founder arrangements, investment documentation, fundraising readiness, and legal support through critical growth stages.",
        slug: "startup-legal-advisory",
      },
      {
        title: "Corporate & Commercial Advisory",
        description:
          "Business structuring, governance, commercial transactions, and ongoing legal counsel aligned with business objectives.",
        slug: "corporate-advisory",
      },
      {
        title: "Intellectual Property",
        description:
          "Trademark protection, IP ownership, assignments, licensing, and portfolio management.",
        slug: "intellectual-property",
      },
      {
        title: "Contract Drafting & Negotiation",
        description:
          "Drafting, reviewing, and negotiating commercial, technology, employment, and vendor agreements.",
        slug: "commercial-contracts",
      },
      {
        title: "Due Diligence",
        description:
          "Legal readiness assessments, documentation reviews, risk identification, and investor diligence support.",
        slug: "due-diligence",
      },
    ],
  },
  {
    slug: "msmes",
    title: "MSMEs",
    titleLong: "Micro, Small & Medium Enterprises (MSMEs)",
    icon: "store",
    summary:
      "Practical systems that protect cash flow, formalise business relationships and support expansion.",
    intro:
      "Growing enterprises need more than day-to-day legal assistance. They need practical systems that protect cash flow, formalise business relationships, and support sustainable expansion. We help MSMEs strengthen their legal and operational foundations while managing contractual, regulatory, and commercial risks.",
    needs: [
      "Business structuring, partnership arrangements, and ownership documentation",
      "Customer, supplier, distributor, and service agreements",
      "Payment terms, credit arrangements, and protection against delayed receivables",
      "MSME registration-related advisory and applicable statutory compliance",
      "Employment documentation, workplace policies, and contractor agreements",
      "Trademark registration and intellectual property protection",
      "Vendor onboarding, procurement terms, and commercial negotiations",
      "Business expansion, franchise arrangements, and strategic partnerships",
    ],
    risks: [
      "Business transactions conducted on informal understandings without enforceable documentation",
      "Delayed payments and disputes affecting working capital",
      "Unclear responsibilities between promoters, partners, and family members involved in the business",
      "Unregistered or inadequately protected brands and business assets",
      "Missed statutory obligations and inconsistent compliance practices",
      "Expansion into new markets without appropriate contractual safeguards",
    ],
    services: [
      {
        title: "Corporate Advisory",
        description:
          "Business structuring, partnership arrangements, ownership documentation, and commercial decision support.",
        slug: "corporate-advisory",
      },
      {
        title: "Commercial Contracts",
        description:
          "Supplier, customer, distributor, franchise, and service agreements designed around business requirements.",
        slug: "commercial-contracts",
      },
      {
        title: "Compliance & Governance",
        description:
          "Applicable compliance mapping, internal policies, statutory obligation tracking, and governance documentation.",
        slug: "compliance-governance",
      },
      {
        title: "Intellectual Property & Trademark",
        description:
          "Brand protection, trademark filing, IP assignments, licensing, and infringement-related advisory.",
        slug: "intellectual-property",
      },
      {
        title: "Legal Management",
        description:
          "Contract registers, legal documentation systems, compliance calendars, and ongoing legal support through retainers.",
        slug: "legal-management",
      },
      {
        title: "Dispute Resolution",
        description:
          "Payment recovery strategy, contractual dispute advisory, legal notices, and appropriate litigation or alternative dispute resolution support.",
        slug: "litigation-support",
      },
    ],
  },
  {
    slug: "corporates",
    title: "Corporate & Established Businesses",
    icon: "building",
    summary:
      "Governance, commercial relationships and legal oversight built into business decisions.",
    intro:
      "As organisations grow, their legal exposure becomes more complex. Multiple stakeholders, layered contracts, regulatory obligations, and business transactions require a structured approach to legal risk. We support corporate clients in strengthening governance, managing commercial relationships, and integrating legal oversight into business decisions.",
    needs: [
      "Corporate structuring, restructuring, and transaction support",
      "Board governance, shareholder arrangements, and decision-making frameworks",
      "Commercial contracts, procurement agreements, and strategic partnerships",
      "Regulatory compliance mapping and internal policy development",
      "Legal due diligence for investments, acquisitions, and business collaborations",
      "Employment documentation, workplace policies, and confidentiality arrangements",
      "Intellectual property ownership, licensing, and portfolio management",
      "Contract lifecycle management and legal operations frameworks",
    ],
    risks: [
      "Governance structures failing to keep pace with organisational growth",
      "Inconsistent contract terms and unclear allocation of commercial risk",
      "Regulatory obligations dispersed across teams without clear accountability",
      "Inadequate documentation of board decisions, approvals, and delegated authority",
      "Contractual liabilities or compliance gaps identified during transactions",
      "Legal departments relying on fragmented records and manual tracking processes",
    ],
    services: [
      {
        title: "Corporate Advisory",
        description:
          "Corporate structuring, shareholder matters, business reorganisations, and strategic transaction support.",
        slug: "corporate-advisory",
      },
      {
        title: "Commercial Contracts",
        description:
          "Contract drafting, negotiation, risk allocation, and standardisation of commercial agreements.",
        slug: "commercial-contracts",
      },
      {
        title: "Compliance & Governance",
        description:
          "Compliance frameworks, internal policies, board governance documentation, and risk management structures.",
        slug: "compliance-governance",
      },
      {
        title: "Due Diligence",
        description:
          "Legal, financial, and operational risk reviews for transactions, partnerships, investments, and restructuring.",
        slug: "due-diligence",
      },
      {
        title: "Legal Management",
        description:
          "Contract lifecycle management, centralised legal documentation, obligation tracking, and legal workflow optimisation.",
        slug: "legal-management",
      },
      {
        title: "Litigation Support & Dispute Resolution",
        description:
          "Dispute assessment, legal documentation, coordination with counsel, arbitration support, and settlement strategy.",
        slug: "litigation-support",
      },
    ],
  },
  {
    slug: "education",
    title: "Educational Institutions",
    icon: "graduationCap",
    summary:
      "Legal frameworks for institutional governance, stakeholder protection and sustainable operations.",
    intro:
      "Educational institutions operate at the intersection of academic objectives, student welfare, employment relationships, and regulatory responsibilities. We help schools, colleges, coaching centres, training providers, and education businesses establish clear legal frameworks that support institutional governance, protect stakeholders, and enable sustainable operations.",
    needs: [
      "Institutional structuring and governance documentation",
      "Student admission terms, enrolment agreements, and fee policies",
      "Employment agreements for faculty, administrative staff, and consultants",
      "Agreements with technology providers, publishers, vendors, and service partners",
      "Data protection and confidentiality frameworks for student and staff information",
      "Intellectual property protection for course materials, teaching resources, and digital content",
      "Policies addressing student conduct, grievances, disciplinary processes, and workplace safety",
      "Lease, infrastructure, facility management, and outsourcing agreements",
      "Regulatory and affiliation-related documentation, as applicable to the institution",
    ],
    risks: [
      "Admission, refund, and fee-related disputes arising from unclear policies",
      "Inadequate documentation of employment terms and institutional responsibilities",
      "Unauthorised use or reproduction of educational content and learning materials",
      "Improper handling of student records and personal information",
      "Gaps in grievance redressal, safeguarding, and workplace policies",
      "Vendor and technology agreements that inadequately address data security, service obligations, or liability",
      "Governance and regulatory documentation that does not reflect the institution's operating model",
    ],
    services: [
      {
        title: "Corporate & Institutional Advisory",
        description:
          "Institutional structuring, governance frameworks, operational documentation, and legal advisory for education-related businesses.",
        slug: "corporate-advisory",
      },
      {
        title: "Commercial Contracts",
        description:
          "Vendor, technology, outsourcing, facility management, collaboration, and service agreements.",
        slug: "commercial-contracts",
      },
      {
        title: "Employment Documentation",
        description:
          "Faculty and staff contracts, consultant agreements, confidentiality clauses, workplace policies, and disciplinary documentation.",
        slug: "employment-documentation",
      },
      {
        title: "Compliance & Governance",
        description:
          "Institutional policies, applicable regulatory compliance, grievance frameworks, data protection advisory, and governance documentation.",
        slug: "compliance-governance",
      },
      {
        title: "Intellectual Property",
        description:
          "Protection and licensing of educational content, course materials, publications, brands, and digital learning resources.",
        slug: "intellectual-property",
      },
      {
        title: "Litigation Support & Dispute Resolution",
        description:
          "Assistance with contractual disputes, employment matters, student-related disputes, legal notices, and appropriate dispute resolution processes.",
        slug: "litigation-support",
      },
    ],
  },
  {
    slug: "food-and-beverage",
    title: "F&B Businesses",
    titleLong: "Food & Beverage (F&B) Businesses",
    icon: "utensils",
    summary:
      "Legally sound operations for restaurants, cloud kitchens, food brands and hospitality operators.",
    intro:
      "F&B businesses operate in a fast-moving environment where brand reputation, supplier relationships, food-related regulations, and customer experience directly influence commercial success. We help restaurants, cafés, cloud kitchens, food manufacturers, packaged food brands, and hospitality operators build legally sound operations and prepare for expansion.",
    needs: [
      "Entity structuring, partnership arrangements, and franchise documentation",
      "Restaurant, café, cloud kitchen, and food business operating agreements",
      "Lease agreements, licences, and premises-related contractual documentation",
      "Vendor, supplier, procurement, and distribution agreements",
      "Food safety, labelling, packaging, and applicable FSSAI compliance advisory",
      "Trademark protection for restaurant names, food brands, and product lines",
      "Employment contracts, staff policies, and service provider agreements",
      "Delivery platform, aggregator, technology, and online marketplace agreements",
      "Expansion, franchise operations, licensing, and brand partnership documentation",
    ],
    risks: [
      "Incomplete or unsuitable licences and regulatory documentation",
      "Unclear responsibilities between brand owners, franchisees, and operating partners",
      "Supplier disputes involving quality, pricing, delivery, or payment obligations",
      "Trademark conflicts or unauthorised use of restaurant and product brands",
      "Unclear lease terms, exit obligations, and restrictions on permitted use",
      "Product labelling, advertising, or food safety compliance gaps",
      "Commercial expansion without standardised franchise and operating documentation",
    ],
    services: [
      {
        title: "Corporate & Startup Advisory",
        description:
          "Business structuring, outlet expansion, partnership arrangements, and legal support for new food ventures.",
        slug: "corporate-advisory",
      },
      {
        title: "Commercial Contracts",
        description:
          "Supplier agreements, franchise agreements, lease documentation, distribution contracts, and aggregator arrangements.",
        slug: "commercial-contracts",
      },
      {
        title: "Compliance & Governance",
        description:
          "FSSAI-related advisory, applicable regulatory compliance, labelling and packaging reviews, and operational policy documentation.",
        slug: "compliance-governance",
      },
      {
        title: "Intellectual Property & Trademark",
        description:
          "Brand searches, trademark registration, licensing, assignments, and protection against unauthorised brand use.",
        slug: "trademark",
      },
      {
        title: "Employment Documentation",
        description:
          "Staff appointment letters, employment policies, consultant agreements, confidentiality clauses, and workplace documentation.",
        slug: "employment-documentation",
      },
      {
        title: "Due Diligence",
        description:
          "Legal and operational reviews for new outlets, franchise relationships, business acquisitions, and expansion opportunities.",
        slug: "due-diligence",
      },
    ],
  },
  {
    slug: "automobile",
    title: "Automobile & Automotive",
    titleLong: "Automobile & Automotive Businesses",
    icon: "car",
    summary:
      "The legal frameworks behind supply chains, distribution networks and service obligations.",
    intro:
      "The automotive sector depends on complex supply chains, technical specifications, distribution networks, service obligations, and evolving regulatory requirements. We advise automotive businesses on the legal frameworks governing their commercial relationships, intellectual property, operations, and expansion, helping them manage contractual exposure and strengthen business continuity.",
    needs: [
      "Dealer, distributor, dealership, and channel partner agreements",
      "Supplier, manufacturer, component sourcing, and procurement contracts",
      "OEM, vendor, technology, and strategic collaboration agreements",
      "Service centre, workshop, repair, and maintenance agreements",
      "Product warranties, after-sales service terms, and customer-facing contractual documentation",
      "Intellectual property protection for brands, designs, software, and proprietary business assets",
      "Employment, consultant, confidentiality, and technical service agreements",
      "Regulatory and contractual compliance advisory, including applicable automotive requirements",
      "Legal due diligence for dealership appointments, acquisitions, and business partnerships",
    ],
    risks: [
      "Ambiguous dealership and distribution terms leading to commercial disputes",
      "Unclear allocation of responsibility for product defects, warranties, and after-sales obligations",
      "Supplier disagreements concerning specifications, quality, delivery, and indemnities",
      "Inadequate contractual protection for proprietary designs, technical information, and software",
      "Unclear termination rights, exclusivity restrictions, and territorial arrangements",
      "Regulatory obligations overlooked across manufacturing, distribution, servicing, or product-related operations",
      "Weak documentation of service standards, customer commitments, and vendor responsibilities",
    ],
    services: [
      {
        title: "Corporate & Commercial Advisory",
        description:
          "Business structuring, dealership arrangements, distribution strategy, strategic collaborations, and transaction support.",
        slug: "corporate-advisory",
      },
      {
        title: "Commercial Contracts",
        description:
          "OEM and supplier agreements, dealership and distribution contracts, procurement terms, warranty provisions, and service agreements.",
        slug: "commercial-contracts",
      },
      {
        title: "Compliance & Governance",
        description:
          "Regulatory obligation mapping, internal policies, contractual compliance frameworks, and governance documentation relevant to the business.",
        slug: "compliance-governance",
      },
      {
        title: "Intellectual Property",
        description:
          "Trademark protection, IP ownership and assignment, licensing, confidentiality arrangements, and protection of proprietary business assets.",
        slug: "intellectual-property",
      },
      {
        title: "Due Diligence",
        description:
          "Legal, financial, and operational reviews for dealerships, suppliers, acquisitions, investments, and strategic partnerships.",
        slug: "due-diligence",
      },
      {
        title: "Litigation Support & Dispute Resolution",
        description:
          "Assistance with supplier disputes, dealership conflicts, contractual claims, commercial negotiations, arbitration, and related proceedings.",
        slug: "litigation-support",
      },
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((industry) => industry.slug === slug);
