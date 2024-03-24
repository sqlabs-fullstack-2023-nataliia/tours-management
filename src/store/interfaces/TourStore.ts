import { TourModel } from "../../models/TourModel";

export default interface TourStore {
    tour: TourModel | null,
    setTour: (tour: TourModel | null) => void,
    tours: TourModel[],
    setTours: (tours: TourModel[]) => void,
    addTour: (tour: TourModel) => void,
    updateTour: (tour: TourModel) => void,
    deleteTour: (id: string) => void,
}