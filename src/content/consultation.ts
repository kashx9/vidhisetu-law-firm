/**
 * CONSULTATION ENQUIRY — form configuration, routing and process copy.
 * Drives the /contact page form, the homepage consultation band and the
 * /thank-you page.
 */

import { practiceAreas } from "./practiceAreas";

export const consultationModes = [
  { value: "video", label: "Video call" },
  { value: "phone", label: "Telephone" },
  { value: "in-person", label: "In person, at our office" },
  { value: "email", label: "Written response by email" },
] as const;

/** Options for the "Legal Requirement / Practice Area" field. */
export const enquiryTopics = [
  ...practiceAreas.map((area) => ({ value: area.slug, label: area.title })),
  { value: "legal-retainer", label: "Legal Retainer / Ongoing Advisory" },
  { value: "other", label: "Something else" },
];

/**
 * PRACTICE-AREA ENQUIRY ROUTING.
 * Maps the selected topic to the internal mailbox that should receive it.
 * The mock submission handler logs the resolved route; wire this to your real
 * backend or CRM when the integration is ready.
 */
export const enquiryRouting: Record<string, string> = {
  "corporate-commercial": "corporate@vidhisetu.in",
  contracts: "contracts@vidhisetu.in",
  "startup-investment": "startups@vidhisetu.in",
  "intellectual-property": "ip@vidhisetu.in",
  "compliance-regulatory": "compliance@vidhisetu.in",
  "employment-labour": "employment@vidhisetu.in",
  "litigation-arbitration": "disputes@vidhisetu.in",
  "legal-due-diligence": "diligence@vidhisetu.in",
  "legal-retainer": "retainers@vidhisetu.in",
  other: "counsel@vidhisetu.in",
};

export const resolveRoute = (topic: string) => enquiryRouting[topic] ?? enquiryRouting.other;

/** Shown alongside the form so prospective clients know what happens next. */
export const consultationProcess = [
  {
    step: "01",
    title: "You tell us the problem",
    body: "A short description is enough. You do not need to have diagnosed it legally — that is our job.",
  },
  {
    step: "02",
    title: "We respond within one business day",
    body: "Your enquiry is routed to the practice group that handles it, not to a general queue.",
  },
  {
    step: "03",
    title: "An initial consultation",
    body: "Thirty to forty-five minutes, by video, phone or in person, to understand the matter properly.",
  },
  {
    step: "04",
    title: "A scope and a fee, in writing",
    body: "What the work involves, what it will cost and how long it will take — before you commit to anything.",
  },
];

export const thankYou = {
  eyebrow: "Enquiry Received",
  headline: "Thank You. Your Enquiry Has Reached the Right Desk.",
  body: "We have routed your enquiry to the practice group that handles this area. You can expect a response within one business day, and sooner where the matter is time-sensitive.",
  meanwhile: [
    { label: "Read our approach to legal problems", href: "/approach" },
    { label: "Browse recent legal insights", href: "/insights" },
    { label: "Understand our retainer model", href: "/legal-retainers" },
  ],
};
