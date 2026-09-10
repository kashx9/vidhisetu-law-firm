import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { applyThemeTokens } from "./content/theme";
import "./index.css";

// Design tokens are applied before the first paint, so the entire palette is
// controlled from src/content/theme.ts.
applyThemeTokens();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
