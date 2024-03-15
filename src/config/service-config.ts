import create from "../services/HTTPService"


export const TOUR_COLLECTION = 'tours'
export const TOUR_SETTINGS_COLLECTION = 'tour-settings'
export const USER_SETTINGS_COLLECTION = 'user-settings'

export const tourService = create(TOUR_COLLECTION)
export const tourSettingsService = create(TOUR_SETTINGS_COLLECTION);