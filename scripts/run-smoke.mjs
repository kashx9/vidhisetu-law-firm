/**
 * Route smoke test.
 *
 * Server-renders every public route — including the pages generated from
 * src/content/practiceAreas.ts, industries.ts, legal.ts and blog/posts.ts —
 * and fails if any of them throws or comes back empty. Run it after editing
 * anything in src/content to confirm a content change has not broken a page.
 *
 *   npm run smoke
 */
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "http://localhost/",
});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
Object.defineProperty(globalThis, "navigator", { value: dom.window.navigator, configurable: true });
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.Element = dom.window.Element;
globalThis.Node = dom.window.Node;
globalThis.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
dom.window.matchMedia = globalThis.matchMedia;

const { run } = await import("../dist-smoke/smoke.js");
process.exit(run() === 0 ? 0 : 1);
