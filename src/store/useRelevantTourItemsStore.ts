import { create } from "zustand";
import RelevantTourItemsStore from "./interfaces/RelevantTourItemsStore";


export const useRelevantTourItemsStore = create<RelevantTourItemsStore>((set) => ({
    relevantTourItem: null,
    setRelevantTourItem: (relevantTourItem) => set({ relevantTourItem }),

    relevantTourItems: [],
    setRelevantTourItems: (relevantTourItems) => set({ relevantTourItems }),

    addRelevantTourItem: (tourItem) => set((state) => ({ relevantTourItems: [...state.relevantTourItems, tourItem] })),
    updateRelevantTourItems: (update) => set((state) => ({ relevantTourItems: state.relevantTourItems.map((tourItem) => tourItem.id === update.id ? { ...tourItem, ...update } : tourItem) })),
    deleteRelevantTourItem: (id) => set((state) => ({ relevantTourItems: state.relevantTourItems.filter((tourItem) => tourItem.id !== id) }))
}))