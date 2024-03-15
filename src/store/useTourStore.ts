import { create } from "zustand";
import TourStore from "./interfaces/TourStore";


export const useTourStore = create<TourStore>((set) => ({
    tour: null,
    setTour: (tour) => set({tour}),
    tours: [],
    setTours: (tours) => set({tours}),
    addTour: (tour) => set((state) => ({ tours: [...state.tours, tour] })),
    updateTour: (update) => set((state) => ({ tours: state.tours.map((tour) => (tour.id === update.id ? { ...tour, ...update } : tour)), })),
    deleteTour: (id) => set((state) => ({ tours: state.tours.filter((tour) => tour.id !== id), })),
    tourItem: null,
    setTourItem: (tourItem) => set({tourItem}),
    tourItems: [],
    setTourItems: (tourItems) => set({tourItems}),
    addTourItem: (tourItem) => set((state) => ({tourItems: [...state.tourItems, tourItem]})),
    updateTourItem: (update) => set((state) => ({tourItems: state.tourItems.map((tourItem) => tourItem.id === update.id ? {... tourItem, ...update} : tourItem)})),
    deleteTourItem: (id) => set((state) => ({tourItems: state.tourItems.filter((tourItem) => tourItem.id !== id)}))
}))