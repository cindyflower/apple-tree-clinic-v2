import { createRoot } from "react-dom/client";
import App from "./App";
import { initUmami } from "./lib/initUmami";
import "./index.css";
import "./lib/scrollRestore";

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

initUmami();
createRoot(document.getElementById("root")!).render(<App />);
