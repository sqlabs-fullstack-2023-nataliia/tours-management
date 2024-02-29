
export interface UserModel {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: 'admin' | 'agent' | 'user',
    tourAgent?: string
}