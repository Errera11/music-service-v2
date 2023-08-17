export type AuthConstraintsError = [{
    property: string,
    constraints: string
}]

export interface AuthError {
    error: string,
    message: string | [],
    status: number
}

export interface AuthSuccessResponse {
    email: string
    name: string
    role: string[]
    is_email_auth: boolean
}

export type AuthResponse = AuthSuccessResponse | AuthError;

export interface LoginRequest {
    email: string
    password: string
}

export interface SignUpRequest {
    name: string
    email: string
    password: string
}