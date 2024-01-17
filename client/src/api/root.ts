import {authApi} from "@/api/auth";
import axios, {AxiosError} from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

api.interceptors.response.use((response) => response,
    async function (error: AxiosError) {
        if (error.response?.status === 401 && typeof window !== undefined) {
            try {
                const originalRequest = error.config;
                await authApi.refreshSession();
                return await axios.request(originalRequest!);
            } catch (e) {
                console.log(e);
            }
        }
        return Promise.reject(error);
    })

export default api;