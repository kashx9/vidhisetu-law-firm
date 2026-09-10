/**
 * WHY CLIENTS CHOOSE VIDHISETU — the six differentiators.
 * Used on the homepage and the /about page.
 */

import type { IconName } from "@/lib/icons";

export type Differentiator = {
  icon: IconName;
  title: string;
  body: string;
};

export const differentiators: Differentiator[] = [
  {
    icon: "target",
    title: "Business-focused legal advice",
    body: "Recommendations are designed around commercial objectives. We start from what you are trying to achieve and work back to the legal route, rather than presenting the law and leaving you to translate it.",
  },
  {
    icon: "shieldCheck",
    title: "Preventive legal strategy",
    body: "We identify risks before they become disputes, losses or regulatory problems. Most of what reaches litigation was visible, and inexpensive to address, years earlier.",
  },
  {
    icon: "compass",
    title: "Sector-specific understanding",
    body: "Advice is adapted to the client's operating reality. A SaaS contract, an F&B licence chain and a hospital's consent framework are not variations of the same problem.",
  },
  {
    icon: "handshake",
    title: "End-to-end transaction support",
    body: "From structuring and documentation through negotiation, closing and post-transaction support. One team holds the matter from the first call to the last condition subsequent.",
  },
  {
    icon: "clock",
    title: "Long-term advisory mindset",
    body: "Continuing legal support, not only one-off documents. We are set up to be the counsel you call before the decision, not the one you call after it.",
  },
  {
    icon: "cpu",
    title: "Technology-enabled delivery",
    body: "Technology improves legal workflows — tracking, turnaround and visibility — while professional legal advice remains central. The tooling serves the counsel; it does not replace it.",
  },
];
