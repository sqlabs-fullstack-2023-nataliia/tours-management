import { TourModel } from "../../models/TourModel";


export default interface RelevantToursStore {
    relevantTour: TourModel | null,
    setRelevantTour: (tour: TourModel | null) => void,
    relevantTours: TourModel[],
    setRelevantTours: (tours: TourModel[]) => void,
    addRelevantTour: (tour: TourModel) => void,
    updateRelevantTour: (tour: TourModel) => void,
    deleteRelevantTour: (id: string) => void,
}