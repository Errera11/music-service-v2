export class UserDto {
    readonly id: string
    readonly name: string
    readonly email: string
    readonly role: string[]
    readonly avatar: string
    readonly is_email_auth: boolean
}