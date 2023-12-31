
export class AuthUserDto {
    readonly id: string
    readonly email: string
    readonly name: string
    readonly role: string[]
    readonly is_email_auth: boolean
    readonly avatar: string | undefined
    readonly authToken: string
    readonly refreshToken: string
}