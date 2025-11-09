import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.tsx";
import PageError from "./pages/error/PageError.tsx";
import { VideoPlayer } from "./pages/Video.tsx";
import "./tailwind.css"; //? Using TailwindCSS (CSS Lib) | https://tailwindcss.com/docs/installation/using-vite
import "./App.css";
import { ChannelPage } from "./pages/ChannelPage.tsx";
import { AccountPage } from "./pages/AccountPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/watch",
    element: <VideoPlayer/>
  },
  {
    path: "/channel",
    element: <ChannelPage/>
  },
  {
    path: "/login",
    element: <AccountPage/>
  },
  {
    path: "*",
    element: <PageError />
  },
]);

createRoot(document.querySelector("body")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);