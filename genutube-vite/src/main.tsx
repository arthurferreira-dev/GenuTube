import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.tsx";
import PageError from "./pages/error/PageError.tsx";
import "./tailwind.css"; //? Using TailwindCSS (CSS Lib) | https://tailwindcss.com/docs/installation/using-vite
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <PageError />,
  },
]);

createRoot(document.querySelector("body")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
