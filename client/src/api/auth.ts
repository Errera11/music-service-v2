import axios, {AxiosResponse} from "axios";
import {AuthResponse, LoginRequest, SignUpRequest} from "@/assets/types/HttpAuth";

const auth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const login = ({email, password}: LoginRequest) => auth.post<AuthResponse, AxiosResponse<AuthResponse>, LoginRequest>('/login', {
    email,
    password
}, {withCredentials: true});

export const signup = ({name, email, password}: SignUpRequest) => auth.post<AuthResponse, AxiosResponse<AuthResponse>, SignUpRequest>('/signup', {
    email,
    password,
    name
}, {withCredentials: true});

export const logout = () => auth.delete('logout', {
    withCredentials: true
})

export const refreshSession = () =>
    auth.post('refreshSession', {}, {withCredentials: true})

export const loginByAuthToken = ({authToken}: {authToken: string}) => auth.get<Omit<AuthResponse, 'refreshToken' | 'authToken'>>('loginByAuthToken', {
        headers: {
            authorization: authToken
        }
    })