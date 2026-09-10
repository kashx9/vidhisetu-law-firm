/**
 * LEGAL RETAINERS — the ongoing advisory model.
 * Used on the homepage retainer band and the /legal-retainers page.
 *
 * NOTE ON FEES: figures below are indicative placeholders for layout purposes.
 * Bar Council rules constrain how legal fees may be advertised — confirm the
 * firm's position before publishing real numbers, or set `showPricing` to false.
 */

export const showPricing = false;

/** The "what's included" list from the brief. */
export const retainerInclusions = [
  "Monthly legal advisory",
  "Contract review and support",
  "Compliance guidance",
  "Policies and documentation",
  "Ongoing legal queries",
  "Risk identification and preventive advice",
  "Dedicated / structured legal support options",
];

export type RetainerPlan = {
  name: string;
  positioning: string;
  bestFor: string;
  /** Indicative only — hidden unless showPricing is true. */
  indicativeFee: string;
  features: string[];
  highlighted: boolean;
};

export const retainerPlans: RetainerPlan[] = [
  {
    name: "Essential",
    positioning: "Legal cover for a business that has outgrown ad-hoc advice.",
    bestFor: "Early-stage companies and small teams",
    indicativeFee: "On request",
    features: [
      "Defined monthly advisory hours",
      "Contract review within agreed turnaround",
      "Compliance calendar maintenance",
      "Email and scheduled call access",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    positioning: "A working legal function without the cost of building one in-house.",
    bestFor: "Funded startups and growing MSMEs",
    indicativeFee: "On request",
    features: [
      "Expanded advisory hours across practice areas",
      "Template library and negotiation playbooks",
      "Policy drafting and periodic review",
      "Quarterly legal risk review with management",
      "Priority turnaround on time-sensitive matters",
    ],
    highlighted: true,
  },
  {
    name: "Counsel",
    positioning: "A named lead advocate embedded in how your business operates.",
    bestFor: "Established corporates and multi-entity groups",
    indicativeFee: "On request",
    features: [
      "Dedicated relationship partner",
      "Board and governance support",
      "Transaction and diligence capacity included",
      "Group-wide compliance ownership",
      "Defined service levels and reporting",
    ],
    highlighted: false,
  },
];

export const retainerFaqs = [
  {
    question: "How is a retainer different from engaging you per matter?",
    answer:
      "Per-matter engagement means you call when something has already happened. A retainer means we are close enough to your business to flag it beforehand — and it makes legal cost predictable rather than lumpy.",
  },
  {
    question: "What happens if a matter exceeds the retainer scope?",
    answer:
      "Litigation, transactions and diligence are typically scoped separately. We tell you before the boundary is crossed and quote the additional work in advance. There are no surprise invoices.",
  },
  {
    question: "Can we start on a retainer and change plans later?",
    answer:
      "Yes. Most clients start smaller and scale as legal volume grows. Plans can be adjusted at any renewal point, and we will tell you when we think you are on the wrong one.",
  },
  {
    question: "Do unused hours carry forward?",
    answer:
      "Within a quarter, yes. We would rather you use the capacity than watch the clock — the point of a retainer is to remove the hesitation before picking up the phone.",
  },
];
