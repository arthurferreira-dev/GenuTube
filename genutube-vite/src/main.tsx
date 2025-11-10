import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css"; //? Using TailwindCSS (CSS Lib) | https://tailwindcss.com/docs/installation/using-vite
import "./App.css";
import App from "./App";

createRoot(document.querySelector("body")!).render(
  <StrictMode>
    <App/>
  </StrictMode>
);