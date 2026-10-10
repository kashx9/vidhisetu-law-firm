/**
 * ════════════════════════════════════════════════════════════════════════════
 *  BLOG STUDIO ACCOUNTS — who can sign in to write and publish
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  Three accounts, each with a real password. Passwords are never stored here:
 *  only a PBKDF2-SHA256 hash and its salt, which the browser re-derives at
 *  sign-in and compares. The hash cannot be reversed back into the password.
 *
 *  ── TO CHANGE A PASSWORD ──────────────────────────────────────────────────
 *      node scripts/hash-password.mjs "the new password"
 *  Paste the printed `salt` and `hash` over the ones below.
 *
 *  ── TO ADD A PERSON ───────────────────────────────────────────────────────
 *  Add an object here, and add a matching author in src/content/blog/authors.ts
 *  so their byline appears on the article. `authorId` links the two.
 *
 *  ── ROLES ─────────────────────────────────────────────────────────────────
 *      author  — write, edit and submit drafts for review
 *      editor  — all of the above, plus publish, archive and delete
 *
 *  ── IMPORTANT SECURITY LIMIT ──────────────────────────────────────────────
 *  This is browser-side authentication. The account list below is part of the
 *  JavaScript bundle, so a determined person can read these hashes and attempt
 *  to crack them offline, or bypass the check entirely by editing the client.
 *
 *  It is a genuine password gate — not a decorative one — and it is enough to
 *  keep the Studio private from ordinary visitors and to attribute posts to the
 *  right person. It is NOT a security boundary. Before this site handles
 *  anything confidential, the check has to move to a server that holds the
 *  hashes and issues a session (see src/features/blog/auth.ts).
 */

export type StudioRole = "author" | "editor";

export type StudioAccount = {
  /** Used as the username at sign-in. Compared case-insensitively. */
  email: string;
  name: string;
  role: StudioRole;
  /** Must match an `id` in src/content/blog/authors.ts — drives the byline. */
  authorId: string;
  /** Hex, 16 bytes. Unique per account. */
  salt: string;
  /** Hex, PBKDF2-SHA256 of the password with the salt above. */
  hash: string;
};

export const studioAccounts: StudioAccount[] = [
  {
    email: "shikha@vidhisetu.in",
    name: "Adv. Shikha Sinha",
    role: "editor",
    authorId: "shikha-sinha",
    salt: "80ff9e84af6d7da81ccf7765be4a8ea8",
    hash: "93f2ba60df3be3e8c78d789235f49ffba4ac2567cf02c15a2c87d687a396db83",
  },
  {
    email: "rishab@vidhisetu.in",
    name: "Rishab ",
    role: "editor",
    authorId: "rishab-sharma",
    salt: "c8b4437e56415ba338732cb7ddc980ec",
    hash: "8aa897ecbb829c97739e50ff0c40b750bf36474657f175f7c63fc4aa68b87127",
  },
  {
    email: "aditi@vidhisetu.in",
    name: "Aditi",
    role: "editor",
    authorId: "aditi",
    salt: "b140bab07b49d962a9e4c9683d06d29b",
    hash: "4cf7911514275f4f9c98fcc2e39ec7b54cc6c7e889f26857faaedf60162c2daa",
  },
];

export const findAccount = (email: string) =>
  studioAccounts.find((account) => account.email.toLowerCase() === email.trim().toLowerCase());
