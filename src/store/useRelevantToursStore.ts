import { create } from "zustand";
import RelevantToursStore from "./interfaces/RelevantToursStore";

export const useRelevantToursStore = create<RelevantToursStore>((set) => ({
    relevantTour: null,
    setRelevantTour: (relevantTour) => set({ relevantTour }),

    relevantTours: [],
    setRelevantTours: (relevantTours) => set({ relevantTours }),
    addRelevantTour: (tour) => set((state) => ({ relevantTours: [...state.relevantTours, tour] })),
    updateRelevantTour: (update) => set((state) => ({ relevantTours: state.relevantTours.map((tour) => (tour.id === update.id ? { ...tour, ...update } : tour)), })),
    deleteRelevantTour: (id) => set((state) => ({ relevantTours: state.relevantTours.filter((tour) => tour.id !== id), })),

}))