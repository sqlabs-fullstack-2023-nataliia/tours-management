import { create } from "zustand";
import TourItemStore from "./interfaces/TourItemStore";

export const useTourItemStore = create<TourItemStore>((set) => ({
    tourItem: null,
    setTourItem: (tourItem) => set({ tourItem }),

    tourItems: [],
    setTourItems: (tourItems) => set({ tourItems }),

    addTourItem: (tourItem) => set((state) => ({ tourItems: [...state.tourItems, tourItem] })),
    updateTourItems: (update) => set((state) => ({ tourItems: state.tourItems.map((tourItem) => tourItem.id === update.id ? { ...tourItem, ...update } : tourItem) })),
    deleteTourItem: (id) => set((state) => ({ tourItems: state.tourItems.filter((tourItem) => tourItem.id !== id) }))
}))