/**
 * INSIGHT AUTHORS — the byline directory.
 *
 * Author ids are referenced by `authorId` on each post. Keeping them here means
 * a role change or a new joiner is a one-line edit rather than a find-and-replace
 * across every article.
 */

export type Author = {
  id: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
};

export const authors: Author[] = [
  {
    id: "meera-raghunathan",
    name: "Adv. Meera Raghunathan",
    role: "Founder & Managing Partner",
    initials: "MR",
    bio: "Advises founders and boards on structuring, investment and governance.",
  },
  {
    id: "kabir-anand",
    name: "Adv. Kabir Anand",
    role: "Partner — Disputes",
    initials: "KA",
    bio: "Handles commercial disputes, arbitration and recovery.",
  },
  {
    id: "sanya-deshpande",
    name: "Adv. Sanya Deshpande",
    role: "Partner — Regulatory & IP",
    initials: "SD",
    bio: "Builds compliance frameworks for regulated sectors and manages trademark portfolios.",
  },
  {
    id: "rohan-mehta",
    name: "Adv. Rohan Mehta",
    role: "Principal Associate — Employment",
    initials: "RM",
    bio: "Advises on employment documentation, workplace policy and separations.",
  },
];

export const getAuthor = (id: string) => authors.find((author) => author.id === id);
