import { CustomerModel } from "./CustomerModel";
import { TourItemModel } from "./TourItemModel";
import { TourModel } from "./TourModel";
import { UserModel } from "./UserModel";

export interface BookingItemModel {
    id: string,
    tour: TourModel,
    tourItemId: TourItemModel,
    uid: UserModel,
    customers: CustomerModel[]
}