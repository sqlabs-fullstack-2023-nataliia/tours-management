import create from "../services/HTTPService"


export const TOUR_COLLECTION = 'tours'

export interface TourEntity {
    duration: number,
    name: string,
    descriprion: string,
    destination: string,
    price: number,
    image: string
}

export const tourService = create(TOUR_COLLECTION)