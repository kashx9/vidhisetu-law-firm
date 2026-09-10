/**
 * INSIGHT CATEGORIES — the filter set on /insights and the category chip on
 * every post. Taken from the brief's Section 10.
 */

export type InsightCategory = {
  slug: string;
  label: string;
  description: string;
};

export const insightCategories: InsightCategory[] = [
  {
    slug: "corporate-law",
    label: "Corporate Law",
    description: "Structuring, governance and the mechanics of running a company properly.",
  },
  {
    slug: "startup-law",
    label: "Startup Law",
    description: "Incorporation, founder equity, fundraising and investor expectations.",
  },
  {
    slug: "contracts",
    label: "Contracts",
    description: "Drafting, negotiation and the clauses that decide commercial outcomes.",
  },
  {
    slug: "compliance",
    label: "Compliance",
    description: "Regulatory obligations, data protection and staying current as rules move.",
  },
  {
    slug: "intellectual-property",
    label: "Intellectual Property",
    description: "Trademarks, ownership, licensing and enforcement.",
  },
  {
    slug: "employment",
    label: "Employment",
    description: "Hiring, workplace policy, POSH and separations.",
  },
  {
    slug: "disputes-litigation",
    label: "Disputes & Litigation",
    description: "Commercial disputes, arbitration, recovery and enforcement.",
  },
];

export const getCategory = (slug: string) => insightCategories.find((c) => c.slug === slug);

export const categoryLabel = (slug: string) => getCategory(slug)?.label ?? slug;
