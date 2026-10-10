# Publishing to the VidhiSetu Blog

A guide for the firm's authors and editors. No technical knowledge needed.

---

## What the Blog Studio is

The website has two sides.

**The blog** at `/blog` is the public side — what clients and visitors read. It lists every
published article, with search and filters by category and industry.

**The Blog Studio** at `/blog/studio` is the private side — where the firm writes those articles.
It is a password-protected writing desk built into the website itself. You do not need a developer,
a separate content system, or anything installed on your machine. You open a web page, write, and
publish.

One sentence version: *the Studio is where we write; the blog is where it appears once an editor
says it's ready.*

---

## Who can sign in

Three accounts exist. Each person signs in with their own email and password, so every article
carries the right byline and you can always see who wrote what.

| Person | Email | Role |
| --- | --- | --- |
| Adv. Meera Raghunathan | `meera@vidhisetu.in` | Editor |
| Adv. Sanya Deshpande | `sanya@vidhisetu.in` | Editor |
| Adv. Rohan Mehta | `rohan@vidhisetu.in` | Author |

**An Author** can write, edit and submit articles for review. They cannot make anything public.

**An Editor** can do all of that, and can also publish, archive and delete.

Sessions last 12 hours, after which you sign in again. Passwords were set when the site was built
and are held separately — ask whoever maintains the site if you need yours, or if you want it
changed. Passwords cannot be recovered or read back from the site; they can only be replaced.

---

## The four stages an article goes through

```
   Draft  ──────►  In review  ──────►  Published  ──────►  Archived
   private         private             public              retired
```

| Stage | What it means |
| --- | --- |
| **Draft** | Being written. Invisible to the public. Only people signed in to the Studio can see it. |
| **In review** | Finished, waiting for an editor to read it. Still invisible to the public. |
| **Published** | Live. It appears on `/blog`, in the homepage blog section, and on any related practice-area or industry page, immediately. |
| **Archived** | Taken down without being deleted. Nothing is lost, and it can be moved back to draft at any point. |

Nothing becomes public by accident. Only an article an editor has explicitly published is readable
by anyone outside the Studio — if someone guesses the web address of a draft, they are sent back to
the blog listing.

---

## How to publish a new article

**1. Open the Studio.** Go to `/blog/studio` on the website. Sign in with your email and password.

**2. Click "New post".** You land in the editor.

**3. Fill in the left-hand column — the article itself.**

- **Title** — the headline. The web address is generated from it automatically (tick "Edit
  manually" if you want to set the address yourself).
- **Excerpt** — one or two sentences. This is what appears on the article cards and in Google
  results, so it is worth writing properly rather than repeating the first line.
- **Body** — the article. Write in Markdown, which is just plain text with a few marks:

  | To get | Type |
  | --- | --- |
  | A section heading | `## Heading` |
  | A smaller heading | `### Heading` |
  | **Bold** | `**bold**` |
  | *Italic* | `*italic*` |
  | A bulleted list | `- item` on each line |
  | A numbered list | `1. item` on each line |
  | A link | `[the words](https://the-address)` |
  | A pulled-out quote | `> the quote` |

  Switch to the **Preview** tab at any time to see exactly how it will look when published.

**4. Fill in the right-hand column — how it gets found.**

- **Category** (required) — one of the seven: Corporate Law, Startup Law, Contracts, Compliance,
  Intellectual Property, Employment, Disputes & Litigation. This drives the filter buttons on the
  blog.
- **Practice area** (optional) — links the article to a service page. Setting this makes the
  article appear under "Further Reading" on that practice area's page, and shows a link back to the
  service from the article. Worth setting; it is how a reader goes from reading to enquiring.
- **Industry** (optional) — same idea, for the industry pages.
- **Tags** — comma separated. They help site search find the article.
- **Author** — defaults to you.
- **Publication date** — the date shown on the article and used to order the listing.
- **Featured** — tick this to give the article the large lead position at the top of the blog. Only
  one article should have it at a time.
- **Cover image** — optional, under 1.5 MB. If you don't add one, the site draws a piece of
  geometric artwork for the article automatically, so it never looks unfinished. If you do add one,
  fill in the **alt text** describing the image — screen readers and search engines both use it.
- **SEO** — leave both blank unless you want a different headline and summary for Google than the
  ones on the page.

**5. Save and move it along.** Three buttons sit at the top right:

- **Save draft** — keeps your work. Use it often.
- **Send for review** — marks it finished and hands it to an editor.
- **Publish** — makes it live. Only editors see this work; for an author it is greyed out.

The site will stop you and say what's missing if the title, excerpt or body are too short, or if
you attached a cover image without alt text.

---

## How to edit or take down an existing article

Go to `/blog/studio`. Every article is listed with its stage, author and date. From there:

- **Click the title** to open it in the editor and change anything.
- **Filter by stage** using the buttons across the top, or search by title.
- **Archive** a published article to take it off the site while keeping it.
- **Delete** removes it permanently — editors only, and it asks first.

Editing a published article and saving it updates the live version straight away.

---

## Two things to know about how it works today

**1. Articles currently save to the browser you wrote them in.** The Studio stores articles in the
browser's own storage, so an article written on one laptop will not appear on another, and clearing
your browser data would clear your drafts. The eight articles the site shipped with are built into
the website itself and are not affected by this.

This is deliberate — the website has no server behind it yet. Connecting one is a small, planned
change, and the "Export JSON" button in the Studio exists so nothing is trapped in the meantime.
**Until that is done, treat the Studio as a drafting tool and keep a copy of anything important.**

**2. The sign-in is a real password check, but not a security wall.** It keeps the Studio private
from ordinary visitors and attributes posts to the right person. It does not protect against
someone technical who is determined to get in, because the check happens in the browser rather than
on a server. Nothing confidential should go into a draft until that moves server-side.

Both are noted for the developer in `README.md`.
