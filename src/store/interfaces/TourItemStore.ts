import { TourItemModel } from "../../models/TourItemModel";

export default interface TourItemStore {
    tourItem: TourItemModel | null,
    setTourItem: (tourItem: TourItemModel | null) => void,
    tourItems: TourItemModel[],
    setTourItems: (tourItems: TourItemModel[]) => void
    addTourItem: (tourItem: TourItemModel) => void,
    updateTourItems: (tourItem: TourItemModel) => void,
    deleteTourItem: (id: string) => void,
}