export enum UserRoles {
    USER,
    ADMIN
}
export class User {
    id: string
    name: string
    email: string
    password: string
    role: UserRoles[]
    avatar: string
}