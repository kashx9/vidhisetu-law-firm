/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "http" switches the insights store to the API backend. Default: local. */
  readonly VITE_INSIGHTS_BACKEND?: string;
  /** Base URL of the insights API when VITE_INSIGHTS_BACKEND=http. */
  readonly VITE_INSIGHTS_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
