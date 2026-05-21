import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAnalytics } from "./hooks/useAnalytics";
import { useGlobalTracking } from "./hooks/useGlobalTracking";
import Home from "./pages/Home";
import TreatmentDetail from "./pages/TreatmentDetail";
import CaseDetail from "./pages/CaseDetail";
import DoctorDetail from "./pages/DoctorDetail";
import FaceTest from "./pages/FaceTest";
import FaceResult from "./pages/FaceResult";
import XuyanAI from "./pages/XuyanAI";

function AppRoutes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/face-test"} component={FaceTest} />
      <Route path={"/face-result"} component={FaceResult} />
      <Route path={"/xuyan-ai"} component={XuyanAI} />
      <Route path={"/treatment/:slug"} component={TreatmentDetail} />
      <Route path={"/case/:slug"} component={CaseDetail} />
      <Route path={"/doctor/:slug"} component={DoctorDetail} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
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
