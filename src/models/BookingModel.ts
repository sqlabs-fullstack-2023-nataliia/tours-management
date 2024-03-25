import { CustomerModel } from "./CustomerModel";
import { TourDto } from "./dto/TourDto";
import { TourItemDto } from "./dto/TourItemDto";
import { UserDto } from "./dto/UserDto";

export interface BookingModel {
    id: string,
    tour: TourDto | null,
    tourItem: TourItemDto | null,
    user: UserDto | null,
    customers: CustomerModel[],
    takingDate: string,
    paymentStatus: string
}

