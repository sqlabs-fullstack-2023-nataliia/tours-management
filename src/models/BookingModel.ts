import { CustomerModel } from "./CustomerModel";

export interface BookingModel {
    id: string,
    tourId: string,
    tourItemId: string,
    uid: string,
    customers: CustomerModel[]
}