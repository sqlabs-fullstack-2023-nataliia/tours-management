import { UserModel } from "../../models/UserModel";

export interface UserStore {
    user: UserModel | null,
    setUser: (user: UserModel | null) => void
}