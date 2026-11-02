/**
 * NAVIGATION — header and footer menus.
 * Adding an entry here adds it to the site chrome. Routes themselves are
 * registered in src/App.tsx.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = NavLink & {
  /** When present the header renders a dropdown panel. */
  children?: NavLink[];
};

export const primaryNav: NavItem[] = [
  { label: "About Us", href: "/about" },
  {
    label: "Practice Areas",
    href: "/practice-areas",
    children: [
      { label: "Corporate Advisory", href: "/practice-areas/corporate-advisory" },
      { label: "Commercial Contracts", href: "/practice-areas/commercial-contracts" },
      { label: "Startup Legal Advisory", href: "/practice-areas/startup-legal-advisory" },
      { label: "Due Diligence", href: "/practice-areas/due-diligence" },
      { label: "Compliance & Governance", href: "/practice-areas/compliance-governance" },
      { label: "Business Governance", href: "/practice-areas/business-governance" },
      { label: "Intellectual Property", href: "/practice-areas/intellectual-property" },
      { label: "Trademark", href: "/practice-areas/trademark" },
      { label: "Litigation Support", href: "/practice-areas/litigation-support" },
      { label: "Arbitration & Mediation", href: "/practice-areas/arbitration-mediation" },
      { label: "Employment Documentation", href: "/practice-areas/employment-documentation" },
      { label: "Legal Management", href: "/practice-areas/legal-management" },
      { label: "Legal Retainers", href: "/legal-retainers" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Startups & Emerging Businesses", href: "/industries/startups" },
      { label: "MSMEs", href: "/industries/msmes" },
      { label: "Corporate & Established Businesses", href: "/industries/corporates" },
      { label: "Educational Institutions", href: "/industries/education" },
      { label: "F&B Businesses", href: "/industries/food-and-beverage" },
      { label: "Automobile & Automotive", href: "/industries/automobile" },
    ],
  },
  { label: "Our Approach", href: "/approach" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Practice Areas",
    links: [
      { label: "Corporate Advisory", href: "/practice-areas/corporate-advisory" },
      { label: "Commercial Contracts", href: "/practice-areas/commercial-contracts" },
      { label: "Startup Legal Advisory", href: "/practice-areas/startup-legal-advisory" },
      { label: "Due Diligence", href: "/practice-areas/due-diligence" },
      { label: "Compliance & Governance", href: "/practice-areas/compliance-governance" },
      { label: "Intellectual Property", href: "/practice-areas/intellectual-property" },
      { label: "Trademark", href: "/practice-areas/trademark" },
      { label: "Litigation Support", href: "/practice-areas/litigation-support" },
      { label: "All Practice Areas", href: "/practice-areas" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Startups & Emerging Businesses", href: "/industries/startups" },
      { label: "MSMEs", href: "/industries/msmes" },
      { label: "Corporate & Established Businesses", href: "/industries/corporates" },
      { label: "Educational Institutions", href: "/industries/education" },
      { label: "F&B Businesses", href: "/industries/food-and-beverage" },
      { label: "Automobile & Automotive", href: "/industries/automobile" },
      { label: "All Industries", href: "/industries" },
    ],
  },
  {
    title: "Firm",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Approach", href: "/approach" },
      { label: "Startup Legal Services", href: "/startup-legal" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Consultation", href: "/contact" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Website Terms", href: "/legal/terms" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];
