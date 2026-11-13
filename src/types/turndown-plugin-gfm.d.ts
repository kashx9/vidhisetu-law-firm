/**
 * turndown-plugin-gfm ships no types. It adds the GitHub-flavoured rules that
 * plain Turndown lacks — tables, strikethrough and task lists — which are the
 * same extensions remark-gfm understands on the rendering side.
 */
declare module "turndown-plugin-gfm" {
  import type TurndownService from "turndown";
  export const gfm: TurndownService.Plugin;
  export const tables: TurndownService.Plugin;
  export const strikethrough: TurndownService.Plugin;
  export const taskListItems: TurndownService.Plugin;
}
