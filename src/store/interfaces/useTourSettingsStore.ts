import { create } from "zustand";
import TourSettingsStore from "./TourSettingsStore";

export const useTourSettingsStore = create<TourSettingsStore>((set) => ({
    settings: null,
    setSettings: (settings) => set({settings}),
}))