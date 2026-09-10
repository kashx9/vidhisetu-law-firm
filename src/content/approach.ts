/**
 * OUR APPROACH — the five-step method.
 * Used by the homepage approach section and the /approach page.
 */

export type ApproachStep = {
  /** Rendered as the large numeral. */
  number: string;
  title: string;
  summary: string;
  /** Expanded detail — shown on the /approach page only. */
  detail: string;
};

export const approachSteps: ApproachStep[] = [
  {
    number: "01",
    title: "Understand",
    summary: "Understand the business, context, objective and problem.",
    detail:
      "Before any legal analysis we establish what the business does, how it makes money, who it depends on and what outcome you actually want. Legal advice given without that context is technically correct and commercially useless.",
  },
  {
    number: "02",
    title: "Assess",
    summary: "Identify legal, commercial, regulatory and operational risks.",
    detail:
      "We map the risks across all four dimensions and, critically, separate the ones that matter from the ones that merely exist. A risk register that treats every item equally is a way of avoiding the decision rather than informing it.",
  },
  {
    number: "03",
    title: "Advise",
    summary: "Provide a practical legal strategy and explain available options.",
    detail:
      "You get a recommendation, not a menu of possibilities with the choice left to you. Where genuine alternatives exist we set out each one with its cost, timeline and consequence, and tell you which we would take and why.",
  },
  {
    number: "04",
    title: "Execute",
    summary: "Draft, negotiate, file, structure or represent as required.",
    detail:
      "Advice that stops at the memo stage is half the job. We draft the documents, sit in the negotiation, make the filings and appear where representation is needed — so the strategy actually reaches the ground.",
  },
  {
    number: "05",
    title: "Support",
    summary: "Continue to support the client as the business or matter evolves.",
    detail:
      "Matters change shape. Counterparties respond, regulations move, businesses pivot. We stay engaged past the closing date, because the value of legal work is usually determined by what happens after it is delivered.",
  },
];

/** Principles shown on the /approach page beneath the five steps. */
export const approachPrinciples = [
  {
    title: "Preventive legal philosophy",
    body: "The most valuable legal work is the dispute that never happened, the clause that was never triggered and the notice that was never received. We would rather spend two hours on a contract now than two years on it later.",
  },
  {
    title: "Commercially practical advice",
    body: "Advice has to be actionable by the people who receive it. We write in plain language, state a position, and avoid hedging that transfers the decision back to you without transferring any of the analysis.",
  },
  {
    title: "Long-term legal partnership",
    body: "We are structured for continuing relationships rather than one-off transactions. Knowing a business over years produces better advice than reading its documents for the first time under deadline.",
  },
];
