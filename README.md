# VidhiSetu — Law Firm Website

A static, content-driven website for the VidhiSetu law firm / legal consultancy, built to the
structure in `VidhiSetu_Law_Firm_Website_Layout_Odoo.docx`.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui (Radix) · React Router

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run smoke    # render-test every route (run after editing content)
```

**Writing a blog post?** See [docs/BLOG-STUDIO.md](docs/BLOG-STUDIO.md) — a non-technical guide for
the firm's authors and editors.

---

## The one rule: everything lives in `src/content/`

You should not need to touch a component to change what the site says. All copy, data, contact
details and design tokens live in one folder:

| File | Controls |
| --- | --- |
| `theme.ts` | **Colours, fonts, radius.** Change the palette once — the whole site follows. |
| `site.ts` | Firm name, phone, email, offices, social, CTA labels, Bar Council disclaimer. |
| `navigation.ts` | Header menu, dropdowns, footer columns, legal links. |
| `homepage.ts` | Hero copy, trust strip, every homepage section headline. |
| `practiceAreas.ts` | The 8 practice areas → homepage grid, dropdown, index page **and detail pages**. |
| `industries.ts` | The 9 industries → same, with a dedicated page each. |
| `whyUs.ts` | The six differentiators. |
| `approach.ts` | Understand → Assess → Advise → Execute → Support, plus the principles. |
| `startupJourney.ts` | The nine startup stages. |
| `retainers.ts` | Retainer inclusions, plans, FAQs, and the `showPricing` switch. |
| `about.ts` | Firm story, values, team, engagement model. |
| `consultation.ts` | Enquiry form options, **practice-area routing table**, process, thank-you copy. |
| `legal.ts` | Privacy policy, website terms, disclaimer (markdown). |
| `blog/` | Blog categories, authors and the seeded posts. |

Nothing in `src/content/` imports React — it is plain data, safe to hand to a non-developer.
Icons are referenced by name (`"shield"`, `"rocket"`) and resolved through `src/lib/icons.ts`.

> Blog **accounts and passwords** are the one exception: they live in
> `src/features/blog/accounts.ts`, not in the content folder, because they are credentials rather
> than copy.

### Adding a practice area or industry

Add an object to `practiceAreas.ts` or `industries.ts` and the detail page, index card, homepage
tile and cross-links all appear. Add the matching entry in `navigation.ts` if it should also be in
the header dropdown. Then run `npm run smoke` to confirm nothing broke.

### Changing the design system

Everything visual is derived from `src/content/theme.ts`. The palette is expressed as HSL triplets,
applied as CSS variables before the first paint, and mapped to Tailwind names in
`tailwind.config.ts`. Swap the values in `palette` and every button, card, border and heading on the
site changes with them — no component edits.

The current look is a deliberately restrained placeholder system: ivory paper, deep navy ink, a
single brass accent, editorial serif headings (Playfair Display) over Inter, near-square corners and
hairline rules. It follows the brief's direction — premium, trust-led, no gavels, no courthouse
imagery, no SaaS-style rounded cards, no gradients. Replace it wholesale when the real design system
arrives.

### The logo

`src/components/common/Logo.tsx` renders the brand lockup: the V mark, then the firm name in
letterspaced caps.

| File in `public/` | Used for |
| --- | --- |
| `logo-mark.png` | The V + swoosh in the header. Cropped from the supplied artwork. |
| `favicon.png` | Square version of the mark, for the browser tab. |
| `Vidhi setu_*.png` | The original supplied artwork. Nothing references it — keep it as the source file, or delete it so it stops shipping to `dist/`. |

Two deliberate decisions, both reversible in that one component:

- **The name beside the mark is live text, not part of the image.** The artwork's own wordmark is
  `#d9d1d1`, about 1.4:1 against the ivory background — unreadable, and invisible to screen
  readers. As text it takes the brand ink colour, stays sharp at any size and is selectable. The
  spelling comes from `site.wordmark` ("Vidhi Setu", spaced to match the artwork), separate from
  `site.name` ("VidhiSetu") which is used in prose and page titles.
- **The footer omits the mark.** Its swoosh is black and would vanish into the navy. The wordmark
  alone carries the brand there. To show the mark on dark as well, export a light variant of the
  artwork and render it in the `onDark` branch.

---

## The blog

```
/blog               public listing — search, category and industry filters
/blog/:slug         an article
/blog/studio        the Studio: sign-in, then the authoring dashboard
/blog/studio/:id    the editor ("new" for a fresh post)
```

Publishing flow, enforced by `statusTransitions` in `src/features/blog/types.ts`:

```
draft ──► in_review ──► published ──► archived
                            │            │
                            └── public ──┘ (archived is not public)
```

**Only `published` posts are public.** Drafts and in-review posts are invisible on `/blog`, and a
guessed URL redirects to the listing.

### Accounts

Three real accounts, in `src/features/blog/accounts.ts`:

| Email | Role | Can |
| --- | --- | --- |
| `meera@vidhisetu.in` | editor | write, publish, archive, delete |
| `sanya@vidhisetu.in` | editor | write, publish, archive, delete |
| `rohan@vidhisetu.in` | author | write, edit, send for review |

Passwords are stored only as **PBKDF2-SHA256** hashes (210,000 iterations, per-account 16-byte
salt) and re-derived in the browser via Web Crypto at sign-in. Sessions last 12 hours. Removing an
account from `accounts.ts` invalidates any session for it on next load.

To change or set a password:

```bash
node scripts/hash-password.mjs "the new password"
# paste the printed salt + hash over that account's entry
```

> **Security limit — read before launch.** This is browser-side authentication: the hash list ships
> in the JS bundle, so it can be attacked offline or bypassed by editing the client. It is a real
> password gate, enough to keep the Studio private from visitors and to attribute posts correctly,
> but it is **not a security boundary**. Move the check to a server before the site holds anything
> confidential. `signIn` / `currentSession` / `canAuthor` / `canPublish` in
> `src/features/blog/auth.ts` are the only four things the UI calls, so swapping in a server session
> needs no component changes.

### Three ways to get a post onto the site

1. **Through the Studio** — write it in the browser. Stored in `localStorage` for now.
2. **By hand** — add an object to `src/content/blog/posts.ts` with `status: "published"`.
   This is how the eight seeded articles work.
3. **From a backend** — see below.

Seeded posts and Studio posts are kept separately and merged at read time, so editing `posts.ts`
never destroys drafts and clearing drafts never destroys `posts.ts`.

### Swapping the mock store for a real backend

`src/features/blog/blogStore.ts` defines a `BlogPostRepository` interface with seven methods. A
`LocalDraftRepository` (localStorage) and an `HttpRepository` (stubbed) both implement it. Point it
at a real API with two environment variables:

```bash
VITE_BLOG_BACKEND=http
VITE_BLOG_API=https://api.example.com
```

No component changes — the UI only ever talks to the hooks in `useBlogPosts.ts`.

---

## Project structure

```
src/
  content/          ← all copy, data and design tokens (edit here)
    blog/           categories, authors, seeded posts
  components/
    ui/             shadcn/ui primitives (button, card, select, dialog, …)
    common/         Section, PageHero, Logo, CoverArt, Markdown, Reveal, BlogCard
    layout/         Header, Footer, SiteLayout, StickyConsultBar
    sections/       the eleven homepage sections
    forms/          ConsultationForm
  features/blog/    types, store, accounts, auth, hooks — the blog subsystem
  pages/            one file per route; studio/ holds the authoring screens
  lib/              utils, icon registry
  hooks/            usePageMeta
scripts/            smoke test + password hashing tool
docs/               BLOG-STUDIO.md — the guide for writers
```

## Routes

`/` · `/about` · `/practice-areas` · `/practice-areas/:slug` · `/industries` · `/industries/:slug` ·
`/approach` · `/legal-retainers` · `/startup-legal` · `/blog` · `/blog/:slug` · `/blog/studio` ·
`/blog/studio/:id` · `/contact` · `/thank-you` · `/legal/:slug`

Navigation is **About Us · Practice Areas · Industries · Our Approach · Blog · Contact**, plus the
one "Book a Consultation" button. The Studio is intentionally not in the public menu — it is reached
from the discreet link on `/blog` or by its URL.

---

## What is mocked

Everything below is deliberately placeholder and needs replacing before launch:

- **Consultation form submission** — `submitEnquiry()` in `ConsultationForm.tsx` logs the payload
  (with the resolved routing mailbox) instead of posting it. It is also where the conversion
  tracking event should fire.
- **Blog storage** — browser `localStorage`, per the section above.
- **Studio authentication** — a real password check, but client-side; see the security note above.
- **Firm details** — team members, offices, phone, email, statistics in the hero, and the
  routing mailboxes in `consultation.ts` are all invented.
- **Legal pages** — privacy policy, terms and disclaimer are placeholder drafting. Have the firm's
  own compliance review sign them off.
- **Retainer fees** — hidden behind `showPricing: false` in `retainers.ts`, since Bar Council rules
  constrain how legal fees may be advertised.
- **Cover images** — blog covers are generated geometric artwork (deterministic per slug) rather
  than stock photography, per the brief's instruction to avoid generic legal imagery. Upload a real
  image in the Studio to override it.
- **Client Login** — removed. It was a placeholder for a portal that does not exist yet; re-add a
  route and a `cta.login` entry in `site.ts` when there is something real to link to.
