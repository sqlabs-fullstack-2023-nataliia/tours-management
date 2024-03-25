import { CustomerModel } from "./CustomerModel";
import { TourItemModel } from "./TourItemModel";
import { TourModel } from "./TourModel";
import { UserModel } from "./UserModel";

export interface BookingItemModel {
    id: string,
    tour: TourModel | null,
    tourItem: TourItemModel | null,
    user: UserModel | null,
    customers: CustomerModel[]
}