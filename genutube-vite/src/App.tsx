import { useEffect } from "react";
import { useUserStore } from "./store/useUserStore";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export default function App() {
  const { setUser } = useUserStore();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  return <RouterProvider router={router} />;
}