import { createBrowserRouter } from "react-router-dom";
import Home from "./Home.tsx";
import PageError from "./pages/error/PageError.tsx";
import { VideoPlayer } from "./pages/Video.tsx";
import { ChannelPage } from "./pages/ChannelPage.tsx";
import { AccountPage } from "./pages/AccountPage.tsx";

export const router = createBrowserRouter([
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