import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/main.scss";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
reportWebVitals();
