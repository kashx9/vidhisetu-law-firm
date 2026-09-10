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
| `insights/` | Blog categories, authors and seeded posts. |

Nothing in `src/content/` imports React — it is plain data, safe to hand to a non-developer.
Icons are referenced by name (`"shield"`, `"rocket"`) and resolved through `src/lib/icons.ts`.

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

---

## Publishing a blog post (Insights)

The full flow, and where to plug in a real backend, is documented at the top of
`src/features/blog/blogStore.ts`. In short:

```
/insights/studio  →  New insight  →  write  →  Save draft
                         ↓
                  Send for review        (status: in_review)
                         ↓
                  Publish (editors only) (status: published → live on /insights)
                         ↓
                  Archive                (retires without deleting)
```

**The Studio** (`/insights/studio`) is the authoring dashboard: every post in every state, with
filters, status transitions, delete and a JSON export. The editor gives you title (auto-slug),
excerpt, category, practice area, industry, tags, author, publication date, featured flag, cover
image upload, SEO fields, and a markdown body with a live preview tab.

**Only `published` posts are public.** Drafts and in-review posts are invisible on `/insights` and
return a redirect if their URL is guessed.

### Three ways to get a post onto the site

1. **Through the Studio** — write it in the browser. Stored in `localStorage` for now.
2. **By hand** — add an object to `src/content/insights/posts.ts` with `status: "published"`.
   This is how the eight seeded articles work.
3. **From a backend** — see below.

Seeded posts and Studio posts are kept separately and merged at read time, so editing `posts.ts`
never destroys drafts and clearing drafts never destroys `posts.ts`.

### Swapping the mock store for a real backend

`src/features/blog/blogStore.ts` defines an `InsightRepository` interface with five methods. A
`LocalDraftRepository` (localStorage) and an `HttpRepository` (stubbed) both implement it. Point it
at a real API with two environment variables:

```bash
VITE_INSIGHTS_BACKEND=http
VITE_INSIGHTS_API=https://api.example.com
```

No component changes — the UI only ever talks to the hooks in `useInsights.ts`.

### Authoring access

`src/features/blog/auth.ts` is a **mock gate** — choosing an author and a role is the whole
"login", with no password check. Two roles exist: `author` (draft, submit for review) and `editor`
(also publish, archive, delete). Replace the three functions in that file with a real session check
and the entire Studio is secured. **Do not deploy the Studio as-is.**

---

## Project structure

```
src/
  content/          ← all copy, data and design tokens (edit here)
  components/
    ui/             shadcn/ui primitives (button, card, select, dialog, …)
    common/         Section, PageHero, Logo, CoverArt, Markdown, Reveal, InsightCard
    layout/         Header, Footer, SiteLayout, StickyConsultBar
    sections/       the eleven homepage sections
    forms/          ConsultationForm
  features/blog/    types, store, auth, hooks — the Insights subsystem
  pages/            one file per route; studio/ holds the authoring screens
  lib/              utils, icon registry
  hooks/            usePageMeta
```

## Routes

`/` · `/about` · `/practice-areas` · `/practice-areas/:slug` · `/industries` · `/industries/:slug` ·
`/approach` · `/legal-retainers` · `/startup-legal` · `/insights` · `/insights/:slug` ·
`/insights/studio` · `/insights/studio/:id` · `/contact` · `/thank-you` · `/legal/:slug` ·
`/client-login`

---

## What is mocked

Everything below is deliberately placeholder and needs replacing before launch:

- **Consultation form submission** — `submitEnquiry()` in `ConsultationForm.tsx` logs the payload
  (with the resolved routing mailbox) instead of posting it. It is also where the conversion
  tracking event should fire.
- **Blog storage** — browser `localStorage`, per the section above.
- **Studio authentication** — no password check.
- **Client Login** — a disabled placeholder screen; the real portal is a separate system.
- **Firm details** — team members, offices, phone, email, statistics in the hero, and the
  routing mailboxes in `consultation.ts` are all invented.
- **Legal pages** — privacy policy, terms and disclaimer are placeholder drafting. Have the firm's
  own compliance review sign them off.
- **Retainer fees** — hidden behind `showPricing: false` in `retainers.ts`, since Bar Council rules
  constrain how legal fees may be advertised.
- **Cover images** — insight covers are generated geometric artwork (deterministic per slug) rather
  than stock photography, per the brief's instruction to avoid generic legal imagery. Upload a real
  image in the Studio to override it.
