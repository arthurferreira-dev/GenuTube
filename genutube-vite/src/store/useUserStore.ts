import { create } from "zustand";
import type { GoogleUserProps } from "../utils/props";

interface UserStore {
  user: GoogleUserProps | null;
  setUser: (userObj: GoogleUserProps | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (userObj) => set({ user: userObj }),
}));