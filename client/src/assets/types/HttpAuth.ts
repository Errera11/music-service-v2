import {UserRoles} from "@/assets/types/User";

export type AuthConstraintsError = [{
    property: string,
    constraints: string
}]

export type AuthError = {
    message: AuthConstraintsError,
    statusCode: number
}

export interface AuthSuccessResponse {
    email: string,
    name: string,
    role: UserRoles[],
    avatar: string,
    is_email_auth: boolean,
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