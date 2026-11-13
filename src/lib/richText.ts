import { marked } from "marked";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

/**
 * ════════════════════════════════════════════════════════════════════════════
 *  MARKDOWN ⇄ HTML, for the Studio's rich-text editor
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  Posts are stored as Markdown in `BlogPost.body` and rendered with
 *  react-markdown + remark-gfm everywhere on the site. The editor, however,
 *  works in HTML — so it reads through `markdownToHtml` on open and writes
 *  back through `htmlToMarkdown` on every keystroke.
 *
 *  Keeping Markdown as the stored format is deliberate: the seeded posts, the
 *  published pages, the legal pages and the preview pane all keep working
 *  untouched, and a post written in the editor is indistinguishable from one
 *  written by hand.
 *
 *  The consequence is that only what Markdown can express survives a save.
 *  Underline, text colour, font size and alignment have no Markdown
 *  equivalent, so the toolbar deliberately does not offer them rather than
 *  letting someone apply formatting that silently disappears.
 */

const turndown = new TurndownService({
  headingStyle: "atx",
  hr: "---",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
  strongDelimiter: "**",
  linkStyle: "inlined",
});

turndown.use(gfm);

/** ProseMirror leaves these behind on an empty paragraph; they are not content. */
turndown.addRule("emptyParagraph", {
  filter: (node) => node.nodeName === "P" && node.textContent?.trim() === "",
  replacement: () => "",
});

/**
 * Turndown pads list markers out to four characters ("-   item") and writes
 * strikethrough with a single tilde. Both are valid, but neither matches how
 * the seeded posts are written — and without these two overrides, merely
 * opening an existing post in the editor would rewrite every list in it.
 */
turndown.addRule("listItem", {
  filter: "li",
  replacement: (content, node) => {
    const parent = node.parentNode as HTMLElement | null;
    let prefix = `${turndown.options.bulletListMarker} `;

    if (parent?.nodeName === "OL") {
      const start = parent.getAttribute("start");
      const index = Array.prototype.indexOf.call(parent.children, node);
      prefix = `${start ? Number(start) + index : index + 1}. `;
    }

    const body = content
      .replace(/^\n+/, "")
      .replace(/\n+$/, "\n")
      // Nested content lines up under the marker, whatever its width.
      .replace(/\n/g, `\n${" ".repeat(prefix.length)}`);

    return prefix + body + (node.nextSibling && !/\n$/.test(body) ? "\n" : "");
  },
});

turndown.addRule("strikethrough", {
  filter: ["del", "s"],
  replacement: (content) => `~~${content}~~`,
});

/**
 * Turndown escapes a leading "1." anywhere so it cannot be misread as an
 * ordered list. Inside a heading it never could be, and "## 1\. Clause" is
 * needless noise in a document people also edit by hand.
 */
turndown.addRule("heading", {
  filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
  replacement: (content, node) => {
    const level = Number(node.nodeName.charAt(1));
    const text = content.replace(/^(\d+)\\\.(\s)/, "$1.$2");
    return `\n\n${"#".repeat(level)} ${text}\n\n`;
  },
});

/**
 * Turndown only writes a Markdown table when it can find a heading row, and it
 * looks for one by checking that nothing precedes the `<tbody>`. The editor
 * emits a `<colgroup>` for resizable columns, which sits exactly there — so
 * without this normalisation every table a writer inserts is kept as raw HTML,
 * and react-markdown (which does not render raw HTML) drops it from the
 * published article entirely.
 *
 * So: discard the column widths, and make the first row an explicit `<thead>`,
 * promoting its cells to `<th>` if a pasted table arrived without a header.
 * A Markdown table cannot represent a headerless table at all.
 *
 * Cell contents are flattened to inline markup for the same reason. The editor
 * wraps every cell's text in a `<p>`, and Turndown writes a paragraph with
 * blank lines around it — inside a table row that splits one row across
 * several lines and the result is no longer a table. A Markdown cell is a
 * single line, so block structure inside one cannot be kept.
 */
const CELL_BLOCKS = "p, div, h1, h2, h3, h4, h5, h6, blockquote, pre, ul, ol, li, table";

function flattenCell(cell: HTMLTableCellElement, doc: Document) {
  cell.querySelectorAll("br").forEach((br) => br.replaceWith(doc.createTextNode(" ")));

  // Unwrap repeatedly: a cell can hold a list inside a div inside a paragraph.
  for (let guard = 0; guard < 100; guard += 1) {
    const block = cell.querySelector(CELL_BLOCKS);
    if (!block) break;
    block.replaceWith(...Array.from(block.childNodes), doc.createTextNode(" "));
  }

  cell.innerHTML = cell.innerHTML.replace(/\s+/g, " ").trim();
}

function normalizeTables(html: string): string {
  // This runs on every keystroke, so skip the parse for the usual case.
  if (typeof DOMParser === "undefined" || !html.includes("<table")) return html;

  const doc = new DOMParser().parseFromString(html, "text/html");

  doc.querySelectorAll("table").forEach((table) => {
    table.querySelectorAll("colgroup").forEach((group) => group.remove());
    table.querySelectorAll("th, td").forEach((cell) => {
      flattenCell(cell as HTMLTableCellElement, doc);
    });

    if (table.tHead) return;

    const body = table.tBodies[0];
    const first = body?.rows[0];
    if (!body || !first) return;

    Array.from(first.cells).forEach((cell) => {
      if (cell.tagName === "TH") return;
      const th = doc.createElement("th");
      th.innerHTML = cell.innerHTML;
      cell.replaceWith(th);
    });

    const head = doc.createElement("thead");
    head.appendChild(first);
    table.insertBefore(head, body);
  });

  return doc.body.innerHTML;
}

export function markdownToHtml(markdown: string): string {
  return marked.parse(markdown, { async: false, gfm: true, breaks: false });
}

export function htmlToMarkdown(html: string): string {
  // Turndown emits at most two newlines between blocks; trailing space on the
  // last line otherwise churns the stored value on every open.
  return turndown
    .turndown(normalizeTables(html))
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Word counter shared by the editor footer and the page header. */
export function countWords(markdown: string): number {
  return markdown
    .replace(/[#>*_`~\-\[\]()!]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}
