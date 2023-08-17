import axios, {AxiosResponse} from "axios";
import {AuthResponse, LoginRequest, SignUpRequest} from "@/assets/types/HttpAuth";

const auth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const login = ({email, password}: LoginRequest) => auth.post<AuthResponse, AxiosResponse<AuthResponse>, LoginRequest>('/login', {
    email,
    password
});

export const signup = ({name, email, password}: SignUpRequest) => auth.post<AuthResponse, AxiosResponse<AuthResponse>, SignUpRequest>('/signup', {
    email,
    password,
    name
});