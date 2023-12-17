export enum UserRoles {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export class User {
    id: string
    name: string
    email: string
    password: string
    role: string[]
    avatar: string
    is_email_auth: boolean
}