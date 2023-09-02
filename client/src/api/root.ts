import {AuthSuccessResponse} from "@/assets/types/HttpAuth";
import {authApi} from "@/api/auth";
import axios, {AxiosError, AxiosResponse} from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

api.interceptors.response.use((response) => response,
    async function (error: AxiosError) {
        if (error.response?.status === 401) {
            try {
                const originalRequest = error.config;
                const response: AxiosResponse<AuthSuccessResponse> = await authApi.refreshSession();
                localStorage.setItem('authToken', response.data.authToken);
                return await axios.request(originalRequest!);
            } catch (e) {
                console.log(e);
            }
        }
        return Promise.reject(error);
    })

export default api;