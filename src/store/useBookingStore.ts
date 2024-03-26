import { create } from "zustand";
import BookingStore from "./interfaces/BookingStore";


export const useBookingStore = create<BookingStore>((set) => ({
    booking: null,
    setBooking: (booking) => set({ booking}),
    bookings: [],
    setBookings: (bookings) => set({ bookings }),
    addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
    updateBooking: (update) => set((state) => ({ bookings: state.bookings.map((booking) => booking.id === update.id ? { ...booking, ...update } : booking) })),
    deleteBooking: (id) => set((state) => ({ bookings: state.bookings.filter((booking) => booking.id !== id) }))
}))