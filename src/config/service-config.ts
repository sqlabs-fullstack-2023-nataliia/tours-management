import create from "../services/HTTPService"
import createTourService from "../services/HTTPTourService"


export const TOUR_COLLECTION = 'tours'
export const TOUR_SETTINGS_COLLECTION = 'tour-settings'
export const TOUR_BOOKINGS_COLLECTION = 'tour-bookings'
export const USER_SETTINGS_COLLECTION = 'user-settings'
export const ACCOUNTS_COLLECTION = 'accounts'

export const tourService = createTourService(TOUR_COLLECTION)
export const tourSettingsService = create(TOUR_SETTINGS_COLLECTION);
export const tourBookingService = create(TOUR_BOOKINGS_COLLECTION)
export const accountsService = create(ACCOUNTS_COLLECTION)