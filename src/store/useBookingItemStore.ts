import { create } from "zustand";
import BookingItemStore from "./interfaces/BookingItemStore";


export const useBookingItemStore = create<BookingItemStore>((set) => ({
    bookingItem: null,
    setBookingItem: (bookingItem) => set({ bookingItem }),

    bookingItems: [],
    setBookingItems: (bookingItems) => set({ bookingItems }),

    addBookingItem: (bookingItem) => set((state) => ({ bookingItems: [...state.bookingItems, bookingItem] })),
    updateBookingItems: (update) => set((state) => ({ bookingItems: state.bookingItems.map((bookingItem) => bookingItem.id === update.id ? { ...bookingItem, ...update } : bookingItem) })),
    deleteBookingItem: (id) => set((state) => ({ bookingItems: state.bookingItems.filter((bookingItem) => bookingItem.id !== id) }))
}))