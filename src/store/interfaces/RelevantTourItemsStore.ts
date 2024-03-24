import { TourItemModel } from "../../models/TourItemModel";


export default interface RelevantTourItemsStore {
    relevantTourItem: TourItemModel | null,
    setRelevantTourItem: (tourItem: TourItemModel | null) => void,
    relevantTourItems: TourItemModel[],
    setRelevantTourItems: (tourItems: TourItemModel[]) => void
    addRelevantTourItem: (tourItem: TourItemModel) => void,
    updateRelevantTourItems: (tourItem: TourItemModel) => void,
    deleteRelevantTourItem: (id: string) => void,
}