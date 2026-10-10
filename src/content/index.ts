/**
 * ════════════════════════════════════════════════════════════════════════════
 *  src/content — THE ONLY FOLDER YOU NEED TO EDIT TO CHANGE THE SITE'S CONTENT
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  theme.ts            Colours, fonts, radius. Change the palette once, the
 *                      whole site follows.
 *  site.ts             Firm name, phone, email, offices, CTA labels, disclaimer.
 *  navigation.ts       Header menu, footer columns, legal links.
 *  homepage.ts         Hero copy, trust strip, every homepage section headline.
 *  practiceAreas.ts    8 practice areas → grid, dropdown, index and detail pages.
 *  industries.ts       9 industries → grid, dropdown, index and detail pages.
 *  whyUs.ts            The six differentiators.
 *  approach.ts         The five-step method and the underlying principles.
 *  startupJourney.ts   The nine startup stages.
 *  retainers.ts        Retainer inclusions, plans and FAQs.
 *  about.ts            Firm story, values, team, engagement model.
 *  consultation.ts     Enquiry form options, routing table, process, thank-you.
 *  legal.ts            Privacy policy, website terms, disclaimer.
 *  blog/               Blog: categories, authors and seeded posts.
 *
 *  Nothing in this folder imports React. It is plain data, safe for a
 *  non-developer to edit.
 */

export { site } from "./site";
export { primaryNav, footerNav, legalNav } from "./navigation";
export { hero, trustStrip, sections } from "./homepage";
export { practiceAreas, getPracticeArea, featuredPracticeAreas } from "./practiceAreas";
export { industries, getIndustry } from "./industries";
export { differentiators } from "./whyUs";
export { approachSteps, approachPrinciples } from "./approach";
export { startupJourney } from "./startupJourney";
export { retainerPlans, retainerInclusions, retainerFaqs, showPricing } from "./retainers";
export { aboutIntro, philosophy, values, team, engagementModel } from "./about";
export {
  consultationModes,
  enquiryTopics,
  enquiryRouting,
  resolveRoute,
  consultationProcess,
  thankYou,
} from "./consultation";
export { legalDocuments, getLegalDocument } from "./legal";
export { blogCategories, getCategory, categoryLabel } from "./blog/categories";
export { authors, getAuthor } from "./blog/authors";
export { seedPosts } from "./blog/posts";

export type { NavItem, NavLink } from "./navigation";
export type { PracticeArea } from "./practiceAreas";
export type { Industry } from "./industries";
export type { Differentiator } from "./whyUs";
export type { ApproachStep } from "./approach";
export type { JourneyStage } from "./startupJourney";
export type { RetainerPlan } from "./retainers";
export type { TeamMember, Value } from "./about";
export type { LegalDocument } from "./legal";
export type { BlogCategory } from "./blog/categories";
export type { Author } from "./blog/authors";
