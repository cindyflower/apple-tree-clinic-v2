import { createRoot } from "react-dom/client";
import App from "./App";
import { initUmami } from "./lib/initUmami";
import { initUTMCapture } from "./lib/analytics";
import { hasMarketingConsent } from "./lib/marketingConsent";
import "./index.css";
import "./lib/scrollRestore";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

if (hasMarketingConsent()) {
  initUTMCapture();
  initUmami();
}
createRoot(document.getElementById("root")!).render(<App />);
