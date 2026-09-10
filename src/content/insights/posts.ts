/**
 * SEEDED INSIGHTS — mock article data.
 *
 * These are the posts the site ships with. Anything authored through the
 * Insights Studio is stored separately and merged on top of this list at
 * runtime (see src/features/blog/blogStore.ts), so editing this file never
 * destroys drafted content and clearing local drafts never destroys these.
 *
 * To publish an article by hand, add an object here with status "published".
 */

import type { Insight } from "@/features/blog/types";

export const seedInsights: Insight[] = [
  {
    id: "seed-term-sheet-clauses",
    slug: "five-term-sheet-clauses-founders-underestimate",
    title: "Five Term Sheet Clauses Founders Consistently Underestimate",
    excerpt:
      "Valuation is the number everyone negotiates. These five clauses decide what that number is actually worth at exit.",
    category: "startup-law",
    practiceArea: "startup-investment",
    industry: "startups",
    tags: ["term sheet", "fundraising", "cap table", "liquidation preference"],
    authorId: "meera-raghunathan",
    publishedAt: "2026-08-18",
    status: "published",
    featured: true,
    cover: { alt: "Term sheet negotiation", caption: "Fundraising" },
    seo: {
      description:
        "Liquidation preference, anti-dilution, board composition, drag-along and information rights — what each clause actually does to a founder's outcome.",
    },
    source: "seed",
    body: `Founders negotiate valuation hard and then sign the rest of the term sheet with a degree of trust that does not survive contact with a down round. Valuation sets the headline. These five clauses set what the headline is worth.

## 1. Liquidation preference

A 1x non-participating preference is market and generally reasonable: the investor takes their money back or converts to common, whichever is better for them. A participating preference means they take their money back **and** share in what remains. On a modest exit the difference between the two can be the entire founder outcome.

The multiple matters too. A 2x preference on a ₹20 crore investment means ₹40 crore comes off the table before anyone else is paid.

## 2. Anti-dilution

Broad-based weighted average is standard. Full ratchet is not, and it should be resisted. Under a full ratchet, a single down round at a low price re-prices the entire earlier investment as though it had been made at that price — which can transfer a very large share of the company in one transaction.

## 3. Board composition

Count the seats and count them again at the next round. A board that is two founders, one investor and one independent behaves very differently from one that is one founder, two investors and one independent nominated by the investors. Also read the reserved matters list: a minority investor with a long veto list has practical control regardless of seat count.

## 4. Drag-along

Drag-along lets a defined majority force everyone else into a sale. That is legitimate and often necessary. The question is what the threshold is and whether founders are inside or outside the group that triggers it. A drag that can be exercised by the investors alone, at any price, is a materially different instrument from one that requires founder concurrence or a minimum return.

## 5. Information and inspection rights

These look administrative and become operational. Monthly reporting obligations to four separate investors, each in a different format, is a real cost on a ten-person company. Standardise the format and the cadence in the documents rather than discovering the burden after closing.

## What to do about it

Read the term sheet as a description of what happens when things go badly, because that is the scenario it is drafted for. Ask what each clause does at a ₹50 crore exit, a ₹200 crore exit and a down round. If the answer is materially different from what you assumed, that clause is worth negotiating — often more than the valuation is.`,
  },
  {
    id: "seed-contractor-ip",
    slug: "who-owns-code-your-contractors-wrote",
    title: "Who Owns the Code Your Contractors Wrote?",
    excerpt:
      "One of the most common findings in Indian startup due diligence, and one of the easiest to fix before it becomes expensive.",
    category: "intellectual-property",
    practiceArea: "intellectual-property",
    industry: "saas-technology",
    tags: ["IP assignment", "contractors", "due diligence", "copyright"],
    authorId: "sanya-deshpande",
    publishedAt: "2026-08-04",
    status: "published",
    featured: false,
    cover: { alt: "Source code ownership", caption: "IP ownership" },
    source: "seed",
    body: `A founder tells us the product was built by a freelance team in the first year. We ask for the assignment agreements. There is a pause.

## The default rule is not what most people assume

Under the Copyright Act, the author of a work is the first owner. For an employee creating work in the course of employment there is a statutory carve-out that vests ownership in the employer. **For an independent contractor there is not.** Absent a written assignment, the contractor remains the first owner of what they wrote, regardless of who paid for it.

A payment record is not an assignment. Neither is an invoice that says "development work". Neither, in most cases, is a purchase order.

## Why it surfaces at the worst time

It surfaces in diligence, because diligence asks the question directly. By that point:

- The contractor may have moved on, changed countries, or become uncontactable.
- The commercial leverage has inverted — they now know you need the signature.
- The transaction has a closing date.

We have seen a retrospective assignment cost thirty times what a contemporaneous one would have.

## Fixing it

1. **Map what exists.** List every person who contributed code, design, copy or brand assets, and when.
2. **Check what is signed.** You are looking for a present-tense assignment of all IP in the work product, with a moral rights waiver and a further-assurances clause.
3. **Paper the gaps now.** A short deed of assignment, executed while the relationship is still warm, closes it. Consideration should be recited and paid.
4. **Fix the template.** Every future contractor agreement should carry the assignment clause. This is a one-time change with a permanent effect.

## The same problem, other forms

The pattern repeats with logo designers, agencies that hold your domain registration, a co-founder who built the prototype before incorporation and never assigned it in, and open-source components whose licence terms nobody read. All four are routine diligence findings. All four are cheap to close early.`,
  },
  {
    id: "seed-dpdp-readiness",
    slug: "dpdp-act-what-mid-sized-businesses-should-do-first",
    title: "The DPDP Act: What Mid-Sized Businesses Should Actually Do First",
    excerpt:
      "Compliance programmes fail when they start with policy documents. Start with knowing what data you hold.",
    category: "compliance",
    practiceArea: "compliance-regulatory",
    tags: ["DPDP", "data protection", "privacy", "consent"],
    authorId: "sanya-deshpande",
    publishedAt: "2026-07-22",
    status: "published",
    featured: false,
    cover: { alt: "Data protection compliance", caption: "Data protection" },
    source: "seed",
    body: `Most data protection programmes we are asked to review begin at the wrong end. Someone has downloaded a privacy policy template, adapted it, and published it. The policy describes a business that does not exist.

## Start with a data map, not a policy

You cannot write an accurate notice about processing you have not catalogued. The first exercise is unglamorous and entirely necessary:

| Question | Why it matters |
| --- | --- |
| What personal data do we collect? | Defines the scope of every downstream obligation |
| Where does it sit? | Determines security and breach exposure |
| Why do we hold it? | Purpose limitation runs through the whole Act |
| Who do we share it with? | Every processor needs a contract |
| How long do we keep it? | Retention is an obligation, not a preference |

For most mid-sized businesses this is a two-week exercise involving three or four teams. It is also the point at which people discover the marketing database nobody has owned since 2021.

## Then notice and consent

Consent under the Act must be free, specific, informed, unconditional and unambiguous, given through a clear affirmative action. Practically:

- Pre-ticked boxes do not work.
- Bundled consent for unrelated purposes does not work.
- The notice must be available in English and the languages listed in the Eighth Schedule.
- Withdrawal must be as easy as giving consent, and there must be a route to exercise it.

## Then the operational pieces

**Processor contracts.** Every vendor touching personal data on your behalf needs terms covering purpose limitation, security, sub-processing, breach notification and deletion on termination.

**Grievance mechanism.** A named contact, a published route and an actual response process.

**Breach response.** A plan that exists before the breach, with escalation, assessment and notification steps assigned to named people.

## What to deprioritise

Do not spend the first month drafting a beautiful policy suite. Do not buy tooling before you know your data map. Do not attempt a full-scale programme in a business with three systems and one customer database — the obligation is proportionate to what you actually process.`,
  },
  {
    id: "seed-msa-liability-caps",
    slug: "liability-caps-what-to-concede-and-what-to-hold",
    title: "Liability Caps: What to Concede and What to Hold",
    excerpt:
      "Enterprise customers will push for uncapped liability. Here is where the line usually sits, and why.",
    category: "contracts",
    practiceArea: "contracts",
    industry: "saas-technology",
    tags: ["MSA", "liability", "negotiation", "indemnity"],
    authorId: "meera-raghunathan",
    publishedAt: "2026-07-09",
    status: "published",
    featured: false,
    cover: { alt: "Contract negotiation", caption: "Commercial contracts" },
    source: "seed",
    body: `The liability clause is where a sales team's enthusiasm meets a company's balance sheet. It is also the clause most often conceded in the last week of a negotiation, when everyone wants the deal signed.

## The usual shape

A defensible position for a services or software vendor looks roughly like this:

- **General cap** at fees paid in the preceding twelve months.
- **Carve-outs above the cap** for confidentiality breach, IP infringement indemnity and, commonly, data protection breach — often at a super-cap of two or three times fees rather than uncapped.
- **Excluded losses**: indirect, consequential, loss of profit, loss of data, mutually excluded.
- **Never excludable**: fraud, wilful misconduct, and liability that cannot be limited by law.

## Where to hold

**Uncapped general liability.** There is no revenue model that supports it. A ₹40 lakh annual contract does not justify unlimited exposure, and no insurer will price it comfortably.

**Uncapped data breach liability.** This is the most commonly requested carve-out and the most dangerous, because the loss is driven by the customer's data volume rather than by your contract value. A super-cap is the standard compromise.

**Mutuality.** If your liability is capped, theirs should be too. Asymmetric caps are frequently accepted without comment simply because nobody read the clause from both directions.

## Where to concede

**IP infringement indemnity.** If your product infringes, that is your problem and the customer cannot control it. An uncapped or high-capped IP indemnity is market and defensible — you control the risk.

**Confidentiality.** A carve-out here is normal, and if you are handling the obligation properly the exposure is low.

**A higher cap for a higher price.** Liability is a commercial variable. If a customer wants three times fees, that is a legitimate ask with a legitimate answer: it changes the price.

## The clause that quietly matters more

Check the indemnity clause before congratulating yourself on the cap. An indemnity that sits outside the limitation of liability clause makes the cap decorative. Confirm explicitly whether indemnity obligations are subject to the cap — in either direction — because the drafting is frequently ambiguous and the ambiguity is expensive.`,
  },
  {
    id: "seed-posh-obligations",
    slug: "posh-compliance-beyond-the-policy-document",
    title: "POSH Compliance Beyond the Policy Document",
    excerpt:
      "Having a policy is the smallest part of the obligation. The Internal Committee is where most organisations fall short.",
    category: "employment",
    practiceArea: "employment-labour",
    tags: ["POSH", "internal committee", "workplace policy", "annual return"],
    authorId: "rohan-mehta",
    publishedAt: "2026-06-27",
    status: "published",
    featured: false,
    cover: { alt: "Workplace policy", caption: "Employment" },
    source: "seed",
    body: `Ask a company whether it is POSH compliant and you will usually be shown a policy document. The policy is necessary. It is also the easiest part.

## What the Act actually requires

Once an organisation has ten or more employees at a workplace, four obligations attach:

1. **A policy**, published and communicated.
2. **An Internal Committee**, properly constituted.
3. **Awareness and training**, for employees and for the Committee itself.
4. **An annual return** filed with the District Officer.

Most organisations do the first and treat the rest as administrative. It is the second that fails under scrutiny.

## Constituting the Internal Committee correctly

The composition requirements are specific:

- A **Presiding Officer** who is a woman employed at a senior level at the workplace.
- **At least two members** from among employees, preferably committed to the cause of women or with relevant social work or legal experience.
- **One external member** from an NGO or association committed to the cause of women, or a person familiar with issues relating to sexual harassment.
- **At least half** of the total members must be women.

The external member is the requirement most commonly missed, and its absence is enough to render an inquiry procedurally defective. That matters: a finding produced by an improperly constituted committee is vulnerable on appeal regardless of its merits.

## Practical points that come up

**Multiple locations.** The threshold applies per workplace. A company with four offices may need four committees.

**Contractors and interns.** The definition of "employee" under the Act is broad and includes people engaged on contract, as interns, or on a daily wage basis. Your headcount for POSH purposes is not your payroll count.

**Terms and rotation.** Members hold office for a maximum of three years. Committees that were constituted once and never refreshed have lapsed without anyone noticing.

**Records.** The annual return requires numbers on complaints received, disposed of and pending beyond ninety days. If nobody is keeping the register, the return cannot be filed accurately.

## Where to start

Audit the committee before you revise the policy. If the committee is not properly constituted, everything downstream of it is exposed — and it is a two-week fix.`,
  },
  {
    id: "seed-arbitration-or-court",
    slug: "arbitration-clause-is-not-automatically-the-right-answer",
    title: "An Arbitration Clause Is Not Automatically the Right Answer",
    excerpt:
      "Arbitration is faster and more private. It is also more expensive per rupee in dispute, which matters more than most parties expect.",
    category: "disputes-litigation",
    practiceArea: "litigation-arbitration",
    tags: ["arbitration", "dispute resolution", "drafting", "enforcement"],
    authorId: "kabir-anand",
    publishedAt: "2026-06-11",
    status: "published",
    featured: false,
    cover: { alt: "Dispute resolution", caption: "Disputes" },
    source: "seed",
    body: `Arbitration clauses are inserted into commercial contracts almost reflexively. Often that is right. Sometimes it produces a forum that costs more than the amount in dispute.

## What arbitration buys you

**Speed**, relative to the courts, with a statutory timeline for the award. **Privacy**, which matters when the dispute touches commercially sensitive material or reputation. **Choice of arbitrator**, which matters in technical sectors where a specialist decides better than a generalist. And **enforceability across borders** under the New York Convention, which is decisive in international contracts.

## What it costs you

Arbitrators are paid. The venue is paid. There is no small-claims equivalent. On a ₹15 lakh dispute, a three-member tribunal can consume a meaningful fraction of the claim before the merits are reached.

There is also **no appeal on merits**. Setting aside an award is available on narrow grounds. If the tribunal gets it wrong, that is generally the end of the matter.

## A practical drafting approach

Consider tiering the clause by value:

> Disputes below ₹25 lakh shall be referred to a sole arbitrator. Disputes at or above that threshold may be referred to a tribunal of three.

And consider what precedes arbitration. A mandatory thirty-day negotiation step between senior representatives resolves a substantial share of commercial disputes at negligible cost. Mediation as a second step adds a little time and resolves more.

## The clauses that cause trouble

**Seat versus venue.** These are not synonyms. The seat determines the supervisory court and the procedural law. Contracts that specify only a "venue" generate a preliminary dispute about the seat before the actual dispute is heard.

**Appointment mechanics.** If the clause does not say how the arbitrator is appointed when the parties cannot agree, you will spend months in court appointing one.

**Institutional versus ad hoc.** Institutional arbitration costs more in fees and saves more in procedural argument. For anything complex it is usually the better economics.

## Before you invoke it

Assess the matter commercially first. What is realistically recoverable, from a counterparty with what assets, over what period, at what cost in fees and management time? A well-drafted arbitration clause is worth having. It is not, by itself, a reason to arbitrate.`,
  },
  {
    id: "seed-founders-agreement",
    slug: "why-a-founders-agreement-matters-most-when-you-need-it-least",
    title: "Why a Founders' Agreement Matters Most When You Need It Least",
    excerpt:
      "The document is easy to write while everyone agrees. It becomes impossible to write at the exact moment it is needed.",
    category: "startup-law",
    practiceArea: "startup-investment",
    industry: "startups",
    tags: ["founders agreement", "vesting", "equity", "co-founder"],
    authorId: "meera-raghunathan",
    publishedAt: "2026-05-29",
    status: "published",
    featured: false,
    cover: { alt: "Founders agreement", caption: "Founders" },
    source: "seed",
    body: `Co-founders who are getting along see a founders' agreement as bureaucracy. Co-founders who are not getting along see it as the only thing standing between them and a very bad year.

## What it should cover

**Equity split, in writing.** A verbal agreement about a 60/40 split is not a cap table. It is a future disagreement about what was said.

**Vesting.** Four years with a one-year cliff is the market standard and it exists for a reason: it protects the people who stay. A founder who leaves in month eight with a quarter of the company is a problem for every subsequent round.

**Roles and decision-making.** Who decides what, and what requires unanimity. The list of unanimous matters should be short and genuinely fundamental.

**IP assignment.** Anything a founder built before or during the company that the company relies on should be assigned in explicitly.

**Leaver provisions.** What happens to unvested equity, and to vested equity, when someone leaves — and the difference between a good leaver and a bad leaver.

**Deadlock.** With two founders holding equal stakes, there is no majority. A deadlock mechanism — a casting vote, a mediator, a buy-sell provision — prevents a permanent stall.

## The conversation is the point

The most valuable part of the exercise is not the document. It is the two hours in which three people discover they had different assumptions about full-time commitment, salary expectations, what happens if someone takes an outside role, and who has the final call on product.

Those differences exist whether or not they are discussed. Discovering them in year one is a conversation. Discovering them in year three is a dispute.

## If you already skipped it

It is still worth doing. Retrofitting vesting onto existing shares is more complex than granting subject to vesting from the start, but it is routine work — and an investor is likely to require it at the first round anyway. Doing it now means doing it on your terms rather than theirs.`,
  },
  {
    id: "seed-board-minutes",
    slug: "board-minutes-are-not-a-formality",
    title: "Board Minutes Are Not a Formality",
    excerpt:
      "Minutes are the only contemporaneous record of what a board decided and why. Their quality is tested only under pressure.",
    category: "corporate-law",
    practiceArea: "corporate-commercial",
    industry: "msmes-corporates",
    tags: ["governance", "board", "minutes", "records"],
    authorId: "meera-raghunathan",
    publishedAt: "2026-05-14",
    status: "published",
    featured: false,
    cover: { alt: "Corporate governance", caption: "Governance" },
    source: "seed",
    body: `Minutes get written quickly, circulated late and signed without much attention. Then a transaction, a dispute or an investigation arrives and they become the most important documents in the company.

## What good minutes do

They record **what was decided**, **who was present**, **what was considered**, and **where a director had an interest**. That last item is what turns a routine record into protection: a director who disclosed an interest and abstained is in a very different position from one whose disclosure is undocumented.

They also record what was *not* decided. A board that considered a matter and deferred it should say so. Silence in the record reads later as inattention.

## Common failures

**Minutes written as a transcript.** Nobody needs three pages of discussion. The record should capture the decision and the material considerations behind it.

**Minutes written as a conclusion.** The opposite failure — "the board approved the transaction" with nothing about what was placed before it. This offers no evidence that the directors applied their minds.

**Backdated books.** Reconstructing a year of minutes the week before diligence is visible, and it is worse than a gap. Assume the reviewer has seen it before.

**Missing attachments.** If a resolution approves a document, the version approved should be identifiable. "Approved the agreement" without a version reference invites an argument about which draft was authorised.

## The practical standard

For a small company, a page per meeting is usually enough. Written within a week. Circulated for comment. Signed at the next meeting. Kept in one place, with the statutory registers, in a form somebody other than the founder can locate.

That standard costs an hour a quarter, and it is the difference between a two-week diligence exercise and a six-week one.`,
  },
  {
    id: "seed-draft-example",
    slug: "draft-gst-implications-of-cross-border-saas",
    title: "GST Implications of Cross-Border SaaS Supply",
    excerpt:
      "An unfinished draft, included so the Insights Studio has something to show in the non-published states.",
    category: "compliance",
    practiceArea: "compliance-regulatory",
    industry: "saas-technology",
    tags: ["GST", "cross-border", "SaaS", "OIDAR"],
    authorId: "sanya-deshpande",
    publishedAt: "2026-09-02",
    status: "in_review",
    featured: false,
    cover: { alt: "Cross-border tax", caption: "Compliance" },
    source: "seed",
    body: `## Scope of this note

Placeholder draft. This record exists so that the Insights Studio shows a realistic mix of statuses — it is deliberately not published and therefore does not appear on the public /insights listing.

## Sections to complete

- Place of supply analysis for OIDAR services
- Registration thresholds for non-resident suppliers
- Reverse charge mechanics for Indian recipients
- Invoicing and documentation requirements`,
  },
];
