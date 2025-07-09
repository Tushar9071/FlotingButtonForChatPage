import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LayOutContextProvider } from "./context/layoutContext.tsx";
import GlobalStylesSetter from "./util/globalStylesSetter.tsx";

const containerId = "my-floating-widget-root";

function mountWidget() {
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    document.body.appendChild(container);
  }

  createRoot(container).render(
    <StrictMode>
      <LayOutContextProvider>
        <GlobalStylesSetter/>
        <App />
      </LayOutContextProvider>
    </StrictMode>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountWidget);
} else {
  mountWidget();
}
