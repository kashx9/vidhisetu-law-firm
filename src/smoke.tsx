/**
 * Route smoke test tree — see scripts/run-smoke.mjs and `npm run smoke`.
 *
 * This file is not part of the app bundle; it exists so every route (including
 * the ones generated from src/content) can be rendered and checked in one pass.
 */
import { renderToString } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import PracticeAreasPage from "@/pages/PracticeAreasPage";
import PracticeAreaDetailPage from "@/pages/PracticeAreaDetailPage";
import IndustriesPage from "@/pages/IndustriesPage";
import IndustryDetailPage from "@/pages/IndustryDetailPage";
import ApproachPage from "@/pages/ApproachPage";
import RetainersPage from "@/pages/RetainersPage";
import StartupLegalPage from "@/pages/StartupLegalPage";
import InsightsPage from "@/pages/InsightsPage";
import InsightDetailPage from "@/pages/InsightDetailPage";
import ContactPage from "@/pages/ContactPage";
import ThankYouPage from "@/pages/ThankYouPage";
import LegalPage from "@/pages/LegalPage";
import ClientLoginPage from "@/pages/ClientLoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import StudioPage from "@/pages/studio/StudioPage";
import StudioEditorPage from "@/pages/studio/StudioEditorPage";
import { practiceAreas } from "@/content/practiceAreas";
import { industries } from "@/content/industries";
import { legalDocuments } from "@/content/legal";
import { seedInsights } from "@/content/insights/posts";

function Tree({ path }: { path: string }) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="practice-areas" element={<PracticeAreasPage />} />
          <Route path="practice-areas/:slug" element={<PracticeAreaDetailPage />} />
          <Route path="industries" element={<IndustriesPage />} />
          <Route path="industries/:slug" element={<IndustryDetailPage />} />
          <Route path="approach" element={<ApproachPage />} />
          <Route path="legal-retainers" element={<RetainersPage />} />
          <Route path="startup-legal" element={<StartupLegalPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="insights/studio" element={<StudioPage />} />
          <Route path="insights/studio/:id" element={<StudioEditorPage />} />
          <Route path="insights/:slug" element={<InsightDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="thank-you" element={<ThankYouPage />} />
          <Route path="legal/:slug" element={<LegalPage />} />
          <Route path="client-login" element={<ClientLoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

const routes = [
  "/",
  "/about",
  "/practice-areas",
  ...practiceAreas.map((a) => `/practice-areas/${a.slug}`),
  "/industries",
  ...industries.map((i) => `/industries/${i.slug}`),
  "/approach",
  "/legal-retainers",
  "/startup-legal",
  "/insights",
  ...seedInsights.filter((p) => p.status === "published").map((p) => `/insights/${p.slug}`),
  "/insights/studio",
  "/insights/studio/new",
  "/contact",
  "/thank-you",
  ...legalDocuments.map((d) => `/legal/${d.slug}`),
  "/client-login",
  "/not-a-real-page",
];

export function run() {
  let failures = 0;
  for (const path of routes) {
    try {
      const html = renderToString(<Tree path={path} />);
      if (html.length < 200) {
        console.log(`THIN  ${path} (${html.length} bytes)`);
        failures++;
      } else {
        console.log(`ok    ${path} (${html.length} bytes)`);
      }
    } catch (error) {
      console.log(`FAIL  ${path}: ${(error as Error).message}`);
      failures++;
    }
  }
  console.log(failures === 0 ? "\nALL ROUTES RENDERED" : `\n${failures} ROUTE FAILURES`);
  return failures;
}
