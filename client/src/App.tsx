import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router, Switch, useLocation } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAnalytics } from "./hooks/useAnalytics";
import { useGlobalTracking } from "./hooks/useGlobalTracking";
import { normalizeRouterPath } from "./lib/basePath";
import Home from "./pages/Home";

const TreatmentDetail = lazy(() => import("./pages/TreatmentDetail"));
const CaseDetail = lazy(() => import("./pages/CaseDetail"));
const DoctorDetail = lazy(() => import("./pages/DoctorDetail"));
const FaceTest = lazy(() => import("./pages/FaceTest"));
const FaceResult = lazy(() => import("./pages/FaceResult"));
const XuyanAI = lazy(() => import("./pages/XuyanAI"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function AppRoutes() {
  const [location] = useLocation();

  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <Switch location={normalizeRouterPath(location)}>
        <Route path={"/"} component={Home} />
        <Route path={"/face-test"} component={FaceTest} />
        <Route path={"/face-result"} component={FaceResult} />
        <Route path={"/xuyan-ai"} component={XuyanAI} />
        <Route path={"/treatment/:slug"} component={TreatmentDetail} />
        <Route path={"/case/:slug"} component={CaseDetail} />
        <Route path={"/doctor/:slug"} component={DoctorDetail} />
        <Route path={"/404"} component={NotFound} />
        <Route path={"*"} component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useAnalytics();
  useGlobalTracking();
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router base={import.meta.env.BASE_URL}>
            <AppRoutes />
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
