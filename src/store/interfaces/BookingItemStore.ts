import { BookingItemModel } from "../../models/BookingItemModel";


export default interface BookingItemStore {
    bookingItem: BookingItemModel | null,
    setBookingItem: (bookingItem: BookingItemModel | null) => void,
    bookingItems: BookingItemModel[],
    setBookingItems: (bookingItems: BookingItemModel[]) => void
    addBookingItem: (bookingItem: BookingItemModel) => void,
    updateBookingItems: (bookingItem: BookingItemModel) => void,
    deleteBookingItem: (id: string) => void,
}