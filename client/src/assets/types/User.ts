
export enum UserRoles  {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface User {
    id?: string
    email: string
    name: string
    role: UserRoles[]
    is_email_auth: boolean
    avatar?: string
}