import {AxiosResponse} from "axios";
import api from "./root";
import {AuthResponse, LoginRequest, SignUpRequest} from "@/assets/types/HttpAuth";


const login = ({email, password}: LoginRequest) => api.post<AuthResponse, AxiosResponse<AuthResponse>, LoginRequest>('/login', {email, password}, {withCredentials: true});

const signup = ({name, email, password}: SignUpRequest) => api.post<AuthResponse, AxiosResponse<AuthResponse>, SignUpRequest>('/signup', {email, password, name}, {withCredentials: true});

const logout = () => api.delete('logout', {
    withCredentials: true
})

const refreshSession = () =>
    api.post('refreshSession', {}, {withCredentials: true})

const loginByAuthToken = ({authToken}: {
    authToken: string
}) => api.get<Omit<AuthResponse, 'refreshToken' | 'authToken'>>('loginByAuthToken', {
    headers: {
        authorization: authToken
    }
})


export const authApi = {
    login,
    logout,
    signup,
    loginByAuthToken,
    refreshSession

}