import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode> //*to remove strictmode to accurately count iterations
    <App />
  </React.StrictMode>,
);
