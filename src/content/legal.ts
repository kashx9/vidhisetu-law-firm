/**
 * LEGAL PAGES — privacy policy, website terms and disclaimer.
 * Bodies are markdown and render through the shared long-form renderer.
 *
 * IMPORTANT: this is placeholder drafting for layout purposes. Have the firm's
 * own compliance review sign these off before the site goes live.
 */

export type LegalDocument = {
  slug: string;
  title: string;
  updated: string;
  summary: string;
  body: string;
};

export const legalDocuments: LegalDocument[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    updated: "2026-04-01",
    summary:
      "How VidhiSetu collects, uses, stores and shares personal information submitted through this website.",
    body: `## Who we are

VidhiSetu Legal LLP ("VidhiSetu", "we", "us") operates this website. This policy explains how we handle personal information collected through it. It does not cover information you provide in the course of an engagement, which is governed by our engagement terms and by professional confidentiality obligations.

## What we collect

- **Enquiry information** — name, organisation, email address, telephone number, the practice area selected and the description of your requirement.
- **Technical information** — IP address, browser type and pages visited, collected through standard analytics.
- **Correspondence** — records of communications between you and the firm.

We do not ask for sensitive personal data through this website. Please do not include confidential case material in an enquiry form.

## Why we use it

We use the information you submit to respond to your enquiry, route it to the appropriate practice group, run conflict checks, and maintain our own records. Where you have consented, we may also send occasional legal updates. You can withdraw that consent at any time.

## Sharing

We do not sell personal information. We share it only with our professional advisers, service providers who host or support our systems under confidentiality obligations, and where disclosure is required by law or by a regulator.

## Retention

Enquiry records are retained for three years from the last communication unless a longer period is required by law or professional obligation. Where an engagement follows, the file is retained in accordance with our engagement terms.

## Your rights

You may request access to the personal information we hold about you, ask for it to be corrected, or ask for it to be erased where we are not required to retain it. Write to us at the address in the Contact section and we will respond within the period prescribed by applicable law.

## Grievance officer

Questions and complaints about how we handle personal information should be addressed to our Grievance Officer at the email address published on the Contact page.

## Changes

We may update this policy. The date at the top of this page reflects the most recent revision.`,
  },
  {
    slug: "terms",
    title: "Website Terms",
    updated: "2026-04-01",
    summary: "The terms on which this website is made available.",
    body: `## Acceptance

By accessing this website you agree to these terms. If you do not agree, please do not use the site.

## No legal advice

The content of this website is provided for general information only. It is not legal advice and must not be relied on as a substitute for advice on your specific circumstances. Reading this website, submitting an enquiry, or receiving a response does not create an advocate–client relationship. That relationship arises only when we have completed a conflict check and both parties have signed an engagement letter.

## No solicitation

This website is not an advertisement or solicitation. Its content is made available only at the specific request of the user, in accordance with the Rules of the Bar Council of India.

## Intellectual property

All content on this website — text, layout, marks and graphics — belongs to VidhiSetu or its licensors. You may read, download and print pages for your own reference. You may not republish, redistribute or use the content commercially without written permission.

## Third-party links

Where we link to external websites we do so for convenience. We do not control those sites and are not responsible for their content or their handling of your data.

## Limitation of liability

To the extent permitted by law, VidhiSetu is not liable for any loss arising from use of, or reliance on, the content of this website. The site is provided on an "as is" basis and we do not warrant that it will be uninterrupted or error-free.

## Governing law

These terms are governed by the laws of India. The courts at Ahmedabad, Gujarat have exclusive jurisdiction over any dispute arising from them.`,
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    updated: "2026-04-01",
    summary: "Professional disclaimer under the Rules of the Bar Council of India.",
    body: `## Bar Council of India notice

The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner. By accessing this website you acknowledge and confirm that you are seeking information relating to VidhiSetu Legal LLP of your own accord, and that there has been no form of solicitation, advertisement or inducement by the firm or any of its members.

## Purpose of this website

The content of this website is intended purely for informational purposes. It should not be interpreted as soliciting or advertising. No material on this site is intended to create, and receipt of it does not constitute, an advocate–client relationship.

## Not legal advice

Nothing on this website constitutes legal advice. VidhiSetu is not liable for any consequence of any action taken by a reader relying on material or information published on this website. In cases where the reader has a legal issue, they must in all cases seek independent legal advice.

## Confidentiality

Information transmitted through this website is not protected by professional privilege at the point of transmission. Please do not send confidential or privileged material through the enquiry form. Privilege attaches once an engagement is in place.

## Acknowledgement

By proceeding to use this website you confirm that you have read and understood this disclaimer, and that any information you obtain here is entirely at your own volition and for your own use.`,
  },
];

export const getLegalDocument = (slug: string) => legalDocuments.find((doc) => doc.slug === slug);
