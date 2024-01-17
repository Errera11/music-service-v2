import api from "@/api/root";
import {User} from "@/assets/types/User";
import {IPaginationLimit} from "@/assets/types/IPaginationLimit";
import {IGetItemsList} from "@/assets/types/IGetItemsList";
import {AxiosRequestConfig} from "axios";

export interface IUserApiResponse {
    users: User[]
    totalCount: number
}

export interface ExtendedUserInfo {
    user: User
    userFavSongsCount: number
    userPlaylistsCount: number
}

// Granted to administrator
const getAllUsers = (dto: IPaginationLimit, req?: AxiosRequestConfig) => api.get<IGetItemsList<User>>('getUsers', {
    headers: req?.headers,
    params: {
        ...dto
    }
});

// Granted to administrator
const makeAdmin = ({userId}: {userId: string}, req?: AxiosRequestConfig) => api.put<User>('makeAdmin', {
    userId
}, {
    headers: req?.headers
})

// Granted to administrator
const revokeAdmin = ({userId}: {userId: string}, req?: AxiosRequestConfig) => api.put<User>('revokeAdmin', {
    userId
}, {
    headers: req?.headers
})

// Granted to administrator
const getUserById = ({userId}: {userId: string}, req?: AxiosRequestConfig) => api.get<ExtendedUserInfo>(`getUserById/${userId}`, {
    headers: req?.headers
});

export const userApi = {
    getAllUsers,
    makeAdmin,
    revokeAdmin,
    getUserById
}