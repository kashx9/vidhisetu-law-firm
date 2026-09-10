/**
 * ABOUT US — firm introduction, values, team and how the firm works.
 * Drives the /about page. All people below are placeholders.
 */

export const aboutIntro = {
  eyebrow: "About VidhiSetu",
  headline: "A Law Firm Built for How Businesses Actually Operate.",
  lead: "VidhiSetu is a legal consultancy advising businesses, startups and institutions on the legal questions that shape commercial outcomes — how a company is structured, what it agrees to, what it owns, what it must comply with, and what happens when a relationship breaks down.",
  body: [
    "The firm was founded on a straightforward observation: most businesses do not need more legal information. They need someone who understands their business well enough to tell them what to do about it.",
    "That shapes how we work. We take time to understand the commercial context before advising. We state a position rather than listing possibilities. And we stay engaged after the document is signed, because that is usually when the questions that matter start arriving.",
  ],
};

export const philosophy = {
  eyebrow: "Business-First Legal Approach",
  headline: "Legal Advice Is Only Useful If Someone Can Act on It.",
  body: [
    "A legal opinion that ends in 'it depends' has moved the problem, not solved it. We aim for advice that a founder, a CFO or a board can act on in the same meeting in which they receive it.",
    "That means being clear about what the law requires, what is negotiable, what the realistic downside is, and what we would do in your position. Where the answer is genuinely uncertain we say so, and we say what we would do about the uncertainty.",
  ],
};

export type Value = { title: string; body: string };

export const values: Value[] = [
  {
    title: "Clarity over complexity",
    body: "If a client cannot explain our advice to their board in two sentences, we have not finished the work.",
  },
  {
    title: "Prevention over reaction",
    body: "We would rather be paid to stop something happening than to argue about it afterwards.",
  },
  {
    title: "Commercial honesty",
    body: "We tell clients when a matter is not worth pursuing, and when a problem does not need a lawyer at all.",
  },
  {
    title: "Continuity of counsel",
    body: "The person who understands the matter stays on the matter. Institutional memory is the point.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  /** Practice area slugs. */
  focus: string[];
  bio: string;
  /** Initials shown in the portrait placeholder until real photography arrives. */
  initials: string;
  barEnrolment?: string;
};

export const team: TeamMember[] = [
  {
    name: "Adv. Meera Raghunathan",
    role: "Founder & Managing Partner",
    focus: ["corporate-commercial", "startup-investment", "legal-due-diligence"],
    bio: "Advises founders and boards on structuring, investment and governance. Leads the firm's transaction and diligence practice, and has closed rounds across seed to Series B for technology and consumer businesses.",
    initials: "MR",
    barEnrolment: "Bar Council of Gujarat",
  },
  {
    name: "Adv. Kabir Anand",
    role: "Partner — Disputes",
    focus: ["litigation-arbitration", "contracts"],
    bio: "Handles commercial disputes, arbitration and recovery. Known for assessing matters commercially before filing, and for settling more of them than he litigates.",
    initials: "KA",
    barEnrolment: "Bar Council of Maharashtra & Goa",
  },
  {
    name: "Adv. Sanya Deshpande",
    role: "Partner — Regulatory & IP",
    focus: ["compliance-regulatory", "intellectual-property"],
    bio: "Builds compliance frameworks for regulated sectors and manages trademark portfolios and enforcement. Advises healthcare, education and F&B clients on licensing across states.",
    initials: "SD",
    barEnrolment: "Bar Council of Gujarat",
  },
  {
    name: "Adv. Rohan Mehta",
    role: "Principal Associate — Employment",
    focus: ["employment-labour", "contracts"],
    bio: "Advises on employment documentation, workplace policy and separations. Leads the firm's POSH advisory and training practice.",
    initials: "RM",
    barEnrolment: "Bar Council of Gujarat",
  },
];

/** "How VidhiSetu works" — the engagement mechanics, shown on /about. */
export const engagementModel = [
  {
    title: "Scoped engagements",
    body: "Defined pieces of work — a contract, a filing, a diligence exercise — quoted as a fixed fee wherever the scope allows it.",
  },
  {
    title: "Ongoing retainers",
    body: "Continuous advisory for businesses that want legal input built into decisions rather than bolted on afterwards.",
  },
  {
    title: "Transaction mandates",
    body: "End-to-end support on fundraises, acquisitions and restructurings, from structuring through to post-closing conditions.",
  },
  {
    title: "Dispute mandates",
    body: "Assessment first, then conduct of proceedings with scheduled reporting and a settlement position kept under review throughout.",
  },
];
