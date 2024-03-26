import { BookingModel } from "../../models/BookingModel";


export default interface BookingItemStore {
    booking: BookingModel | null,
    setBooking: (bookingItem: BookingModel | null) => void,
    bookings: BookingModel[],
    setBookings: (bookingItems: BookingModel[]) => void
    addBooking: (bookingItem: BookingModel) => void,
    updateBooking: (bookingItem: BookingModel) => void,
    deleteBooking: (id: string) => void,
}