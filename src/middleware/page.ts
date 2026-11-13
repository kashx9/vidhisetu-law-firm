import * as React from "react";
import { site } from "@/content/site";

export const MAINTENANCE_MODE = true;

export function MaintenancePage() {
  return React.createElement(
    "main",
    {
      className:
        "flex min-h-screen items-center justify-center px-6 py-12",
      style: {
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      },
    },
    React.createElement(
      "div",
      {
        className: "w-full max-w-3xl rounded-[0.25rem] border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_24px_80px_rgba(18,28,45,0.08)] sm:p-10",
        style: { borderColor: "hsl(var(--border))", backgroundColor: "hsl(var(--card))" },
      },
      React.createElement(
        "div",
        {
          className: "mb-7 flex items-center justify-center",
        },
        React.createElement("img", {
          src: "/logo-mark.png",
          alt: "",
          width: 381,
          height: 257,
          className: "h-12 w-auto md:h-16",
        }),
      ),
      React.createElement(
        "div",
        {
          className: "mb-6 text-center",
          style: { color: "hsl(var(--primary))" },
        },
        React.createElement(
          "div",
          {
            className: "font-display text-2xl uppercase tracking-[0.24em] md:text-3xl",
            style: { letterSpacing: "0.24em" },
          },
          site.wordmark,
        ),
        React.createElement(
          "div",
          {
            className: "mt-2 text-[0.625rem] uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]",
          },
          site.descriptor,
        ),
      ),
      React.createElement(
        "div",
        {
          className: "mb-6 flex items-center justify-center",
        },
        React.createElement(
          "span",
          {
            className: "inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent))]/40 bg-[hsl(var(--secondary))] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em]",
            style: {
              color: "hsl(var(--accent))",
              borderColor: "hsl(var(--accent))",
              backgroundColor: "hsl(var(--secondary))",
            },
          },
          "Maintenance",
        ),
      ),
      React.createElement(
        "h1",
        {
          className: "text-center font-display text-4xl leading-tight md:text-6xl",
          style: { color: "hsl(var(--primary))" },
        },
        "Website under maintenance",
      ),
      React.createElement(
        "p",
        {
          className: "mx-auto mt-5 max-w-2xl text-center text-base leading-7 md:text-lg",
          style: { color: "hsl(var(--muted-foreground))" },
        },
        "We are updating the website and all content is temporarily locked while we complete the next stage of our digital experience.",
      ),
      React.createElement(
        "div",
        {
          className: "mt-8 rounded-[0.25rem] border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] p-5 text-center text-sm leading-6",
          style: {
            borderColor: "hsl(var(--border))",
            backgroundColor: "hsl(var(--secondary))",
            color: "hsl(var(--primary))",
          },
        },
        "We will be back online shortly with the latest updates.",
      ),
    ),
  );
}
