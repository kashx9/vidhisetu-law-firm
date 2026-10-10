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
      { label: "Corporate & Commercial", href: "/practice-areas/corporate-commercial" },
      { label: "Contracts", href: "/practice-areas/contracts" },
      { label: "Startup & Investment", href: "/practice-areas/startup-investment" },
      { label: "Intellectual Property", href: "/practice-areas/intellectual-property" },
      { label: "Compliance & Regulatory", href: "/practice-areas/compliance-regulatory" },
      { label: "Employment & Labour", href: "/practice-areas/employment-labour" },
      { label: "Litigation & Arbitration", href: "/practice-areas/litigation-arbitration" },
      { label: "Legal Due Diligence", href: "/practice-areas/legal-due-diligence" },
      { label: "Legal Retainers", href: "/legal-retainers" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Startups & Emerging Businesses", href: "/industries/startups" },
      { label: "MSMEs & Corporates", href: "/industries/msmes-corporates" },
      { label: "Educational Institutions", href: "/industries/education" },
      { label: "F&B Businesses", href: "/industries/food-and-beverage" },
      { label: "SaaS & Technology", href: "/industries/saas-technology" },
      { label: "E-commerce", href: "/industries/ecommerce" },
      { label: "Healthcare & MedTech", href: "/industries/healthcare-medtech" },
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Hospitality", href: "/industries/hospitality" },
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
      { label: "Corporate & Commercial", href: "/practice-areas/corporate-commercial" },
      { label: "Contracts", href: "/practice-areas/contracts" },
      { label: "Startup & Investment", href: "/practice-areas/startup-investment" },
      { label: "Intellectual Property", href: "/practice-areas/intellectual-property" },
      { label: "Compliance & Regulatory", href: "/practice-areas/compliance-regulatory" },
      { label: "Litigation & Arbitration", href: "/practice-areas/litigation-arbitration" },
      { label: "Legal Retainers", href: "/legal-retainers" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Startups & Emerging Businesses", href: "/industries/startups" },
      { label: "MSMEs & Corporates", href: "/industries/msmes-corporates" },
      { label: "SaaS & Technology", href: "/industries/saas-technology" },
      { label: "E-commerce", href: "/industries/ecommerce" },
      { label: "Healthcare & MedTech", href: "/industries/healthcare-medtech" },
      { label: "Real Estate", href: "/industries/real-estate" },
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
