import {AxiosResponse} from "axios";
import api from "./root";
import {AuthResponse, LoginRequest, SignUpRequest} from "@/assets/types/HttpAuth";
import {AxiosRequestConfig} from "axios";


const login = ({email, password}: LoginRequest) => api.post<AuthResponse, AxiosResponse<AuthResponse>, LoginRequest>('/login', {email, password});

const signup = ({name, email, password}: SignUpRequest) => api.post<AuthResponse, AxiosResponse<AuthResponse>, SignUpRequest>('/signup', {email, password, name});

const logout = () => api.delete('logout')

const  refreshSession = (req?: AxiosRequestConfig) =>
    api.post('refreshSession', {}, req)

const loginByRefreshToken = () => api.get('loginByRefreshToken');


export const authApi = {
    login,
    logout,
    signup,
    loginByRefreshToken,
    refreshSession
}