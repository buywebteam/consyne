import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ShipmentProvider } from "./context/ShipmentContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ShipmentProvider>
          {" "}
          <App />
        </ShipmentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
