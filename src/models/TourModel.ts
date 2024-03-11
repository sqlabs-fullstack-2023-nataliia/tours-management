import { TourItemModel } from "./TourItemModel"

export interface TourModel {
    id: string,
    name: string,
    destination: string,
    duration: number,
    image: string,
    commission: number,
    // TODO
    // description: string[]
    tourItems: TourItemModel[]
}