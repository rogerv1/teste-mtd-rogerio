import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.css"; // <-- Importando o CSS comum

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);