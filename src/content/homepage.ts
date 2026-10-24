/**
 * HOMEPAGE COPY — hero, trust strip and the eyebrow/headline pair for every
 * homepage section. Section order itself is set in src/pages/HomePage.tsx and
 * follows the blueprint in the brief:
 *
 * Header → Hero → Trust Strip → What We Do → Why VidhiSetu → Industry Expertise
 * → Startup Legal Journey → Legal Retainer → Our Approach → Blog
 * → Consultation CTA → Footer
 */

export const hero = {
  eyebrow: "Legal Advisory & Representation",
  headline: "Legal Counsel for Businesses That Are Built to Last.",
  supporting:
    "Strategic legal and business advisory for startups, MSMEs, enterprises and institutions, spanning corporate structuring, contracts, regulatory compliance, intellectual property, due diligence, litigation support and dispute resolution building legally sound, compliant and investment-ready businesses",
  /** Quiet credibility markers under the hero CTAs. Keep these factual. */
  markers: [
    { value: "35+", label: "Years of combined practice" },
    { value: "300+", label: "Businesses advised" },
    { value: "9", label: "Industries served" },
  ],
} as const;

/** Section 03 — the practice strip directly beneath the hero. */
export const trustStrip = [
  "Corporate & Commercial",
  "Startups & Emerging Businesses",
  "Intellectual Property",
  "Compliance & Regulatory",
  "Disputes & Litigation",
  "Legal Due Diligence",
] as const;

export const sections = {
  whatWeDo: {
    eyebrow: "What We Do",
    headline: "Legal Advice That Moves With Your Business.",
    supporting:
      "Strategic legal and business advisory for startups, MSMEs, enterprises and institutions, spanning corporate structuring, contracts, regulatory compliance, intellectual property, due diligence, litigation support and dispute resolution—building legally sound, compliant and investment-ready businesses.",
    cta: { label: "View All Practice Areas", href: "/practice-areas" },
  },
  whyUs: {
    eyebrow: "Why Clients Choose VidhiSetu",
    headline: "More Than Legal Advice. A Business-Minded Legal Partner.",
    supporting:
      "Clients stay with us because the advice accounts for what they are actually trying to achieve.",
  },
  industries: {
    eyebrow: "Industry Expertise",
    headline: "Legal Counsel Built Around Your Industry.",
    supporting:
      "Sector context changes the advice. Each of these practices has its own regulatory shape, contracting norms and failure modes.",
    cta: { label: "View All Industries", href: "/industries" },
  },
  startup: {
    eyebrow: "Startup Legal",
    headline: "From Incorporation to Investment — We Build the Legal Foundation.",
    supporting:
      "A single, continuous engagement across the nine stages where early-stage companies most often accumulate legal debt.",
    cta: { label: "Explore Startup Legal Services", href: "/startup-legal" },
  },
  retainer: {
    eyebrow: "Legal Retainers Services",
    headline: "Continuous Legal Support. Proactive Risk Management.",
    supporting:
      "Our legal retainer services provide businesses with ongoing access to legal expertise, timely advisory and proactive compliance support. Through a structured, long-term engagement, we help identify potential risks, address legal requirements and manage legal costs with greater predictability enabling businesses to operate with confidence and focus on growth.",
    cta: { label: "Explore Legal Retainers", href: "/legal-retainers" },
  },
  approach: {
    eyebrow: "Our Approach",
    headline: "A Clear, Practical Approach to Legal Problems.",
    supporting:
      "The same five steps on every matter, whether it is a single contract review or a multi-year advisory relationship.",
    cta: { label: "Read Our Approach", href: "/approach" },
  },
  blog: {
    eyebrow: "From the Blog",
    headline: "Legal Insights for Better Business Decisions.",
    supporting:
      "Practical commentary on the legal questions our clients ask most often, written for business decision-makers rather than lawyers.",
    cta: { label: "View All Posts", href: "/blog" },
  },
  consultation: {
    eyebrow: "Book a Consultation",
    headline: "Have a Legal Issue? Let's Discuss It Before It Becomes a Legal Problem.",
    supporting:
      "Tell us what you are dealing with. We will tell you whether it needs legal work, what that work involves and what it is likely to cost — before you commit to anything.",
  },
} as const;
