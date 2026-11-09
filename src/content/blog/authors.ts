/**
 * BLOG AUTHORS — the byline directory.
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
    name: "Adv. Shikha Sinha",
    role: "Founder & Managing Partner",
    initials: "SS",
    bio: "Advises founders and boards on structuring, investment and governance.",
  },
  {
    id: "rishab-bakshi",
    name: "Rishab Bakshi",
    role: "Founder & Managing Partner",
    initials: "RB",
    bio: "Handles commercial disputes, arbitration and recovery.",
  },
  {
    id: "aditi-varshiney",
    name: "Adv. Aditi Varshiney",
    role: "Junior Associate — Corporate & IP",
    initials: "AV",
    bio: "Builds compliance frameworks for regulated sectors and manages trademark portfolios.",
  }
];

export const getAuthor = (id: string) => authors.find((author) => author.id === id);
