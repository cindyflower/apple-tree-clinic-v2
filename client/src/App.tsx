import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Router, Switch, useLocation } from "wouter";
import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAnalytics } from "./hooks/useAnalytics";
import { useGlobalTracking } from "./hooks/useGlobalTracking";
import { normalizeRouterPath } from "./lib/basePath";
import { lazyWithRetry } from "./lib/lazyWithRetry";
import Home from "./pages/Home";

const TreatmentDetail = lazyWithRetry(() => import("./pages/TreatmentDetail"));
const CaseDetail = lazyWithRetry(() => import("./pages/CaseDetail"));
const DoctorDetail = lazyWithRetry(() => import("./pages/DoctorDetail"));
const FaceTest = lazyWithRetry(() => import("./pages/FaceTest"));
const FaceResult = lazyWithRetry(() => import("./pages/FaceResult"));
const XuyanAI = lazyWithRetry(() => import("./pages/XuyanAI"));
const NotFound = lazyWithRetry(() => import("@/pages/NotFound"));

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
