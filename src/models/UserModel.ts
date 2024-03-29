
export interface UserModel {
    uid: string
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: 'admin' | 'agent' | 'user',
    tourAgency?: string
}