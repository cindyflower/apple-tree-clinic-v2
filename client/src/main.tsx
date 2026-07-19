import { createRoot } from "react-dom/client";
import App from "./App";
import { initUmami } from "./lib/initUmami";
import { initUTMCapture } from "./lib/analytics";
import "./index.css";
import "./lib/scrollRestore";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

initUTMCapture();
initUmami();
createRoot(document.getElementById("root")!).render(<App />);
