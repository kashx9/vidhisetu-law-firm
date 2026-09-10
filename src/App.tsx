import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import ContactPage from "@/pages/ContactPage";
import ThankYouPage from "@/pages/ThankYouPage";
import ClientLoginPage from "@/pages/ClientLoginPage";
import NotFoundPage from "@/pages/NotFoundPage";

// Long-form and authoring routes pull in the markdown renderer, which is the
// heaviest dependency on the site. Splitting them keeps it out of the bundle
// every visitor downloads.
const InsightDetailPage = lazy(() => import("@/pages/InsightDetailPage"));
const LegalPage = lazy(() => import("@/pages/LegalPage"));
const StudioPage = lazy(() => import("@/pages/studio/StudioPage"));
const StudioEditorPage = lazy(() => import("@/pages/studio/StudioEditorPage"));

/**
 * Routes. Practice-area and industry pages are generated from
 * src/content/practiceAreas.ts and src/content/industries.ts, so adding an
 * entry to those files creates a working page with no routing change.
 *
 * NOTE: the two Studio routes must be declared before /insights/:slug,
 * otherwise "studio" would be matched as an article slug.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-[60vh]" />}>
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
      </Suspense>
    </BrowserRouter>
  );
}
