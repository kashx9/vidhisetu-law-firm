/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "http" switches the blog store to the API backend. Default: local. */
  readonly VITE_BLOG_BACKEND?: string;
  /** Base URL of the blog API when VITE_BLOG_BACKEND=http. */
  readonly VITE_BLOG_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
