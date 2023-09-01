import axios, {AxiosError, AxiosResponse} from "axios/index";
import {AuthSuccessResponse} from "@/assets/types/HttpAuth";
import {refreshSession} from "@/api/auth";

axios.interceptors.response.use((response) => response,
    async function (error: AxiosError) {
        if (error.response?.status === 401) {
            try {
                const originalRequest = error.config;
                const response: AxiosResponse<AuthSuccessResponse> = await refreshSession();
                localStorage.setItem('authToken', response.data.authToken);
                return await axios.request(originalRequest!);
            } catch (e) {
                console.log(e);
            }
        }
        return Promise.reject(error);
    })
