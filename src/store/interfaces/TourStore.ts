import { TourItemModel } from "../../models/TourItemModel";
import { TourModel } from "../../models/TourModel";

export default interface TourStore {
    tour: TourModel | null,
    setTour: (tour: TourModel | null) => void,
    tours: TourModel[],
    setTours: (tours: TourModel[]) => void,
    addTour: (tour: TourModel) => void,
    updateTour: (tour: TourModel) => void,
    deleteTour: (id: string) => void,
    tourItem: TourItemModel | null,
    setTourItem: (tourItem: TourItemModel | null) => void,
    tourItems: TourItemModel[],
    setTourItems: (tourItems: TourItemModel[]) => void
    addTourItem: (tourItem: TourItemModel) => void,
    updateTourItem: (tourItem: TourItemModel) => void,
    deleteTourItem: (id: string) => void,
}