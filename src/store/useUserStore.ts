import { create } from "zustand";
import { UserStore } from "./interfaces/UserStore";

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({user})
}))