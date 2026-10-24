/**
 * FIRM IDENTITY — name, contact details, addresses, social, disclaimers.
 * Every header, footer, contact block and email/phone link on the site reads
 * from this file. Change it once here.
 */

export const site = {
  /** Used in prose, page titles and sentences: "VidhiSetu advises founders…". */
  name: "VidhiSetu",
  /**
   * The name as it is set in the logo lockup — spaced, so it renders as
   * "V I D H I  S E T U" in letterspaced caps beside the mark. Kept separate
   * from `name` because the logo spells it as two words and prose does not.
   */
  wordmark: "Vidhi Setu",
  legalName: "VidhiSetu Legal LLP",
  /** Rendered under the wordmark in the header and footer. */
  descriptor: "Law Firm",
  tagline: "Legal Counsel for Businesses That Are Built to Last",
  positioning:
    "Strategic legal advisory for businesses, startups and institutions across contracts, compliance, transactions, intellectual property and disputes.",
  /** Short line used under the logo in the footer. */
  footerStatement:
    "A business-minded legal partner for companies that want their legal foundation built right the first time — and kept right as they grow.",

  contact: {
    email: "vidhisetuconnects@gmail.com",
    /** Used for mailto: and tel: links, and for click-to-call on mobile. */
    phone: "+91 9315375877",
    phoneHref: "+919315375877",
    whatsapp: "+919315375877",
    officeHours: "Monday to Friday, 10:00 – 19:00 IST",
    responsePromise: "We respond to consultation requests within one business day.",
  },

  offices: [
    {
      label: "Principal Office",
      city: "Ahmedabad",
      lines: [
        "400-A, 4th Floor",
        "12 Ajit Singh House, Yusuf Sarai",
        "Green Park, New Delhi - 110016",
      ],
    }
  ],

  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/vidhisetu", icon: "linkedin" },
    { label: "X", href: "https://x.com/vidhisetu", icon: "twitter" },
  ],

  /**
   * Calls to action. Labels are used verbatim across the site, so renaming
   * "Book a Consultation" here renames it in the header, hero, footer,
   * sticky mobile bar and every section CTA.
   */
  cta: {
    primary: { label: "Book a Consultation", href: "/contact" },
    secondary: { label: "Explore Practice Areas", href: "/practice-areas" },
  },

  /**
   * Bar Council of India rules restrict advertising by advocates. This notice
   * is surfaced in the footer and on the disclaimer page.
   */
  disclaimer:
    "The Bar Council of India does not permit advertisement or solicitation by advocates. The information on this website is provided for general informational purposes only and does not constitute legal advice, nor does accessing it create an advocate–client relationship.",

  copyrightFrom: 2019,
} as const;

export type Site = typeof site;
