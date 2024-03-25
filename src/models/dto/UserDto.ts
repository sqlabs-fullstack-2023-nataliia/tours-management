
export interface UserDto {
    id: string,
    firstName: string,
    lastName: string,
    role: 'admin' | 'agent' | 'user',
    tourAgency?: string
}